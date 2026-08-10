import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, GraduationCap } from 'lucide-react';

export function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
        <Compass size={26} />
      </div>
      <h1 className="mt-5 text-2xl font-bold text-ink">Página não encontrada</h1>
      <p className="mt-2 max-w-sm text-sm text-ink-soft">
        O endereço acessado não existe ou foi movido. Volte para o SGPA e continue de onde parou.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-primary-700"
      >
        <GraduationCap size={16} />
        Voltar ao início
      </Link>
    </div>
  );
}
