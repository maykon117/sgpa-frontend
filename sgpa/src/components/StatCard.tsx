import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  tone?: 'blue' | 'green' | 'amber' | 'violet';
}

const toneClasses: Record<NonNullable<StatCardProps['tone']>, string> = {
  blue: 'bg-primary-50 text-primary-600',
  green: 'bg-emerald-50 text-emerald-600',
  amber: 'bg-amber-50 text-amber-600',
  violet: 'bg-violet-50 text-violet-600',
};

export function StatCard({ icon: Icon, label, value, tone = 'blue' }: StatCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-line bg-card p-4 shadow-soft sm:p-5">
      <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${toneClasses[tone]}`}>
        <Icon size={20} />
      </div>
      <div className="min-w-0">
        <p className="text-xl font-bold text-ink sm:text-2xl">{value}</p>
        <p className="truncate text-xs text-ink-soft sm:text-sm">{label}</p>
      </div>
    </div>
  );
}
