import React, { useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useAppData } from '@/hooks/useAppData';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MobileDrawer } from './MobileDrawer';
import { MobileNavigation } from './MobileNavigation';
import { Notification } from '@/types';

const searchRouteByRole: Record<string, string> = {
  aluno: '/projetos',
  professor: '/alunos',
  administrador: '/admin',
};

export function AppLayout() {
  const { user, logout } = useAuth();
  const { notifications, markNotificationRead, markAllNotificationsRead } = useAppData();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  if (!user) return <Navigate to="/login" replace />;

  const userNotifications = notifications
    .filter((n) => n.userId === user.id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleSearchSubmit = (value: string) => {
    const base = searchRouteByRole[user.role] ?? '/dashboard';
    navigate(value.trim() ? `${base}?q=${encodeURIComponent(value.trim())}` : base);
  };

  const handleSelectNotification = (n: Notification) => {
    markNotificationRead(n.id);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-surface">
      <Sidebar role={user.role} />
      <MobileDrawer
        open={drawerOpen}
        role={user.role}
        onClose={() => setDrawerOpen(false)}
        onLogout={handleLogout}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          user={user}
          notifications={userNotifications}
          onOpenMobileMenu={() => setDrawerOpen(true)}
          onSearchSubmit={handleSearchSubmit}
          onMarkAllNotificationsRead={() => markAllNotificationsRead(user.id)}
          onSelectNotification={handleSelectNotification}
          onLogout={handleLogout}
        />
        <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">
          <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
            <Outlet />
          </div>
        </main>
        <MobileNavigation role={user.role} />
      </div>
    </div>
  );
}
