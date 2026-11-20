# Arzi (अर्ज़ी)

> An administrative routing and copy-assist tool that helps citizens in Delhi and Ghaziabad report civic issues to the right authority.

---

## Problem It Solves

Delhi and Ghaziabad share dense urban borders governed by more than ten overlapping civic authorities—including the Municipal Corporation of Delhi (MCD), Public Works Department (PWD), Delhi Development Authority (DDA), Ghaziabad Nagar Nigam (GNN), Ghaziabad Development Authority (GDA), and Delhi Jal Board (DJB). When a citizen observes a damaged road, overflowing garbage heap, fallen tree, or broken traffic signal, finding the legally accountable department is confusing and error-prone. Complaints submitted to the wrong portal are frequently rejected or transferred after weeks of inaction, leaving citizens frustrated. Arzi eliminates this jurisdictional confusion by identifying the responsible authority for the exact location, drafting the complaint in clear administrative language, and preparing every field for one-tap submission.

---

## How It Works

Arzi guides citizens through a 5-step administrative flow:

1. **Capture & Privacy Scrub**: Take or upload a photo of the civic defect. All EXIF metadata, camera identifiers, and GPS tags are stripped client-side in the browser before transmission. An AI vision model analyzes the defect, categorizes the issue, estimates severity, and drafts an administrative description.
2. **Location & Ward Matching**: Confirm the street name and prominent landmark. Arzi matches the location against municipal ward maps and highlights border jurisdictions where opposite sides of the road belong to different civic bodies.
3. **Review & Authority Determination**: Review the drafted complaint dossier, formal subject line, and the legally responsible civic body along with a plain-language explanation of statutory jurisdiction.
4. **Copy-Assist Handoff**: The designated government portal (such as MCD 311 or GNN 311) is presented alongside one-tap copy buttons for each required field (category, ward, location, narrative). The citizen opens the official portal and pastes the prepared text directly into the government form.
5. **Log Ticket & Track Follow-up**: Paste the official portal reference or ticket ID back into Arzi. Arzi initiates a simulated 72-hour follow-up timeline, prompting the citizen with *"Is it fixed?"* and outlining formal escalation steps if the department fails to remediate within statutory deadlines.

---

## Features

- **Territorial Routing Directory**: Local municipal gazette data for Delhi NCT (250 wards) and Ghaziabad (100 wards across 5 zones) covering four core civic categories:
  - Damaged Road
  - Overflowing Garbage
  - Fallen Tree
  - Broken Traffic Signal
- **Border Jurisdictional Intelligence**: Special handling for boundary zones (e.g., Anand Vihar vs. Kaushambi, Dilshad Garden vs. Surya Nagar) where civic jurisdiction shifts across road dividers.
- **Client-Side Privacy Protection**: Strips camera serial numbers, device fingerprints, and embedded EXIF geolocation data before sending images to the server.
- **Serverless Vision Analysis with Canned Fallback**: Server-side analysis powered by Gemini Vision or OpenAI Vision with automatic fallback to realistic canned demo responses if no API key is provided.
- **Side-by-Side Copy-Assist Workspace**: 1-tap copy buttons for every form field, a "Copy All Fields" utility, and direct links to official government complaint portals.
- **Simulated 72-Hour Audit & Escalation**: Interactive demo controls to simulate timed reminders (*"Is it fixed?"*) with resolution verification (*"Yes, fixed"*) and statutory appellate escalation (*"Still broken"*).
- **Full Bilingual Support (English & हिन्दी)**: Complete, instant translation across all product screens, form labels, privacy disclosures, and audit timelines via a single header toggle.
- **Municipal Office Design System**: Built with an institutional aesthetic—warm off-white background (`#F6F3EC`), deep pine green (`#2F5D50`), muted terracotta accent (`#8F3D25`), Fraunces and Public Sans typography, 1px rules (no heavy shadows or glassmorphism), and minimum 48px tap targets.

---

## What Is Real and What Is Simulated

In the spirit of civic transparency, here is an honest overview of what is fully functional and what is simulated in this prototype:

### What Is Real
- **Municipal Routing Engine**: Local directory data for Delhi and Ghaziabad accurately reflects real-world jurisdictional allocations between MCD, PWD, GNN, GDA, and traffic police divisions.
- **Photo Privacy Stripping**: EXIF tags and device metadata are genuinely parsed and scrubbed in the browser using HTML5 Canvas pixel rendering.
- **Vision Model API Handler**: When configured with a valid API key, the serverless endpoint (`api/analyze.js`) genuinely calls Google Gemini Flash Vision or OpenAI GPT-4o-mini to analyze images and draft complaint descriptions.
- **Copy-Assist Handoff**: Clipboard copying (individual fields or bulk) and official portal links (MCD 311, GNN 311, PWD Delhi, UP Janhit) are live and functional.
- **Accessibility & Design System**: WCAG AA color contrast, keyboard focus rings (`*:focus-visible`), responsive mobile layouts, and $\ge 48\text{px}$ touch targets are implemented and verified.

### What Is Simulated
- **Ticket Tracking & Reminders**: Official municipal portals (MCD 311, GNN) do not currently offer public webhook APIs for external status polling. Ticket progression, SMS notices, and 72-hour reminders are simulated client-side for demonstration purposes.
- **Unverified Portal Details**: Any routing entry marked `verified: false` (labeled *"Details being verified"*) indicates that the nodal divisional order is awaiting final gazette verification.
- **Noida & Gurugram**: Displayed as *"Coming soon"* while territorial ward boundaries and department nodal rosters are surveyed.

