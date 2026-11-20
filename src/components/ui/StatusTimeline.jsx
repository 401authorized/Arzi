import React from 'react';
import { Check, Clock, AlertTriangle, FileText, CornerDownRight } from 'lucide-react';

export default function StatusTimeline({
  events = [
    {
      id: 'step-1',
      date: '16 Nov 2026',
      time: '14:22 IST',
      title: 'Formal Grievance Registered',
      department: 'Central Citizen Intimation Cell',
      officer: 'Registry Desk Officer (ID #419)',
      notes: 'Initial filing confirmed with photographic documentation and verified GPS coordinates (28.6692° N, 77.4538° E). Reference docket issued.',
      status: 'completed',
    },
    {
      id: 'step-2',
      date: '17 Nov 2026',
      time: '10:05 IST',
      title: 'Jurisdictional Verification & Routing',
      department: 'Zonal Engineering Division II, GNN',
      officer: 'Assistant Municipal Engineer V. Sharma',
      notes: 'Road segment confirmed under jurisdiction of Nagar Nigam. Work order draft 2026-ENG-84 created for on-site inspection.',
      status: 'completed',
    },
    {
      id: 'step-3',
      date: '18 Nov 2026',
      time: '16:40 IST',
      title: 'Reopened Due to Incomplete Remediation',
      department: 'Supervisory Quality Audit Wing',
      officer: 'Senior Field Inspector R. K. Mathur',
      notes: 'Contractor marked site as cleared, but citizen photographic rebuttal verified trench remained unbarricaded. Status escalated to urgent priority under Section 14 Public Hazard Protocol.',
      status: 'urgent', // Urgent / reopened state using terracotta!
    },
    {
      id: 'step-4',
      date: 'Pending',
      time: 'By 20 Nov 2026',
      title: 'Mandatory Compliance & Site Rectification',
      department: 'Emergency Roadworks Taskforce',
      officer: 'Designated Field Unit',
      notes: 'Physical installation of safety barriers and leveling in progress.',
      status: 'upcoming',
    },
  ],
}) {
  const getBadgeIcon = (status) => {
    switch (status) {
      case 'completed':
        return <Check className="w-3.5 h-3.5 stroke-[2.5] text-white" />;
      case 'urgent':
        return <AlertTriangle className="w-3.5 h-3.5 stroke-[2.5] text-white" />;
      case 'active':
        return <Clock className="w-3.5 h-3.5 stroke-[2.5] text-white" />;
      case 'upcoming':
      default:
        return <div className="w-2 h-2 rounded-full bg-municipal-border-strong" />;
    }
  };

  const getNodeStyles = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-municipal-sage border-municipal-sage text-white';
      case 'urgent':
        return 'bg-municipal-terracotta border-municipal-terracotta text-white';
      case 'active':
        return 'bg-municipal-primary border-municipal-primary text-white';
      case 'upcoming':
      default:
        return 'bg-white border-municipal-border text-municipal-text-faint';
    }
  };

  return (
    <div className="w-full">
      <ol className="relative border-l border-municipal-border ml-3.5 sm:ml-4 space-y-8 list-none p-0">
        {events.map((event, idx) => {
          const isUrgent = event.status === 'urgent';
          const isCompleted = event.status === 'completed';

          return (
            <li key={event.id || idx} className="relative pl-6 sm:pl-8 group">
              {/* Timeline Marker Node */}
              <span
                className={`absolute -left-[14px] top-1.5 flex items-center justify-center w-7 h-7 rounded-full border ${getNodeStyles(
                  event.status
                )}`}
                aria-hidden="true"
              >
                {getBadgeIcon(event.status)}
              </span>

              {/* Timestamp & Tag Header */}
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-xs font-mono text-municipal-text-muted mb-1">
                <span className="font-semibold text-municipal-text">{event.date}</span>
                <span>&bull;</span>
                <span>{event.time}</span>
                {isUrgent && (
                  <span className="inline-block px-2 py-0.5 rounded-[4px] bg-municipal-terracotta-tint border border-municipal-terracotta-border text-municipal-terracotta font-semibold text-[11px] tracking-wide uppercase">
                    Urgent / Reopened
                  </span>
                )}
                {isCompleted && (
                  <span className="inline-block px-2 py-0.5 rounded-[4px] bg-municipal-sage-tint border border-municipal-sage-border text-municipal-sage font-semibold text-[11px] tracking-wide uppercase">
                    Verified
                  </span>
                )}
              </div>

              {/* Event Title */}
              <h4 className="font-serif text-base sm:text-lg font-bold text-municipal-text leading-snug">
                {event.title}
              </h4>

              {/* Official Office & Nodal Officer */}
              <div className="mt-1 text-xs text-municipal-text-muted flex items-center gap-1.5">
                <span className="font-medium text-municipal-text">{event.department}</span>
                {event.officer && (
                  <>
                    <span>&bull;</span>
                    <span>{event.officer}</span>
                  </>
                )}
              </div>

              {/* Official Administrative Notes Box */}
              {event.notes && (
                <div
                  className={`mt-2.5 p-3 rounded-[4px] border text-[15px] leading-relaxed ${
                    isUrgent
                      ? 'bg-municipal-terracotta-tint/50 border-municipal-terracotta-border text-municipal-text'
                      : 'bg-white border-municipal-border text-municipal-text'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <FileText
                      className={`w-4 h-4 shrink-0 mt-1 ${
                        isUrgent ? 'text-municipal-terracotta' : 'text-municipal-primary'
                      }`}
                    />
                    <p className="text-sm sm:text-[15px]">{event.notes}</p>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
