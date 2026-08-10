import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import { AuthLayout } from '@/layouts/AuthLayout';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { useAuth } from '@/hooks/useAuth';

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('joao.silva@sgpa.edu.br');
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Preencha e-mail e senha para continuar.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const result = login(email, password);
      setLoading(false);
      if (!result.ok) {
        setError(result.message ?? 'Não foi possível entrar.');
        return;
      }
      navigate('/');
    }, 400);
  };

  return (
    <AuthLayout>
      <h1 className="text-2xl font-bold text-ink">Bem-vindo de volta</h1>
      <p className="mt-1.5 text-sm text-ink-soft">Entre com sua conta para acessar o SGPA.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4" noValidate>
        {error && (
          <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-700">
            <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <Input
          label="E-mail"
          type="email"
          icon={Mail}
          placeholder="seuemail@sgpa.edu.br"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />

        <div>
          <Input
            label="Senha"
            type="password"
            icon={Lock}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <div className="mt-2 text-right">
            <button
              type="button"
              onClick={() => alert('Um link de redefinição de senha seria enviado ao seu e-mail.')}
              className="text-xs font-medium text-primary-600 hover:text-primary-700"
            >
              Esqueci minha senha
            </button>
          </div>
        </div>

        <Button type="submit" icon={LogIn} fullWidth loading={loading} size="lg">
          Entrar
        </Button>
      </form>

      <p className="mt-6 rounded-lg bg-slate-50 px-3.5 py-2.5 text-xs text-ink-soft">
        Conta de demonstração já preenchida: <strong>joao.silva@sgpa.edu.br</strong> / senha{' '}
        <strong>123456</strong>. Também é possível entrar como professor (
        <strong>carlos.mendes@sgpa.edu.br</strong>) ou administrador (
        <strong>fernanda.lima@sgpa.edu.br</strong>), mesma senha.
      </p>

      <p className="mt-6 text-center text-sm text-ink-soft">
        Não tem uma conta?{' '}
        <Link to="/cadastro" className="font-semibold text-primary-600 hover:text-primary-700">
          Criar conta
        </Link>
      </p>
    </AuthLayout>
  );
}
