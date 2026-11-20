import React, { useState } from 'react';
import Stepper from '../ui/Stepper';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import { getAllPresetLocations } from '../../data/routing';
import { TRANSLATIONS } from '../../data/translations';
import { MapPin, Building2, ArrowRight, ArrowLeft, ArrowRightLeft } from 'lucide-react';

export default function LocationScreen({
  initialLocationId = 'kaushambi_ghaziabad',
  lang = 'en',
  onConfirm,
  onBack,
}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const presetLocations = getAllPresetLocations();

  const [selectedPresetId, setSelectedPresetId] = useState(initialLocationId);
  const activePreset =
    presetLocations.find((l) => l.id === selectedPresetId) || presetLocations[0];

  const [address, setAddress] = useState(activePreset.name);
  const [landmark, setLandmark] = useState('Opposite Main Transit Depot & Commercial Spine');

  const handlePresetSelect = (locId) => {
    setSelectedPresetId(locId);
    const matched = presetLocations.find((l) => l.id === locId);
    if (matched) {
      setAddress(matched.name);
    }
  };

  const presetOptions = presetLocations.map((loc) => ({
    value: loc.id,
    label: `${loc.name} (${loc.cityName}${loc.isBorder ? (lang === 'hi' ? ' — सीमा क्षेत्र' : ' — Border') : ''})`,
  }));

  const steps = [
    { title: lang === 'hi' ? 'फ़ोटो और विवरण' : 'Incident Record', description: lang === 'hi' ? 'फ़ोटो साफ़ करें' : 'Photo & issue note' },
    { title: lang === 'hi' ? 'स्थान' : 'Location', description: lang === 'hi' ? 'वार्ड की पुष्टि' : 'Confirm ward boundary' },
    { title: lang === 'hi' ? 'समीक्षा' : 'Review', description: lang === 'hi' ? 'शिकायत जांचें' : 'Check drafted complaint' },
    { title: lang === 'hi' ? 'पोर्टल में जमा' : 'Portal Filing', description: lang === 'hi' ? 'पोर्टल में भरें' : 'Copy to official portal' },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Stepper Stage 2 */}
      <Stepper steps={steps} currentStep={2} />

      {/* Screen Title & Direct Copy */}
      <div className="space-y-2 border-b border-municipal-border pb-4">
        <span className="font-mono text-xs uppercase text-municipal-primary font-bold tracking-widest block">
          {t.locationStep}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-municipal-text">
          {t.locationTitle}
        </h1>
        <p className="text-base text-municipal-text-muted">
          {t.locationSubtitle}
        </p>
      </div>

      {/* Municipal Map Preview Card */}
      <div className="bg-white border border-municipal-border rounded-[4px] overflow-hidden">
        {/* Clean Vector Stylized Municipal Map */}
        <div className="relative h-48 sm:h-56 bg-[#EFECE4] border-b border-municipal-border p-4 flex flex-col justify-between overflow-hidden">
          <div
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(to right, #D8D1C5 1px, transparent 1px), linear-gradient(to bottom, #D8D1C5 1px, transparent 1px)',
              backgroundSize: '36px 36px',
            }}
          />

          <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="90" x2="100%" y2="90" stroke="#C8C1B4" strokeWidth="12" />
            <line x1="0" y1="90" x2="100%" y2="90" stroke="#FFFFFF" strokeWidth="8" />
            <line x1="160" y1="0" x2="160" y2="100%" stroke="#C8C1B4" strokeWidth="10" />
            <line x1="160" y1="0" x2="160" y2="100%" stroke="#FFFFFF" strokeWidth="6" />
            <circle cx="160" cy="90" r="70" fill="none" stroke="#2F5D50" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6" />
          </svg>

          {/* Map Top Badge */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="font-mono text-xs font-semibold px-2.5 py-1 bg-white border border-municipal-border rounded-[4px] text-municipal-text flex items-center gap-1.5 shadow-none">
              <span className="w-2 h-2 rounded-full bg-municipal-primary" />
              {activePreset.city.toUpperCase()} &bull; {lang === 'hi' ? 'वार्ड नक्शा' : 'Ward Map'}
            </span>
            <span className="font-mono text-xs px-2 py-1 bg-white/90 border border-municipal-border rounded-[4px] text-municipal-text-muted">
              GPS: 28.6692° N, 77.4538° E
            </span>
          </div>

          {/* Pin in Center */}
          <div className="relative z-10 self-center text-center">
            <div className="inline-flex flex-col items-center">
              <div className="bg-municipal-primary text-white p-2 rounded-full border-2 border-white">
                <MapPin className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div className="bg-white border border-municipal-primary px-2 py-0.5 rounded-[3px] text-[11px] font-mono font-bold text-municipal-primary mt-1">
                {lang === 'hi' ? 'घटना का स्थान' : 'INCIDENT PIN'}
              </div>
            </div>
          </div>

          {/* Map Bottom note */}
          <div className="relative z-10 text-[11px] font-mono text-municipal-text-muted text-right">
            {activePreset.cityName} &bull; {lang === 'hi' ? 'आधिकारिक क्षेत्र' : 'Territorial Area'}
          </div>
        </div>

        {/* Identified Jurisdiction Strip */}
        <div className="p-4 bg-municipal-primary-tint/60 border-b border-municipal-border flex items-start gap-3">
          <Building2 className="w-5 h-5 text-municipal-primary shrink-0 mt-0.5" />
          <div className="text-sm">
            <div className="font-serif font-bold text-base text-municipal-text flex items-center gap-2">
              <span>{activePreset.cityName}</span>
              {activePreset.isBorder && (
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded-[3px] bg-municipal-terracotta-tint border border-municipal-terracotta-border text-municipal-terracotta font-bold">
                  {lang === 'hi' ? 'सीमा क्षेत्र' : 'Border Zone'}
                </span>
              )}
            </div>
            <div className="text-municipal-text-muted text-xs font-mono mt-0.5">
              {lang === 'hi' ? 'प्रशासनिक क्षेत्र' : 'Assigned Zone'}: {activePreset.zone}
            </div>
          </div>
        </div>

        {/* Border Explanation Callout if near border */}
        {activePreset.isBorder && activePreset.borderDetails && (
          <div className="p-3.5 bg-municipal-surface border-b border-municipal-border text-xs text-municipal-text-muted flex items-start gap-2">
            <ArrowRightLeft className="w-4 h-4 text-municipal-primary shrink-0 mt-0.5" />
            <div>
              <strong className="text-municipal-text">{lang === 'hi' ? 'सीमा सूचना:' : 'Border Rule:'}</strong>{' '}
              {activePreset.borderDetails.explanation}
            </div>
          </div>
        )}

        {/* Address and Landmark Inputs */}
        <div className="p-5 sm:p-6 space-y-4">
          <Select
            label={t.presetLocationLabel}
            options={presetOptions}
            value={selectedPresetId}
            onChange={(e) => handlePresetSelect(e.target.value)}
            helperText={lang === 'hi' ? 'दिल्ली और गाज़ियाबाद के सत्यापित स्थानों में से चुनें।' : 'Quick-pick from verified territorial locations, including Delhi-Ghaziabad border zones.'}
            required
          />

          <Input
            label={t.streetAddressLabel}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            helperText={lang === 'hi' ? 'सड़क, गली या सेक्टर का नाम दर्ज करें।' : 'Include building numbers or road cuts.'}
            required
          />

          <Input
            label={t.landmarkLabel}
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
            helperText={t.landmarkHelper}
          />

          {/* Short line saying who can see the information */}
          <div className="p-3.5 bg-municipal-surface-subtle border border-municipal-border rounded-[4px] text-xs font-mono text-municipal-text-muted leading-relaxed">
            {t.privacyDisclosure}
          </div>
        </div>
      </div>

      {/* ONE MAIN ACTION: Confirm location (Min 52px height) */}
      <div className="space-y-3 pt-2">
        <Button
          variant="primary"
          fullWidth
          icon={ArrowRight}
          iconPosition="right"
          onClick={() =>
            onConfirm({
              city: activePreset.city,
              locationId: activePreset.id,
              locationName: activePreset.name,
              zone: activePreset.zone,
              address,
              landmark,
            })
          }
          className="!min-h-[52px] text-base font-semibold"
        >
          {t.confirmLocation}
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
