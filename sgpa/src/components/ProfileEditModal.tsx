import React, { useState } from 'react';
import { Modal } from './Modal';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { Select } from './Select';
import { Button } from './Button';
import { User } from '@/types';

interface ProfileEditModalProps {
  open: boolean;
  user: User;
  onClose: () => void;
  onSave: (patch: Partial<User>) => void;
}

const courseOptions = [
  { value: 'Análise e Desenvolvimento de Sistemas', label: 'Análise e Desenvolvimento de Sistemas' },
  { value: 'Ciência da Computação', label: 'Ciência da Computação' },
  { value: 'Engenharia de Software', label: 'Engenharia de Software' },
  { value: 'Sistemas de Informação', label: 'Sistemas de Informação' },
];

export function ProfileEditModal({ open, user, onClose, onSave }: ProfileEditModalProps) {
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    registration: user.registration ?? '',
    course: user.course ?? '',
    semester: String(user.semester ?? 1),
    bio: user.bio ?? '',
    phone: user.phone ?? '',
    location: user.location ?? '',
    linkedin: user.linkedin ?? '',
    github: user.github ?? '',
  });

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name: form.name,
      email: form.email,
      registration: form.registration,
      course: form.course,
      semester: Number(form.semester),
      bio: form.bio,
      phone: form.phone,
      location: form.location,
      linkedin: form.linkedin,
      github: form.github,
    });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Editar perfil" description="Atualize seus dados pessoais e acadêmicos." size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Nome completo" value={form.name} onChange={(e) => update('name', e.target.value)} />
          <Input label="E-mail" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Matrícula" value={form.registration} onChange={(e) => update('registration', e.target.value)} />
          <Select
            label="Semestre"
            value={form.semester}
            onChange={(e) => update('semester', e.target.value)}
            options={Array.from({ length: 10 }, (_, i) => ({ value: String(i + 1), label: `${i + 1}º semestre` }))}
          />
        </div>
        <Select
          label="Curso"
          value={form.course}
          onChange={(e) => update('course', e.target.value)}
          options={courseOptions}
        />
        <Textarea
          label="Biografia"
          value={form.bio}
          onChange={(e) => update('bio', e.target.value)}
          placeholder="Fale brevemente sobre você, seus interesses e objetivos."
          rows={3}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Telefone" value={form.phone} onChange={(e) => update('phone', e.target.value)} />
          <Input label="Localização" value={form.location} onChange={(e) => update('location', e.target.value)} />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="LinkedIn" value={form.linkedin} onChange={(e) => update('linkedin', e.target.value)} placeholder="linkedin.com/in/seunome" />
          <Input label="GitHub" value={form.github} onChange={(e) => update('github', e.target.value)} placeholder="github.com/seunome" />
        </div>

        <div className="flex flex-col-reverse gap-2 border-t border-line pt-4 sm:flex-row sm:justify-end">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">Salvar alterações</Button>
        </div>
      </form>
    </Modal>
  );
}
