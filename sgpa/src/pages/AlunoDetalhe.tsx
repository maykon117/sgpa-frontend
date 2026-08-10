import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Mail, Hash, GraduationCap, MapPin, Printer } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useAppData } from '@/hooks/useAppData';
import { Button } from '@/components/Button';
import { SkillTag } from '@/components/SkillTag';
import { EmptyState } from '@/components/EmptyState';
import { ResumeView } from '@/components/ResumeView';
import { initials, formatDate, experienceTypeLabel } from '@/utils/format';
import { Briefcase, FolderKanban } from 'lucide-react';

export function AlunoDetalhe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users } = useAuth();
  const { projects, experiences, courses, certificates, skills } = useAppData();

  const student = users.find((u) => u.id === id);

  if (!student) {
    return (
      <EmptyState
        icon={GraduationCap}
        title="Aluno não encontrado"
        description="O perfil que você tentou acessar não existe mais."
        action={
          <Button onClick={() => navigate('/alunos')} icon={ArrowLeft}>
            Voltar para consulta
          </Button>
        }
      />
    );
  }

  const studentProjects = projects.filter((p) => p.userId === student.id);
  const studentExperiences = experiences.filter((e) => e.userId === student.id);
  const studentCourses = courses.filter((c) => c.userId === student.id);
  const studentCertificates = certificates.filter((c) => c.userId === student.id);
  const studentSkills = skills.filter((s) => s.userId === student.id);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between no-print">
        <button
          onClick={() => navigate('/alunos')}
          className="flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-ink"
        >
          <ArrowLeft size={16} /> Voltar para consulta
        </button>
        <Button variant="outline" icon={Printer} onClick={() => window.print()}>
          Imprimir / Salvar PDF
        </Button>
      </div>

      <div className="rounded-2xl border border-line bg-card p-6 shadow-soft no-print">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <span className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-primary-600 text-lg font-bold text-white">
            {initials(student.name)}
          </span>
          <div className="min-w-0 flex-1">
            <h1 className="text-lg font-bold text-ink sm:text-xl">{student.name}</h1>
            <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-soft">
              <span className="flex items-center gap-1.5">
                <GraduationCap size={14} /> {student.course}
              </span>
              <span className="flex items-center gap-1.5">
                <Mail size={14} /> {student.email}
              </span>
              {student.registration && (
                <span className="flex items-center gap-1.5">
                  <Hash size={14} /> {student.registration}
                </span>
              )}
              {student.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} /> {student.location}
                </span>
              )}
            </div>
          </div>
          {student.semester && (
            <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
              {student.semester}º semestre
            </span>
          )}
        </div>
        {student.bio && <p className="mt-4 text-sm leading-relaxed text-ink-soft">{student.bio}</p>}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 no-print">
        <div className="space-y-6 lg:col-span-2">
          <section className="rounded-2xl border border-line bg-card p-6 shadow-soft">
            <div className="mb-3 flex items-center gap-2">
              <Briefcase size={16} className="text-primary-600" />
              <h2 className="text-sm font-semibold text-ink">Experiências</h2>
            </div>
            {studentExperiences.length === 0 ? (
              <p className="text-xs text-ink-soft">Nenhuma experiência cadastrada.</p>
            ) : (
              <ul className="space-y-3">
                {studentExperiences.map((exp) => (
                  <li key={exp.id} className="border-l-2 border-primary-200 pl-4">
                    <p className="text-sm font-semibold text-ink">{exp.role}</p>
                    <p className="text-xs text-ink-soft">
                      {exp.institution} · {experienceTypeLabel(exp.type)}
                    </p>
                    <p className="text-xs text-slate-400">
                      {formatDate(exp.startDate)} — {exp.endDate ? formatDate(exp.endDate) : 'Atual'}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="rounded-2xl border border-line bg-card p-6 shadow-soft">
            <div className="mb-3 flex items-center gap-2">
              <FolderKanban size={16} className="text-primary-600" />
              <h2 className="text-sm font-semibold text-ink">Projetos</h2>
            </div>
            {studentProjects.length === 0 ? (
              <p className="text-xs text-ink-soft">Nenhum projeto cadastrado.</p>
            ) : (
              <ul className="divide-y divide-line">
                {studentProjects.map((p) => (
                  <li key={p.id} className="py-3">
                    <p className="text-sm font-semibold text-ink">{p.name}</p>
                    <p className="text-xs text-ink-soft">{p.description}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-2xl border border-line bg-card p-6 shadow-soft">
            <h2 className="mb-3 text-sm font-semibold text-ink">Habilidades</h2>
            {studentSkills.length === 0 ? (
              <p className="text-xs text-ink-soft">Nenhuma habilidade cadastrada.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {studentSkills.map((s) => (
                  <SkillTag key={s.id} skill={s} />
                ))}
              </div>
            )}
          </section>

          <section className="rounded-2xl border border-line bg-card p-6 shadow-soft">
            <h2 className="mb-3 text-sm font-semibold text-ink">Cursos ({studentCourses.length})</h2>
            <ul className="space-y-2 text-sm">
              {studentCourses.slice(0, 5).map((c) => (
                <li key={c.id}>
                  <p className="font-medium text-ink">{c.name}</p>
                  <p className="text-xs text-ink-soft">{c.institution}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-line bg-card p-6 shadow-soft">
            <h2 className="mb-3 text-sm font-semibold text-ink">Certificados ({studentCertificates.length})</h2>
            <ul className="space-y-2 text-sm">
              {studentCertificates.slice(0, 5).map((c) => (
                <li key={c.id}>
                  <p className="font-medium text-ink">{c.name}</p>
                  <p className="text-xs text-ink-soft">{c.institution}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <div className="hidden print:block">
        <ResumeView
          user={student}
          projects={studentProjects}
          experiences={studentExperiences}
          courses={studentCourses}
          certificates={studentCertificates}
          skills={studentSkills}
        />
      </div>
    </div>
  );
}
