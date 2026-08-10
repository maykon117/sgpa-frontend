import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  UserCircle,
  FolderKanban,
  Briefcase,
  BookOpen,
  Award,
  Sparkles,
  FileText,
  Users,
  ShieldCheck,
  Settings,
  GraduationCap,
} from 'lucide-react';
import { UserRole } from '@/types';

interface NavItem {
  to: string;
  label: string;
  icon: React.ElementType;
  roles: UserRole[];
}

const navItems: NavItem[] = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['aluno'] },
  { to: '/perfil', label: 'Meu Perfil', icon: UserCircle, roles: ['aluno'] },
  { to: '/projetos', label: 'Projetos', icon: FolderKanban, roles: ['aluno'] },
  { to: '/experiencias', label: 'Experiências', icon: Briefcase, roles: ['aluno'] },
  { to: '/cursos', label: 'Cursos', icon: BookOpen, roles: ['aluno'] },
  { to: '/certificados', label: 'Certificados', icon: Award, roles: ['aluno'] },
  { to: '/habilidades', label: 'Habilidades', icon: Sparkles, roles: ['aluno'] },
  { to: '/curriculo', label: 'Currículo', icon: FileText, roles: ['aluno'] },
  { to: '/alunos', label: 'Consultar Alunos', icon: Users, roles: ['professor'] },
  { to: '/admin', label: 'Administração', icon: ShieldCheck, roles: ['administrador'] },
  {
    to: '/configuracoes',
    label: 'Configurações',
    icon: Settings,
    roles: ['aluno', 'professor', 'administrador'],
  },
];

export function Sidebar({ role }: { role: UserRole }) {
  const items = navItems.filter((item) => item.roles.includes(role));

  return (
    <aside className="hidden w-64 flex-shrink-0 flex-col bg-primary-800 lg:flex">
      <div className="flex h-16 items-center gap-2.5 px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15">
          <GraduationCap size={20} className="text-white" />
        </div>
        <span className="text-lg font-bold tracking-tight text-white">SGPA</span>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4 scrollbar-none" aria-label="Navegação principal">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-white text-primary-700 shadow-sm'
                  : 'text-primary-100 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-white/10 px-6 py-4">
        <p className="text-xs text-primary-200">SGPA © 2026</p>
        <p className="text-[11px] text-primary-300">Projeto acadêmico — APS</p>
      </div>
    </aside>
  );
}
