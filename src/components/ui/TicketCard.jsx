import React from 'react';
import { MapPin, Calendar, Clock, Building2, AlertTriangle, CheckCircle2, ArrowUpRight } from 'lucide-react';

export default function TicketCard({
  referenceNumber = 'ARZ-2026-DEL-08492',
  status = 'investigation', // 'investigation' | 'urgent_reopened' | 'resolved' | 'submitted'
  title = 'Hazardous open excavation without safety barricade on arterial road',
  locality = 'Sector 14 Main Commercial Spine, Ghaziabad',
  authority = 'Ghaziabad Nagar Nigam (GNN) — Engineering Division (Zone II)',
  filedDate = '18 Nov 2026',
  filedTime = '09:42 IST',
  daysOpen = 3,
  onActionClick,
}) {
  const getStatusBadge = () => {
    switch (status) {
      case 'urgent_reopened':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-municipal-terracotta-tint border border-municipal-terracotta-border text-municipal-terracotta text-xs font-semibold uppercase tracking-wider font-mono">
            <AlertTriangle className="w-3.5 h-3.5 stroke-[2.5]" />
            Reopened &bull; Escalated
          </span>
        );
      case 'resolved':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-municipal-sage-tint border border-municipal-sage-border text-municipal-sage text-xs font-semibold uppercase tracking-wider font-mono">
            <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
            Remediated &amp; Closed
          </span>
        );
      case 'investigation':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-municipal-primary-tint border border-municipal-primary-tint-border text-municipal-primary text-xs font-semibold uppercase tracking-wider font-mono">
            <Clock className="w-3.5 h-3.5 stroke-[2.5]" />
            Under Field Review
          </span>
        );
    }
  };

  return (
    <article className="w-full bg-white border border-municipal-border rounded-[6px] p-5 sm:p-6 transition-colors hover:border-municipal-border-strong">
      {/* Top Header: Reference Number & Status */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-municipal-border-light">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase font-mono text-municipal-text-faint font-medium">Ref No:</span>
          <span className="font-mono text-sm sm:text-base font-bold text-municipal-text tracking-wide bg-municipal-surface px-2.5 py-0.5 rounded-[4px] border border-municipal-border">
            {referenceNumber}
          </span>
        </div>
        <div>{getStatusBadge()}</div>
      </div>

      {/* Main Body */}
      <div className="py-3.5">
        <h3 className="font-serif text-lg sm:text-xl font-bold text-municipal-text leading-snug mb-2">
          {title}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[14px] text-municipal-text-muted mt-3">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-municipal-primary shrink-0 mt-0.5" />
            <span className="line-clamp-1">{locality}</span>
          </div>
          <div className="flex items-start gap-2">
            <Building2 className="w-4 h-4 text-municipal-primary shrink-0 mt-0.5" />
            <span className="line-clamp-1">{authority}</span>
          </div>
        </div>
      </div>

      {/* Footer Details & Action */}
      <div className="pt-3 border-t border-municipal-border-light flex flex-wrap items-center justify-between gap-3 text-xs text-municipal-text-muted">
        <div className="flex items-center gap-4 font-mono">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-municipal-text-faint" />
            Filed: {filedDate} ({filedTime})
          </span>
          <span className="hidden xs:inline text-municipal-text-faint">&bull;</span>
          <span className="hidden xs:inline">Elapsed: {daysOpen} business days</span>
        </div>

        <button
          type="button"
          onClick={onActionClick}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-municipal-primary hover:text-municipal-primary-hover border border-municipal-border hover:border-municipal-primary px-3.5 py-2.5 rounded-[4px] bg-municipal-surface-subtle hover:bg-white transition-colors cursor-pointer min-h-[48px]"
        >
          <span>View ticket details</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </article>
  );
}
