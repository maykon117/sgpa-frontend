import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { AppLayout } from '@/layouts/AppLayout';
import { RequireRole, homeByRole } from '@/routes/RequireRole';

import { Login } from '@/pages/Login';
import { Cadastro } from '@/pages/Cadastro';
import { Dashboard } from '@/pages/Dashboard';
import { Perfil } from '@/pages/Perfil';
import { Projetos } from '@/pages/Projetos';
import { Experiencias } from '@/pages/Experiencias';
import { Cursos } from '@/pages/Cursos';
import { Certificados } from '@/pages/Certificados';
import { Habilidades } from '@/pages/Habilidades';
import { Curriculo } from '@/pages/Curriculo';
import { Alunos } from '@/pages/Alunos';
import { AlunoDetalhe } from '@/pages/AlunoDetalhe';
import { Admin } from '@/pages/Admin';
import { Configuracoes } from '@/pages/Configuracoes';
import { NotFound } from '@/pages/NotFound';

function IndexRedirect() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <Navigate to={homeByRole[user.role]} replace />;
}

export default function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<IndexRedirect />} />
      <Route path="/login" element={user ? <Navigate to={homeByRole[user.role]} replace /> : <Login />} />
      <Route path="/cadastro" element={user ? <Navigate to={homeByRole[user.role]} replace /> : <Cadastro />} />

      <Route element={<AppLayout />}>
        <Route
          path="/dashboard"
          element={
            <RequireRole roles={['aluno']}>
              <Dashboard />
            </RequireRole>
          }
        />
        <Route
          path="/perfil"
          element={
            <RequireRole roles={['aluno']}>
              <Perfil />
            </RequireRole>
          }
        />
        <Route
          path="/projetos"
          element={
            <RequireRole roles={['aluno']}>
              <Projetos />
            </RequireRole>
          }
        />
        <Route
          path="/experiencias"
          element={
            <RequireRole roles={['aluno']}>
              <Experiencias />
            </RequireRole>
          }
        />
        <Route
          path="/cursos"
          element={
            <RequireRole roles={['aluno']}>
              <Cursos />
            </RequireRole>
          }
        />
        <Route
          path="/certificados"
          element={
            <RequireRole roles={['aluno']}>
              <Certificados />
            </RequireRole>
          }
        />
        <Route
          path="/habilidades"
          element={
            <RequireRole roles={['aluno']}>
              <Habilidades />
            </RequireRole>
          }
        />
        <Route
          path="/curriculo"
          element={
            <RequireRole roles={['aluno']}>
              <Curriculo />
            </RequireRole>
          }
        />
        <Route
          path="/alunos"
          element={
            <RequireRole roles={['professor']}>
              <Alunos />
            </RequireRole>
          }
        />
        <Route
          path="/alunos/:id"
          element={
            <RequireRole roles={['professor']}>
              <AlunoDetalhe />
            </RequireRole>
          }
        />
        <Route
          path="/admin"
          element={
            <RequireRole roles={['administrador']}>
              <Admin />
            </RequireRole>
          }
        />
        <Route
          path="/configuracoes"
          element={
            <RequireRole roles={['aluno', 'professor', 'administrador']}>
              <Configuracoes />
            </RequireRole>
          }
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
