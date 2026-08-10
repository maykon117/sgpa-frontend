import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Hash } from 'lucide-react';
import { User, Project, Experience, Course, Certificate, Skill } from '@/types';
import { formatDate, experienceTypeLabel, skillLevelLabel } from '@/utils/format';

interface ResumeViewProps {
  user: User;
  projects: Project[];
  experiences: Experience[];
  courses: Course[];
  certificates: Certificate[];
  skills: Skill[];
}

export function ResumeView({ user, projects, experiences, courses, certificates, skills }: ResumeViewProps) {
  return (
    <div id="resume-print-area" className="mx-auto max-w-3xl rounded-2xl border border-line bg-white p-6 shadow-soft sm:p-10 print:border-0 print:shadow-none">
      <header className="border-b-2 border-primary-600 pb-5">
        <h1 className="text-2xl font-bold text-ink sm:text-3xl">{user.name}</h1>
        <p className="mt-1 text-sm font-medium text-primary-600 sm:text-base">
          {user.course}
          {user.semester ? ` · ${user.semester}º semestre` : ''}
        </p>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-ink-soft sm:text-sm">
          <span className="flex items-center gap-1.5">
            <Mail size={13} /> {user.email}
          </span>
          {user.phone && (
            <span className="flex items-center gap-1.5">
              <Phone size={13} /> {user.phone}
            </span>
          )}
          {user.location && (
            <span className="flex items-center gap-1.5">
              <MapPin size={13} /> {user.location}
            </span>
          )}
          {user.registration && (
            <span className="flex items-center gap-1.5">
              <Hash size={13} /> {user.registration}
            </span>
          )}
          {user.linkedin && (
            <span className="flex items-center gap-1.5">
              <Linkedin size={13} /> {user.linkedin}
            </span>
          )}
          {user.github && (
            <span className="flex items-center gap-1.5">
              <Github size={13} /> {user.github}
            </span>
          )}
        </div>
      </header>

      {user.bio && (
        <section className="mt-6">
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-primary-700">Resumo Profissional</h2>
          <p className="text-sm leading-relaxed text-ink-soft">{user.bio}</p>
        </section>
      )}

      <section className="mt-6">
        <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-primary-700">Formação Acadêmica</h2>
        <p className="text-sm text-ink">{user.course}</p>
        <p className="text-xs text-ink-soft">
          {user.semester ? `${user.semester}º semestre em andamento` : 'Curso em andamento'}
        </p>
      </section>

      {experiences.length > 0 && (
        <section className="mt-6">
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-primary-700">Experiências</h2>
          <div className="space-y-3.5">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <p className="text-sm font-semibold text-ink">
                    {exp.role} · {exp.institution}
                  </p>
                  <p className="text-xs text-ink-soft">
                    {formatDate(exp.startDate)} — {exp.endDate ? formatDate(exp.endDate) : 'Atual'}
                  </p>
                </div>
                <p className="text-xs text-ink-soft">{experienceTypeLabel(exp.type)}</p>
                <p className="mt-1 text-sm text-ink-soft">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="mt-6">
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-primary-700">Projetos</h2>
          <div className="space-y-3">
            {projects.map((p) => (
              <div key={p.id}>
                <p className="text-sm font-semibold text-ink">{p.name}</p>
                <p className="text-sm text-ink-soft">{p.description}</p>
                <p className="mt-0.5 text-xs text-primary-700">{p.technologies.join(' · ')}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section className="mt-6">
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-primary-700">Habilidades</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <span key={s.id} className="rounded-full border border-line px-2.5 py-1 text-xs text-ink">
                {s.name} <span className="text-ink-soft">· {skillLevelLabel(s.level)}</span>
              </span>
            ))}
          </div>
        </section>
      )}

      {courses.length > 0 && (
        <section className="mt-6">
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-primary-700">Cursos</h2>
          <ul className="space-y-1.5">
            {courses.map((c) => (
              <li key={c.id} className="flex flex-wrap items-baseline justify-between gap-x-3 text-sm">
                <span className="text-ink">
                  {c.name} <span className="text-ink-soft">— {c.institution}</span>
                </span>
                <span className="text-xs text-ink-soft">{formatDate(c.completionDate)} · {c.workload}h</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {certificates.length > 0 && (
        <section className="mt-6">
          <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-primary-700">Certificados</h2>
          <ul className="space-y-1.5">
            {certificates.map((c) => (
              <li key={c.id} className="flex flex-wrap items-baseline justify-between gap-x-3 text-sm">
                <span className="text-ink">
                  {c.name} <span className="text-ink-soft">— {c.institution}</span>
                </span>
                <span className="text-xs text-ink-soft">{formatDate(c.date)}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
