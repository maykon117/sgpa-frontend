import React from 'react';

export function LoadingState({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-3" role="status" aria-label="Carregando conteúdo">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="h-20 w-full animate-pulse rounded-xl border border-line bg-slate-100"
        />
      ))}
    </div>
  );
}

export function Spinner({ size = 20 }: { size?: number }) {
  return (
    <svg
      className="animate-spin text-primary-600"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      role="status"
      aria-label="Carregando"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}
