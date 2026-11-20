import React from 'react';
import { AlertTriangle, Info, CheckCircle2, X } from 'lucide-react';

export default function NoticeBanner({
  variant = 'info', // 'info' | 'urgent' | 'success'
  title,
  children,
  referenceId,
  action,
  onDismiss,
  className = '',
}) {
  const configs = {
    info: {
      container: 'bg-municipal-primary-tint border-municipal-primary-tint-border text-municipal-text',
      icon: <Info className="w-5 h-5 text-municipal-primary shrink-0 stroke-[2]" />,
      badge: 'text-municipal-primary border-municipal-primary/30',
      badgeText: 'Official Notice',
    },
    urgent: {
      container: 'bg-municipal-terracotta-tint border-municipal-terracotta-border text-municipal-text',
      icon: <AlertTriangle className="w-5 h-5 text-municipal-terracotta shrink-0 stroke-[2]" />,
      badge: 'text-municipal-terracotta border-municipal-terracotta/30',
      badgeText: 'Urgent Action Required',
    },
    success: {
      container: 'bg-municipal-sage-tint border-municipal-sage-border text-municipal-text',
      icon: <CheckCircle2 className="w-5 h-5 text-municipal-sage shrink-0 stroke-[2]" />,
      badge: 'text-municipal-sage border-municipal-sage/30',
      badgeText: 'Verified Resolution',
    },
  };

  const current = configs[variant] || configs.info;

  return (
    <div
      role="region"
      aria-label={title || current.badgeText}
      className={`w-full border rounded-[4px] p-4 sm:p-4.5 ${current.container} ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5">{current.icon}</div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span
              className={`text-[11px] font-mono uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-[3px] border ${current.badge}`}
            >
              {current.badgeText}
            </span>
            {referenceId && (
              <span className="text-xs font-mono text-municipal-text-muted">
                DOCKET #{referenceId}
              </span>
            )}
          </div>

          {title && (
            <h4 className="font-serif text-base sm:text-[17px] font-bold text-municipal-text leading-snug mb-1">
              {title}
            </h4>
          )}

          <div className="text-[15px] sm:text-[16px] text-municipal-text leading-relaxed">
            {children}
          </div>

          {action && <div className="mt-3 flex items-center gap-3">{action}</div>}
        </div>

        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="p-2 rounded-[4px] hover:bg-black/5 text-municipal-text-muted hover:text-municipal-text transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center cursor-pointer"
            aria-label="Dismiss notice"
          >
            <X className="w-4 h-4 stroke-[2]" />
          </button>
        )}
      </div>
    </div>
  );
}
