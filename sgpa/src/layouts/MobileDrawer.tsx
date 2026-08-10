import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  X,
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
  LogOut,
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

interface MobileDrawerProps {
  open: boolean;
  role: UserRole;
  onClose: () => void;
  onLogout: () => void;
}

export function MobileDrawer({ open, role, onClose, onLogout }: MobileDrawerProps) {
  if (!open) return null;
  const items = navItems.filter((item) => item.roles.includes(role));

  return (
    <div className="fixed inset-0 z-40 lg:hidden">
      <div className="absolute inset-0 animate-fade-in bg-slate-900/50" onClick={onClose} aria-hidden="true" />
      <div className="absolute inset-y-0 left-0 flex w-72 max-w-[80vw] animate-slide-up flex-col bg-primary-800 shadow-popover">
        <div className="flex h-16 flex-shrink-0 items-center justify-between px-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15">
              <GraduationCap size={20} className="text-white" />
            </div>
            <span className="text-lg font-bold text-white">SGPA</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar menu"
            className="rounded-lg p-1.5 text-primary-100 hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4" aria-label="Navegação móvel">
          {items.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                  isActive ? 'bg-white text-primary-700' : 'text-primary-100 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/10 p-3">
          <button
            onClick={onLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-primary-100 hover:bg-white/10 hover:text-white"
          >
            <LogOut size={18} />
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}
