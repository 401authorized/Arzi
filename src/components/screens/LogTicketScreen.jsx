import React, { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import NoticeBanner from '../ui/NoticeBanner';
import { TRANSLATIONS } from '../../data/translations';
import { ArrowRight, ArrowLeft, Clipboard, Check } from 'lucide-react';

export default function LogTicketScreen({
  initialTicketId = '',
  reportData,
  lang = 'en',
  onSaveTicket,
  onBack,
}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const [ticketRef, setTicketRef] = useState(initialTicketId || 'GNN-2026-84920');
  const [phone, setPhone] = useState('98101 23456');
  const [filingDate, setFilingDate] = useState('20 Nov 2026');
  const [justPasted, setJustPasted] = useState(false);

  const handlePasteFromClipboard = async () => {
    try {
      if (navigator.clipboard?.readText) {
        const clipText = await navigator.clipboard.readText();
        if (clipText && clipText.trim().length > 0) {
          setTicketRef(clipText.trim());
          setJustPasted(true);
          setTimeout(() => setJustPasted(false), 2000);
          return;
        }
      }
    } catch (err) {
      console.warn('Clipboard read error or denied, using simulated portal ticket ID:', err);
    }

    setTicketRef('GNN-2026-84920');
    setJustPasted(true);
    setTimeout(() => setJustPasted(false), 2000);
  };

  const handleSubmit = () => {
    onSaveTicket({
      ticketRef: ticketRef.trim() || 'GNN-2026-84920',
      phone,
      filingDate,
      category: reportData?.category || 'damaged_road',
      locality: reportData?.address || 'Sector 14 Main Commercial Spine, Ghaziabad',
      authority:
        reportData?.city === 'delhi'
          ? 'Municipal Corporation of Delhi (MCD)'
          : 'Ghaziabad Nagar Nigam (GNN) — Zone II',
      title:
        reportData?.description?.slice(0, 80) ||
        (lang === 'hi'
          ? 'मुख्य सड़क पर बिना बैरिकेड के खुला खतरनाक गड्ढा'
          : 'Hazardous excavated road repair trench without safety barricade on arterial road'),
    });
  };

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Screen Title & Plain Direct Copy */}
      <div className="space-y-2 border-b border-municipal-border pb-4">
        <span className="font-mono text-xs uppercase text-municipal-primary font-bold tracking-widest block">
          {lang === 'hi' ? 'रसीद दर्ज करें' : 'Docket Registration'}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-municipal-text">
          {t.logTicketTitle}
        </h1>
        <p className="text-base text-municipal-text-muted">
          {t.logTicketSubtitle}
        </p>
      </div>

      {/* Main Ticket Input Card with Paste Button */}
      <div className="bg-white border border-municipal-border rounded-[4px] p-5 sm:p-6 space-y-5">
        <div>
          <label
            htmlFor="ticket-ref-input"
            className="block text-[15px] font-semibold text-municipal-text mb-1.5"
          >
            {t.ticketIdLabel}
            <span className="text-municipal-terracotta ml-1" title="Required field">*</span>
          </label>

          {/* Input with dedicated 48px Paste button */}
          <div className="flex gap-2">
            <input
              id="ticket-ref-input"
              type="text"
              value={ticketRef}
              onChange={(e) => setTicketRef(e.target.value)}
              placeholder="e.g. GNN-2026-84920 or MCD-41928"
              className="flex-1 min-h-[48px] px-3.5 py-2.5 text-[17px] font-mono font-bold text-municipal-text bg-white border border-municipal-border rounded-[4px] focus:outline-none focus:border-municipal-primary focus:ring-1 focus:ring-municipal-primary"
              required
            />

            {/* Prominent One-Tap Paste Button (Min 48px height) */}
            <button
              type="button"
              onClick={handlePasteFromClipboard}
              className={`min-h-[48px] px-4 rounded-[4px] border font-mono text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 ${
                justPasted
                  ? 'bg-municipal-sage text-white border-municipal-sage'
                  : 'bg-municipal-surface text-municipal-primary border-municipal-border hover:bg-white hover:border-municipal-primary'
              }`}
              title="Paste ticket number from clipboard"
            >
              {justPasted ? (
                <>
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>{t.pasted}</span>
                </>
              ) : (
                <>
                  <Clipboard className="w-4 h-4 stroke-[2]" />
                  <span>{t.paste}</span>
                </>
              )}
            </button>
          </div>

          <p className="mt-1.5 text-xs text-municipal-text-muted">
            {t.ticketIdHelper}
          </p>
        </div>

        <Input
          label={t.dateSubmittedLabel}
          value={filingDate}
          onChange={(e) => setFilingDate(e.target.value)}
          helperText={lang === 'hi' ? 'रसीद पर लिखी गई तारीख दर्ज करें।' : 'Timestamp recorded on the portal acknowledgement receipt.'}
          required
        />

        <Input
          label={t.phoneLabel}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          helperText={lang === 'hi' ? 'अधिकारियों द्वारा स्थिति बदलने पर आपको एसएमएस प्राप्त होगा।' : 'We send automated notifications when an inspection team updates the docket.'}
          required
        />

        {/* Short line saying who can see the information */}
        <div className="p-3.5 bg-municipal-surface-subtle border border-municipal-border rounded-[4px] text-xs font-mono text-municipal-text-muted leading-relaxed">
          {t.trackingPrivacyDisclosure}
        </div>
      </div>

      {/* Routine Followup Notice */}
      <NoticeBanner
        variant="info"
        title={lang === 'hi' ? 'स्वचालित जांच एवं सूचना' : 'Automated Municipal Follow-up'}
      >
        {lang === 'hi'
          ? 'अर्ज़ी हर 48 घंटे में सरकारी पोर्टल की जांच करती है। यदि अधिकारी बिना काम किए शिकायत बंद करते हैं, तो हम इसे दोबारा उच्च अधिकारी को भेजने में मदद करते हैं।'
          : 'Arzi monitors the municipal portal every 48 hours. If the ticket is closed without on-site photographic proof, we help you reopen it under the Public Charter.'}
      </NoticeBanner>

      {/* ONE MAIN ACTION: Start tracking this ticket */}
      <div className="space-y-3 pt-2">
        <Button
          variant="primary"
          fullWidth
          icon={ArrowRight}
          iconPosition="right"
          onClick={handleSubmit}
          className="!min-h-[52px] text-base font-semibold"
        >
          {t.startTrackingTicket}
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
