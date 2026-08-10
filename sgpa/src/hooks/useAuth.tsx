import React, { createContext, useContext, useMemo } from 'react';
import { User, UserRole } from '@/types';
import { mockUsers } from '@/data/users';
import { useLocalStorage } from './useLocalStorage';

interface RegisterInput {
  name: string;
  email: string;
  registration: string;
  course: string;
  semester: number;
  password: string;
  role: UserRole;
}

interface AuthContextValue {
  user: User | null;
  users: User[];
  login: (email: string, password: string) => { ok: boolean; message?: string };
  logout: () => void;
  register: (input: RegisterInput) => { ok: boolean; message?: string };
  updateUser: (id: string, patch: Partial<User>) => void;
  setUserStatus: (id: string, status: User['status']) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useLocalStorage<User[]>('sgpa:users', mockUsers);
  const [currentUserId, setCurrentUserId] = useLocalStorage<string | null>(
    'sgpa:currentUserId',
    null
  );

  const user = useMemo(
    () => users.find((u) => u.id === currentUserId) ?? null,
    [users, currentUserId]
  );

  const login: AuthContextValue['login'] = (email, password) => {
    const found = users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );
    if (!found) return { ok: false, message: 'E-mail não encontrado.' };
    if (found.status === 'inativo') {
      return { ok: false, message: 'Este usuário está desativado. Contate a administração.' };
    }
    if (found.password !== password) {
      return { ok: false, message: 'Senha incorreta.' };
    }
    setCurrentUserId(found.id);
    return { ok: true };
  };

  const logout = () => setCurrentUserId(null);

  const register: AuthContextValue['register'] = (input) => {
    const exists = users.some(
      (u) => u.email.toLowerCase() === input.email.trim().toLowerCase()
    );
    if (exists) return { ok: false, message: 'Já existe uma conta com este e-mail.' };

    const newUser: User = {
      id: `u${Date.now()}`,
      name: input.name,
      email: input.email,
      password: input.password,
      role: input.role,
      status: 'ativo',
      registration: input.registration,
      course: input.course,
      semester: input.semester,
      bio: '',
      createdAt: new Date().toISOString(),
    };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUserId(newUser.id);
    return { ok: true };
  };

  const updateUser: AuthContextValue['updateUser'] = (id, patch) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...patch } : u)));
  };

  const setUserStatus: AuthContextValue['setUserStatus'] = (id, status) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status } : u)));
  };

  return (
    <AuthContext.Provider
      value={{ user, users, login, logout, register, updateUser, setUserStatus }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  return ctx;
}
