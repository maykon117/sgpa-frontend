import React, { TextareaHTMLAttributes, forwardRef, useId } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, id, className = '', rows = 4, ...rest }, ref) => {
    const autoId = useId();
    const textareaId = id ?? autoId;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={textareaId} className="mb-1.5 block text-sm font-medium text-ink">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          aria-invalid={Boolean(error)}
          className={`w-full resize-none rounded-lg border bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-100 ${
            error ? 'border-red-400 focus:border-red-500' : 'border-line focus:border-primary-500'
          } ${className}`}
          {...rest}
        />
        {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
        {!error && hint && <p className="mt-1.5 text-xs text-ink-soft">{hint}</p>}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';
