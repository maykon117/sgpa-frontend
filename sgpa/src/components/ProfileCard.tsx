import React from 'react';
import { Link } from 'react-router-dom';
import { Pencil, GraduationCap } from 'lucide-react';
import { User } from '@/types';
import { initials } from '@/utils/format';

interface ProfileCardProps {
  user: User;
  completion: number;
}

export function ProfileCard({ user, completion }: ProfileCardProps) {
  return (
    <div className="rounded-2xl border border-line bg-card p-5 shadow-soft sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-primary-600 text-lg font-bold text-white sm:h-20 sm:w-20 sm:text-xl">
            {initials(user.name)}
          </div>
          <div className="min-w-0">
            <h2 className="truncate text-lg font-bold text-ink sm:text-xl">{user.name}</h2>
            <p className="mt-0.5 flex items-center gap-1.5 text-sm text-ink-soft">
              <GraduationCap size={15} className="flex-shrink-0" />
              <span className="truncate">{user.course}</span>
            </p>
            {user.semester && (
              <span className="mt-1.5 inline-block rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-semibold text-primary-700">
                {user.semester}º semestre
              </span>
            )}
          </div>
        </div>
        <Link
          to="/perfil"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary-700 sm:self-start"
        >
          <Pencil size={16} />
          Editar Perfil
        </Link>
      </div>

      <div className="mt-6">
        <div className="mb-1.5 flex items-center justify-between text-sm">
          <span className="font-medium text-ink">Perfil completo</span>
          <span className="font-semibold text-primary-600">{completion}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-primary-600 transition-all duration-500"
            style={{ width: `${completion}%` }}
            role="progressbar"
            aria-valuenow={completion}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>
    </div>
  );
}
