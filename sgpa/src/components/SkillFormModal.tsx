import React, { useEffect, useState } from 'react';
import { Modal } from './Modal';
import { Input } from './Input';
import { Select } from './Select';
import { Button } from './Button';
import { Skill, SkillLevel } from '@/types';

interface SkillFormModalProps {
  open: boolean;
  skill?: Skill | null;
  onClose: () => void;
  onSubmit: (data: Omit<Skill, 'id' | 'userId'>) => void;
}

const levelOptions: { value: SkillLevel; label: string }[] = [
  { value: 'basico', label: 'Básico' },
  { value: 'intermediario', label: 'Intermediário' },
  { value: 'avancado', label: 'Avançado' },
];

const categoryOptions: { value: Skill['category']; label: string }[] = [
  { value: 'linguagem', label: 'Linguagem de programação' },
  { value: 'framework', label: 'Framework/Biblioteca' },
  { value: 'ferramenta', label: 'Ferramenta' },
  { value: 'banco-de-dados', label: 'Banco de dados' },
  { value: 'outro', label: 'Outro' },
];

const emptyForm = { name: '', level: 'basico' as SkillLevel, category: 'linguagem' as Skill['category'] };

export function SkillFormModal({ open, skill, onClose, onSubmit }: SkillFormModalProps) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');

  useEffect(() => {
    if (skill) setForm({ name: skill.name, level: skill.level, category: skill.category });
    else setForm(emptyForm);
    setError('');
  }, [skill, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError('Informe o nome da habilidade.');
      return;
    }
    onSubmit({ name: form.name.trim(), level: form.level, category: form.category });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title={skill ? 'Editar habilidade' : 'Adicionar habilidade'} size="sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Habilidade"
          placeholder="Ex.: React, Python, Docker..."
          value={form.name}
          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          error={error}
        />
        <Select
          label="Categoria"
          value={form.category}
          onChange={(e) => setForm((p) => ({ ...p, category: e.target.value as Skill['category'] }))}
          options={categoryOptions}
        />
        <Select
          label="Nível"
          value={form.level}
          onChange={(e) => setForm((p) => ({ ...p, level: e.target.value as SkillLevel }))}
          options={levelOptions}
        />
        <div className="flex flex-col-reverse gap-2 border-t border-line pt-4 sm:flex-row sm:justify-end">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">{skill ? 'Salvar alterações' : 'Adicionar habilidade'}</Button>
        </div>
      </form>
    </Modal>
  );
}
