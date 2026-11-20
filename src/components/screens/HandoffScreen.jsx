import React, { useState } from 'react';
import Stepper from '../ui/Stepper';
import Button from '../ui/Button';
import { getRouting } from '../../data/routing';
import { TRANSLATIONS } from '../../data/translations';
import {
  Copy,
  Check,
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  Building2,
  CheckCircle2,
  Clock,
  ClipboardList,
} from 'lucide-react';

export default function HandoffScreen({
  reportData = {
    city: 'ghaziabad',
    category: 'damaged_road',
    locationId: 'kaushambi_ghaziabad',
    description:
      'Hazardous excavated road trench approximately 4 feet deep left open on arterial roadway without safety barricades or night reflectors opposite St. Xavier Public School.',
  },
  lang = 'en',
  onLogTicket,
  onBack,
}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [allCopied, setAllCopied] = useState(false);

  const route = getRouting({
    city: reportData.city || 'ghaziabad',
    category: reportData.category || 'damaged_road',
    locationId: reportData.locationId || 'kaushambi_ghaziabad',
  });

  const fields = [
    {
      id: 'category',
      label: lang === 'hi' ? '1. विभाग / समस्या की श्रेणी' : '1. Department / Issue Category',
      value: route.responsible_authority,
      portalTarget: route.portal.field_hint || (lang === 'hi' ? 'श्रेणी ड्रॉपडाउन' : 'Category Dropdown'),
    },
    {
      id: 'ward',
      label: lang === 'hi' ? '2. नगर निगम वार्ड / क्षेत्र' : '2. Territorial Ward / Administrative Zone',
      value: `${route.locationName} (Zone: ${route.zone}, ${route.cityName})`,
      portalTarget: lang === 'hi' ? 'वार्ड या ज़ोन विकल्प' : 'Ward / Zone Selector',
    },
    {
      id: 'location',
      label: lang === 'hi' ? '3. सटीक स्थान एवं लैंडमार्क' : '3. Incident Location & Landmark',
      value: `${reportData.address || route.locationName}${
        reportData.landmark ? ` (${lang === 'hi' ? 'लैंडमार्क' : 'Landmark'}: ${reportData.landmark})` : ''
      } [GPS: 28.6692, 77.4538]`,
      portalTarget: lang === 'hi' ? 'सड़क का पता एवं लैंडमार्क बॉक्स' : 'Street Address & Landmark Field',
    },
    {
      id: 'description',
      label: lang === 'hi' ? '4. शिकायत का विवरण' : '4. Formal Complaint Narrative',
      value:
        reportData.description ||
        (lang === 'hi'
          ? 'मुख्य सड़क पर गड्ढा बिना किसी बैरिकेड के खुला हुआ है जिससे दुर्घटना का ख़तरा है। तुरंत मरम्मत कराई जाए।'
          : 'Hazardous road excavation trench left open on active roadway without safety barricades or reflectors. Risk of injury to commuters. Immediate physical backfilling requested.'),
      portalTarget: lang === 'hi' ? 'शिकायत विवरण बॉक्स' : 'Grievance Description Textarea',
    },
    {
      id: 'citizen',
      label: lang === 'hi' ? '5. नागरिक संपर्क विवरण' : '5. Citizen Contact Details',
      value: 'Ramesh Verma • 98101 23456 • OTP Verified',
      portalTarget: lang === 'hi' ? 'नाम एवं फ़ोन नंबर बॉक्स' : 'Complainant Profile / Contact Inputs',
    },
  ];

  const handleCopy = (text, index) => {
    navigator.clipboard?.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const handleCopyAll = () => {
    const fullText = fields.map((f) => `[${f.portalTarget}]\n${f.value}`).join('\n\n');
    navigator.clipboard?.writeText(fullText);
    setAllCopied(true);
    setTimeout(() => setAllCopied(false), 3000);
  };

  const steps = [
    { title: lang === 'hi' ? 'फ़ोटो और विवरण' : 'Incident Record', description: lang === 'hi' ? 'फ़ोटो साफ़ करें' : 'Photo & issue note' },
    { title: lang === 'hi' ? 'स्थान' : 'Location', description: lang === 'hi' ? 'वार्ड की पुष्टि' : 'Confirm ward boundary' },
    { title: lang === 'hi' ? 'समीक्षा' : 'Review', description: lang === 'hi' ? 'शिकायत जांचें' : 'Check drafted complaint' },
    { title: lang === 'hi' ? 'पोर्टल में जमा' : 'Portal Filing', description: lang === 'hi' ? 'पोर्टल में भरें' : 'Copy to official portal' },
  ];

  const targetUrl = route.portal.url && route.portal.url !== '#' ? route.portal.url : 'https://gnn311.up.gov.in';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Stepper Stage 4 */}
      <Stepper steps={steps} currentStep={4} />

      {/* Screen Title & Direct Copy */}
      <div className="space-y-2 border-b border-municipal-border pb-4">
        <span className="font-mono text-xs uppercase text-municipal-primary font-bold tracking-widest block">
          {t.handoffStep}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-municipal-text">
          {t.handoffTitle}
        </h1>
        <p className="text-base text-municipal-text-muted max-w-3xl">
          {t.handoffSubtitle}
        </p>
      </div>

      {/* Main Copy-Assist Workspace: Side-by-Side on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: The Copy-Assist Fields Card (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-municipal-border rounded-[4px] p-5 sm:p-6 space-y-5">
            {/* Header with Copy All Utility */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-municipal-border-light">
              <div>
                <span className="text-xs font-mono uppercase text-municipal-text-faint font-semibold block">
                  {lang === 'hi' ? 'कॉपी-असिस्ट विवरण' : 'Copy-Assist Dossier'}
                </span>
                <span className="font-serif font-bold text-lg text-municipal-text">
                  {t.fieldsDossierTitle}
                </span>
              </div>

              <button
                type="button"
                onClick={handleCopyAll}
                className={`min-h-[48px] px-4 py-2 text-xs font-mono font-bold rounded-[4px] border flex items-center gap-1.5 transition-colors cursor-pointer ${
                  allCopied
                    ? 'bg-municipal-sage text-white border-municipal-sage'
                    : 'bg-municipal-surface text-municipal-primary border-municipal-border hover:bg-white hover:border-municipal-primary'
                }`}
              >
                {allCopied ? (
                  <>
                    <Check className="w-4 h-4 stroke-[2.5]" />
                    <span>{lang === 'hi' ? 'सभी कॉपी हो गए' : 'ALL FIELDS COPIED'}</span>
                  </>
                ) : (
                  <>
                    <ClipboardList className="w-4 h-4 stroke-[2]" />
                    <span>{t.copyAll}</span>
                  </>
                )}
              </button>
            </div>

            {/* Field Stack with One-Tap Copy Buttons */}
            <div className="space-y-3.5">
              {fields.map((field, idx) => {
                const isCopied = copiedIndex === idx;

                return (
                  <div
                    key={field.id}
                    className="p-3.5 rounded-[4px] border border-municipal-border bg-municipal-surface-subtle transition-colors hover:border-municipal-border-strong space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <span className="font-serif font-bold text-[15px] text-municipal-text block leading-tight">
                          {field.label}
                        </span>
                        <span className="text-[11px] font-mono text-municipal-text-faint block mt-0.5">
                          {lang === 'hi' ? 'पोर्टल में बॉक्स:' : 'Target box:'} <strong className="text-municipal-text">{field.portalTarget}</strong>
                        </span>
                      </div>

                      {/* ONE-TAP COPY BUTTON (Min 48px height) */}
                      <button
                        type="button"
                        onClick={() => handleCopy(field.value, idx)}
                        className={`min-h-[48px] px-4 rounded-[4px] border text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 ${
                          isCopied
                            ? 'bg-municipal-sage text-white border-municipal-sage'
                            : 'bg-white text-municipal-primary border-municipal-border hover:border-municipal-primary hover:bg-municipal-primary-tint'
                        }`}
                        title="Click to copy field"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-4 h-4 stroke-[2.5]" />
                            <span>{t.copied}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 stroke-[2]" />
                            <span>{t.copy}</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Copyable Content Pill (Tap to copy) */}
                    <div
                      onClick={() => handleCopy(field.value, idx)}
                      className="p-3 bg-white border border-municipal-border rounded-[3px] font-mono text-xs text-municipal-text leading-relaxed cursor-pointer select-all hover:border-municipal-primary/70 transition-colors"
                      title="Tap text to copy"
                    >
                      {field.value}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Short line saying who can see the information */}
            <div className="p-3.5 bg-municipal-surface-subtle border border-municipal-border rounded-[4px] text-xs font-mono text-municipal-text-muted leading-relaxed">
              {t.portalPrivacyDisclosure}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: The Authority Portal Link Card (Beside the fields card) (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-municipal-border rounded-[4px] p-5 sm:p-6 space-y-5 lg:sticky lg:top-24">
            {/* Authority Header Badge */}
            <div className="flex items-start gap-3 pb-4 border-b border-municipal-border-light">
              <div className="w-10 h-10 rounded-[4px] bg-municipal-primary text-white flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5 stroke-[2]" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase text-municipal-text-faint font-semibold block">
                  {t.portalTargetLabel}
                </span>
                <h3 className="font-serif font-bold text-lg text-municipal-text leading-tight mt-0.5">
                  {route.portal.name}
                </h3>
                <span className="text-xs font-mono text-municipal-text-muted block mt-0.5">
                  {route.responsible_authority}
                </span>
              </div>
            </div>

            {/* Portal Direct Launch Card */}
            <div className="p-4 bg-municipal-primary-tint/70 border border-municipal-primary-tint-border rounded-[4px] space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-municipal-primary">{lang === 'hi' ? 'आधिकारिक लिंक' : 'OFFICIAL LINK'}</span>
                <span className="text-municipal-text-muted truncate max-w-[180px]">{targetUrl}</span>
              </div>

              {/* ONE MAIN ACTION: Open Authority Portal Link */}
              <a
                href={targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[50px] px-4 rounded-[4px] bg-municipal-primary text-white hover:bg-municipal-primary-hover font-bold text-[15px] flex items-center justify-center gap-2 transition-colors cursor-pointer border border-municipal-primary"
              >
                <span>{t.openPortal} ({route.portal.name.split('/')[0].trim()})</span>
                <ExternalLink className="w-4 h-4 stroke-[2]" />
              </a>

              <p className="text-[12px] text-municipal-text-muted leading-normal">
                {lang === 'hi'
                  ? 'यह एक नई ब्राउज़र विंडो में खुलेगा ताकि आप आसानी से दोनों तरफ काम कर सकें।'
                  : 'Opens in a new browser tab beside this window so you can copy fields across seamlessly.'}
              </p>
            </div>

            {/* 3-Step Procedure */}
            <div className="space-y-2.5 pt-1">
              <span className="text-xs font-mono uppercase text-municipal-text-faint font-bold block">
                {t.procedureHeading}
              </span>

              <ol className="text-xs text-municipal-text space-y-2 font-mono list-decimal pl-4">
                <li>{t.procedure1}</li>
                <li>{t.procedure2}</li>
                <li>{t.procedure3}</li>
              </ol>
            </div>

            {/* Subsequent Action: Proceed to Log Ticket screen */}
            <div className="pt-3 border-t border-municipal-border-light space-y-2">
              <span className="text-xs font-mono uppercase text-municipal-text-faint font-bold block">
                {t.finishedPrompt}
              </span>
              <Button
                variant="secondary"
                fullWidth
                icon={ArrowRight}
                iconPosition="right"
                onClick={onLogTicket}
                className="!min-h-[48px] font-bold"
              >
                {t.enterTicketId}
              </Button>
            </div>

            {onBack && (
              <div className="pt-1">
                <Button
                  variant="quiet"
                  fullWidth
                  icon={ArrowLeft}
                  onClick={onBack}
                  className="!min-h-[48px] text-xs"
                >
                  {t.back}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
