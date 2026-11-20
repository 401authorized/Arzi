import React from 'react';
import Button from '../ui/Button';
import NoticeBanner from '../ui/NoticeBanner';
import { TRANSLATIONS } from '../../data/translations';
import { Camera, Search, ArrowRight, Building2 } from 'lucide-react';

export default function HomeScreen({ lang = 'en', onStartReport, onGoToReports, onGoToCity }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* Official Civic Notice */}
      <NoticeBanner
        variant="info"
        title={lang === 'hi' ? 'नागरिक सेवा क्षेत्र' : 'Citizen Grievance Routing Service'}
        referenceId="REG-2026-DEL-GZB"
      >
        {lang === 'hi'
          ? 'दिल्ली नगर निगम (MCD) और गाज़ियाबाद नगर निगम (GNN) के सभी वार्डों के लिए सक्रिय।'
          : 'Covering all municipal wards across the Municipal Corporation of Delhi (MCD) and Ghaziabad Nagar Nigam (GNN).'}
      </NoticeBanner>

      {/* Main Administrative Masthead */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs uppercase px-2.5 py-1 rounded-[4px] bg-municipal-surface border border-municipal-border text-municipal-text-muted font-bold tracking-wider">
            {lang === 'hi' ? 'नागरिक शिकायत समाधान' : 'Public Civic Redressal'}
          </span>
          <span className="text-xs font-mono text-municipal-text-faint">&bull;</span>
          <span className="font-mono text-xs text-municipal-text-muted font-semibold">
            {lang === 'hi' ? 'सीधी नागरिक सुविधा' : 'Direct Citizen Access'}
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-municipal-text leading-tight">
          {t.homeTitle}
        </h1>

        <p className="text-base sm:text-lg text-municipal-text-muted leading-relaxed max-w-2xl">
          {t.homeSubtitle}
        </p>
      </div>

      {/* ONE MAIN ACTION: Report an issue */}
      <div className="bg-white border border-municipal-border rounded-[6px] p-6 sm:p-8 space-y-5">
        <div>
          <span className="font-mono text-xs uppercase text-municipal-primary font-bold tracking-widest block mb-1">
            {lang === 'hi' ? 'मुख्य कार्रवाई' : 'Primary Action'}
          </span>
          <h2 className="font-serif text-2xl font-bold text-municipal-text">
            {lang === 'hi' ? 'नई शिकायत दर्ज करें' : 'Start a new report'}
          </h2>
          <p className="text-base text-municipal-text-muted mt-1">
            {lang === 'hi'
              ? 'समस्या की फ़ोटो लें। हम ज़िम्मेदार विभाग का पता लगाकर आपके लिए शिकायत पत्र तैयार करेंगे।'
              : 'Snap a photo of the issue. We detect the jurisdiction, write the official complaint, and guide you to submit it directly to the designated authority.'}
          </p>
        </div>

        <div className="pt-2">
          <Button
            variant="primary"
            fullWidth
            icon={Camera}
            onClick={onStartReport}
            className="!min-h-[52px] text-base font-semibold"
          >
            {t.homePrimaryAction}
          </Button>
        </div>

        {/* Short line saying who can see the information */}
        <p className="text-xs font-mono text-municipal-text-muted pt-2 border-t border-municipal-border-light leading-relaxed">
          {t.privacyDisclosure}
        </p>
      </div>

      {/* Secondary Quick Action: Track existing docket */}
      <div className="border border-municipal-border bg-municipal-surface-subtle rounded-[6px] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-serif text-lg font-bold text-municipal-text">
            {t.homeLookupPrompt}
          </h3>
          <p className="text-sm text-municipal-text-muted mt-0.5">
            {t.homeLookupSub}
          </p>
        </div>
        <Button
          variant="secondary"
          onClick={onGoToReports}
          icon={Search}
          className="shrink-0 !min-h-[48px]"
        >
          {t.homeLookupButton}
        </Button>
      </div>

      {/* Municipal Coverage Summary */}
      <div className="border border-municipal-border bg-white rounded-[6px] p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-municipal-border-light pb-3">
          <h3 className="font-serif text-lg font-bold text-municipal-text">
            {lang === 'hi' ? 'शामिल प्रशासनिक क्षेत्र' : 'Supported Administrative Jurisdictions'}
          </h3>
          <button
            type="button"
            onClick={onGoToCity}
            className="min-h-[48px] px-2 text-xs font-bold text-municipal-primary hover:underline cursor-pointer flex items-center"
          >
            {lang === 'hi' ? 'वार्ड डायरेक्टरी देखें →' : 'View ward directory →'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-[4px] border border-municipal-border bg-municipal-bg">
            <div className="flex items-center gap-2 mb-1.5">
              <Building2 className="w-4 h-4 text-municipal-primary" />
              <span className="font-serif font-bold text-base text-municipal-text">Delhi NCT</span>
            </div>
            <p className="text-xs text-municipal-text-muted leading-relaxed">
              Municipal Corporation of Delhi (MCD), Public Works Department (PWD), Delhi Development Authority (DDA), and Delhi Jal Board (DJB).
            </p>
          </div>

          <div className="p-4 rounded-[4px] border border-municipal-border bg-municipal-bg">
            <div className="flex items-center gap-2 mb-1.5">
              <Building2 className="w-4 h-4 text-municipal-primary" />
              <span className="font-serif font-bold text-base text-municipal-text">Ghaziabad District</span>
            </div>
            <p className="text-xs text-municipal-text-muted leading-relaxed">
              Ghaziabad Nagar Nigam (GNN Zone I–V), Ghaziabad Development Authority (GDA), and UP Jal Nigam Engineering Cells.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
