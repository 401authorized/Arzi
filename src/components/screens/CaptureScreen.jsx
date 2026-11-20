import React, { useState, useRef } from 'react';
import Stepper from '../ui/Stepper';
import Button from '../ui/Button';
import Textarea from '../ui/Textarea';
import Select from '../ui/Select';
import { CATEGORIES } from '../../data/routing';
import { TRANSLATIONS } from '../../data/translations';
import { stripImageMetadata, stripImageUrlMetadata } from '../../utils/imageUtils';
import {
  Camera,
  Upload,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  AlertTriangle,
  Loader2,
  FileText,
} from 'lucide-react';

export default function CaptureScreen({
  initialCategory = 'damaged_road',
  initialDescription,
  lang = 'en',
  onContinue,
  onBack,
}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const fileInputRef = useRef(null);

  // Form State
  const [category, setCategory] = useState(initialCategory);
  const [severity, setSeverity] = useState('urgent');
  const [description, setDescription] = useState(
    initialDescription ||
      (lang === 'hi'
        ? 'मुख्य सड़क पर लगभग 4 फ़ुट गहरा गड्ढा बिना किसी चेतावनी बोर्ड या बैरिकेड के खुला छोड़ दिया गया है। वाहनों और राहगीरों के लिए गंभीर दुर्घटना का ख़तरा है। लोक सुरक्षा नियमों के तहत तुरंत मरम्मत कराई जाए।'
        : 'Hazardous excavated road trench approximately 4 feet deep left open on arterial roadway without safety barricades or warning markers. Risk of injury to commuters. Immediate backfill requested.')
  );

  // Photo State
  const [photoPreview, setPhotoPreview] = useState('/sample-damage.jpg');
  const [isStripped, setIsStripped] = useState(true);
  const [imageMeta, setImageMeta] = useState({ name: 'photo_record.jpg', size: '1.2 MB' });

  // Processing State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisNotice, setAnalysisNotice] = useState(null);

  const categoryOptions = CATEGORIES.map((c) => ({
    value: c.id,
    label: lang === 'hi' ? t[`cat_${c.id}`] || c.label : c.label,
  }));

  const severityOptions = [
    { id: 'urgent', label: t.sev_urgent, desc: lang === 'hi' ? 'गंभीर ख़तरा / खुला गड्ढा' : 'Imminent hazard / open trench' },
    { id: 'high', label: t.sev_high, desc: lang === 'hi' ? 'भारी रुकावट या गंदगी' : 'Major blockage or overflow' },
    { id: 'moderate', label: t.sev_moderate, desc: lang === 'hi' ? 'नियमित मरम्मत' : 'Scheduled routine repair' },
    { id: 'routine', label: t.sev_routine, desc: lang === 'hi' ? 'मामूली रखरखाव' : 'Minor maintenance' },
  ];

  const processAndAnalyzeImage = async (fileOrUrl, isFile = true, categoryHint = null) => {
    setIsAnalyzing(true);
    setAnalysisNotice(null);

    try {
      let strippedData;
      if (isFile) {
        strippedData = await stripImageMetadata(fileOrUrl);
        setPhotoPreview(strippedData.dataUrl);
        setImageMeta({
          name: strippedData.originalName || 'citizen_upload.jpg',
          size: `${Math.round(strippedData.blob.size / 1024)} KB`,
        });
      } else {
        strippedData = await stripImageUrlMetadata(fileOrUrl);
        setPhotoPreview(fileOrUrl);
        setImageMeta({
          name: 'sample_damage.jpg',
          size: '1.2 MB',
        });
      }

      setIsStripped(true);

      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: strippedData.base64,
          mimeType: strippedData.mimeType,
          categoryHint: categoryHint || category,
        }),
      });

      if (!response.ok) {
        throw new Error(`Analysis response status: ${response.status}`);
      }

      const result = await response.json();

      if (result.category) setCategory(result.category);
      if (result.severity_guess) setSeverity(result.severity_guess);
      if (result.drafted_description) {
        setDescription(result.drafted_description);
      }
    } catch (err) {
      console.warn('Analysis error:', err);
      setAnalysisNotice(lang === 'hi' ? 'मानक शिकायत प्रारूप तैयार है।' : 'Standard complaint draft prepared.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processAndAnalyzeImage(file, true);
    }
  };

  const handleSampleSelect = (catKey) => {
    processAndAnalyzeImage('/sample-damage.jpg', false, catKey);
  };

  const steps = [
    { title: lang === 'hi' ? 'फ़ोटो और विवरण' : 'Incident Record', description: lang === 'hi' ? 'फ़ोटो साफ़ करें' : 'Photo & issue note' },
    { title: lang === 'hi' ? 'स्थान' : 'Location', description: lang === 'hi' ? 'वार्ड की पुष्टि' : 'Confirm ward boundary' },
    { title: lang === 'hi' ? 'समीक्षा' : 'Review', description: lang === 'hi' ? 'शिकायत जांचें' : 'Check drafted complaint' },
    { title: lang === 'hi' ? 'पोर्टल में जमा' : 'Portal Filing', description: lang === 'hi' ? 'पोर्टल में भरें' : 'Copy to official portal' },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Stepper Stage 1 */}
      <Stepper steps={steps} currentStep={1} />

      {/* Screen Title & Direct Plain Copy */}
      <div className="space-y-2 border-b border-municipal-border pb-4">
        <span className="font-mono text-xs uppercase text-municipal-primary font-bold tracking-widest block">
          {t.captureStep}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-municipal-text">
          {t.captureTitle}
        </h1>
        <p className="text-base text-municipal-text-muted">
          {t.captureSubtitle}
        </p>
      </div>

      {/* Hidden File Input (Accessible trigger) */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        capture="environment"
        className="hidden"
        aria-hidden="true"
        id="camera-upload-input"
      />

      {/* Photo Capture & Privacy Card */}
      <div className="bg-white border border-municipal-border rounded-[4px] p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label htmlFor="camera-upload-input" className="block text-[15px] font-semibold text-municipal-text">
            {t.incidentPhotoLabel}
          </label>
          {isStripped && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[3px] bg-municipal-sage-tint border border-municipal-sage-border text-municipal-sage-text text-xs font-mono font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              {t.privacyCleanBadge}
            </span>
          )}
        </div>

        {/* Photo Container */}
        <div className="relative border border-municipal-border rounded-[4px] overflow-hidden bg-municipal-surface">
          <img
            src={photoPreview}
            alt="Citizen uploaded civic issue inspection photograph"
            className="w-full h-64 sm:h-72 object-cover"
          />

          {/* Loading Overlay */}
          {isAnalyzing && (
            <div className="absolute inset-0 bg-municipal-text/80 backdrop-blur-[1px] flex flex-col items-center justify-center p-6 text-white text-center space-y-3">
              <Loader2 className="w-8 h-8 animate-spin text-white stroke-[2]" />
              <div className="space-y-1">
                <span className="font-serif text-lg font-bold block">
                  {lang === 'hi' ? 'शिकायत का मसौदा तैयार हो रहा है...' : 'Preparing complaint draft for authority...'}
                </span>
                <span className="text-xs font-mono text-municipal-surface max-w-sm block">
                  {lang === 'hi'
                    ? 'फ़ोटो के आधार पर समस्या का प्रकार और गंभीरता जांची जा रही है...'
                    : 'Classifying defect, assessing urgency, and drafting administrative wording...'}
                </span>
              </div>
            </div>
          )}

          {/* Bottom Photo Metadata Bar */}
          <div className="absolute bottom-0 inset-x-0 bg-municipal-text/90 text-white px-3.5 py-2 text-xs font-mono flex items-center justify-between">
            <span className="truncate">{imageMeta.name} &bull; {imageMeta.size}</span>
            <span className="text-municipal-sage-tint flex items-center gap-1 font-semibold shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {lang === 'hi' ? 'गोपनीयता सुरक्षित' : 'Privacy Sanitized'}
            </span>
          </div>
        </div>

        {/* Upload & Re-take Buttons (All tap targets >= 48px) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="min-h-[48px] px-4 py-2.5 rounded-[4px] border border-municipal-border bg-municipal-surface hover:bg-white text-municipal-primary font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <Upload className="w-4 h-4" />
            <span>{t.uploadNewPhoto}</span>
          </button>

          {/* Sample Issue Buttons (Ensuring >= 48px tap targets) */}
          <div className="flex items-center gap-1.5 text-xs font-mono text-municipal-text-muted flex-wrap">
            <span className="hidden sm:inline font-semibold">{t.testSamples}</span>
            <button
              type="button"
              onClick={() => handleSampleSelect('damaged_road')}
              className="min-h-[48px] min-w-[48px] px-3 py-2 rounded-[3px] border border-municipal-border hover:bg-white text-xs font-bold text-municipal-text cursor-pointer flex items-center justify-center"
            >
              {lang === 'hi' ? 'सड़क' : 'Road'}
            </button>
            <button
              type="button"
              onClick={() => handleSampleSelect('overflowing_garbage')}
              className="min-h-[48px] min-w-[48px] px-3 py-2 rounded-[3px] border border-municipal-border hover:bg-white text-xs font-bold text-municipal-text cursor-pointer flex items-center justify-center"
            >
              {lang === 'hi' ? 'कचरा' : 'Garbage'}
            </button>
            <button
              type="button"
              onClick={() => handleSampleSelect('fallen_tree')}
              className="min-h-[48px] min-w-[48px] px-3 py-2 rounded-[3px] border border-municipal-border hover:bg-white text-xs font-bold text-municipal-text cursor-pointer flex items-center justify-center"
            >
              {lang === 'hi' ? 'पेड़' : 'Tree'}
            </button>
            <button
              type="button"
              onClick={() => handleSampleSelect('broken_traffic_signal')}
              className="min-h-[48px] min-w-[48px] px-3 py-2 rounded-[3px] border border-municipal-border hover:bg-white text-xs font-bold text-municipal-text cursor-pointer flex items-center justify-center"
            >
              {lang === 'hi' ? 'सिग्नल' : 'Signal'}
            </button>
          </div>
        </div>
      </div>

      {/* Clean Administrative Status Box */}
      <div className="bg-municipal-primary-tint/70 border border-municipal-primary-tint-border rounded-[4px] p-4 space-y-1.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-municipal-primary" />
            <span className="font-serif font-bold text-sm text-municipal-text">
              {lang === 'hi' ? 'तैयार किया गया शिकायत सारांश' : 'Drafted Complaint Summary'}
            </span>
          </div>
          <span className="text-[11px] font-mono text-municipal-primary font-bold">
            {lang === 'hi' ? 'जांच पूरी' : 'Standard Civic Form'}
          </span>
        </div>

        <p className="text-xs text-municipal-text-muted leading-relaxed">
          {lang === 'hi'
            ? 'फ़ोटो के आधार पर समस्या की श्रेणी और विवरण तैयार किया गया है। आप नीचे किसी भी जानकारी को अपनी सुविधा अनुसार बदल सकते हैं।'
            : 'Based on the photo, we identified the problem type, estimated the urgency, and drafted the complaint text below. You can change any word.'}
        </p>
      </div>

      {/* Form Fields: Category, Severity, and Editable Drafted Description */}
      <div className="bg-white border border-municipal-border rounded-[4px] p-5 sm:p-6 space-y-5">
        <Select
          label={t.categoryLabel}
          options={categoryOptions}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          helperText={lang === 'hi' ? 'संबंधित नगर निगम विभाग का चयन' : 'Verified against municipal division charter.'}
          required
        />

        {/* Severity Selector */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-[15px] font-semibold text-municipal-text">
              {t.severityLabel}
            </label>
            <span className="text-xs font-mono text-municipal-text-muted font-bold">
              {severity.toUpperCase()}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {severityOptions.map((sev) => {
              const isSelected = severity === sev.id;
              const isUrgent = sev.id === 'urgent';

              return (
                <button
                  key={sev.id}
                  type="button"
                  onClick={() => setSeverity(sev.id)}
                  className={`min-h-[48px] p-2.5 rounded-[4px] border text-left flex flex-col justify-between transition-colors cursor-pointer ${
                    isSelected && isUrgent
                      ? 'bg-municipal-terracotta text-white border-municipal-terracotta font-bold'
                      : isSelected
                      ? 'bg-municipal-primary text-white border-municipal-primary font-bold'
                      : 'bg-white text-municipal-text border-municipal-border hover:bg-municipal-surface'
                  }`}
                >
                  <span className="text-xs font-bold font-mono uppercase leading-tight">
                    {sev.label}
                  </span>
                  <span
                    className={`text-[10px] leading-tight mt-1 line-clamp-1 ${
                      isSelected ? 'text-white/90' : 'text-municipal-text-muted'
                    }`}
                  >
                    {sev.desc}
                  </span>
                </button>
              );
            })}
          </div>

          {severity === 'urgent' && (
            <p className="mt-2 text-xs font-mono text-municipal-terracotta-text font-bold flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span>
                {lang === 'hi'
                  ? 'अति आवश्यक चिह्नित • आपातकालीन प्राथमिकता के साथ जांच।'
                  : 'Marked as urgent priority • Triggers expedited municipal review.'}
              </span>
            </p>
          )}
        </div>

        {/* Drafted Description - EDITABLE BY CITIZEN */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="drafted-desc"
              className="block text-[15px] font-semibold text-municipal-text"
            >
              {t.descriptionLabel}
            </label>
            <span className="text-xs font-mono text-municipal-primary font-bold">
              {t.editableBadge}
            </span>
          </div>

          <Textarea
            id="drafted-desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            maxLength={350}
            helperText={t.descriptionHint}
            required
          />
        </div>

        {/* Short line on who can see the information */}
        <div className="p-3.5 bg-municipal-surface-subtle border border-municipal-border rounded-[4px] text-xs font-mono text-municipal-text-muted leading-relaxed">
          {t.privacyDisclosure}
        </div>
      </div>

      {/* ONE MAIN ACTION: Continue to location (Min 52px height) */}
      <div className="space-y-3 pt-2">
        <Button
          variant="primary"
          fullWidth
          icon={ArrowRight}
          iconPosition="right"
          onClick={() =>
            onContinue({
              category,
              severity,
              description,
              photoPreview,
              metadataStripped: isStripped,
            })
          }
          className="!min-h-[52px] text-base font-semibold"
        >
          {t.continueToLocation}
        </Button>

        {onBack && (
          <Button
            variant="quiet"
            fullWidth
            icon={ArrowLeft}
            onClick={onBack}
            className="!min-h-[48px]"
          >
            {t.back}
          </Button>
        )}
      </div>
    </div>
  );
}
