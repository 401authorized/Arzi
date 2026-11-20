/**
 * Serverless function for civic photo analysis.
 * Calls a vision model (Google Gemini or OpenAI) if an API key is configured in process.env.
 * If no API key is configured or if the API call fails, returns realistic canned results
 * so the demo always functions reliably.
 *
 * NOTE: API keys are read strictly server-side from process.env and never sent to the browser.
 */

export default async function handler(req, res) {
  // Support standard Node HTTP (req, res) or Web Request
  if (req.method !== 'POST') {
    if (res && res.status) {
      return res.status(405).json({ error: 'Method not allowed. Use POST.' });
    }
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        body = {};
      }
    }

    const { imageBase64, mimeType = 'image/jpeg', categoryHint } = body || {};

    const geminiKey = process.env.GEMINI_API_KEY || process.env.VISION_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;

    // 1. If Gemini API key is configured, call Gemini Flash Vision
    if (geminiKey && imageBase64) {
      try {
        const geminiResult = await callGeminiVision(geminiKey, imageBase64, mimeType);
        if (geminiResult) {
          return sendJson(res, {
            ...geminiResult,
            source: 'gemini_vision',
            metadata_stripped: true,
          });
        }
      } catch (err) {
        console.warn('Gemini vision API call failed, falling back to canned demo result:', err.message);
      }
    }

    // 2. If OpenAI API key is configured, call OpenAI Vision
    if (openaiKey && imageBase64) {
      try {
        const openaiResult = await callOpenAIVision(openaiKey, imageBase64, mimeType);
        if (openaiResult) {
          return sendJson(res, {
            ...openaiResult,
            source: 'openai_vision',
            metadata_stripped: true,
          });
        }
      } catch (err) {
        console.warn('OpenAI vision API call failed, falling back to canned demo result:', err.message);
      }
    }

    // 3. Fallback: Return realistic canned results (No API key needed for demo)
    const cannedResult = getCannedResult(categoryHint);
    return sendJson(res, {
      ...cannedResult,
      source: 'canned_demo',
      demo_notice: 'Realistic canned analysis result returned (No external vision API key configured).',
      metadata_stripped: true,
    });
  } catch (error) {
    console.error('Error in analyze serverless handler:', error);
    const fallback = getCannedResult();
    return sendJson(res, {
      ...fallback,
      source: 'canned_demo',
      error: error.message,
      metadata_stripped: true,
    });
  }
}

async function callGeminiVision(apiKey, base64Data, mimeType) {
  const prompt = `You are a municipal civic inspection AI for Delhi and Ghaziabad public works.
Analyze this photo of a civic problem.
Return ONLY valid JSON with no markdown formatting and no backticks.
The JSON must have these exact keys:
- category: MUST be one of 'damaged_road', 'overflowing_garbage', 'fallen_tree', 'broken_traffic_signal'.
- severity_guess: MUST be one of 'urgent' (active life safety hazard, open excavation on roadway, live wire), 'high' (major obstruction or deep waterlogging), 'moderate' (noticeable defect needing routine repair), or 'routine' (minor wear or litter).
- drafted_description: a concise 2-3 sentence formal complaint written in plain, direct administrative language for the municipal authority describing the defect, estimated dimensions, and public hazard.
- confidence: a number between 0.0 and 1.0.`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: prompt },
            {
              inline_data: {
                mime_type: mimeType || 'image/jpeg',
                data: base64Data,
              },
            },
          ],
        },
      ],
      generationConfig: {
        response_mime_type: 'application/json',
        temperature: 0.2,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Empty response from Gemini vision model');

  return JSON.parse(text);
}

async function callOpenAIVision(apiKey, base64Data, mimeType) {
  const prompt = `You are a municipal civic inspection AI for Delhi and Ghaziabad public works.
Analyze this photo of a civic problem. Return ONLY valid JSON with these keys:
- category: one of 'damaged_road', 'overflowing_garbage', 'fallen_tree', 'broken_traffic_signal'
- severity_guess: one of 'urgent', 'high', 'moderate', 'routine'
- drafted_description: 2-3 sentence formal complaint written in direct administrative language for the municipal authority describing the defect, estimated dimensions, and public hazard.
- confidence: number between 0.0 and 1.0`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            {
              type: 'image_url',
              image_url: { url: `data:${mimeType};base64,${base64Data}` },
            },
          ],
        },
      ],
      max_tokens: 400,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  return JSON.parse(content);
}

function getCannedResult(hint) {
  const cannedCatalog = {
    damaged_road: {
      category: 'damaged_road',
      severity_guess: 'urgent',
      drafted_description:
        'Hazardous excavated road trench measuring approximately 4 feet in depth has been left open without warning retro-reflective barricades or night markers on an active roadway. Commuters and pedestrians face imminent accident risk. Immediate physical barricading and backfilling requested under Section 14 Public Works Safety Regulations.',
      confidence: 0.95,
    },
    overflowing_garbage: {
      category: 'overflowing_garbage',
      severity_guess: 'high',
      drafted_description:
        'Substantial accumulation of uncollected municipal solid waste overflowing from public transfer depot onto active pedestrian footpath. Rotting organic waste is causing sanitary hazard, vermin infestation, and blocking stormwater drainage channel. Immediate compactor deployment requested.',
      confidence: 0.92,
    },
    fallen_tree: {
      category: 'fallen_tree',
      severity_guess: 'high',
      drafted_description:
        'Large mature tree trunk has suffered structural failure and fallen across the secondary road carriage-way, obstructing two-way vehicular flow and threatening overhead electrical utility lines. Emergency horticulture wood-cutting team requested for immediate clearing.',
      confidence: 0.93,
    },
    broken_traffic_signal: {
      category: 'broken_traffic_signal',
      severity_guess: 'urgent',
      drafted_description:
        'Traffic control signal cluster at busy intersection is completely dark with damaged internal wiring and physical casing displacement. Major vehicular gridlock and pedestrian crossing danger observed during peak transit hours. Emergency electrical technician dispatch requested.',
      confidence: 0.91,
    },
  };

  return cannedCatalog[hint] || cannedCatalog.damaged_road;
}

function sendJson(res, data) {
  if (res && res.status && res.json) {
    return res.status(200).json(data);
  }
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
