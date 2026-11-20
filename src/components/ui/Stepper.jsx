import React from 'react';
import { Check } from 'lucide-react';

export default function Stepper({
  steps = [
    { title: 'Incident Record', description: 'Photo & geocode' },
    { title: 'Jurisdiction', description: 'Ward verification' },
    { title: 'Routing', description: 'Authority portal' },
    { title: 'Formal Filing', description: 'Receipt generated' },
  ],
  currentStep = 2, // 1-indexed
  onStepClick,
}) {
  return (
    <nav aria-label="Administrative Progress Stepper" className="w-full">
      {/* Mobile view: concise step indicator + current step details */}
      <div className="md:hidden border border-municipal-border bg-white rounded-[4px] p-4">
        <div className="flex items-center justify-between text-xs font-mono text-municipal-text-muted mb-2">
          <span>PROCEDURAL STAGE</span>
          <span className="font-semibold text-municipal-primary">
            STEP {currentStep} OF {steps.length}
          </span>
        </div>
        <div className="w-full bg-municipal-surface h-2 rounded-[2px] overflow-hidden mb-3">
          <div
            className="bg-municipal-primary h-full transition-all duration-300"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
        <div>
          <div className="font-serif font-semibold text-lg text-municipal-text">
            {steps[currentStep - 1]?.title}
          </div>
          {steps[currentStep - 1]?.description && (
            <p className="text-xs text-municipal-text-muted mt-0.5">
              {steps[currentStep - 1]?.description}
            </p>
          )}
        </div>
      </div>

      {/* Desktop / Tablet view: Full procedural linear stepper */}
      <ol className="hidden md:flex items-center w-full list-none p-0 m-0">
        {steps.map((step, idx) => {
          const stepNumber = idx + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const isUpcoming = stepNumber > currentStep;

          return (
            <li
              key={idx}
              className={`flex-1 relative ${idx !== steps.length - 1 ? 'pr-6' : ''}`}
            >
              {/* Connector line */}
              {idx !== steps.length - 1 && (
                <div
                  className={`absolute top-5 left-10 -right-2 h-[1px] ${
                    isCompleted ? 'bg-municipal-primary' : 'bg-municipal-border'
                  }`}
                  aria-hidden="true"
                />
              )}

              <div
                className={`flex items-start gap-3 relative ${
                  onStepClick ? 'cursor-pointer' : ''
                }`}
                onClick={() => onStepClick && onStepClick(stepNumber)}
              >
                {/* Step badge */}
                <span
                  className={`w-10 h-10 min-w-[40px] rounded-[4px] border flex items-center justify-center font-mono text-sm font-semibold transition-colors ${
                    isCompleted
                      ? 'bg-municipal-primary text-white border-municipal-primary'
                      : isCurrent
                      ? 'bg-white text-municipal-primary border-2 border-municipal-primary ring-2 ring-municipal-primary-tint'
                      : 'bg-white text-municipal-text-faint border-municipal-border'
                  }`}
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 stroke-[2.5]" aria-label="Completed" />
                  ) : (
                    stepNumber
                  )}
                </span>

                {/* Step label */}
                <div className="pt-0.5">
                  <span
                    className={`block text-[14px] font-semibold leading-tight ${
                      isCurrent
                        ? 'text-municipal-primary'
                        : isCompleted
                        ? 'text-municipal-text'
                        : 'text-municipal-text-muted'
                    }`}
                  >
                    {step.title}
                  </span>
                  {step.description && (
                    <span className="block text-xs text-municipal-text-muted leading-tight mt-1">
                      {step.description}
                    </span>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
