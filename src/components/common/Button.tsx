import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'ghost' | 'icon';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-white hover:bg-primary-dark active:bg-primary-dark',
  secondary:
    'bg-white text-text-primary border border-border-dark hover:bg-gray-50 active:bg-gray-100',
  danger:
    'bg-danger text-white hover:bg-red-700 active:bg-red-800',
  success:
    'bg-success text-white hover:bg-emerald-700 active:bg-emerald-800',
  ghost:
    'bg-transparent text-text-secondary hover:bg-gray-100 active:bg-gray-200',
  icon:
    'bg-transparent text-text-secondary hover:bg-gray-100 active:bg-gray-200 !p-2',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 text-xs h-8',
  md: 'px-4 text-[length:var(--control-fs)] h-[var(--control-h)]',
  lg: 'px-5 text-sm h-10',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  loading = false,
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2 rounded-control font-medium
        transition-all duration-150 cursor-pointer focus-ring whitespace-nowrap
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses[variant]}
        ${variant !== 'icon' ? sizeClasses[size] : ''}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      ) : icon ? (
        <span className="flex-shrink-0 flex items-center">{icon}</span>
      ) : null}
      {children}
    </button>
  );
};
