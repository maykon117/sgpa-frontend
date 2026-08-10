import React, { useMemo, useState } from 'react';
import { Plus, Sparkles, Pencil, Trash2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useAppData } from '@/hooks/useAppData';
import { Button } from '@/components/Button';
import { EmptyState } from '@/components/EmptyState';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { SkillFormModal } from '@/components/SkillFormModal';
import { Skill } from '@/types';
import { skillLevelLabel } from '@/utils/format';

const categoryLabels: Record<Skill['category'], string> = {
  linguagem: 'Linguagens de programação',
  framework: 'Frameworks e bibliotecas',
  ferramenta: 'Ferramentas',
  'banco-de-dados': 'Bancos de dados',
  outro: 'Outras habilidades',
};

const levelBarClass: Record<Skill['level'], string> = {
  basico: 'w-1/3 bg-slate-400',
  intermediario: 'w-2/3 bg-amber-400',
  avancado: 'w-full bg-emerald-500',
};

export function Habilidades() {
  const { user } = useAuth();
  const { skills, addSkill, updateSkill, removeSkill } = useAppData();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Skill | null>(null);
  const [deleting, setDeleting] = useState<Skill | null>(null);

  if (!user) return null;
  const mySkills = skills.filter((s) => s.userId === user.id);

  const grouped = useMemo(() => {
    const groups: Record<string, Skill[]> = {};
    mySkills.forEach((s) => {
      groups[s.category] = groups[s.category] ? [...groups[s.category], s] : [s];
    });
    return groups;
  }, [mySkills]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-ink sm:text-2xl">Habilidades</h1>
          <p className="mt-1 text-sm text-ink-soft">Gerencie suas competências técnicas.</p>
        </div>
        <Button
          icon={Plus}
          onClick={() => {
            setEditing(null);
            setFormOpen(true);
          }}
        >
          Adicionar Habilidade
        </Button>
      </div>

      {mySkills.length === 0 ? (
        <EmptyState
          icon={Sparkles}
          title="Nenhuma habilidade cadastrada"
          description="Adicione linguagens, frameworks, ferramentas e bancos de dados que você domina."
          action={
            <Button icon={Plus} onClick={() => setFormOpen(true)}>
              Adicionar Habilidade
            </Button>
          }
        />
      ) : (
        <div className="space-y-6">
          {(Object.keys(categoryLabels) as Skill['category'][])
            .filter((cat) => grouped[cat]?.length)
            .map((cat) => (
              <section key={cat} className="rounded-2xl border border-line bg-card p-5 shadow-soft sm:p-6">
                <h2 className="mb-4 text-sm font-semibold text-ink">{categoryLabels[cat]}</h2>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {grouped[cat].map((skill) => (
                    <div key={skill.id} className="group rounded-xl border border-line p-3.5">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-sm font-medium text-ink">{skill.name}</span>
                        <div className="flex flex-shrink-0 gap-1 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
                          <button
                            onClick={() => {
                              setEditing(skill);
                              setFormOpen(true);
                            }}
                            aria-label={`Editar ${skill.name}`}
                            className="rounded-md p-1 text-ink-soft hover:bg-slate-100 hover:text-primary-600"
                          >
                            <Pencil size={13} />
                          </button>
                          <button
                            onClick={() => setDeleting(skill)}
                            aria-label={`Excluir ${skill.name}`}
                            className="rounded-md p-1 text-ink-soft hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                          <div className={`h-full rounded-full ${levelBarClass[skill.level]}`} />
                        </div>
                        <span className="text-[11px] text-ink-soft">{skillLevelLabel(skill.level)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
        </div>
      )}

      <SkillFormModal
        open={formOpen}
        skill={editing}
        onClose={() => setFormOpen(false)}
        onSubmit={(data) => {
          if (editing) updateSkill(editing.id, data);
          else addSkill({ ...data, userId: user.id });
        }}
      />
      <ConfirmDialog
        open={Boolean(deleting)}
        title="Excluir habilidade"
        description={`Tem certeza que deseja excluir "${deleting?.name}"?`}
        onCancel={() => setDeleting(null)}
        onConfirm={() => {
          if (deleting) removeSkill(deleting.id);
          setDeleting(null);
        }}
      />
    </div>
  );
}
