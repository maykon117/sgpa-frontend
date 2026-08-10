import React from 'react';
import { GraduationCap, FolderKanban, Award, Sparkles } from 'lucide-react';

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-surface">
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-primary-700 p-10 text-white lg:flex xl:p-14">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
          aria-hidden="true"
        />
        <div className="relative flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
            <GraduationCap size={22} />
          </div>
          <span className="text-xl font-bold tracking-tight">SGPA</span>
        </div>

        <div className="relative max-w-md">
          <h1 className="text-3xl font-bold leading-tight xl:text-4xl">
            Seu histórico acadêmico e profissional, em um só lugar.
          </h1>
          <p className="mt-4 text-primary-100">
            Centralize experiências, projetos, cursos, certificados e habilidades. Mantenha seu
            perfil sempre atualizado para professores e coordenação.
          </p>

          <div className="mt-10 space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15">
                <FolderKanban size={17} />
              </span>
              <span className="text-sm text-primary-50">Organize projetos e experiências</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15">
                <Award size={17} />
              </span>
              <span className="text-sm text-primary-50">Reúna cursos e certificados</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15">
                <Sparkles size={17} />
              </span>
              <span className="text-sm text-primary-50">Gere um currículo profissional</span>
            </div>
          </div>
        </div>

        <p className="relative text-xs text-primary-200">
          Sistema de Gestão de Perfis e Experiências Acadêmicas — Projeto acadêmico, APS.
        </p>
      </div>

      <div className="flex flex-1 flex-col justify-center px-6 py-10 sm:px-10 lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600">
              <GraduationCap size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-ink">SGPA</span>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
