import React from 'react';
import { X } from 'lucide-react';
import { Skill } from '@/types';
import { skillLevelLabel } from '@/utils/format';

interface SkillTagProps {
  skill: Skill;
  onRemove?: (skill: Skill) => void;
  onClick?: (skill: Skill) => void;
}

const levelDot: Record<Skill['level'], string> = {
  basico: 'bg-slate-400',
  intermediario: 'bg-amber-400',
  avancado: 'bg-emerald-500',
};

export function SkillTag({ skill, onRemove, onClick }: SkillTagProps) {
  return (
    <span
      onClick={() => onClick?.(skill)}
      className={`inline-flex items-center gap-1.5 rounded-full border border-line bg-white py-1.5 pl-3 pr-1.5 text-xs font-medium text-ink shadow-soft ${
        onClick ? 'cursor-pointer hover:border-primary-300' : ''
      }`}
      title={skillLevelLabel(skill.level)}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${levelDot[skill.level]}`} aria-hidden="true" />
      {skill.name}
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(skill);
          }}
          aria-label={`Remover ${skill.name}`}
          className="ml-0.5 rounded-full p-0.5 text-ink-soft hover:bg-red-50 hover:text-red-600"
        >
          <X size={12} />
        </button>
      )}
    </span>
  );
}
