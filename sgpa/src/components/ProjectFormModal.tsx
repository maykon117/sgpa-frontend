import React, { useEffect, useState } from 'react';
import { Modal } from './Modal';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { Button } from './Button';
import { Project } from '@/types';

interface ProjectFormModalProps {
  open: boolean;
  project?: Project | null;
  onClose: () => void;
  onSubmit: (data: Omit<Project, 'id' | 'userId'>) => void;
}

const emptyForm = {
  name: '',
  description: '',
  technologies: '',
  projectUrl: '',
  githubUrl: '',
  date: new Date().toISOString().slice(0, 10),
};

export function ProjectFormModal({ open, project, onClose, onSubmit }: ProjectFormModalProps) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (project) {
      setForm({
        name: project.name,
        description: project.description,
        technologies: project.technologies.join(', '),
        projectUrl: project.projectUrl ?? '',
        githubUrl: project.githubUrl ?? '',
        date: project.date,
      });
    } else {
      setForm(emptyForm);
    }
    setErrors({});
  }, [project, open]);

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = 'Informe o nome do projeto.';
    if (!form.description.trim()) next.description = 'Informe a descrição.';
    if (!form.technologies.trim()) next.technologies = 'Informe ao menos uma tecnologia.';
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }

    onSubmit({
      name: form.name.trim(),
      description: form.description.trim(),
      technologies: form.technologies.split(',').map((t) => t.trim()).filter(Boolean),
      projectUrl: form.projectUrl.trim() || undefined,
      githubUrl: form.githubUrl.trim() || undefined,
      date: form.date,
    });
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={project ? 'Editar projeto' : 'Adicionar projeto'}
      description="Preencha as informações do projeto acadêmico ou pessoal."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Nome do projeto" value={form.name} onChange={(e) => update('name', e.target.value)} error={errors.name} />
        <Textarea
          label="Descrição"
          value={form.description}
          onChange={(e) => update('description', e.target.value)}
          error={errors.description}
          rows={3}
        />
        <Input
          label="Tecnologias"
          value={form.technologies}
          onChange={(e) => update('technologies', e.target.value)}
          hint="Separe as tecnologias por vírgula. Ex.: React, Node.js, MongoDB"
          error={errors.technologies}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Link do projeto" value={form.projectUrl} onChange={(e) => update('projectUrl', e.target.value)} placeholder="https://" />
          <Input label="GitHub" value={form.githubUrl} onChange={(e) => update('githubUrl', e.target.value)} placeholder="https://github.com/..." />
        </div>
        <Input label="Data" type="date" value={form.date} onChange={(e) => update('date', e.target.value)} />
        <div className="flex flex-col-reverse gap-2 border-t border-line pt-4 sm:flex-row sm:justify-end">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">{project ? 'Salvar alterações' : 'Adicionar projeto'}</Button>
        </div>
      </form>
    </Modal>
  );
}
