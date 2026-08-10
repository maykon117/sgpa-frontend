import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Users,
  GraduationCap,
  ShieldCheck,
  FolderKanban,
  Briefcase,
  Search,
  Eye,
  Pencil,
  Ban,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useAppData } from '@/hooks/useAppData';
import { StatCard } from '@/components/StatCard';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { Modal } from '@/components/Modal';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { initials, roleLabel, formatDate } from '@/utils/format';
import { User } from '@/types';

export function Admin() {
  const { users, setUserStatus } = useAuth();
  const { projects, experiences } = useAppData();
  const [searchParams] = useSearchParams();

  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [roleFilter, setRoleFilter] = useState('todos');
  const [viewing, setViewing] = useState<User | null>(null);
  const [toggling, setToggling] = useState<User | null>(null);

  const totals = useMemo(
    () => ({
      alunos: users.filter((u) => u.role === 'aluno').length,
      professores: users.filter((u) => u.role === 'professor').length,
      usuarios: users.length,
      projetos: projects.length,
      experiencias: experiences.length,
    }),
    [users, projects, experiences]
  );

  const filtered = users.filter((u) => {
    const matchesQuery =
      !query.trim() ||
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.email.toLowerCase().includes(query.toLowerCase());
    const matchesRole = roleFilter === 'todos' || u.role === roleFilter;
    return matchesQuery && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-ink sm:text-2xl">Administração</h1>
        <p className="mt-1 text-sm text-ink-soft">Visão geral da plataforma e gerenciamento de usuários.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
        <StatCard icon={GraduationCap} label="Total de alunos" value={totals.alunos} tone="blue" />
        <StatCard icon={Users} label="Total de professores" value={totals.professores} tone="violet" />
        <StatCard icon={ShieldCheck} label="Total de usuários" value={totals.usuarios} tone="green" />
        <StatCard icon={FolderKanban} label="Total de projetos" value={totals.projetos} tone="amber" />
        <StatCard icon={Briefcase} label="Total de experiências" value={totals.experiencias} tone="blue" />
      </div>

      <div className="rounded-2xl border border-line bg-card p-4 shadow-soft sm:p-5">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="sm:col-span-2">
            <Input icon={Search} placeholder="Buscar por nome ou e-mail..." value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <Select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            options={[
              { value: 'todos', label: 'Todos os tipos' },
              { value: 'aluno', label: 'Alunos' },
              { value: 'professor', label: 'Professores' },
              { value: 'administrador', label: 'Administradores' },
            ]}
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-line bg-card shadow-soft">
        <div className="hidden overflow-x-auto sm:block">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-ink-soft">
              <tr>
                <th className="px-4 py-3 font-medium">Nome</th>
                <th className="px-4 py-3 font-medium">E-mail</th>
                <th className="px-4 py-3 font-medium">Curso</th>
                <th className="px-4 py-3 font-medium">Tipo</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50">
                  <td className="flex items-center gap-2.5 whitespace-nowrap px-4 py-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-[11px] font-bold text-white">
                      {initials(u.name)}
                    </span>
                    {u.name}
                  </td>
                  <td className="px-4 py-3 text-ink-soft">{u.email}</td>
                  <td className="px-4 py-3 text-ink-soft">{u.course ?? '—'}</td>
                  <td className="px-4 py-3 text-ink-soft">{roleLabel(u.role)}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        u.status === 'ativo' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {u.status === 'ativo' ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setViewing(u)}
                        aria-label={`Visualizar ${u.name}`}
                        className="rounded-lg p-2 text-ink-soft hover:bg-slate-100 hover:text-primary-600"
                      >
                        <Eye size={15} />
                      </button>
                      <button
                        onClick={() => setViewing(u)}
                        aria-label={`Editar ${u.name}`}
                        className="rounded-lg p-2 text-ink-soft hover:bg-slate-100 hover:text-primary-600"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => setToggling(u)}
                        aria-label={u.status === 'ativo' ? `Desativar ${u.name}` : `Ativar ${u.name}`}
                        className={`rounded-lg p-2 hover:bg-slate-100 ${
                          u.status === 'ativo' ? 'text-ink-soft hover:text-red-600' : 'text-ink-soft hover:text-emerald-600'
                        }`}
                      >
                        {u.status === 'ativo' ? <Ban size={15} /> : <CheckCircle2 size={15} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="divide-y divide-line sm:hidden">
          {filtered.map((u) => (
            <div key={u.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">
                    {initials(u.name)}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-ink">{u.name}</p>
                    <p className="truncate text-xs text-ink-soft">{u.email}</p>
                  </div>
                </div>
                <span
                  className={`flex-shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                    u.status === 'ativo' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {u.status === 'ativo' ? 'Ativo' : 'Inativo'}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-ink-soft">{roleLabel(u.role)}</span>
                <div className="flex items-center gap-1">
                  <button onClick={() => setViewing(u)} className="rounded-lg p-2 text-ink-soft hover:bg-slate-100">
                    <Eye size={15} />
                  </button>
                  <button onClick={() => setToggling(u)} className="rounded-lg p-2 text-ink-soft hover:bg-slate-100">
                    {u.status === 'ativo' ? <Ban size={15} /> : <CheckCircle2 size={15} />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal open={Boolean(viewing)} onClose={() => setViewing(null)} title={viewing?.name ?? ''} size="sm">
        {viewing && (
          <div className="space-y-2 text-sm">
            <p>
              <span className="text-ink-soft">E-mail:</span> {viewing.email}
            </p>
            <p>
              <span className="text-ink-soft">Tipo:</span> {roleLabel(viewing.role)}
            </p>
            {viewing.course && (
              <p>
                <span className="text-ink-soft">Curso:</span> {viewing.course}
              </p>
            )}
            {viewing.registration && (
              <p>
                <span className="text-ink-soft">Matrícula:</span> {viewing.registration}
              </p>
            )}
            <p>
              <span className="text-ink-soft">Cadastrado em:</span> {formatDate(viewing.createdAt)}
            </p>
            <p>
              <span className="text-ink-soft">Status:</span> {viewing.status === 'ativo' ? 'Ativo' : 'Inativo'}
            </p>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={Boolean(toggling)}
        variant={toggling?.status === 'ativo' ? 'danger' : 'primary'}
        title={toggling?.status === 'ativo' ? 'Desativar usuário' : 'Ativar usuário'}
        description={`Tem certeza que deseja ${toggling?.status === 'ativo' ? 'desativar' : 'ativar'} "${toggling?.name}"?`}
        confirmLabel={toggling?.status === 'ativo' ? 'Desativar' : 'Ativar'}
        onCancel={() => setToggling(null)}
        onConfirm={() => {
          if (toggling) setUserStatus(toggling.id, toggling.status === 'ativo' ? 'inativo' : 'ativo');
          setToggling(null);
        }}
      />
    </div>
  );
}