---

## Tech Stack

- **Framework**: [React 18](https://react.dev/) + [Vite 5](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with a custom municipal design token palette
- **Typography**:
  - Headings: [Fraunces](https://fonts.google.com/specimen/Fraunces) (variable serif)
  - Body: [Public Sans](https://fonts.google.com/specimen/Public+Sans) (neutral, highly legible grotesk)
  - Monospace: [JetBrains Mono](https://www.jetbrains.com/lp/mono/) (for reference numbers and technical metadata)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend / Serverless**: Node.js serverless handler (`/api/analyze`) using native `fetch` (zero runtime dependencies, deployable to Vercel, Netlify, or Vite dev server)
- **AI Vision (Optional)**: Google Gemini Flash (`gemini-2.5-flash`) or OpenAI (`gpt-4o-mini`)

---

## How to Run Locally

### Prerequisites
- Node.js 18.x or higher
- npm 9.x or higher

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/arzi.git
   cd arzi
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Copy the example environment template:
   ```bash
   cp .env.example .env
   ```

   *(Optional)* Open `.env` and insert your vision model API key. If left blank, Arzi automatically uses realistic canned results so the app remains fully functional without credentials:
   ```env
   # Google Gemini Vision (Recommended)
   GEMINI_API_KEY=your_gemini_api_key_here

   # Or OpenAI Vision
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

5. **Build for production**:
   ```bash
   npm run build
   npm run preview
   ```

---

## Project Structure

```
Arzi/
├── .env.example                  # Environment template for git
├── .gitignore                    # Git ignore file (excludes secrets & build outputs)
├── api/
│   └── analyze.js                # Serverless vision analysis function (Node.js)
├── index.html                    # Root HTML file with Google Fonts & metadata
├── package.json                  # Dependencies and build scripts
├── postcss.config.js             # PostCSS plugins for Tailwind
├── public/
│   ├── favicon.ico               # Civic landmark favicon
│   └── sample-damage.jpg         # Sample test image for demo
├── src/
│   ├── App.jsx                   # Root application state & bilingual navigation
│   ├── index.css                 # Base municipal design system & WCAG AA tokens
│   ├── main.jsx                  # React application entry point
│   ├── components/
│   │   ├── routing/
│   │   │   └── RoutingDirectory.jsx  # Interactive municipal gazetteer component
│   │   ├── screens/
│   │   │   ├── CaptureScreen.jsx     # Step 1: Photo upload & metadata stripping
│   │   │   ├── CityScreen.jsx        # City gazette & territorial status overview
│   │   │   ├── HandoffScreen.jsx     # Step 4: Side-by-side copy-assist workspace
│   │   │   ├── HomeScreen.jsx        # Landing page with primary civic actions
│   │   │   ├── HowItWorksScreen.jsx  # 4-step process explainer
│   │   │   ├── LocationScreen.jsx    # Step 2: Location & ward confirmation
│   │   │   ├── LogTicketScreen.jsx   # Step 5: Portal receipt logging
│   │   │   ├── MyReportsScreen.jsx   # Ticket tracking, reminders & escalation
│   │   │   └── ReviewScreen.jsx      # Step 3: Dossier review & routing reason
│   │   └── ui/
│   │       ├── Button.jsx            # Municipal button variants (min 48px touch)
│   │       ├── Input.jsx             # Accessible form input with 17px body
│   │       ├── NoticeBanner.jsx      # Info, urgent, and success notification banners
│   │       ├── Select.jsx            # Native accessible select dropdown
│   │       ├── StatusTimeline.jsx    # Vertical audit trail component
│   │       ├── Stepper.jsx           # Procedural multi-step indicator
│   │       ├── Textarea.jsx          # Accessible multiline textarea
│   │       ├── TicketCard.jsx        # Complaint docket overview card
│   │       └── TopNav.jsx            # 4-item navigation, skip link & language toggle
│   └── data/
│       ├── routing/
│       │   ├── cities.json           # Territorial boundaries (Delhi, GZB, Noida, Gurugram)
│       │   ├── delhi.json            # Delhi NCT routing table and border pairs
│       │   ├── ghaziabad.json        # Ghaziabad Nagar Nigam routing table and border pairs
│       │   └── index.js              # Routing lookup and border resolution logic
│       └── translations.js           # Bilingual dictionary (English & हिन्दी)
├── tailwind.config.js            # Custom color palette, fonts & border radius
└── vite.config.js                # Vite build config & serverless API dev middleware
```

---

## Roadmap

- [ ] **Territorial Coverage Expansion**: Add complete ward directories and nodal officer contacts for **Noida** (NOIDA Authority) and **Gurugram** (MCG / GMDA).
- [ ] **Full Gazette Verification**: Complete field verification for all unverified portal links and divisional office orders marked `verified: false`.
- [ ] **Direct Departmental Email Submission**: Generate signed citizen grievance emails formatted for municipal executive engineers for departments lacking public web portals.
- [ ] **Automated Public Portal Status Sync**: Explore official open data integration with state CM citizen grievance portals (e.g., Delhi Janhit, UP Jansunwai IGRS) for automated ticket status synchronization.

---

## License

This project is open-source under the [MIT License](LICENSE).
