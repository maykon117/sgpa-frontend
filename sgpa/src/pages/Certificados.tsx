import React, { useState } from 'react';
import { Plus, Search, Award, Pencil, Trash2, ExternalLink, FileText } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useAppData } from '@/hooks/useAppData';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { EmptyState } from '@/components/EmptyState';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { CertificateFormModal } from '@/components/CertificateFormModal';
import { Certificate } from '@/types';
import { formatDate } from '@/utils/format';

export function Certificados() {
  const { user } = useAuth();
  const { certificates, addCertificate, updateCertificate, removeCertificate } = useAppData();
  const [query, setQuery] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Certificate | null>(null);
  const [deleting, setDeleting] = useState<Certificate | null>(null);

  if (!user) return null;
  const myCertificates = certificates
    .filter((c) => c.userId === user.id)
    .filter(
      (c) =>
        !query.trim() ||
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.institution.toLowerCase().includes(query.toLowerCase())
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-ink sm:text-2xl">Certificados</h1>
          <p className="mt-1 text-sm text-ink-soft">
            {certificates.filter((c) => c.userId === user.id).length} certificados cadastrados
          </p>
        </div>
        <Button
          icon={Plus}
          onClick={() => {
            setEditing(null);
            setFormOpen(true);
          }}
        >
          Adicionar Certificado
        </Button>
      </div>

      <Input icon={Search} placeholder="Buscar por certificado ou instituição..." value={query} onChange={(e) => setQuery(e.target.value)} />

      {myCertificates.length === 0 ? (
        <EmptyState
          icon={Award}
          title="Nenhum certificado encontrado"
          description="Cadastre certificados de cursos, workshops ou eventos."
          action={
            <Button icon={Plus} onClick={() => setFormOpen(true)}>
              Adicionar Certificado
            </Button>
          }
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-line bg-card shadow-soft">
          <ul className="divide-y divide-line">
            {myCertificates.map((c) => (
              <li key={c.id} className="group flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                    <Award size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-ink">{c.name}</p>
                    <p className="text-xs text-ink-soft">{c.institution} · {formatDate(c.date)}</p>
                    <p className="mt-0.5 text-[11px] text-slate-400">Código: {c.code}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 self-end sm:self-auto">
                  {c.fileName && (
                    <span className="mr-1 flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] text-ink-soft">
                      <FileText size={12} /> {c.fileName}
                    </span>
                  )}
                  {c.url && (
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Abrir link de ${c.name}`}
                      className="rounded-lg p-2 text-ink-soft hover:bg-slate-100 hover:text-primary-600"
                    >
                      <ExternalLink size={15} />
                    </a>
                  )}
                  <button
                    onClick={() => {
                      setEditing(c);
                      setFormOpen(true);
                    }}
                    aria-label={`Editar ${c.name}`}
                    className="rounded-lg p-2 text-ink-soft hover:bg-slate-100 hover:text-primary-600"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => setDeleting(c)}
                    aria-label={`Excluir ${c.name}`}
                    className="rounded-lg p-2 text-ink-soft hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <CertificateFormModal
        open={formOpen}
        certificate={editing}
        onClose={() => setFormOpen(false)}
        onSubmit={(data) => {
          if (editing) updateCertificate(editing.id, data);
          else addCertificate({ ...data, userId: user.id });
        }}
      />
      <ConfirmDialog
        open={Boolean(deleting)}
        title="Excluir certificado"
        description={`Tem certeza que deseja excluir "${deleting?.name}"?`}
        onCancel={() => setDeleting(null)}
        onConfirm={() => {
          if (deleting) removeCertificate(deleting.id);
          setDeleting(null);
        }}
      />
    </div>
  );
}
