import React from 'react';
import Button from '../ui/Button';
import RoutingDirectory from '../routing/RoutingDirectory';
import { ArrowRight } from 'lucide-react';
import { TRANSLATIONS } from '../../data/translations';

export default function CityScreen({ onStartReport, onSelectRouteForReport, lang = 'en' }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* Title & Plain Direct Copy */}
      <div className="space-y-3 border-b border-municipal-border pb-4">
        <span className="font-mono text-xs uppercase text-municipal-primary font-bold tracking-widest block">
          {t.cityBadge}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-municipal-text">
          {t.cityHeading}
        </h1>
        <p className="text-base sm:text-lg text-municipal-text-muted leading-relaxed">
          {t.citySub}
        </p>
      </div>

      {/* Main Routing Directory Component */}
      <RoutingDirectory onSelectRouteForReport={onSelectRouteForReport} lang={lang} />

      {/* Secondary Regional Summary Card: Delhi, Ghaziabad, Noida, Gurugram */}
      <div className="bg-white border border-municipal-border rounded-[4px] p-6 space-y-5">
        <div className="border-b border-municipal-border-light pb-3 flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-serif text-lg font-bold text-municipal-text">
            {t.citySummaryTitle}
          </h3>
          <span className="font-mono text-xs text-municipal-text-muted">
            {t.cityGazetteIndex}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Delhi */}
          <div className="p-4 rounded-[4px] border border-municipal-border bg-municipal-bg space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-serif font-bold text-base text-municipal-text">Delhi NCT</span>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-[3px] bg-municipal-sage-tint border border-municipal-sage-border text-municipal-sage font-bold">
                {t.cityDelhiActive}
              </span>
            </div>
            <p className="text-xs text-municipal-text-muted leading-relaxed">
              {t.cityDelhiDesc}
            </p>
          </div>

          {/* Ghaziabad */}
          <div className="p-4 rounded-[4px] border border-municipal-border bg-municipal-bg space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-serif font-bold text-base text-municipal-text">Ghaziabad</span>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-[3px] bg-municipal-sage-tint border border-municipal-sage-border text-municipal-sage font-bold">
                {t.cityGzbActive}
              </span>
            </div>
            <p className="text-xs text-municipal-text-muted leading-relaxed">
              {t.cityGzbDesc}
            </p>
          </div>

          {/* Noida - Coming Soon */}
          <div className="p-4 rounded-[4px] border border-municipal-border bg-municipal-surface-subtle space-y-1.5 opacity-90">
            <div className="flex items-center justify-between">
              <span className="font-serif font-bold text-base text-municipal-text">Noida</span>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-[3px] bg-municipal-surface border border-municipal-border text-municipal-text-faint font-bold">
                {t.comingSoon}
              </span>
            </div>
            <p className="text-xs text-municipal-text-muted leading-relaxed">
              {t.cityNoidaDesc}
            </p>
          </div>

          {/* Gurugram - Coming Soon */}
          <div className="p-4 rounded-[4px] border border-municipal-border bg-municipal-surface-subtle space-y-1.5 opacity-90">
            <div className="flex items-center justify-between">
              <span className="font-serif font-bold text-base text-municipal-text">Gurugram</span>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-[3px] bg-municipal-surface border border-municipal-border text-municipal-text-faint font-bold">
                {t.comingSoon}
              </span>
            </div>
            <p className="text-xs text-municipal-text-muted leading-relaxed">
              {t.cityGurugramDesc}
            </p>
          </div>
        </div>

        {/* Short line saying who can see the information */}
        <div className="p-3 bg-municipal-surface-subtle border border-municipal-border rounded-[4px] text-xs font-mono text-municipal-text-muted leading-relaxed">
          {t.cityPrivacyDisclosure}
        </div>
      </div>

      {/* ONE MAIN ACTION: Report an issue */}
      <div className="pt-2">
        <Button
          variant="primary"
          fullWidth
          icon={ArrowRight}
          iconPosition="right"
          onClick={onStartReport}
          className="!min-h-[52px] text-base font-semibold"
        >
          {t.reportAnIssue}
        </Button>
      </div>
    </div>
  );
}

