import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  FolderKanban,
  BookOpen,
  Award,
  Briefcase,
  TrendingUp,
  Bell,
  ArrowRight,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useAppData } from '@/hooks/useAppData';
import { ProfileCard } from '@/components/ProfileCard';
import { StatCard } from '@/components/StatCard';
import { ProjectCard } from '@/components/ProjectCard';
import { SkillTag } from '@/components/SkillTag';
import { ActivityCard } from '@/components/ActivityCard';
import { NotificationCard } from '@/components/NotificationCard';
import { EmptyState } from '@/components/EmptyState';
import { EvolutionChart } from '@/components/EvolutionChart';
import { calculateProfileCompletion } from '@/utils/profileCompletion';
import { buildSemesterEvolution } from '@/utils/evolution';

export function Dashboard() {
  const { user } = useAuth();
  const { projects, experiences, courses, certificates, skills, activities, notifications } =
    useAppData();

  if (!user) return null;

  const myProjects = projects.filter((p) => p.userId === user.id);
  const myExperiences = experiences.filter((e) => e.userId === user.id);
  const myCourses = courses.filter((c) => c.userId === user.id);
  const myCertificates = certificates.filter((c) => c.userId === user.id);
  const mySkills = skills.filter((s) => s.userId === user.id);
  const myActivities = activities.filter((a) => a.userId === user.id).slice(0, 6);
  const myNotifications = notifications
    .filter((n) => n.userId === user.id)
    .slice(0, 4);

  const completion = calculateProfileCompletion({
    user,
    hasProjects: myProjects.length > 0,
    hasExperiences: myExperiences.length > 0,
    hasCourses: myCourses.length > 0,
    hasCertificates: myCertificates.length > 0,
    hasSkills: mySkills.length > 0,
  });

  const evolutionData = useMemo(
    () => buildSemesterEvolution(myProjects, myCourses, myCertificates),
    [myProjects, myCourses, myCertificates]
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-ink sm:text-2xl">Olá, {user.name.split(' ')[0]}!</h1>
        <p className="mt-1 text-sm text-ink-soft">Aqui está um resumo do seu perfil acadêmico.</p>
      </div>

      <ProfileCard user={user} completion={completion} />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard icon={FolderKanban} label="Projetos" value={myProjects.length} tone="blue" />
        <StatCard icon={BookOpen} label="Cursos" value={myCourses.length} tone="green" />
        <StatCard icon={Award} label="Certificados" value={myCertificates.length} tone="amber" />
        <StatCard icon={Briefcase} label="Experiências" value={myExperiences.length} tone="violet" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section className="rounded-2xl border border-line bg-card p-5 shadow-soft sm:p-6">
            <div className="mb-2 flex items-center gap-2">
              <TrendingUp size={18} className="text-primary-600" />
              <h2 className="text-sm font-semibold text-ink sm:text-base">Evolução Acadêmica</h2>
            </div>
            <p className="mb-4 text-xs text-ink-soft sm:text-sm">
              Projetos, cursos e certificados registrados por semestre.
            </p>
            <EvolutionChart data={evolutionData} />
          </section>

          <section className="rounded-2xl border border-line bg-card p-5 shadow-soft sm:p-6">
            <h2 className="mb-4 text-sm font-semibold text-ink sm:text-base">Habilidades</h2>
            {mySkills.length === 0 ? (
              <EmptyState
                icon={Award}
                title="Nenhuma habilidade cadastrada"
                description="Adicione suas principais tecnologias e competências."
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {mySkills.map((skill) => (
                  <SkillTag key={skill.id} skill={skill} />
                ))}
              </div>
            )}
          </section>

          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-ink sm:text-base">Projetos Recentes</h2>
              <Link
                to="/projetos"
                className="flex items-center gap-1 text-xs font-semibold text-primary-600 hover:text-primary-700"
              >
                Ver todos <ArrowRight size={13} />
              </Link>
            </div>
            {myProjects.length === 0 ? (
              <EmptyState
                icon={FolderKanban}
                title="Nenhum projeto cadastrado"
                description="Adicione seus projetos acadêmicos ou pessoais para exibi-los aqui."
              />
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {myProjects.slice(0, 4).map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-2xl border border-line bg-card p-5 shadow-soft">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-ink">Notificações</h2>
              <Bell size={16} className="text-ink-soft" />
            </div>
            {myNotifications.length === 0 ? (
              <EmptyState
                icon={Bell}
                title="Sem notificações"
                description="Você está em dia."
              />
            ) : (
              <div className="space-y-2">
                {myNotifications.map((n) => (
                  <NotificationCard key={n.id} notification={n} />
                ))}
              </div>
            )}
          </section>

          <section className="rounded-2xl border border-line bg-card p-5 shadow-soft">
            <h2 className="mb-1 text-sm font-semibold text-ink">Atividades recentes</h2>
            {myActivities.length === 0 ? (
              <p className="py-4 text-center text-xs text-ink-soft">Nenhuma atividade recente.</p>
            ) : (
              <div className="divide-y divide-line">
                {myActivities.map((a) => (
                  <ActivityCard key={a.id} activity={a} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
