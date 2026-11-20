import React from 'react';

export default function Button({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'quiet' | 'urgent'
  size = 'default',
  type = 'button',
  disabled = false,
  fullWidth = false,
  className = '',
  icon: Icon,
  iconPosition = 'left',
  ...props
}) {
  const baseClasses =
    'inline-flex items-center justify-center font-medium transition-colors cursor-pointer select-none rounded-[4px] min-h-[48px] px-5 py-2.5 text-[15px] focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 border';

  const variants = {
    // Deep Pine Green Primary
    primary:
      'bg-municipal-primary text-white border-municipal-primary hover:bg-municipal-primary-hover active:bg-municipal-primary-active focus-visible:outline-municipal-primary disabled:hover:bg-municipal-primary',

    // Warm Off-white / Paper Secondary with Crisp Border
    secondary:
      'bg-white text-municipal-text border-municipal-border-strong hover:bg-municipal-surface hover:text-municipal-primary active:bg-municipal-border focus-visible:outline-municipal-primary disabled:hover:bg-white',

    // Quiet (ghost / text button) with hover background tint
    quiet:
      'bg-transparent text-municipal-primary border-transparent hover:bg-municipal-primary-tint hover:border-municipal-primary-tint active:bg-municipal-border focus-visible:outline-municipal-primary disabled:hover:bg-transparent',

    // Urgent / Reopened Muted Terracotta (Used strictly for urgent or reopened states)
    urgent:
      'bg-municipal-terracotta text-white border-municipal-terracotta hover:bg-municipal-terracotta-hover focus-visible:outline-municipal-terracotta disabled:hover:bg-municipal-terracotta',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant] || variants.primary} ${widthClass} ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && (
        <Icon className="w-4 h-4 mr-2 shrink-0 stroke-[2]" aria-hidden="true" />
      )}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && (
        <Icon className="w-4 h-4 ml-2 shrink-0 stroke-[2]" aria-hidden="true" />
      )}
    </button>
  );
}
