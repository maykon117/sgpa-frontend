import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/types';

const homeByRole: Record<UserRole, string> = {
  aluno: '/dashboard',
  professor: '/alunos',
  administrador: '/admin',
};

export function RequireRole({ roles, children }: { roles: UserRole[]; children: React.ReactNode }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (!roles.includes(user.role)) return <Navigate to={homeByRole[user.role]} replace />;
  return <>{children}</>;
}

export { homeByRole };
