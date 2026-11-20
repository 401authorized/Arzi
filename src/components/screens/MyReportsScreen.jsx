import React, { useState } from 'react';
import Button from '../ui/Button';
import TicketCard from '../ui/TicketCard';
import StatusTimeline from '../ui/StatusTimeline';
import { TRANSLATIONS } from '../../data/translations';
import {
  Camera,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ShieldAlert,
  Send,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  FileText,
} from 'lucide-react';

export default function MyReportsScreen({ newTicketData, lang = 'en', onStartNewReport }) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedTimelines, setExpandedTimelines] = useState({ 'ticket-1': true });

  const initialTickets = [
    {
      id: 'ticket-1',
      referenceNumber: newTicketData?.ticketRef || 'ARZ-2026-GZB-09144',
      status: 'investigation',
      title:
        newTicketData?.title ||
        (lang === 'hi'
          ? 'मुख्य सड़क पर बिना बैरिकेड के खुला खतरनाक गड्ढा'
          : 'Hazardous open excavation trench without safety barricade on arterial road'),
      locality: newTicketData?.locality || 'Sector 14 Main Commercial Spine, Ghaziabad',
      authority:
        newTicketData?.authority ||
        (lang === 'hi' ? 'गाज़ियाबाद नगर निगम (GNN) — जोन II' : 'Ghaziabad Nagar Nigam (GNN) — Engineering Division (Zone II)'),
      filedDate: newTicketData?.filingDate || '17 Nov 2026',
      filedTime: '08:15 IST',
      daysOpen: 3,
      reminder: {
        active: true,
        hoursElapsed: 72,
        escalationStepSuggested: false,
        escalationNoticeServed: false,
        resolvedConfirmed: false,
      },
      timelineEvents: [
        {
          id: 'step-1',
          date: '17 Nov 2026',
          time: '08:15 IST',
          title: lang === 'hi' ? 'सरकारी पोर्टल पर शिकायत दर्ज' : 'Formal Grievance Registered on GNN Portal',
          department: lang === 'hi' ? 'केंद्रीय नागरिक नियंत्रण कक्ष' : 'Central Citizen Intimation Cell',
          officer: 'Registry Desk Officer (ID #419)',
          notes:
            lang === 'hi'
              ? 'शिकायत जीपीएस लोकेशन (28.6692° N, 77.4538° E) के साथ दर्ज की गई। कार्य आदेश 2026-ENG-84 जारी।'
              : 'Grievance registered with GPS geocode (28.6692° N, 77.4538° E). Nodal work order 2026-ENG-84 generated.',
          status: 'completed',
        },
        {
          id: 'step-2',
          date: '18 Nov 2026',
          time: '11:30 IST',
          title: lang === 'hi' ? 'क्षेत्रीय जूनियर इंजीनियर को कार्य सौंपा गया' : 'Zonal Engineering Dispatched to Site',
          department: 'Ghaziabad Nagar Nigam (Zone II)',
          officer: 'Assistant Municipal Engineer V. Sharma',
          notes:
            lang === 'hi'
              ? 'सड़क खंड नगर निगम के अधीन पाया गया। ठेकेदार को 72 घंटे में गड्ढा भरने का नोटिस जारी।'
              : 'Roadway segment confirmed under Nagar Nigam jurisdiction. Notice issued to contractor for mandatory 72-hour backfilling.',
          status: 'completed',
        },
        {
          id: 'step-3',
          date: '19 Nov 2026',
          time: '16:00 IST',
          title: lang === 'hi' ? 'ठेकेदार मरम्मत कार्य प्रगति पर' : 'Contractor Rectification Window in Progress',
          department: 'Emergency Roadworks Taskforce',
          officer: 'Field Junior Engineer R. Singh',
          notes:
            lang === 'hi'
              ? 'खुदाई स्थल पर समतलीकरण और बैरिकेड लगाने का काम प्रतीक्षित।'
              : 'Excavation trench pending gravel leveling and retro-reflective barrier installation.',
          status: 'active',
        },
      ],
    },
    {
      id: 'ticket-2',
      referenceNumber: 'ARZ-2026-DEL-04192',
      status: 'investigation',
      title:
        lang === 'hi'
          ? 'नाली जाम होने से सड़क पर गंदे पानी का भराव'
          : 'Clogged stormwater culvert causing wastewater accumulation across thoroughfare',
      locality: 'Dilshad Garden Pocket F, Shahdara North District',
      authority: lang === 'hi' ? 'दिल्ली नगर निगम (MCD) — स्वच्छता विभाग' : 'Municipal Corporation of Delhi (MCD) — Environment & Sanitation',
      filedDate: '18 Nov 2026',
      filedTime: '11:30 IST',
      daysOpen: 2,
      reminder: {
        active: false,
        hoursElapsed: 48,
        escalationStepSuggested: false,
        escalationNoticeServed: false,
        resolvedConfirmed: false,
      },
      timelineEvents: [
        {
          id: 't2-step-1',
          date: '18 Nov 2026',
          time: '11:30 IST',
          title: lang === 'hi' ? 'एमटीएस 311 द्वारा शिकायत दर्ज' : 'Complaint Logged via MCD 311',
          department: 'Shahdara North Zonal Control Room',
          officer: 'Sanitation Desk Supervisor',
          notes: 'Drainage culvert blockage mapped to MCD Ward 225.',
          status: 'completed',
        },
        {
          id: 't2-step-2',
          date: '19 Nov 2026',
          time: '09:00 IST',
          title: lang === 'hi' ? 'सक्शन मशीन रवाना' : 'Desilting Suction Unit Scheduled',
          department: 'MCD Heavy Drainage Wing',
          officer: 'Sanitary Inspector K. L. Meena',
          notes: 'Super-sucker vacuum machine scheduled for nighttime clearance.',
          status: 'active',
        },
      ],
    },
    {
      id: 'ticket-3',
      referenceNumber: 'ARZ-2026-DEL-03810',
      status: 'resolved',
      title:
        lang === 'hi'
          ? 'ट्रांसफर डिपो पर कूड़े के ढेर की सफाई'
          : 'Uncollected municipal solid waste accumulation at neighborhood transfer depot',
      locality: 'Laxmi Nagar Vikas Marg Ward 28, East Delhi',
      authority: lang === 'hi' ? 'पूर्वी दिल्ली नगर निगम — कचरा प्रबंधन' : 'East Delhi Municipal Authority — Waste Logistics Fleet',
      filedDate: '12 Nov 2026',
      filedTime: '14:50 IST',
      daysOpen: 1,
      reminder: {
        active: false,
        hoursElapsed: 96,
        escalationStepSuggested: false,
        escalationNoticeServed: false,
        resolvedConfirmed: true,
      },
      timelineEvents: [
        {
          id: 't3-step-1',
          date: '12 Nov 2026',
          time: '14:50 IST',
          title: lang === 'hi' ? 'कचरा सूचना दर्ज' : 'Solid Waste Alert Registered',
          department: 'EDMC Grievance Cell',
          officer: 'Control Room In-charge',
          notes: 'Waste compactor overflow reported with photographic documentation.',
          status: 'completed',
        },
        {
          id: 't3-step-2',
          date: '13 Nov 2026',
          time: '08:20 IST',
          title: lang === 'hi' ? 'कचरा उठाव पूरा एवं चूने का छिड़काव' : 'Compactor Deployed & Area Sanitized',
          department: 'Municipal Logistics Contractor',
          officer: 'Sanitary Inspector D. P. Gupta',
          notes: 'Depot bins cleared and lime powder sprayed. Closure verified.',
          status: 'completed',
        },
      ],
    },
  ];

  const [tickets, setTickets] = useState(initialTickets);

  const toggleTimeline = (ticketId) => {
    setExpandedTimelines((prev) => ({
      ...prev,
      [ticketId]: !prev[ticketId],
    }));
  };

  const handleConfirmFixed = (ticketId) => {
    setTickets((prev) =>
      prev.map((tkt) => {
        if (tkt.id !== ticketId) return tkt;

        const newEvent = {
          id: `resolved-${Date.now()}`,
          date: '21 Nov 2026',
          time: '09:30 IST',
          title: lang === 'hi' ? 'नागरिक द्वारा मौके पर समाधान की पुष्टि' : 'Citizen Verified On-Site Resolution',
          department: lang === 'hi' ? 'नागरिक संतुष्टि एवं ऑडिट सेल' : 'Citizen Intimation & Audit Cell',
          officer: lang === 'hi' ? 'शिकायतकर्ता द्वारा भौतिक सत्यापन' : 'Complainant Physical Verification',
          notes:
            lang === 'hi'
              ? 'नागरिक ने पुष्टि की कि नगर निगम द्वारा मरम्मत पूरी कर दी गई है। शिकायत फ़ाइल आधिकारिक रूप से बंद कर दी गई।'
              : 'Complainant confirmed via Arzi that municipal repair work is fully completed on-site. Inspection case formally closed and archived under Section 12 Public Charter.',
          status: 'completed',
        };

        return {
          ...tkt,
          status: 'resolved',
          reminder: {
            ...tkt.reminder,
            active: false,
            resolvedConfirmed: true,
            escalationStepSuggested: false,
          },
          timelineEvents: [newEvent, ...tkt.timelineEvents],
        };
      })
    );
  };

  const handleStillBroken = (ticketId) => {
    setTickets((prev) =>
      prev.map((tkt) => {
        if (tkt.id !== ticketId) return tkt;
        return {
          ...tkt,
          status: 'urgent_reopened',
          reminder: {
            ...tkt.reminder,
            escalationStepSuggested: true,
            resolvedConfirmed: false,
          },
        };
      })
    );
  };

  const handleExecuteEscalation = (ticketId) => {
    setTickets((prev) =>
      prev.map((tkt) => {
        if (tkt.id !== ticketId) return tkt;

        const escalationEvent = {
          id: `escalated-${Date.now()}`,
          date: '21 Nov 2026',
          time: '09:45 IST',
          title: lang === 'hi' ? 'अधीक्षण अभियंता को औपचारिक अपील नोटिस जारी' : 'Appellate Supervisory Escalation Notice Served',
          department: lang === 'hi' ? 'क्षेत्रीय अधीक्षण अभियंता कार्यालय' : 'Zonal Superintending Engineer (Appellate Bench)',
          officer: 'Superintending Engineer R. K. Mathur',
          notes:
            lang === 'hi'
              ? 'समय सीमा समाप्त होने और काम अधूरा रहने पर शिकायत दोबारा खोली गई। अधिशासी अभियंता को नोटिस #ESC-GZB-2026-992 जारी कर 4 घंटे में बैरिकेड लगाने का निर्देश।'
              : 'Case reopened due to unrectified hazard following citizen rebuttal. Appellate Notice #ESC-GZB-2026-992 served to Executive Engineer. Immediate physical barricading required within 4 hours under Section 14 penalty clauses.',
          status: 'urgent',
        };

        return {
          ...tkt,
          status: 'urgent_reopened',
          reminder: {
            ...tkt.reminder,
            active: false,
            escalationStepSuggested: false,
            escalationNoticeServed: true,
          },
          timelineEvents: [escalationEvent, ...tkt.timelineEvents],
        };
      })
    );
  };

  const handleResetSimulation = () => {
    setTickets(initialTickets);
    setExpandedTimelines({ 'ticket-1': true });
  };

  const handleTriggerReminder = (ticketId = 'ticket-1') => {
    setTickets((prev) =>
      prev.map((tkt) => {
        if (tkt.id !== ticketId) return tkt;
        return {
          ...tkt,
          status: 'investigation',
          reminder: {
            active: true,
            hoursElapsed: 72,
            escalationStepSuggested: false,
            escalationNoticeServed: false,
            resolvedConfirmed: false,
          },
        };
      })
    );
  };

  const filteredTickets = tickets.filter((ticket) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'urgent') return ticket.status === 'urgent_reopened';
    if (activeFilter === 'review') return ticket.status === 'investigation';
    if (activeFilter === 'resolved') return ticket.status === 'resolved';
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* 1. CLEAR PROTOTYPE SIMULATION NOTICE */}
      <div className="p-4 rounded-[4px] border border-municipal-border bg-white text-municipal-text space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-municipal-terracotta" />
          <span className="font-mono text-xs uppercase font-bold text-municipal-text tracking-wide">
            {lang === 'hi' ? 'प्रोटोटाइप सिमुलेशन सूचना' : 'Prototype Simulation Notice'}
          </span>
        </div>
        <p className="text-xs font-mono text-municipal-text-muted leading-relaxed">
          {t.prototypeNotice}
        </p>
      </div>

      {/* Screen Title & Direct Copy */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-municipal-border pb-4">
        <div>
          <span className="font-mono text-xs uppercase text-municipal-primary font-bold tracking-widest block">
            {lang === 'hi' ? 'नागरिक शिकायत रिकॉर्ड' : 'Citizen Docket Records'}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-municipal-text">
            {t.myReportsTitle}
          </h1>
          <p className="text-base text-municipal-text-muted mt-1">
            {t.myReportsSubtitle}
          </p>
        </div>

        {/* ONE MAIN ACTION: Report an issue */}
        <Button
          variant="primary"
          icon={Camera}
          onClick={onStartNewReport}
          className="shrink-0 !min-h-[48px]"
        >
          {t.reportAnIssue}
        </Button>
      </div>

      {/* Simulation Quick Controls Bar (Min 48px tap targets) */}
      <div className="p-3.5 bg-municipal-surface border border-municipal-border rounded-[4px] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
        <span className="font-bold text-municipal-text">
          {t.simulateReminderLabel}
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => handleTriggerReminder('ticket-1')}
            className="min-h-[48px] px-3.5 py-2 rounded-[3px] border border-municipal-border bg-white hover:bg-municipal-surface text-municipal-primary font-bold cursor-pointer flex items-center"
          >
            {t.triggerDay3}
          </button>
          <button
            type="button"
            onClick={handleResetSimulation}
            className="min-h-[48px] px-3.5 py-2 rounded-[3px] border border-municipal-border bg-white hover:bg-municipal-surface text-municipal-text-muted cursor-pointer flex items-center gap-1 font-medium"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{t.resetDockets}</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs (All Min 48px Touch Targets) */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono uppercase text-municipal-text-faint mr-2 font-bold">
          {lang === 'hi' ? 'स्थिति अनुसार फ़िल्टर:' : 'Filter by Status:'}
        </span>
        {[
          { id: 'all', label: `${t.filterAll} (${tickets.length})` },
          {
            id: 'urgent',
            label: `${t.filterUrgent} (${
              tickets.filter((tkt) => tkt.status === 'urgent_reopened').length
            })`,
          },
          {
            id: 'review',
            label: `${t.filterReview} (${
              tickets.filter((tkt) => tkt.status === 'investigation').length
            })`,
          },
          {
            id: 'resolved',
            label: `${t.filterResolved} (${
              tickets.filter((tkt) => tkt.status === 'resolved').length
            })`,
          },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveFilter(tab.id)}
            className={`min-h-[48px] px-4 py-2 text-xs font-mono rounded-[4px] border transition-colors cursor-pointer flex items-center ${
              activeFilter === tab.id
                ? 'bg-municipal-primary text-white border-municipal-primary font-bold'
                : 'bg-white text-municipal-text border-municipal-border hover:bg-municipal-surface'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Ticket List with Timelines & Timed Reminders */}
      <div className="space-y-6">
        {filteredTickets.map((ticket) => {
          const isExpanded = expandedTimelines[ticket.id] !== false;
          const reminder = ticket.reminder;

          return (
            <div
              key={ticket.id}
              className="bg-white border border-municipal-border rounded-[6px] overflow-hidden space-y-0"
            >
              {/* Ticket Card Header Block */}
              <div className="p-5 sm:p-6 border-b border-municipal-border-light">
                <TicketCard
                  referenceNumber={ticket.referenceNumber}
                  status={ticket.status}
                  title={ticket.title}
                  locality={ticket.locality}
                  authority={ticket.authority}
                  filedDate={ticket.filedDate}
                  filedTime={ticket.filedTime}
                  daysOpen={ticket.daysOpen}
                  onActionClick={() => toggleTimeline(ticket.id)}
                />
              </div>

              {/* TIMED REMINDER PROMPT: "Is it fixed?" (SIMULATED REMINDER) */}
              {reminder?.active && !reminder.resolvedConfirmed && (
                <div className="m-5 sm:m-6 p-5 rounded-[4px] border-2 border-municipal-primary bg-municipal-primary-tint/50 space-y-4">
                  {/* Reminder Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-municipal-primary/20 pb-3">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-municipal-primary" />
                      <span className="font-mono text-xs uppercase font-bold text-municipal-primary">
                        {t.reminderBadge}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-municipal-text-muted font-bold">
                      {lang === 'hi' ? 'सिमुलेटेड सूचना' : 'PROTOTYPE NOTIFICATION'}
                    </span>
                  </div>

                  {/* Question and Plain Copy */}
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-municipal-text">
                      {t.isItFixedTitle}
                    </h3>
                    <p className="text-sm text-municipal-text leading-relaxed mt-1">
                      {lang === 'hi'
                        ? `नगर निगम की टीम को 3 दिन पहले भेजा गया था। क्या कर्मचारियों ने ${ticket.locality} पर मरम्मत का काम पूरा कर दिया है?`
                        : `Municipal field workers were dispatched 3 days ago. Have municipal teams completed the physical repair at ${ticket.locality}?`}
                    </p>
                  </div>

                  {/* Action Choices: "Yes, fixed" and "Still broken" (Both >= 48px) */}
                  {!reminder.escalationStepSuggested ? (
                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      {/* 1. "Yes, fixed" */}
                      <Button
                        variant="primary"
                        icon={CheckCircle2}
                        onClick={() => handleConfirmFixed(ticket.id)}
                        className="!min-h-[48px] bg-municipal-sage border-municipal-sage hover:bg-municipal-sage-hover text-white font-bold"
                      >
                        {t.yesFixed}
                      </Button>

                      {/* 2. "Still broken" */}
                      <Button
                        variant="urgent"
                        icon={AlertTriangle}
                        onClick={() => handleStillBroken(ticket.id)}
                        className="!min-h-[48px] font-bold"
                      >
                        {t.stillBroken}
                      </Button>
                    </div>
                  ) : (
                    /* NEXT ESCALATION STEP SUGGESTION (Triggered by "Still broken") */
                    <div className="p-4 rounded-[4px] border border-municipal-terracotta-border bg-municipal-terracotta-tint space-y-3">
                      <div className="flex items-start gap-2.5">
                        <ShieldAlert className="w-5 h-5 text-municipal-terracotta shrink-0 mt-0.5" />
                        <div>
                          <span className="font-mono text-[11px] uppercase font-bold text-municipal-terracotta block">
                            {t.escalationStepTitle}
                          </span>
                          <h4 className="font-serif text-lg font-bold text-municipal-text leading-snug mt-0.5">
                            {t.escalationStepHeading}
                          </h4>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-municipal-text leading-relaxed">
                        {t.escalationStepDesc}
                      </p>

                      <div className="pt-2 flex flex-wrap items-center gap-3">
                        <Button
                          variant="urgent"
                          icon={Send}
                          onClick={() => handleExecuteEscalation(ticket.id)}
                          className="!min-h-[48px] text-xs font-bold"
                        >
                          {t.serveEscalationButton}
                        </Button>
                        <button
                          type="button"
                          onClick={() => handleConfirmFixed(ticket.id)}
                          className="min-h-[48px] text-xs font-mono text-municipal-text-muted hover:text-municipal-primary underline cursor-pointer flex items-center"
                        >
                          {t.fixedInMeantime}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Resolved Confirmation Card */}
              {reminder?.resolvedConfirmed && (
                <div className="m-5 sm:m-6 p-4 rounded-[4px] border border-municipal-sage-border bg-municipal-sage-tint flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-municipal-sage shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif font-bold text-base text-municipal-text">
                      {t.confirmedFixedTitle}
                    </h4>
                    <p className="text-xs text-municipal-text-muted mt-0.5">
                      {t.confirmedFixedSub}
                    </p>
                  </div>
                </div>
              )}

              {/* Escalation Served Confirmation Card */}
              {reminder?.escalationNoticeServed && (
                <div className="m-5 sm:m-6 p-4 rounded-[4px] border border-municipal-terracotta-border bg-municipal-terracotta-tint flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-municipal-terracotta shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif font-bold text-base text-municipal-text">
                      {lang === 'hi' ? 'उच्च अधिकारी को अपील भेजी गई' : 'Supervisory Appellate Escalation Active'}
                    </h4>
                    <p className="text-xs text-municipal-text-muted mt-0.5">
                      {lang === 'hi'
                        ? 'अधीक्षण अभियंता को औपचारिक नोटिस भेजा गया। 4 घंटे में भौतिक निरीक्षण अपेक्षित।'
                        : 'Formal Section 14 notice served to the Superintending Engineer. Next supervisory inspection due within 4 hours.'}
                    </p>
                  </div>
                </div>
              )}

              {/* VERTICAL STATUS TIMELINE PER TICKET */}
              <div className="px-5 sm:px-6 pb-6 pt-2 bg-municipal-surface-subtle border-t border-municipal-border-light space-y-4">
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-municipal-primary" />
                    <span className="font-serif font-bold text-base text-municipal-text">
                      {t.timelineHeader}
                    </span>
                    <span className="font-mono text-xs text-municipal-text-faint font-semibold">
                      ({ticket.timelineEvents.length} {lang === 'hi' ? 'घटनाएं' : 'events'})
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleTimeline(ticket.id)}
                    className="min-h-[48px] px-2 text-xs font-mono font-bold text-municipal-text-muted hover:text-municipal-primary flex items-center gap-1 cursor-pointer"
                  >
                    {isExpanded ? (
                      <>
                        <span>{t.hideTimeline}</span>
                        <ChevronUp className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        <span>{t.viewTimeline}</span>
                        <ChevronDown className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                {isExpanded && (
                  <div className="pt-2">
                    <StatusTimeline events={ticket.timelineEvents} />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Short line saying who can see the information */}
      <div className="p-4 bg-white border border-municipal-border rounded-[4px] text-xs font-mono text-municipal-text-muted leading-relaxed">
        {t.myReportsPrivacyDisclosure}
      </div>
    </div>
  );
}
