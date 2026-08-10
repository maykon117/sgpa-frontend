import React, { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, Users, GraduationCap, ChevronRight, LayoutGrid, List as ListIcon } from 'lucide-react';
import { useAppData } from '@/hooks/useAppData';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { EmptyState } from '@/components/EmptyState';
import { initials } from '@/utils/format';

export function Alunos() {
  const { users } = useAuth();
  const { skills, experiences, projects } = useAppData();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [courseFilter, setCourseFilter] = useState('todos');
  const [semesterFilter, setSemesterFilter] = useState('todos');
  const [skillFilter, setSkillFilter] = useState('todas');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const students = users.filter((u) => u.role === 'aluno');

  const courseOptions = useMemo(
    () => Array.from(new Set(students.map((s) => s.course).filter(Boolean))) as string[],
    [students]
  );
  const semesterOptions = useMemo(
    () => Array.from(new Set(students.map((s) => s.semester).filter(Boolean))).sort((a, b) => (a as number) - (b as number)),
    [students]
  );
  const skillOptions = useMemo(() => Array.from(new Set(skills.map((s) => s.name))).sort(), [skills]);

  const filtered = students.filter((s) => {
    const matchesQuery =
      !query.trim() ||
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.registration?.toLowerCase().includes(query.toLowerCase());
    const matchesCourse = courseFilter === 'todos' || s.course === courseFilter;
    const matchesSemester = semesterFilter === 'todos' || String(s.semester) === semesterFilter;
    const matchesSkill =
      skillFilter === 'todas' || skills.some((sk) => sk.userId === s.id && sk.name === skillFilter);
    return matchesQuery && matchesCourse && matchesSemester && matchesSkill;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-ink sm:text-2xl">Consultar Alunos</h1>
        <p className="mt-1 text-sm text-ink-soft">Pesquise e filtre os perfis acadêmicos dos alunos.</p>
      </div>

      <div className="rounded-2xl border border-line bg-card p-4 shadow-soft sm:p-5">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Input icon={Search} placeholder="Buscar por nome ou matrícula..." value={query} onChange={(e) => setQuery(e.target.value)} />
          <Select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            options={[{ value: 'todos', label: 'Todos os cursos' }, ...courseOptions.map((c) => ({ value: c, label: c }))]}
          />
          <Select
            value={semesterFilter}
            onChange={(e) => setSemesterFilter(e.target.value)}
            options={[
              { value: 'todos', label: 'Todos os semestres' },
              ...semesterOptions.map((s) => ({ value: String(s), label: `${s}º semestre` })),
            ]}
          />
          <Select
            value={skillFilter}
            onChange={(e) => setSkillFilter(e.target.value)}
            options={[{ value: 'todas', label: 'Todas as habilidades' }, ...skillOptions.map((s) => ({ value: s, label: s }))]}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-ink-soft">{filtered.length} aluno(s) encontrado(s)</p>
        <div className="flex gap-1 rounded-lg border border-line bg-white p-1">
          <button
            onClick={() => setView('grid')}
            aria-label="Ver em cards"
            className={`rounded-md p-1.5 ${view === 'grid' ? 'bg-primary-50 text-primary-600' : 'text-ink-soft'}`}
          >
            <LayoutGrid size={15} />
          </button>
          <button
            onClick={() => setView('list')}
            aria-label="Ver em tabela"
            className={`rounded-md p-1.5 ${view === 'list' ? 'bg-primary-50 text-primary-600' : 'text-ink-soft'}`}
          >
            <ListIcon size={15} />
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={Users} title="Nenhum aluno encontrado" description="Tente ajustar os filtros de busca." />
      ) : view === 'grid' ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => {
            const skillCount = skills.filter((sk) => sk.userId === s.id).length;
            const experienceCount = experiences.filter((e) => e.userId === s.id).length;
            const projectCount = projects.filter((p) => p.userId === s.id).length;
            return (
              <button
                key={s.id}
                onClick={() => navigate(`/alunos/${s.id}`)}
                className="flex flex-col rounded-2xl border border-line bg-card p-5 text-left shadow-soft transition-shadow hover:shadow-card"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary-600 text-sm font-bold text-white">
                    {initials(s.name)}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-ink">{s.name}</p>
                    <p className="flex items-center gap-1 truncate text-xs text-ink-soft">
                      <GraduationCap size={12} /> {s.course}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-4 border-t border-line pt-3 text-xs text-ink-soft">
                  <span>{s.semester}º sem.</span>
                  <span>{projectCount} proj.</span>
                  <span>{experienceCount} exp.</span>
                  <span>{skillCount} hab.</span>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-line bg-card shadow-soft">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-ink-soft">
                <tr>
                  <th className="px-4 py-3 font-medium">Nome</th>
                  <th className="px-4 py-3 font-medium">Curso</th>
                  <th className="px-4 py-3 font-medium">Semestre</th>
                  <th className="px-4 py-3 font-medium">Matrícula</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {filtered.map((s) => (
                  <tr
                    key={s.id}
                    onClick={() => navigate(`/alunos/${s.id}`)}
                    className="cursor-pointer hover:bg-slate-50"
                  >
                    <td className="flex items-center gap-2.5 whitespace-nowrap px-4 py-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-[11px] font-bold text-white">
                        {initials(s.name)}
                      </span>
                      {s.name}
                    </td>
                    <td className="px-4 py-3 text-ink-soft">{s.course}</td>
                    <td className="px-4 py-3 text-ink-soft">{s.semester}º</td>
                    <td className="px-4 py-3 text-ink-soft">{s.registration}</td>
                    <td className="px-4 py-3 text-right">
                      <ChevronRight size={16} className="ml-auto text-ink-soft" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
