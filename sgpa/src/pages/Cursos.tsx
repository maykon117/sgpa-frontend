import React, { useState } from 'react';
import { Plus, Search, BookOpen, Pencil, Trash2, Clock } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useAppData } from '@/hooks/useAppData';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { EmptyState } from '@/components/EmptyState';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { CourseFormModal } from '@/components/CourseFormModal';
import { Course } from '@/types';
import { formatDate } from '@/utils/format';

export function Cursos() {
  const { user } = useAuth();
  const { courses, addCourse, updateCourse, removeCourse } = useAppData();
  const [query, setQuery] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Course | null>(null);
  const [deleting, setDeleting] = useState<Course | null>(null);

  if (!user) return null;
  const myCourses = courses
    .filter((c) => c.userId === user.id)
    .filter(
      (c) =>
        !query.trim() ||
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.institution.toLowerCase().includes(query.toLowerCase())
    )
    .sort((a, b) => new Date(b.completionDate).getTime() - new Date(a.completionDate).getTime());

  const totalHours = courses.filter((c) => c.userId === user.id).reduce((sum, c) => sum + c.workload, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-ink sm:text-2xl">Cursos</h1>
          <p className="mt-1 text-sm text-ink-soft">
            {courses.filter((c) => c.userId === user.id).length} cursos concluídos · {totalHours}h de carga horária total
          </p>
        </div>
        <Button
          icon={Plus}
          onClick={() => {
            setEditing(null);
            setFormOpen(true);
          }}
        >
          Adicionar Curso
        </Button>
      </div>

      <Input icon={Search} placeholder="Buscar por curso ou instituição..." value={query} onChange={(e) => setQuery(e.target.value)} />

      {myCourses.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="Nenhum curso encontrado"
          description="Cadastre cursos livres, extensões ou capacitações concluídas."
          action={
            <Button icon={Plus} onClick={() => setFormOpen(true)}>
              Adicionar Curso
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {myCourses.map((c) => (
            <div key={c.id} className="group flex flex-col rounded-2xl border border-line bg-card p-4 shadow-soft">
              <div className="flex items-start justify-between gap-2">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                  <BookOpen size={16} />
                </div>
                <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
                  <button
                    onClick={() => {
                      setEditing(c);
                      setFormOpen(true);
                    }}
                    aria-label={`Editar ${c.name}`}
                    className="rounded-md p-1.5 text-ink-soft hover:bg-slate-100 hover:text-primary-600"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => setDeleting(c)}
                    aria-label={`Excluir ${c.name}`}
                    className="rounded-md p-1.5 text-ink-soft hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <h3 className="mt-3 text-sm font-semibold text-ink">{c.name}</h3>
              <p className="mt-0.5 text-xs text-ink-soft">{c.institution}</p>
              {c.description && <p className="mt-2 line-clamp-2 text-xs text-ink-soft">{c.description}</p>}
              <div className="mt-auto flex items-center justify-between border-t border-line pt-3 text-xs text-ink-soft">
                <span>{formatDate(c.completionDate)}</span>
                <span className="flex items-center gap-1">
                  <Clock size={12} /> {c.workload}h
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <CourseFormModal
        open={formOpen}
        course={editing}
        onClose={() => setFormOpen(false)}
        onSubmit={(data) => {
          if (editing) updateCourse(editing.id, data);
          else addCourse({ ...data, userId: user.id });
        }}
      />
      <ConfirmDialog
        open={Boolean(deleting)}
        title="Excluir curso"
        description={`Tem certeza que deseja excluir "${deleting?.name}"?`}
        onCancel={() => setDeleting(null)}
        onConfirm={() => {
          if (deleting) removeCourse(deleting.id);
          setDeleting(null);
        }}
      />
    </div>
  );
}
