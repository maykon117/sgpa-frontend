import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus, Search, FolderKanban } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useAppData } from '@/hooks/useAppData';
import { ProjectCard } from '@/components/ProjectCard';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { Button } from '@/components/Button';
import { EmptyState } from '@/components/EmptyState';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { ProjectFormModal } from '@/components/ProjectFormModal';
import { ProjectDetailsModal } from '@/components/ProjectDetailsModal';
import { Project } from '@/types';

export function Projetos() {
  const { user } = useAuth();
  const { projects, addProject, updateProject, removeProject } = useAppData();
  const [searchParams] = useSearchParams();

  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [techFilter, setTechFilter] = useState('todas');
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [viewing, setViewing] = useState<Project | null>(null);
  const [deleting, setDeleting] = useState<Project | null>(null);

  if (!user) return null;
  const myProjects = projects.filter((p) => p.userId === user.id);

  const allTechs = useMemo(() => {
    const set = new Set<string>();
    myProjects.forEach((p) => p.technologies.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [myProjects]);

  const filtered = myProjects.filter((p) => {
    const matchesQuery =
      !query.trim() ||
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase());
    const matchesTech = techFilter === 'todas' || p.technologies.includes(techFilter);
    return matchesQuery && matchesTech;
  });

  const handleSubmit = (data: Omit<Project, 'id' | 'userId'>) => {
    if (editing) {
      updateProject(editing.id, data);
    } else {
      addProject({ ...data, userId: user.id });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-ink sm:text-2xl">Projetos</h1>
          <p className="mt-1 text-sm text-ink-soft">Gerencie os projetos do seu portfólio acadêmico.</p>
        </div>
        <Button
          icon={Plus}
          onClick={() => {
            setEditing(null);
            setFormOpen(true);
          }}
        >
          Adicionar Projeto
        </Button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <Input
            icon={Search}
            placeholder="Buscar por nome ou descrição..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="sm:w-56">
          <Select
            value={techFilter}
            onChange={(e) => setTechFilter(e.target.value)}
            options={[{ value: 'todas', label: 'Todas as tecnologias' }, ...allTechs.map((t) => ({ value: t, label: t }))]}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={FolderKanban}
          title={myProjects.length === 0 ? 'Nenhum projeto cadastrado' : 'Nenhum resultado encontrado'}
          description={
            myProjects.length === 0
              ? 'Comece adicionando seu primeiro projeto acadêmico ou pessoal.'
              : 'Tente ajustar a busca ou o filtro de tecnologia.'
          }
          action={
            myProjects.length === 0 ? (
              <Button icon={Plus} onClick={() => setFormOpen(true)}>
                Adicionar Projeto
              </Button>
            ) : undefined
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              editable
              onViewDetails={setViewing}
              onEdit={(p) => {
                setEditing(p);
                setFormOpen(true);
              }}
              onDelete={setDeleting}
            />
          ))}
        </div>
      )}

      <ProjectFormModal
        open={formOpen}
        project={editing}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
      />
      <ProjectDetailsModal project={viewing} onClose={() => setViewing(null)} />
      <ConfirmDialog
        open={Boolean(deleting)}
        title="Excluir projeto"
        description={`Tem certeza que deseja excluir "${deleting?.name}"? Esta ação não pode ser desfeita.`}
        onCancel={() => setDeleting(null)}
        onConfirm={() => {
          if (deleting) removeProject(deleting.id);
          setDeleting(null);
        }}
      />
    </div>
  );
}
