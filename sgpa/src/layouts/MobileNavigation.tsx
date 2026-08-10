import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, FileText, Users, ShieldCheck, UserCircle } from 'lucide-react';
import { UserRole } from '@/types';

interface TabItem {
  to: string;
  label: string;
  icon: React.ElementType;
  roles: UserRole[];
}

const tabs: TabItem[] = [
  { to: '/dashboard', label: 'Início', icon: LayoutDashboard, roles: ['aluno'] },
  { to: '/projetos', label: 'Projetos', icon: FolderKanban, roles: ['aluno'] },
  { to: '/curriculo', label: 'Currículo', icon: FileText, roles: ['aluno'] },
  { to: '/perfil', label: 'Perfil', icon: UserCircle, roles: ['aluno'] },
  { to: '/alunos', label: 'Alunos', icon: Users, roles: ['professor'] },
  { to: '/admin', label: 'Painel', icon: ShieldCheck, roles: ['administrador'] },
  { to: '/configuracoes', label: 'Ajustes', icon: UserCircle, roles: ['professor', 'administrador'] },
];

export function MobileNavigation({ role }: { role: UserRole }) {
  const items = tabs.filter((t) => t.roles.includes(role)).slice(0, 5);

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 flex border-t border-line bg-white/95 backdrop-blur lg:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      aria-label="Navegação inferior"
    >
      {items.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors ${
              isActive ? 'text-primary-600' : 'text-ink-soft'
            }`
          }
        >
          <Icon size={20} />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
