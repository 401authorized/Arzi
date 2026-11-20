import React from 'react';
import Stepper from '../ui/Stepper';
import Button from '../ui/Button';
import { getRouting, CATEGORIES } from '../../data/routing';
import { TRANSLATIONS } from '../../data/translations';
import {
  ArrowRight,
  ArrowLeft,
  MapPin,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
} from 'lucide-react';

export default function ReviewScreen({
  reportData = {
    city: 'ghaziabad',
    category: 'damaged_road',
    locationId: 'kaushambi_ghaziabad',
    description: 'Hazardous road excavation trench left open on active roadway without safety barricades or reflectors.',
  },
  lang = 'en',
  onContinue,
  onBack,
}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const route = getRouting({
    city: reportData.city || 'ghaziabad',
    category: reportData.category || 'damaged_road',
    locationId: reportData.locationId || 'kaushambi_ghaziabad',
  });

  const categoryObj = CATEGORIES.find((c) => c.id === reportData.category) || CATEGORIES[0];
  const categoryLabel = lang === 'hi' ? t[`cat_${categoryObj.id}`] || categoryObj.label : categoryObj.label;

  const steps = [
    { title: lang === 'hi' ? 'फ़ोटो और विवरण' : 'Incident Record', description: lang === 'hi' ? 'फ़ोटो साफ़ करें' : 'Photo & issue note' },
    { title: lang === 'hi' ? 'स्थान' : 'Location', description: lang === 'hi' ? 'वार्ड की पुष्टि' : 'Confirm ward boundary' },
    { title: lang === 'hi' ? 'समीक्षा' : 'Review', description: lang === 'hi' ? 'शिकायत जांचें' : 'Check drafted complaint' },
    { title: lang === 'hi' ? 'पोर्टल में जमा' : 'Portal Filing', description: lang === 'hi' ? 'पोर्टल में भरें' : 'Copy to official portal' },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Stepper Stage 3 */}
      <Stepper steps={steps} currentStep={3} />

      {/* Screen Title & Direct Copy */}
      <div className="space-y-2 border-b border-municipal-border pb-4">
        <span className="font-mono text-xs uppercase text-municipal-primary font-bold tracking-widest block">
          {t.reviewStep}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-municipal-text">
          {t.reviewTitle}
        </h1>
        <p className="text-base text-municipal-text-muted">
          {t.reviewSubtitle}
        </p>
      </div>

      {/* Drafted Complaint Record Card */}
      <div className="bg-white border border-municipal-border rounded-[4px] p-5 sm:p-6 space-y-5">
        {/* Header Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-municipal-border-light text-xs font-mono text-municipal-text-muted">
          <span className="font-bold">{lang === 'hi' ? 'शिकायत पत्र सारांश' : 'DRAFT COMPLAINT DOSSIER'}</span>
          <div>
            {route.verified ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[3px] bg-municipal-sage-tint border border-municipal-sage-border text-municipal-sage-text font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                {lang === 'hi' ? `सत्यापित नियम: ${route.verified_on}` : `Verified on ${route.verified_on}`}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[3px] bg-municipal-surface border border-municipal-border-strong text-municipal-text font-medium">
                <Clock className="w-3.5 h-3.5 text-municipal-text-faint" />
                {lang === 'hi' ? 'विवरण की पुष्टि जारी' : 'Details being verified'}
              </span>
            )}
          </div>
        </div>

        {/* Formal Subject */}
        <div>
          <span className="text-xs font-mono uppercase text-municipal-text-faint block mb-1 font-semibold">
            {t.complaintSubjectLabel} ({categoryLabel})
          </span>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-municipal-text leading-snug">
            {lang === 'hi'
              ? `${categoryLabel} — ${route.locationName}`
              : `Formal Grievance: ${categoryLabel} at ${route.locationName}`}
          </h2>
        </div>

        {/* Photo and Geo Summary */}
        <div className="flex flex-col sm:flex-row gap-4 p-3.5 bg-municipal-surface rounded-[4px] border border-municipal-border">
          <img
            src={reportData.photoPreview || '/sample-damage.jpg'}
            alt="Inspection photograph"
            className="w-full sm:w-28 h-24 object-cover rounded-[3px] border border-municipal-border"
          />
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-municipal-text">
              <MapPin className="w-3.5 h-3.5 text-municipal-primary shrink-0" />
              <span>{route.locationName} ({route.cityName})</span>
            </div>
            <div className="flex items-center gap-1.5 text-municipal-text-muted">
              <Building2 className="w-3.5 h-3.5 text-municipal-primary shrink-0" />
              <span>{lang === 'hi' ? 'प्रशासनिक क्षेत्र' : 'Zone'}: {route.zone}</span>
            </div>
            <div className="flex items-center gap-2 text-municipal-text-muted font-mono pt-0.5">
              <span>GPS: 28.6692° N, 77.4538° E</span>
              <span>&bull;</span>
              <span className={`uppercase font-bold px-1.5 py-0.5 rounded-[2px] text-[10px] ${
                reportData.severity === 'urgent'
                  ? 'bg-municipal-terracotta-tint text-municipal-terracotta-text border border-municipal-terracotta-border'
                  : 'bg-white text-municipal-primary border border-municipal-border'
              }`}>
                {reportData.severity === 'urgent' ? (lang === 'hi' ? 'अति आवश्यक' : 'Urgent') : reportData.severity || 'Normal'}
              </span>
            </div>
          </div>
        </div>

        {/* Drafted Administrative Text */}
        <div>
          <span className="text-xs font-mono uppercase text-municipal-text-faint block mb-1.5 font-semibold">
            {t.formalTextLabel}
          </span>
          <div className="p-4 bg-municipal-surface-subtle border border-municipal-border rounded-[4px] text-[16px] text-municipal-text leading-relaxed">
            <p>
              {reportData.description ||
                (lang === 'hi'
                  ? 'सड़क पर गड्ढा खुला हुआ है जिससे दुर्घटना का ख़तरा है। तुरंत मरम्मत कराई जाए।'
                  : 'Hazardous condition identified requiring urgent municipal attention and rectification under public safety ordinances.')}
            </p>
          </div>
        </div>

        {/* Matched Authority & Plain Reason Box */}
        <div className="p-4 bg-municipal-primary-tint/70 border border-municipal-primary-tint-border rounded-[4px] space-y-2">
          <div className="flex items-start gap-2">
            <Building2 className="w-5 h-5 text-municipal-primary shrink-0 mt-0.5" />
            <div>
              <span className="text-[11px] font-mono uppercase text-municipal-text-faint block font-semibold">
                {t.responsibleBodyLabel}
              </span>
              <div className="font-serif font-bold text-base sm:text-lg text-municipal-text">
                {route.responsible_authority}
              </div>
            </div>
          </div>

          <div className="p-3 bg-white border border-municipal-border rounded-[3px] text-xs text-municipal-text leading-relaxed">
            <strong className="text-municipal-text font-bold">{t.reasonLabel}</strong> {route.reason}
          </div>

          <div className="text-xs font-mono text-municipal-primary flex flex-wrap items-center justify-between gap-1 pt-1 font-semibold">
            <span>{lang === 'hi' ? 'सरकारी पोर्टल' : 'Target Portal'}: {route.portal.name}</span>
            <span>{route.portal.field_hint}</span>
          </div>
        </div>

        {/* Short line saying who can see the information */}
        <div className="p-3.5 bg-municipal-surface-subtle border border-municipal-border rounded-[4px] text-xs font-mono text-municipal-text-muted leading-relaxed">
          {t.privacyDisclosure}
        </div>
      </div>

      {/* ONE MAIN ACTION: Prepare official portal filing */}
      <div className="space-y-3 pt-2">
        <Button
          variant="primary"
          fullWidth
          icon={ArrowRight}
          iconPosition="right"
          onClick={() => onContinue(route)}
          className="!min-h-[52px] text-base font-semibold"
        >
          {t.prepareFiling}
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
