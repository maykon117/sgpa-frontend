import React, { InputHTMLAttributes, forwardRef, useId } from 'react';
import { LucideIcon } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: LucideIcon;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, icon: Icon, id, className = '', ...rest }, ref) => {
    const autoId = useId();
    const inputId = id ?? autoId;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-ink">
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <Icon
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft"
            />
          )}
          <input
            ref={ref}
            id={inputId}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-100 ${
              error ? 'border-red-400 focus:border-red-500' : 'border-line focus:border-primary-500'
            } ${Icon ? 'pl-9' : ''} ${className}`}
            {...rest}
          />
        </div>
        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-xs text-red-600">
            {error}
          </p>
        )}
        {!error && hint && (
          <p id={`${inputId}-hint`} className="mt-1.5 text-xs text-ink-soft">
            {hint}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';
