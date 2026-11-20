import React, { useState } from 'react';
import { Menu, X, Landmark, Globe } from 'lucide-react';

export default function TopNav({
  items = [
    { id: 'report', label: 'Report an issue' },
    { id: 'my-reports', label: 'My reports' },
    { id: 'how-it-works', label: 'How it works' },
    { id: 'city', label: 'City' },
  ],
  activeItem = 'report',
  onSelect,
  lang = 'en',
  onToggleLang,
  jurisdiction = 'Delhi NCT & Ghaziabad',
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-[#FAF8F5] border-b border-municipal-border sticky top-0 z-40">
      {/* Accessible Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-municipal-primary focus:text-white focus:rounded-[4px] focus:font-semibold focus:border focus:border-white"
      >
        {lang === 'hi' ? 'मुख्य सामग्री पर जाएं' : 'Skip to main content'}
      </a>

      {/* Top utility sub-header with Language Toggle */}
      <div className="bg-[#EFECE4] px-4 py-1 border-b border-municipal-border text-xs text-municipal-text-muted flex justify-between items-center tracking-normal min-h-[48px]">
        <span className="flex items-center gap-1.5 truncate pr-2">
          <span className="inline-block w-2 h-2 rounded-full bg-municipal-primary shrink-0" aria-hidden="true"></span>
          <span className="truncate">
            {lang === 'hi'
              ? 'नागरिक सेवा पोर्टल • दिल्ली एवं गाज़ियाबाद'
              : `Official Public Services Portal • ${jurisdiction}`}
          </span>
        </span>

        {/* English / Hindi Toggle (Min 48px touch target) */}
        <div className="flex items-center gap-1 shrink-0" role="group" aria-label="Language Selector">
          <span className="text-[11px] font-mono text-municipal-text-faint hidden sm:inline mr-1">
            <Globe className="w-3.5 h-3.5 inline-block mr-1 stroke-[2]" />
            Language / भाषा:
          </span>
          <button
            type="button"
            onClick={() => onToggleLang && onToggleLang('en')}
            className={`min-h-[48px] px-3 py-1.5 rounded-[3px] text-xs font-mono font-bold transition-colors cursor-pointer border flex items-center justify-center ${
              lang === 'en'
                ? 'bg-municipal-primary text-white border-municipal-primary'
                : 'bg-white text-municipal-text border-municipal-border hover:bg-municipal-surface'
            }`}
            aria-pressed={lang === 'en'}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => onToggleLang && onToggleLang('hi')}
            className={`min-h-[48px] px-3 py-1.5 rounded-[3px] text-xs font-mono font-bold transition-colors cursor-pointer border flex items-center justify-center ${
              lang === 'hi'
                ? 'bg-municipal-primary text-white border-municipal-primary'
                : 'bg-white text-municipal-text border-municipal-border hover:bg-municipal-surface'
            }`}
            aria-pressed={lang === 'hi'}
          >
            हिन्दी
          </button>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 min-h-[56px]">
          {/* Logo & Municipal Emblem */}
          <button
            type="button"
            onClick={() => onSelect && onSelect('home')}
            className="flex items-center gap-3 text-left cursor-pointer group min-h-[48px] py-1"
            aria-label="Arzi Civic Registry Home"
          >
            <div className="w-9 h-9 rounded-[4px] border border-municipal-primary bg-municipal-primary flex items-center justify-center text-white shrink-0 group-hover:bg-municipal-primary-hover transition-colors">
              <Landmark className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-2xl font-bold text-municipal-text leading-none tracking-tight">
                  Arzi
                </span>
                <span className="text-[12px] uppercase tracking-wider font-semibold text-municipal-text-faint font-mono">
                  {lang === 'hi' ? 'नागरिक रजिस्ट्री' : 'Civic Registry'}
                </span>
              </div>
              <p className="text-[12px] text-municipal-text-muted leading-tight mt-0.5 hidden xs:block">
                {lang === 'hi' ? 'नागरिक शिकायत समाधान एवं जवाबदेही' : 'Public Grievance Routing & Accountability'}
              </p>
            </div>
          </button>

          {/* Desktop Nav Items (Exactly four items) */}
          <nav className="hidden md:flex items-center gap-1.5" aria-label="Main Navigation">
            {items.map((item) => {
              const isActive = activeItem === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelect && onSelect(item.id)}
                  className={`min-h-[48px] px-3.5 flex items-center text-[15px] font-medium rounded-[4px] transition-colors border cursor-pointer ${
                    isActive
                      ? 'border-municipal-primary text-municipal-primary bg-municipal-primary-tint font-bold'
                      : 'border-transparent text-municipal-text hover:text-municipal-primary hover:border-municipal-border hover:bg-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile menu button (min 48x48 tap target) */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-h-[48px] min-w-[48px] p-2.5 rounded-[4px] border border-municipal-border bg-white text-municipal-text hover:bg-municipal-surface flex items-center justify-center cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 stroke-[1.75]" />
              ) : (
                <Menu className="w-6 h-6 stroke-[1.75]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <nav
          className="md:hidden border-t border-municipal-border bg-municipal-bg px-4 pt-3 pb-5 space-y-2"
          aria-label="Mobile Navigation"
        >
          {/* Mobile Language Switcher */}
          <div className="flex items-center justify-between pb-2 border-b border-municipal-border-light text-xs font-mono">
            <span className="text-municipal-text-muted">भाषा / Language:</span>
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => onToggleLang && onToggleLang('en')}
                className={`min-h-[48px] px-4 py-2 rounded-[3px] border font-bold text-xs flex items-center justify-center cursor-pointer ${
                  lang === 'en'
                    ? 'bg-municipal-primary text-white border-municipal-primary'
                    : 'bg-white text-municipal-text border-municipal-border'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => onToggleLang && onToggleLang('hi')}
                className={`min-h-[48px] px-4 py-2 rounded-[3px] border font-bold text-xs flex items-center justify-center cursor-pointer ${
                  lang === 'hi'
                    ? 'bg-municipal-primary text-white border-municipal-primary'
                    : 'bg-white text-municipal-text border-municipal-border'
                }`}
              >
                हिन्दी
              </button>
            </div>
          </div>

          {items.map((item) => {
            const isActive = activeItem === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onSelect && onSelect(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full min-h-[48px] px-4 flex items-center text-[16px] font-medium rounded-[4px] border cursor-pointer ${
                  isActive
                    ? 'border-municipal-primary text-municipal-primary bg-white font-bold'
                    : 'border-municipal-border bg-white text-municipal-text hover:bg-municipal-surface'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <div className="pt-2 border-t border-municipal-border text-xs text-municipal-text-muted px-1 font-mono">
            {lang === 'hi'
              ? 'नागरिक सूचना: सभी प्रस्तुतियां आधिकारिक लोक सेवा अधिनियम के तहत सुरक्षित हैं।'
              : 'System Notice: All submissions are timestamped & filed under public records.'}
          </div>
        </nav>
      )}
    </header>
  );
}
