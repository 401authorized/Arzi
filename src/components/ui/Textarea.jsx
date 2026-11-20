import React, { useId } from 'react';

export default function Textarea({
  label,
  id,
  helperText,
  error,
  required = false,
  rows = 4,
  maxLength,
  value,
  onChange,
  placeholder,
  disabled = false,
  className = '',
  ...props
}) {
  const generatedId = useId();
  const textareaId = id || generatedId;
  const helperId = `${textareaId}-helper`;
  const errorId = `${textareaId}-error`;

  const currentLength = typeof value === 'string' ? value.length : 0;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-[15px] font-semibold text-municipal-text"
          >
            {label}
            {required && (
              <span className="text-municipal-terracotta ml-1" title="Required field" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}
        {maxLength && (
          <span className="text-xs text-municipal-text-faint font-mono">
            {currentLength}/{maxLength}
          </span>
        )}
      </div>

      <textarea
        id={textareaId}
        rows={rows}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        aria-describedby={error ? errorId : helperText ? helperId : undefined}
        aria-invalid={error ? 'true' : 'false'}
        className={`w-full min-h-[96px] p-3.5 text-[17px] leading-relaxed text-municipal-text bg-white border rounded-[4px] placeholder:text-municipal-text-faint focus:bg-white focus:outline-none focus:border-municipal-primary focus:ring-1 focus:ring-municipal-primary disabled:bg-municipal-surface disabled:text-municipal-text-muted disabled:border-municipal-border disabled:cursor-not-allowed ${
          error
            ? 'border-municipal-terracotta focus:border-municipal-terracotta focus:ring-municipal-terracotta'
            : 'border-municipal-border hover:border-municipal-border-strong'
        } ${className}`}
        {...props}
      />

      {helperText && !error && (
        <p id={helperId} className="mt-1.5 text-xs text-municipal-text-muted leading-normal">
          {helperText}
        </p>
      )}

      {error && (
        <p id={errorId} className="mt-1.5 text-xs font-medium text-municipal-terracotta flex items-center gap-1">
          <span aria-hidden="true">&bull;</span>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
