import React, { useEffect, useState } from 'react';
import { Modal } from './Modal';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { Button } from './Button';
import { Course } from '@/types';

interface CourseFormModalProps {
  open: boolean;
  course?: Course | null;
  onClose: () => void;
  onSubmit: (data: Omit<Course, 'id' | 'userId'>) => void;
}

const emptyForm = {
  name: '',
  institution: '',
  completionDate: new Date().toISOString().slice(0, 10),
  workload: '',
  description: '',
};

export function CourseFormModal({ open, course, onClose, onSubmit }: CourseFormModalProps) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (course) {
      setForm({
        name: course.name,
        institution: course.institution,
        completionDate: course.completionDate,
        workload: String(course.workload),
        description: course.description,
      });
    } else {
      setForm(emptyForm);
    }
    setErrors({});
  }, [course, open]);

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = 'Informe o nome do curso.';
    if (!form.institution.trim()) next.institution = 'Informe a instituição.';
    if (!form.completionDate) next.completionDate = 'Informe a data de conclusão.';
    if (!form.workload || Number(form.workload) <= 0) next.workload = 'Informe a carga horária.';
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }

    onSubmit({
      name: form.name.trim(),
      institution: form.institution.trim(),
      completionDate: form.completionDate,
      workload: Number(form.workload),
      description: form.description.trim(),
    });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title={course ? 'Editar curso' : 'Adicionar curso'} description="Registre cursos e capacitações concluídos.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Nome do curso" value={form.name} onChange={(e) => update('name', e.target.value)} error={errors.name} />
        <Input label="Instituição" value={form.institution} onChange={(e) => update('institution', e.target.value)} error={errors.institution} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Data de conclusão"
            type="date"
            value={form.completionDate}
            onChange={(e) => update('completionDate', e.target.value)}
            error={errors.completionDate}
          />
          <Input
            label="Carga horária (horas)"
            type="number"
            min={1}
            value={form.workload}
            onChange={(e) => update('workload', e.target.value)}
            error={errors.workload}
          />
        </div>
        <Textarea label="Descrição" value={form.description} onChange={(e) => update('description', e.target.value)} rows={3} />
        <div className="flex flex-col-reverse gap-2 border-t border-line pt-4 sm:flex-row sm:justify-end">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">{course ? 'Salvar alterações' : 'Adicionar curso'}</Button>
        </div>
      </form>
    </Modal>
  );
}
