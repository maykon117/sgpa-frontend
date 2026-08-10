import React, { ButtonHTMLAttributes } from 'react';
import { LucideIcon, Loader2 } from 'lucide-react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  fullWidth?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-sm disabled:bg-primary-300',
  secondary:
    'bg-primary-50 text-primary-700 hover:bg-primary-100 active:bg-primary-200 disabled:opacity-50',
  outline:
    'border border-line bg-white text-ink hover:bg-slate-50 active:bg-slate-100 disabled:opacity-50',
  ghost: 'text-ink-soft hover:bg-slate-100 hover:text-ink active:bg-slate-200 disabled:opacity-50',
  danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 disabled:bg-red-300',
};

const sizeClasses: Record<Size, string> = {
  sm: 'text-xs px-2.5 py-1.5 gap-1.5 rounded-lg',
  md: 'text-sm px-4 py-2.5 gap-2 rounded-lg',
  lg: 'text-base px-5 py-3 gap-2 rounded-xl',
};

const iconSize: Record<Size, number> = { sm: 14, md: 16, lg: 18 };

export function Button({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  fullWidth = false,
  className = '',
  children,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center font-medium transition-colors duration-150 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...rest}
    >
      {loading ? (
        <Loader2 size={iconSize[size]} className="animate-spin" />
      ) : (
        Icon && iconPosition === 'left' && <Icon size={iconSize[size]} />
      )}
      {children}
      {!loading && Icon && iconPosition === 'right' && <Icon size={iconSize[size]} />}
    </button>
  );
}
