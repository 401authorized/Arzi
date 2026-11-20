import React, { useId } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Select({
  label,
  id,
  options = [],
  value,
  onChange,
  helperText,
  error,
  required = false,
  disabled = false,
  placeholder = 'Select an option…',
  className = '',
  ...props
}) {
  const generatedId = useId();
  const selectId = id || generatedId;
  const helperId = `${selectId}-helper`;
  const errorId = `${selectId}-error`;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={selectId}
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
        <select
          id={selectId}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          aria-invalid={error ? 'true' : 'false'}
          className={`w-full min-h-[48px] px-3.5 pr-10 py-2.5 text-[17px] text-municipal-text bg-white border rounded-[4px] appearance-none focus:bg-white focus:outline-none focus:border-municipal-primary focus:ring-1 focus:ring-municipal-primary disabled:bg-municipal-surface disabled:text-municipal-text-muted disabled:border-municipal-border disabled:cursor-not-allowed cursor-pointer ${
            error
              ? 'border-municipal-terracotta focus:border-municipal-terracotta focus:ring-municipal-terracotta'
              : 'border-municipal-border hover:border-municipal-border-strong'
          } ${className}`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt, idx) => {
            const isObj = typeof opt === 'object' && opt !== null;
            const val = isObj ? opt.value : opt;
            const lbl = isObj ? opt.label : opt;
            return (
              <option key={idx} value={val}>
                {lbl}
              </option>
            );
          })}
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-municipal-text-muted">
          <ChevronDown className="w-4 h-4 stroke-[2]" aria-hidden="true" />
        </div>
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
