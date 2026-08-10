import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, Bell, LogOut, GraduationCap } from 'lucide-react';
import { User, Notification } from '@/types';
import { initials } from '@/utils/format';
import { NotificationsPanel } from '@/components/NotificationsPanel';

interface HeaderProps {
  user: User;
  notifications: Notification[];
  onOpenMobileMenu: () => void;
  onSearchSubmit: (value: string) => void;
  onMarkAllNotificationsRead: () => void;
  onSelectNotification: (n: Notification) => void;
  onLogout: () => void;
}

export function Header({
  user,
  notifications,
  onOpenMobileMenu,
  onSearchSubmit,
  onMarkAllNotificationsRead,
  onSelectNotification,
  onLogout,
}: HeaderProps) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 flex h-16 flex-shrink-0 items-center gap-3 border-b border-line bg-white/95 px-4 backdrop-blur sm:px-6">
      <button
        onClick={onOpenMobileMenu}
        aria-label="Abrir menu"
        className="rounded-lg p-2 text-ink-soft hover:bg-slate-100 lg:hidden"
      >
        <Menu size={22} />
      </button>

      <Link to="/dashboard" className="flex items-center gap-2 lg:hidden">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600">
          <GraduationCap size={16} className="text-white" />
        </div>
        <span className="text-base font-bold text-ink">SGPA</span>
      </Link>

      <div className="relative ml-auto hidden max-w-md flex-1 sm:block lg:ml-0">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft" />
        <input
          type="search"
          placeholder="Pesquisar e pressione Enter..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSearchSubmit((e.target as HTMLInputElement).value);
          }}
          className="w-full rounded-lg border border-line bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-ink placeholder:text-ink-soft/70 transition-colors focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-100"
        />
      </div>

      <div className="ml-auto flex items-center gap-1.5 sm:ml-3 sm:gap-2">
        <div className="relative">
          <button
            onClick={() => setNotifOpen((v) => !v)}
            aria-label={`Notificações${unreadCount > 0 ? ` (${unreadCount} não lidas)` : ''}`}
            className="relative rounded-lg p-2.5 text-ink-soft hover:bg-slate-100"
          >
            <Bell size={19} />
            {unreadCount > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-2 w-2 rounded-full bg-red-500" aria-hidden="true" />
            )}
          </button>
          <NotificationsPanel
            open={notifOpen}
            notifications={notifications}
            onClose={() => setNotifOpen(false)}
            onMarkAllRead={onMarkAllNotificationsRead}
            onSelect={(n) => {
              onSelectNotification(n);
              setNotifOpen(false);
            }}
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setUserMenuOpen((v) => !v)}
            className="flex items-center gap-2 rounded-lg py-1.5 pl-1.5 pr-2.5 hover:bg-slate-100"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-xs font-semibold text-white">
              {initials(user.name)}
            </span>
            <span className="hidden text-sm font-medium text-ink md:inline">
              {user.name.split(' ')[0]}
            </span>
          </button>
          {userMenuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} aria-hidden="true" />
              <div className="absolute right-0 top-full z-50 mt-2 w-52 animate-slide-up overflow-hidden rounded-xl border border-line bg-white p-1.5 shadow-popover">
                <div className="px-2.5 py-2">
                  <p className="truncate text-sm font-semibold text-ink">{user.name}</p>
                  <p className="truncate text-xs text-ink-soft">{user.email}</p>
                </div>
                <div className="my-1 h-px bg-line" />
                <Link
                  to="/perfil"
                  onClick={() => setUserMenuOpen(false)}
                  className="block rounded-lg px-2.5 py-2 text-sm text-ink hover:bg-slate-50"
                >
                  Meu perfil
                </Link>
                <Link
                  to="/configuracoes"
                  onClick={() => setUserMenuOpen(false)}
                  className="block rounded-lg px-2.5 py-2 text-sm text-ink hover:bg-slate-50"
                >
                  Configurações
                </Link>
                <button
                  onClick={onLogout}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut size={15} />
                  Sair
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
