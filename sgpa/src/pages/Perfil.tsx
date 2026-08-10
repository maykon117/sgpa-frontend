import React, { useState } from 'react';
import {
  Mail,
  Hash,
  GraduationCap,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Pencil,
  Briefcase,
  FolderKanban,
  BookOpen,
  Award,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useAppData } from '@/hooks/useAppData';
import { Button } from '@/components/Button';
import { SkillTag } from '@/components/SkillTag';
import { EmptyState } from '@/components/EmptyState';
import { ProfileEditModal } from '@/components/ProfileEditModal';
import { initials, formatDate, experienceTypeLabel } from '@/utils/format';
import { calculateProfileCompletion } from '@/utils/profileCompletion';

export function Perfil() {
  const { user, updateUser } = useAuth();
  const { projects, experiences, courses, certificates, skills } = useAppData();
  const [editOpen, setEditOpen] = useState(false);

  if (!user) return null;

  const myProjects = projects.filter((p) => p.userId === user.id);
  const myExperiences = experiences.filter((e) => e.userId === user.id);
  const myCourses = courses.filter((c) => c.userId === user.id);
  const myCertificates = certificates.filter((c) => c.userId === user.id);
  const mySkills = skills.filter((s) => s.userId === user.id);

  const completion = calculateProfileCompletion({
    user,
    hasProjects: myProjects.length > 0,
    hasExperiences: myExperiences.length > 0,
    hasCourses: myCourses.length > 0,
    hasCertificates: myCertificates.length > 0,
    hasSkills: mySkills.length > 0,
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-ink sm:text-2xl">Meu Perfil</h1>
          <p className="mt-1 text-sm text-ink-soft">Visualize e gerencie seus dados acadêmicos e profissionais.</p>
        </div>
        <Button icon={Pencil} onClick={() => setEditOpen(true)}>
          Editar Perfil
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-1">
          <div className="rounded-2xl border border-line bg-card p-6 text-center shadow-soft">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-primary-600 text-2xl font-bold text-white">
              {initials(user.name)}
            </div>
            <h2 className="mt-4 text-lg font-bold text-ink">{user.name}</h2>
            <p className="text-sm text-ink-soft">{user.course}</p>
            {user.semester && (
              <span className="mt-2 inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
                {user.semester}º semestre
              </span>
            )}

            <div className="mt-5 space-y-1">
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="font-medium text-ink">Completude</span>
                <span className="font-semibold text-primary-600">{completion}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-primary-600" style={{ width: `${completion}%` }} />
              </div>
            </div>

            <div className="mt-6 space-y-2.5 border-t border-line pt-5 text-left text-sm">
              <div className="flex items-center gap-2.5 text-ink-soft">
                <Mail size={15} className="flex-shrink-0" />
                <span className="truncate">{user.email}</span>
              </div>
              {user.registration && (
                <div className="flex items-center gap-2.5 text-ink-soft">
                  <Hash size={15} className="flex-shrink-0" />
                  <span>Matrícula {user.registration}</span>
                </div>
              )}
              {user.course && (
                <div className="flex items-center gap-2.5 text-ink-soft">
                  <GraduationCap size={15} className="flex-shrink-0" />
                  <span className="truncate">{user.course}</span>
                </div>
              )}
              {user.phone && (
                <div className="flex items-center gap-2.5 text-ink-soft">
                  <Phone size={15} className="flex-shrink-0" />
                  <span>{user.phone}</span>
                </div>
              )}
              {user.location && (
                <div className="flex items-center gap-2.5 text-ink-soft">
                  <MapPin size={15} className="flex-shrink-0" />
                  <span>{user.location}</span>
                </div>
              )}
              {user.linkedin && (
                <div className="flex items-center gap-2.5 text-ink-soft">
                  <Linkedin size={15} className="flex-shrink-0" />
                  <span className="truncate">{user.linkedin}</span>
                </div>
              )}
              {user.github && (
                <div className="flex items-center gap-2.5 text-ink-soft">
                  <Github size={15} className="flex-shrink-0" />
                  <span className="truncate">{user.github}</span>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-card p-6 shadow-soft">
            <h3 className="mb-3 text-sm font-semibold text-ink">Habilidades</h3>
            {mySkills.length === 0 ? (
              <p className="text-xs text-ink-soft">Nenhuma habilidade cadastrada.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {mySkills.map((skill) => (
                  <SkillTag key={skill.id} skill={skill} />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6 lg:col-span-2">
          <section className="rounded-2xl border border-line bg-card p-6 shadow-soft">
            <h3 className="mb-2 text-sm font-semibold text-ink">Biografia</h3>
            <p className="text-sm leading-relaxed text-ink-soft">
              {user.bio || 'Nenhuma biografia adicionada ainda. Clique em "Editar Perfil" para escrever uma.'}
            </p>
          </section>

          <section className="rounded-2xl border border-line bg-card p-6 shadow-soft">
            <div className="mb-3 flex items-center gap-2">
              <Briefcase size={16} className="text-primary-600" />
              <h3 className="text-sm font-semibold text-ink">Experiências</h3>
            </div>
            {myExperiences.length === 0 ? (
              <EmptyState icon={Briefcase} title="Nenhuma experiência" description="Cadastre suas experiências na página de Experiências." />
            ) : (
              <ul className="space-y-4">
                {myExperiences.map((exp) => (
                  <li key={exp.id} className="border-l-2 border-primary-200 pl-4">
                    <p className="text-sm font-semibold text-ink">{exp.role}</p>
                    <p className="text-xs text-ink-soft">
                      {exp.institution} · {experienceTypeLabel(exp.type)}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-400">
                      {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
                    </p>
                    <p className="mt-1.5 text-sm text-ink-soft">{exp.description}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="rounded-2xl border border-line bg-card p-6 shadow-soft">
            <div className="mb-3 flex items-center gap-2">
              <FolderKanban size={16} className="text-primary-600" />
              <h3 className="text-sm font-semibold text-ink">Projetos</h3>
            </div>
            {myProjects.length === 0 ? (
              <EmptyState icon={FolderKanban} title="Nenhum projeto" description="Cadastre projetos na página de Projetos." />
            ) : (
              <ul className="divide-y divide-line">
                {myProjects.map((p) => (
                  <li key={p.id} className="py-3">
                    <p className="text-sm font-semibold text-ink">{p.name}</p>
                    <p className="mt-0.5 text-xs text-ink-soft">{p.description}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {p.technologies.map((t) => (
                        <span key={t} className="rounded-full bg-primary-50 px-2 py-0.5 text-[11px] font-medium text-primary-700">
                          {t}
                        </span>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <section className="rounded-2xl border border-line bg-card p-6 shadow-soft">
              <div className="mb-3 flex items-center gap-2">
                <BookOpen size={16} className="text-primary-600" />
                <h3 className="text-sm font-semibold text-ink">Cursos ({myCourses.length})</h3>
              </div>
              <ul className="space-y-2.5">
                {myCourses.slice(0, 5).map((c) => (
                  <li key={c.id} className="text-sm">
                    <p className="font-medium text-ink">{c.name}</p>
                    <p className="text-xs text-ink-soft">{c.institution} · {formatDate(c.completionDate)}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl border border-line bg-card p-6 shadow-soft">
              <div className="mb-3 flex items-center gap-2">
                <Award size={16} className="text-primary-600" />
                <h3 className="text-sm font-semibold text-ink">Certificados ({myCertificates.length})</h3>
              </div>
              <ul className="space-y-2.5">
                {myCertificates.slice(0, 5).map((c) => (
                  <li key={c.id} className="text-sm">
                    <p className="font-medium text-ink">{c.name}</p>
                    <p className="text-xs text-ink-soft">{c.institution} · {formatDate(c.date)}</p>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>

      <ProfileEditModal
        open={editOpen}
        user={user}
        onClose={() => setEditOpen(false)}
        onSave={(patch) => updateUser(user.id, patch)}
      />
    </div>
  );
}
