import React, { useEffect, useState } from 'react';
import { Modal } from './Modal';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { Select } from './Select';
import { Button } from './Button';
import { Experience, ExperienceType } from '@/types';

interface ExperienceFormModalProps {
  open: boolean;
  experience?: Experience | null;
  onClose: () => void;
  onSubmit: (data: Omit<Experience, 'id' | 'userId'>) => void;
}

const typeOptions: { value: ExperienceType; label: string }[] = [
  { value: 'academica', label: 'Acadêmica' },
  { value: 'profissional', label: 'Profissional' },
  { value: 'estagio', label: 'Estágio' },
  { value: 'voluntariado', label: 'Voluntariado' },
];

const emptyForm = {
  institution: '',
  role: '',
  type: 'academica' as ExperienceType,
  startDate: '',
  endDate: '',
  current: false,
  description: '',
};

export function ExperienceFormModal({ open, experience, onClose, onSubmit }: ExperienceFormModalProps) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (experience) {
      setForm({
        institution: experience.institution,
        role: experience.role,
        type: experience.type,
        startDate: experience.startDate,
        endDate: experience.endDate ?? '',
        current: experience.endDate === null,
        description: experience.description,
      });
    } else {
      setForm(emptyForm);
    }
    setErrors({});
  }, [experience, open]);

  const update = (field: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.institution.trim()) next.institution = 'Informe a empresa ou instituição.';
    if (!form.role.trim()) next.role = 'Informe o cargo ou função.';
    if (!form.startDate) next.startDate = 'Informe a data inicial.';
    if (!form.current && !form.endDate) next.endDate = 'Informe a data final ou marque como atual.';
    if (!form.description.trim()) next.description = 'Descreva a experiência.';
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }

    onSubmit({
      institution: form.institution.trim(),
      role: form.role.trim(),
      type: form.type,
      startDate: form.startDate,
      endDate: form.current ? null : form.endDate,
      description: form.description.trim(),
    });
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={experience ? 'Editar experiência' : 'Adicionar experiência'}
      description="Cadastre experiências acadêmicas ou profissionais."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Empresa/Instituição"
          value={form.institution}
          onChange={(e) => update('institution', e.target.value)}
          error={errors.institution}
        />
        <Input label="Cargo/Função" value={form.role} onChange={(e) => update('role', e.target.value)} error={errors.role} />
        <Select label="Tipo de experiência" value={form.type} onChange={(e) => update('type', e.target.value)} options={typeOptions} />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Data inicial" type="date" value={form.startDate} onChange={(e) => update('startDate', e.target.value)} error={errors.startDate} />
          <div>
            <Input
              label="Data final"
              type="date"
              value={form.endDate}
              onChange={(e) => update('endDate', e.target.value)}
              disabled={form.current}
              error={errors.endDate}
            />
            <label className="mt-2 flex items-center gap-2 text-xs text-ink-soft">
              <input
                type="checkbox"
                checked={form.current}
                onChange={(e) => update('current', e.target.checked)}
                className="h-3.5 w-3.5 rounded border-line text-primary-600 focus:ring-primary-200"
              />
              Experiência atual
            </label>
          </div>
        </div>

        <Textarea
          label="Descrição"
          value={form.description}
          onChange={(e) => update('description', e.target.value)}
          error={errors.description}
          rows={3}
        />

        <div className="flex flex-col-reverse gap-2 border-t border-line pt-4 sm:flex-row sm:justify-end">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">{experience ? 'Salvar alterações' : 'Adicionar experiência'}</Button>
        </div>
      </form>
    </Modal>
  );
}
