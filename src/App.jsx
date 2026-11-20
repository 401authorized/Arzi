import React, { useState } from 'react';
import TopNav from './components/ui/TopNav';
import HomeScreen from './components/screens/HomeScreen';
import CaptureScreen from './components/screens/CaptureScreen';
import LocationScreen from './components/screens/LocationScreen';
import ReviewScreen from './components/screens/ReviewScreen';
import HandoffScreen from './components/screens/HandoffScreen';
import LogTicketScreen from './components/screens/LogTicketScreen';
import MyReportsScreen from './components/screens/MyReportsScreen';
import HowItWorksScreen from './components/screens/HowItWorksScreen';
import CityScreen from './components/screens/CityScreen';
import { TRANSLATIONS } from './data/translations';

// We also retain the complete style-guide view for testing & specification reference
import Button from './components/ui/Button';
import Input from './components/ui/Input';
import Textarea from './components/ui/Textarea';
import Select from './components/ui/Select';
import Stepper from './components/ui/Stepper';
import TicketCard from './components/ui/TicketCard';
import StatusTimeline from './components/ui/StatusTimeline';
import NoticeBanner from './components/ui/NoticeBanner';
import {
  FileCheck2,
  Send,
  AlertCircle,
  ChevronRight,
} from 'lucide-react';

