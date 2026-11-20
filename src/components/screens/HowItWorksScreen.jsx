import React from 'react';
import Button from '../ui/Button';
import { Camera, MapPin, FileCheck2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { TRANSLATIONS } from '../../data/translations';

export default function HowItWorksScreen({ onStartReport, lang = 'en' }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const steps = [
    {
      num: '01',
      title: t.howStep1Title,
      body: t.howStep1Body,
      icon: Camera,
    },
    {
      num: '02',
      title: t.howStep2Title,
      body: t.howStep2Body,
      icon: MapPin,
    },
    {
      num: '03',
      title: t.howStep3Title,
      body: t.howStep3Body,
      icon: FileCheck2,
    },
    {
      num: '04',
      title: t.howStep4Title,
      body: t.howStep4Body,
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* Title */}
      <div className="space-y-3 border-b border-municipal-border pb-4">
        <span className="font-mono text-xs uppercase text-municipal-primary font-bold tracking-widest block">
          {t.howItWorksBadge}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-municipal-text">
          {t.howItWorksHeading}
        </h1>
        <p className="text-base sm:text-lg text-municipal-text-muted leading-relaxed">
          {t.howItWorksSub}
        </p>
      </div>

      {/* 4 Steps */}
      <div className="space-y-4">
        {steps.map((st, idx) => {
          return (
            <div
              key={idx}
              className="bg-white border border-municipal-border rounded-[4px] p-5 sm:p-6 flex flex-col sm:flex-row gap-4 items-start"
            >
              <div className="w-10 h-10 rounded-[4px] bg-municipal-primary text-white flex items-center justify-center font-mono font-bold text-sm shrink-0">
                {st.num}
              </div>
              <div className="space-y-1.5 flex-1">
                <h3 className="font-serif text-lg font-bold text-municipal-text">
                  {st.title}
                </h3>
                <p className="text-[16px] text-municipal-text-muted leading-relaxed">
                  {st.body}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Short line saying who can see the information */}
      <div className="p-4 bg-municipal-surface-subtle border border-municipal-border rounded-[4px] text-xs font-mono text-municipal-text-muted leading-relaxed">
        {t.howPrivacyDisclosure}
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

