import React, { useId } from 'react';

export default function Input({
  label,
  id,
  type = 'text',
  helperText,
  error,
  required = false,
  className = '',
  disabled = false,
  placeholder,
  value,
  onChange,
  ...props
}) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-[15px] font-semibold text-municipal-text mb-1.5"
        >
          {label}
          {required && (
            <span className="text-municipal-terracotta ml-1" title="Required field" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      <div className="relative">
        <input
          id={inputId}
          type={type}
          disabled={disabled}
          required={required}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          aria-invalid={error ? 'true' : 'false'}
          className={`w-full min-h-[48px] px-3.5 py-2.5 text-[17px] text-municipal-text bg-white border rounded-[4px] placeholder:text-municipal-text-faint focus:bg-white focus:outline-none focus:border-municipal-primary focus:ring-1 focus:ring-municipal-primary disabled:bg-municipal-surface disabled:text-municipal-text-muted disabled:border-municipal-border disabled:cursor-not-allowed ${
            error
              ? 'border-municipal-terracotta focus:border-municipal-terracotta focus:ring-municipal-terracotta'
              : 'border-municipal-border hover:border-municipal-border-strong'
          } ${className}`}
          {...props}
        />
      </div>

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