export default function App() {
  // Language state: 'en' (English) | 'hi' (हिन्दी)
  const [lang, setLang] = useState('en');
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  // Screen routing state: 'home' | 'capture' | 'location' | 'review' | 'handoff' | 'log-ticket' | 'my-reports' | 'how-it-works' | 'city' | 'style-guide'
  const [currentScreen, setCurrentScreen] = useState('home');

  // Active complaint dossier data flowing through the report screens
  const [reportData, setReportData] = useState({
    city: 'ghaziabad',
    category: 'damaged_road',
    locationId: 'kaushambi_ghaziabad',
    locationName: 'Kaushambi Bus Terminal & Wave Cinema Road',
    address: 'Kaushambi Bus Terminal & Wave Cinema Road, Ghaziabad',
    landmark: 'Opposite Main Transit Depot & Commercial Spine',
    description:
      'Hazardous road excavation trench (~4 ft deep) left open without barricades or hazard tape opposite St. Xavier Public School. Risk of injury to commuters.',
  });

  // Hard-coded ticket registration state
  const [lastLoggedTicket, setLastLoggedTicket] = useState(null);

  // Four top navigation items as strictly requested:
  // "Report an issue", "My reports", "How it works", "City"
  const navItems = [
    { id: 'report', label: t.reportAnIssue },
    { id: 'my-reports', label: t.myReports },
    { id: 'how-it-works', label: t.howItWorks },
    { id: 'city', label: t.city },
  ];

  // Derive active top nav item from current screen
  const getActiveNavId = () => {
    if (['capture', 'location', 'review', 'handoff'].includes(currentScreen)) {
      return 'report';
    }
    if (['my-reports', 'log-ticket'].includes(currentScreen)) {
      return 'my-reports';
    }
    if (currentScreen === 'how-it-works') return 'how-it-works';
    if (currentScreen === 'city') return 'city';
    return '';
  };

  const handleNavSelect = (id) => {
    switch (id) {
      case 'home':
        setCurrentScreen('home');
        break;
      case 'report':
        setCurrentScreen('capture');
        break;
      case 'my-reports':
        setCurrentScreen('my-reports');
        break;
      case 'how-it-works':
        setCurrentScreen('how-it-works');
        break;
      case 'city':
        setCurrentScreen('city');
        break;
      default:
        setCurrentScreen('home');
    }
  };

  const handleCaptureContinue = ({ category, severity, description, photoPreview, metadataStripped }) => {
    setReportData((prev) => ({
      ...prev,
      category,
      severity,
      description,
      photoPreview: photoPreview || prev.photoPreview,
      metadataStripped,
    }));
    setCurrentScreen('location');
  };

  const handleLocationConfirm = (locData) => {
    setReportData((prev) => ({
      ...prev,
      ...locData,
    }));
    setCurrentScreen('review');
  };

  const handleSelectRouteFromDirectory = ({ city, category, locationId }) => {
    setReportData((prev) => ({
      ...prev,
      city,
      category,
      locationId,
    }));
    setCurrentScreen('capture');
  };

  const handleSaveTicket = (ticketData) => {
    setLastLoggedTicket(ticketData);
    setCurrentScreen('my-reports');
  };

  return (
    <div className="min-h-screen bg-municipal-bg text-municipal-text flex flex-col font-sans selection:bg-municipal-primary-tint selection:text-municipal-primary">
      {/* 1. TOP NAVIGATION WITH 4 ITEMS AND BILINGUAL TOGGLE */}
      <TopNav
        items={navItems}
        activeItem={getActiveNavId()}
        onSelect={handleNavSelect}
        lang={lang}
        onToggleLang={setLang}
        jurisdiction={lang === 'hi' ? 'दिल्ली एवं गाज़ियाबाद' : 'Delhi NCT & Ghaziabad'}
      />

      {/* Screen Jumper / Administrative Breadcrumb (Quick switcher between all 7 screens + Style Guide) */}
      <div className="bg-[#EFECE4] border-b border-municipal-border px-4 py-2 text-xs font-mono text-municipal-text-muted overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 min-w-[720px]">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="font-semibold text-municipal-text uppercase">
              {t.screenView || 'Screen View:'}
            </span>
            {[
              { id: 'home', label: lang === 'hi' ? 'मुख्य पृष्ठ' : 'Home' },
              { id: 'capture', label: lang === 'hi' ? 'फ़ोटो' : 'Capture' },
              { id: 'location', label: lang === 'hi' ? 'स्थान' : 'Location' },
              { id: 'review', label: lang === 'hi' ? 'समीक्षा' : 'Review' },
              { id: 'handoff', label: lang === 'hi' ? 'पोर्टल कॉपी' : 'Handoff' },
              { id: 'log-ticket', label: lang === 'hi' ? 'टिकट नंबर' : 'Log Ticket' },
              { id: 'my-reports', label: lang === 'hi' ? 'मेरी शिकायतें' : 'My Reports' },
            ].map((scr, idx, arr) => {
              const isActive = currentScreen === scr.id;
              return (
                <React.Fragment key={scr.id}>
                  <button
                    type="button"
                    onClick={() => setCurrentScreen(scr.id)}
                    className={`min-h-[44px] px-2.5 py-1.5 rounded-[3px] transition-colors cursor-pointer flex items-center justify-center ${
                      isActive
                        ? 'bg-municipal-primary text-white font-bold'
                        : 'text-municipal-text-muted hover:text-municipal-text hover:bg-white'
                    }`}
                  >
                    {scr.label}
                  </button>
                  {idx < arr.length - 1 && (
                    <ChevronRight className="w-3 h-3 text-municipal-text-faint shrink-0" />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Quick link to Style Guide reference */}
          <button
            type="button"
            onClick={() => setCurrentScreen(currentScreen === 'style-guide' ? 'home' : 'style-guide')}
            className={`min-h-[44px] px-3 py-1.5 rounded-[3px] border text-xs shrink-0 cursor-pointer flex items-center justify-center ${
              currentScreen === 'style-guide'
                ? 'bg-municipal-primary text-white border-municipal-primary font-bold'
                : 'bg-white text-municipal-primary border-municipal-border hover:border-municipal-primary'
            }`}
          >
            {currentScreen === 'style-guide'
              ? (lang === 'hi' ? 'गाइड से बाहर जाएं' : 'Exit Style Guide')
              : (lang === 'hi' ? 'डिज़ाइन सिस्टम गाइड' : 'Design System Guide')}
          </button>
        </div>
      </div>

      {/* Main Content Render with Skip Link Anchor */}
      <main id="main-content" tabIndex="-1" className="flex-1 w-full focus:outline-none">
        {currentScreen === 'home' && (
          <HomeScreen
            onStartReport={() => setCurrentScreen('capture')}
            onGoToReports={() => setCurrentScreen('my-reports')}
            onGoToCity={() => setCurrentScreen('city')}
            lang={lang}
          />
        )}

        {currentScreen === 'capture' && (
          <CaptureScreen
            initialCategory={reportData.category}
            onContinue={handleCaptureContinue}
            onBack={() => setCurrentScreen('home')}
            lang={lang}
          />
        )}

        {currentScreen === 'location' && (
          <LocationScreen
            initialLocationId={reportData.locationId}
            onConfirm={handleLocationConfirm}
            onBack={() => setCurrentScreen('capture')}
            lang={lang}
          />
        )}

        {currentScreen === 'review' && (
          <ReviewScreen
            reportData={reportData}
            onContinue={() => setCurrentScreen('handoff')}
            onBack={() => setCurrentScreen('location')}
            lang={lang}
          />
        )}

        {currentScreen === 'handoff' && (
          <HandoffScreen
            reportData={reportData}
            onLogTicket={() => setCurrentScreen('log-ticket')}
            onBack={() => setCurrentScreen('review')}
            lang={lang}
          />
        )}

        {currentScreen === 'log-ticket' && (
          <LogTicketScreen
            reportData={reportData}
            onSaveTicket={handleSaveTicket}
            onBack={() => setCurrentScreen('handoff')}
            lang={lang}
          />
        )}

        {currentScreen === 'my-reports' && (
          <MyReportsScreen
            newTicketData={lastLoggedTicket}
            onStartNewReport={() => setCurrentScreen('capture')}
            onViewTimeline={() => {}}
            lang={lang}
          />
        )}

        {currentScreen === 'how-it-works' && (
          <HowItWorksScreen
            onStartReport={() => setCurrentScreen('capture')}
            lang={lang}
          />
        )}

        {currentScreen === 'city' && (
          <CityScreen
            onStartReport={() => setCurrentScreen('capture')}
            onSelectRouteForReport={handleSelectRouteFromDirectory}
            lang={lang}
          />
        )}

        {currentScreen === 'style-guide' && <StyleGuideSection />}
      </main>

      {/* Official Municipal Footer */}
      <footer className="mt-16 border-t border-municipal-border bg-[#EFECE4] py-8 text-xs text-municipal-text-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-serif font-bold text-base text-municipal-text">Arzi</span>
            <span>&bull;</span>
            <span>
              {lang === 'hi'
                ? 'सार्वजनिक नागरिक शिकायत समाधान एवं पारदर्शिता प्रणाली'
                : 'Civic Grievance Routing & Public Transparency System'}
            </span>
          </div>
          <div className="font-mono text-[11px] text-municipal-text-faint">
            {lang === 'hi'
              ? 'नगर निगम मानक • 1px बॉर्डर, कोई कृत्रिम छाया नहीं, न्यूनतम 48px टच'
              : 'Municipal Style Standard • 1px rules, no shadows, min 48px targets'}
          </div>
        </div>
      </footer>
    </div>
  );
}

// Embedded Style Guide Component for reference
function StyleGuideSection() {
  const [currentStep, setCurrentStep] = useState(2);
  const [formName, setFormName] = useState('Anand Kumar');
  const [formWard, setFormWard] = useState('ward-14');
  const [formDescription, setFormDescription] = useState(
    'Caved-in asphalt trench approximately 4 feet deep adjacent to public school gate. No warning hazard markers installed.'
  );

  const wardOptions = [
    { value: 'ward-12', label: 'Ward 12 — Indirapuram North (GDA / GNN)' },
    { value: 'ward-14', label: 'Ward 14 — Vaishali Sector 4 to 9' },
    { value: 'ward-28', label: 'Ward 28 — Anand Vihar Border & Shahdara South (MCD)' },
  ];

  const stepsData = [
    { title: 'Incident Record', description: 'Photo & geocode' },
    { title: 'Jurisdiction Check', description: 'Ward verification' },
    { title: 'Authority Routing', description: 'Official docket created' },
    { title: 'Public Resolution', description: 'Remediation verification' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      <div className="border-b border-municipal-border pb-4">
        <span className="font-mono text-xs uppercase px-2 py-0.5 rounded-[4px] bg-municipal-surface border border-municipal-border text-municipal-text-muted font-semibold tracking-wider">
          Municipal Design Standard No. 01
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-municipal-text mt-2">
          Design System &amp; Component Specification
        </h1>
        <p className="text-base text-municipal-text-muted mt-2 max-w-3xl">
          Visual standard for municipal grievances: warm off-white, deep pine green primary,
          muted terracotta for urgent/reopened states, 1px thin borders, and 48px tap targets.
        </p>
      </div>

      {/* Buttons */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-municipal-text border-b border-municipal-border pb-2">
          Button Hierarchy
        </h2>
        <div className="bg-white border border-municipal-border rounded-[4px] p-6 space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary" icon={Send}>Primary Button</Button>
            <Button variant="secondary" icon={FileCheck2}>Secondary Button</Button>
            <Button variant="quiet">Quiet Button</Button>
            <Button variant="urgent" icon={AlertCircle}>Urgent / Reopened Button</Button>
          </div>
        </div>
      </section>

      {/* Form Controls */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-municipal-text border-b border-municipal-border pb-2">
          Form Controls
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white border border-municipal-border rounded-[4px] p-6">
          <Input
            label="Citizen Full Name"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            helperText="17px body with generous line height."
            required
          />
          <Select
            label="Municipal Ward"
            options={wardOptions}
            value={formWard}
            onChange={(e) => setFormWard(e.target.value)}
            required
          />
          <div className="md:col-span-2">
            <Textarea
              label="Factual Grievance Description"
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              rows={3}
              maxLength={250}
              required
            />
          </div>
        </div>
      </section>

      {/* Stepper */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-municipal-text border-b border-municipal-border pb-2">
          Procedural Stepper
        </h2>
        <div className="bg-white border border-municipal-border rounded-[4px] p-6">
          <Stepper steps={stepsData} currentStep={currentStep} onStepClick={(s) => setCurrentStep(s)} />
        </div>
      </section>

      {/* Notice Banners */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-municipal-text border-b border-municipal-border pb-2">
          Notice Banners
        </h2>
        <div className="space-y-4">
          <NoticeBanner variant="info" title="Official Municipal Notice">
            Routine notification regarding drainage clearing operations.
          </NoticeBanner>
          <NoticeBanner variant="urgent" title="Urgent Action Required">
            Escalated safety hazard requiring immediate physical containment.
          </NoticeBanner>
          <NoticeBanner variant="success" title="Verified Resolution">
            Remediation inspection signed off by nodal sanitary inspector.
          </NoticeBanner>
        </div>
      </section>

      {/* Ticket Card & Status Timeline */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-municipal-text border-b border-municipal-border pb-2">
          Ticket Card &amp; Vertical Audit Timeline
        </h2>
        <div className="space-y-6">
          <TicketCard
            referenceNumber="ARZ-2026-GZB-09144"
            status="urgent_reopened"
            title="Hazardous open excavation trench on Sector 14 roadway"
            locality="Sector 14 Main Commercial Spine, Ghaziabad"
            authority="Ghaziabad Nagar Nigam (GNN) — Zone II"
            filedDate="17 Nov 2026"
            filedTime="08:15 IST"
            daysOpen={4}
          />
          <div className="bg-white border border-municipal-border rounded-[4px] p-6">
            <StatusTimeline />
          </div>
        </div>
      </section>
    </div>
  );
}
