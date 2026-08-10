import React from 'react';
import { FolderKanban, Briefcase, BookOpen, Award, Sparkles, User } from 'lucide-react';
import { Activity } from '@/types';
import { timeAgo } from '@/utils/format';

interface ActivityCardProps {
  activity: Activity;
}

const entityIcon: Record<Activity['entity'], React.ElementType> = {
  projeto: FolderKanban,
  experiencia: Briefcase,
  curso: BookOpen,
  certificado: Award,
  habilidade: Sparkles,
  perfil: User,
};

export function ActivityCard({ activity }: ActivityCardProps) {
  const Icon = entityIcon[activity.entity];
  return (
    <div className="flex items-start gap-3 py-2.5">
      <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-ink-soft">
        <Icon size={13} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-ink">{activity.description}</p>
        <p className="mt-0.5 text-[11px] text-slate-400">{timeAgo(activity.date)}</p>
      </div>
    </div>
  );
}
