import React from 'react';
import { Printer } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useAppData } from '@/hooks/useAppData';
import { Button } from '@/components/Button';
import { ResumeView } from '@/components/ResumeView';

export function Curriculo() {
  const { user } = useAuth();
  const { projects, experiences, courses, certificates, skills } = useAppData();

  if (!user) return null;

  const myProjects = projects.filter((p) => p.userId === user.id);
  const myExperiences = experiences.filter((e) => e.userId === user.id);
  const myCourses = courses.filter((c) => c.userId === user.id);
  const myCertificates = certificates.filter((c) => c.userId === user.id);
  const mySkills = skills.filter((s) => s.userId === user.id);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between no-print">
        <div>
          <h1 className="text-xl font-bold text-ink sm:text-2xl">Currículo</h1>
          <p className="mt-1 text-sm text-ink-soft">Visualização profissional gerada a partir dos seus dados cadastrados.</p>
        </div>
        <Button icon={Printer} onClick={() => window.print()}>
          Imprimir / Salvar PDF
        </Button>
      </div>

      <ResumeView
        user={user}
        projects={myProjects}
        experiences={myExperiences}
        courses={myCourses}
        certificates={myCertificates}
        skills={mySkills}
      />
    </div>
  );
}
