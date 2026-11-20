import React, { useState } from 'react';
import {
  getCities,
  getCategories,
  getLocationsForCity,
  getRouting,
  getAllPresetLocations,
} from '../../data/routing';
import Button from '../ui/Button';
import {
  Building2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRightLeft,
} from 'lucide-react';
import { TRANSLATIONS } from '../../data/translations';

export default function RoutingDirectory({ onSelectRouteForReport, lang = 'en' }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const cities = getCities();
  const categories = getCategories();

  const [selectedCityId, setSelectedCityId] = useState('delhi');
  const [selectedCategoryId, setSelectedCategoryId] = useState('damaged_road');
  const [selectedLocationId, setSelectedLocationId] = useState('anand_vihar_delhi');

  // Handle switching city
  const handleCityChange = (cityId) => {
    setSelectedCityId(cityId);
    const locations = getLocationsForCity(cityId);
    if (locations.length > 0) {
      setSelectedLocationId(locations[0].id);
    }
  };

  const currentCity = cities.find((c) => c.id === selectedCityId) || cities[0];
  const isCityComingSoon = currentCity.status === 'coming_soon';

  // Get locations for active city
  const locations = getLocationsForCity(selectedCityId);

  // Compute active route result
  const routeResult = !isCityComingSoon
    ? getRouting({
        city: selectedCityId,
        category: selectedCategoryId,
        locationId: selectedLocationId,
      })
    : null;

  return (
    <div className="w-full bg-white border border-municipal-border rounded-[6px] p-5 sm:p-7 space-y-6">
      {/* Directory Title & Directive */}
      <div className="border-b border-municipal-border-light pb-4 space-y-1">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs uppercase px-2 py-0.5 rounded-[3px] bg-municipal-surface border border-municipal-border text-municipal-text-muted font-semibold tracking-wider">
            {lang === 'hi' ? 'आधिकारिक निर्देशिका' : 'Official Municipal Directory'}
          </span>
          <span className="text-xs font-mono text-municipal-text-faint">&bull;</span>
          <span className="text-xs font-mono text-municipal-text-muted">
            {lang === 'hi' ? 'दिल्ली एवं गाज़ियाबाद' : 'Delhi & Ghaziabad'}
          </span>
        </div>
        <h3 className="font-serif text-2xl font-bold text-municipal-text">
          {lang === 'hi' ? 'नगर निगम अधिकार क्षेत्र निर्देशिका' : 'Municipal Routing Directory'}
        </h3>
        <p className="text-sm text-municipal-text-muted">
          {lang === 'hi'
            ? 'शहर, समस्या की श्रेणी और स्थान चुनें ताकि पता चल सके कि कौन सा विभाग ज़िम्मेदार है और किस पोर्टल पर शिकायत दर्ज करनी है।'
            : 'Select a city, issue category, and specific location to determine the responsible civic body, official filing portal, and statutory rationale.'}
        </p>
      </div>

      {/* 1. CITY SELECTION TABS (Including Noida & Gurugram with 'Coming soon') */}
      <div>
        <label className="block text-xs font-mono uppercase text-municipal-text-faint font-semibold mb-2">
          {lang === 'hi' ? '1. नगर या क्षेत्र चुनें' : '1. Select Territorial Jurisdiction'}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {cities.map((city) => {
            const isActive = selectedCityId === city.id;
            const isComingSoon = city.status === 'coming_soon';

            return (
              <button
                key={city.id}
                type="button"
                onClick={() => handleCityChange(city.id)}
                className={`min-h-[48px] px-3 py-2 rounded-[4px] border text-left flex flex-col justify-between transition-colors cursor-pointer relative ${
                  isActive
                    ? 'border-municipal-primary bg-municipal-primary-tint ring-1 ring-municipal-primary text-municipal-text font-semibold'
                    : isComingSoon
                    ? 'border-municipal-border bg-municipal-surface-subtle text-municipal-text-muted hover:border-municipal-border-strong'
                    : 'border-municipal-border bg-white text-municipal-text hover:bg-municipal-surface hover:border-municipal-border-strong'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-serif text-[15px] font-bold leading-tight">
                    {city.name}
                  </span>
                  {isComingSoon && (
                    <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded-[3px] bg-municipal-surface border border-municipal-border text-municipal-text-faint font-bold">
                      {lang === 'hi' ? 'जल्द उपलब्ध' : 'Coming soon'}
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-mono text-municipal-text-faint mt-1">
                  {city.state}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* If Coming Soon city is selected */}
      {isCityComingSoon ? (
        <div className="p-6 bg-municipal-surface-subtle border border-municipal-border rounded-[4px] text-center space-y-3">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-municipal-surface border border-municipal-border text-municipal-text-muted">
            <Clock className="w-6 h-6 stroke-[1.75]" />
          </div>
          <h4 className="font-serif text-xl font-bold text-municipal-text">
            {currentCity.fullName} &bull; {lang === 'hi' ? 'जल्द उपलब्ध' : 'Coming soon'}
          </h4>
          <p className="text-sm text-municipal-text-muted max-w-lg mx-auto leading-relaxed">
            {lang === 'hi'
              ? 'इस शहर के नगर निगम वार्ड और संबंधित विभागों की जानकारी का सत्यापन किया जा रहा है।'
              : 'Ward boundaries and department directories are currently being verified.'}
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => handleCityChange('delhi')}
              className="min-h-[48px] px-3 py-2 text-xs font-mono font-semibold text-municipal-primary hover:underline cursor-pointer inline-flex items-center"
            >
              {lang === 'hi' ? 'दिल्ली निर्देशिका पर जाएं →' : 'Switch to Delhi NCT Directory →'}
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* 2. CATEGORY SELECTION (4 required categories) */}
          <div>
            <label className="block text-xs font-mono uppercase text-municipal-text-faint font-semibold mb-2">
              {lang === 'hi' ? '2. समस्या का प्रकार चुनें' : '2. Select Civic Category'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {categories.map((cat) => {
                const isCatActive = selectedCategoryId === cat.id;
                const translatedLabel = t[`cat_${cat.id}`] || cat.label;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategoryId(cat.id)}
                    className={`min-h-[48px] p-3 rounded-[4px] border text-left transition-colors cursor-pointer flex flex-col justify-between ${
                      isCatActive
                        ? 'border-municipal-primary bg-municipal-primary-tint ring-1 ring-municipal-primary text-municipal-primary font-bold'
                        : 'border-municipal-border bg-white text-municipal-text hover:bg-municipal-surface hover:border-municipal-border-strong'
                    }`}
                  >
                    <span className="text-[15px] leading-tight block font-semibold text-municipal-text">
                      {translatedLabel}
                    </span>
                    <span className="text-[11px] text-municipal-text-muted mt-1 line-clamp-1">
                      {cat.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. PRESET LOCATION SELECTION */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-mono uppercase text-municipal-text-faint font-semibold">
                {lang === 'hi'
                  ? `3. ${currentCity.name} में सड़क या स्थान चुनें`
                  : `3. Choose Verified Location in ${currentCity.name}`}
              </label>
              <span className="text-xs font-mono text-municipal-text-muted">
                {locations.length} {lang === 'hi' ? 'स्थान उपलब्ध' : 'Preset Roadways Available'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {locations.map((loc) => {
                const isLocActive = selectedLocationId === loc.id;
                return (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => setSelectedLocationId(loc.id)}
                    className={`min-h-[52px] p-3 rounded-[4px] border text-left transition-colors cursor-pointer flex flex-col justify-between ${
                      isLocActive
                        ? 'border-municipal-primary bg-white ring-2 ring-municipal-primary-tint'
                        : 'border-municipal-border bg-municipal-surface-subtle hover:bg-white hover:border-municipal-border-strong'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-serif font-bold text-[15px] text-municipal-text leading-snug">
                        {loc.name}
                      </span>
                      {loc.isBorder && (
                        <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded-[3px] bg-municipal-terracotta-tint border border-municipal-terracotta-border text-municipal-terracotta font-bold shrink-0">
                          {lang === 'hi' ? 'दिल्ली-गाज़ियाबाद सीमा' : 'Delhi-GZB Border'}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-mono text-municipal-text-muted mt-1">
                      {loc.zone}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* BORDER JURISDICTION HIGHLIGHT (If location is near border) */}
          {routeResult?.isBorder && routeResult.borderDetails && (
            <div className="p-4 bg-municipal-surface border border-municipal-border rounded-[4px] space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ArrowRightLeft className="w-4 h-4 text-municipal-primary" />
                  <span className="font-serif font-bold text-sm text-municipal-text">
                    {lang === 'hi' ? 'सीमावर्ती क्षेत्राधिकार अंतर' : 'Border Jurisdiction Note'}: {routeResult.locationName}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-municipal-text-muted">
                  {lang === 'hi' ? 'सीमा से दूरी < 300 मी.' : 'Boundary Proximity < 300m'}
                </span>
              </div>
              <p className="text-xs text-municipal-text-muted leading-relaxed">
                {routeResult.borderDetails.explanation}
              </p>
              <div className="pt-1 flex items-center gap-2">
                <span className="text-xs font-mono text-municipal-text-faint">
                  {lang === 'hi' ? 'सीमा के दूसरी तरफ:' : 'Opposite side of border:'}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const pairId = routeResult.borderDetails.pairedLocationId;
                    const targetCity = selectedCityId === 'delhi' ? 'ghaziabad' : 'delhi';
                    setSelectedCityId(targetCity);
                    setSelectedLocationId(pairId);
                  }}
                  className="min-h-[48px] px-2 text-xs font-mono font-bold text-municipal-primary underline hover:text-municipal-primary-hover cursor-pointer inline-flex items-center"
                >
                  {lang === 'hi'
                    ? `${routeResult.borderDetails.pairedLocationName} देखें →`
                    : `Switch to ${routeResult.borderDetails.pairedLocationName} →`}
                </button>
              </div>
            </div>
          )}

          {/* 4. RETURNED ROUTING RESULT DOSSIER CARD */}
          {routeResult && (
            <div className="border border-municipal-border rounded-[4px] bg-municipal-surface-subtle p-5 sm:p-6 space-y-5">
              {/* Header Status & Verification Flag */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-municipal-border">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-municipal-primary" />
                  <span className="font-mono text-xs uppercase font-bold text-municipal-text">
                    {lang === 'hi' ? 'निर्धारित सरकारी विभाग' : 'Routing Result'}
                  </span>
                  <span className="font-mono text-xs text-municipal-text-faint">&bull;</span>
                  <span className="font-mono text-xs text-municipal-text-muted">
                    {routeResult.locationName}
                  </span>
                </div>

                {/* Verification Badge or Unverified Note */}
                <div>
                  {routeResult.verified ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-municipal-sage-tint border border-municipal-sage-border text-municipal-sage text-xs font-mono font-semibold uppercase tracking-wider">
                      <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                      {lang === 'hi' ? `सत्यापित: ${routeResult.verified_on}` : `Verified on ${routeResult.verified_on}`}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-municipal-surface border border-municipal-border-strong text-municipal-text-muted text-xs font-mono font-medium tracking-wide">
                      <Clock className="w-3.5 h-3.5 stroke-[2] text-municipal-text-faint" />
                      {lang === 'hi' ? 'विवरण की पुष्टि जारी' : 'Details being verified'}
                    </span>
                  )}
                </div>
              </div>

              {/* Responsible Authority Field */}
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase text-municipal-text-faint block font-semibold">
                  {lang === 'hi' ? 'क़ानूनी रूप से ज़िम्मेदार विभाग' : 'Responsible Legal Authority'}
                </span>
                <div className="font-serif text-lg sm:text-xl font-bold text-municipal-text flex items-start gap-2">
                  <Building2 className="w-5 h-5 text-municipal-primary shrink-0 mt-0.5" />
                  <span>{routeResult.responsible_authority}</span>
                </div>
                <div className="text-xs font-mono text-municipal-text-muted pl-7">
                  {lang === 'hi' ? 'क्षेत्रीय ज़ोन:' : 'Jurisdictional Zone:'} {routeResult.zone}
                </div>
              </div>

              {/* One-Sentence Plain Reason */}
              <div className="p-3.5 bg-white border border-municipal-border rounded-[4px] space-y-1">
                <span className="text-[11px] font-mono uppercase text-municipal-text-faint block font-semibold">
                  {lang === 'hi' ? 'क़ानूनी एवं सीमा कारण' : 'Jurisdiction Reason'}
                </span>
                <p className="text-[16px] text-municipal-text leading-relaxed font-sans">
                  {routeResult.reason}
                </p>
              </div>

              {/* Official Filing Portal */}
              <div className="p-4 bg-white border border-municipal-border rounded-[4px] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-[11px] font-mono uppercase text-municipal-text-faint block font-semibold">
                    {lang === 'hi' ? 'आधिकारिक पोर्टल' : 'Designated Filing Portal'}
                  </span>
                  <div className="font-serif font-bold text-base text-municipal-text">
                    {routeResult.portal.name}
                  </div>
                  {routeResult.portal.field_hint && (
                    <p className="text-xs font-mono text-municipal-primary">
                      {lang === 'hi' ? 'पोर्टल श्रेणी:' : 'Routing path:'} {routeResult.portal.field_hint}
                    </p>
                  )}
                </div>

                <a
                  href={routeResult.portal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[48px] px-5 rounded-[4px] bg-municipal-primary text-white hover:bg-municipal-primary-hover inline-flex items-center justify-center gap-2 text-xs font-semibold shrink-0 cursor-pointer transition-colors"
                >
                  <span>{lang === 'hi' ? 'सरकारी पोर्टल खोलें' : 'Open Portal'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Unverified note explainer if applicable */}
              {!routeResult.verified && (
                <div className="text-xs font-mono text-municipal-text-muted border-t border-municipal-border-light pt-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-municipal-text-faint shrink-0" />
                  <span>
                    {lang === 'hi'
                      ? 'नोट: विवरण की पुष्टि जारी है। आधिकारिक अधिसूचना नगर निगम द्वारा पुष्ट की जा रही है।'
                      : 'Note: Details being verified • Official notification is currently being confirmed by the municipal administration.'}
                  </span>
                </div>
              )}

              {/* Optional Quick Action to use this in a report */}
              {onSelectRouteForReport && (
                <div className="pt-2">
                  <Button
                    variant="secondary"
                    fullWidth
                    onClick={() =>
                      onSelectRouteForReport({
                        city: selectedCityId,
                        category: selectedCategoryId,
                        locationId: selectedLocationId,
                      })
                    }
                    className="!min-h-[50px]"
                  >
                    {lang === 'hi'
                      ? 'इस विवरण के साथ शिकायत दर्ज करें →'
                      : 'File a report with this verified routing →'}
                  </Button>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

