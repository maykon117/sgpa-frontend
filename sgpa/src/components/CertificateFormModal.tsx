import React, { useEffect, useState } from 'react';
import { Modal } from './Modal';
import { Input } from './Input';
import { Button } from './Button';
import { Certificate } from '@/types';

interface CertificateFormModalProps {
  open: boolean;
  certificate?: Certificate | null;
  onClose: () => void;
  onSubmit: (data: Omit<Certificate, 'id' | 'userId'>) => void;
}

const emptyForm = {
  name: '',
  institution: '',
  date: new Date().toISOString().slice(0, 10),
  code: '',
  url: '',
  fileName: '',
};

export function CertificateFormModal({ open, certificate, onClose, onSubmit }: CertificateFormModalProps) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (certificate) {
      setForm({
        name: certificate.name,
        institution: certificate.institution,
        date: certificate.date,
        code: certificate.code,
        url: certificate.url ?? '',
        fileName: certificate.fileName ?? '',
      });
    } else {
      setForm(emptyForm);
    }
    setErrors({});
  }, [certificate, open]);

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = 'Informe o nome do certificado.';
    if (!form.institution.trim()) next.institution = 'Informe a instituição.';
    if (!form.date) next.date = 'Informe a data.';
    if (!form.code.trim()) next.code = 'Informe o código/ID do certificado.';
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }

    onSubmit({
      name: form.name.trim(),
      institution: form.institution.trim(),
      date: form.date,
      code: form.code.trim(),
      url: form.url.trim() || undefined,
      fileName: form.fileName.trim() || undefined,
    });
    onClose();
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) update('fileName', file.name);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={certificate ? 'Editar certificado' : 'Adicionar certificado'}
      description="Cadastre certificados de cursos, eventos ou capacitações."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Nome" value={form.name} onChange={(e) => update('name', e.target.value)} error={errors.name} />
        <Input label="Instituição" value={form.institution} onChange={(e) => update('institution', e.target.value)} error={errors.institution} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Data" type="date" value={form.date} onChange={(e) => update('date', e.target.value)} error={errors.date} />
          <Input label="Código/ID do certificado" value={form.code} onChange={(e) => update('code', e.target.value)} error={errors.code} />
        </div>
        <Input label="Link" value={form.url} onChange={(e) => update('url', e.target.value)} placeholder="https://" />
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">Arquivo do certificado</label>
          <input
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={handleFile}
            className="block w-full text-sm text-ink-soft file:mr-3 file:rounded-lg file:border-0 file:bg-primary-50 file:px-3.5 file:py-2 file:text-sm file:font-medium file:text-primary-700 hover:file:bg-primary-100"
          />
          {form.fileName && <p className="mt-1.5 text-xs text-ink-soft">Arquivo selecionado: {form.fileName}</p>}
        </div>
        <div className="flex flex-col-reverse gap-2 border-t border-line pt-4 sm:flex-row sm:justify-end">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">{certificate ? 'Salvar alterações' : 'Adicionar certificado'}</Button>
        </div>
      </form>
    </Modal>
  );
}
