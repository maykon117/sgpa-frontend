import React, { useState } from 'react';
import { Plus, Briefcase, Pencil, Trash2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useAppData } from '@/hooks/useAppData';
import { Button } from '@/components/Button';
import { EmptyState } from '@/components/EmptyState';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { ExperienceFormModal } from '@/components/ExperienceFormModal';
import { Experience } from '@/types';
import { formatDate, experienceTypeLabel } from '@/utils/format';

const typeBadgeClass: Record<Experience['type'], string> = {
  academica: 'bg-primary-50 text-primary-700',
  profissional: 'bg-emerald-50 text-emerald-700',
  estagio: 'bg-amber-50 text-amber-700',
  voluntariado: 'bg-violet-50 text-violet-700',
};

export function Experiencias() {
  const { user } = useAuth();
  const { experiences, addExperience, updateExperience, removeExperience } = useAppData();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Experience | null>(null);
  const [deleting, setDeleting] = useState<Experience | null>(null);

  if (!user) return null;
  const myExperiences = experiences
    .filter((e) => e.userId === user.id)
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-ink sm:text-2xl">Experiências</h1>
          <p className="mt-1 text-sm text-ink-soft">Registre suas experiências acadêmicas e profissionais.</p>
        </div>
        <Button
          icon={Plus}
          onClick={() => {
            setEditing(null);
            setFormOpen(true);
          }}
        >
          Adicionar Experiência
        </Button>
      </div>

      {myExperiences.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="Nenhuma experiência cadastrada"
          description="Adicione estágios, empregos, trabalhos voluntários ou vivências acadêmicas."
          action={
            <Button icon={Plus} onClick={() => setFormOpen(true)}>
              Adicionar Experiência
            </Button>
          }
        />
      ) : (
        <div className="space-y-4">
          {myExperiences.map((exp) => (
            <div key={exp.id} className="group rounded-2xl border border-line bg-card p-5 shadow-soft">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-semibold text-ink sm:text-base">{exp.role}</h3>
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${typeBadgeClass[exp.type]}`}>
                      {experienceTypeLabel(exp.type)}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-ink-soft">{exp.institution}</p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    {formatDate(exp.startDate)} — {exp.endDate ? formatDate(exp.endDate) : 'Atual'}
                  </p>
                </div>
                <div className="flex flex-shrink-0 gap-1">
                  <button
                    onClick={() => {
                      setEditing(exp);
                      setFormOpen(true);
                    }}
                    aria-label={`Editar experiência em ${exp.institution}`}
                    className="rounded-lg p-2 text-ink-soft hover:bg-slate-100 hover:text-primary-600"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => setDeleting(exp)}
                    aria-label={`Excluir experiência em ${exp.institution}`}
                    className="rounded-lg p-2 text-ink-soft hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      <ExperienceFormModal
        open={formOpen}
        experience={editing}
        onClose={() => setFormOpen(false)}
        onSubmit={(data) => {
          if (editing) updateExperience(editing.id, data);
          else addExperience({ ...data, userId: user.id });
        }}
      />
      <ConfirmDialog
        open={Boolean(deleting)}
        title="Excluir experiência"
        description={`Tem certeza que deseja excluir a experiência em "${deleting?.institution}"?`}
        onCancel={() => setDeleting(null)}
        onConfirm={() => {
          if (deleting) removeExperience(deleting.id);
          setDeleting(null);
        }}
      />
    </div>
  );
}
