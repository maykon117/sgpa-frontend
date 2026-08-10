import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, AlertCircle } from 'lucide-react';
import { AuthLayout } from '@/layouts/AuthLayout';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { Button } from '@/components/Button';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/types';

const courseOptions = [
  { value: 'Análise e Desenvolvimento de Sistemas', label: 'Análise e Desenvolvimento de Sistemas' },
  { value: 'Ciência da Computação', label: 'Ciência da Computação' },
  { value: 'Engenharia de Software', label: 'Engenharia de Software' },
  { value: 'Sistemas de Informação', label: 'Sistemas de Informação' },
];

const roleOptions: { value: UserRole; label: string }[] = [
  { value: 'aluno', label: 'Aluno' },
  { value: 'professor', label: 'Professor' },
  { value: 'administrador', label: 'Administrador' },
];

export function Cadastro() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    registration: '',
    course: '',
    semester: '1',
    password: '',
    confirmPassword: '',
    role: 'aluno' as UserRole,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = 'Informe o nome completo.';
    if (!form.email.trim()) next.email = 'Informe o e-mail.';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Informe um e-mail válido.';
    if (form.role === 'aluno') {
      if (!form.registration.trim()) next.registration = 'Informe a matrícula.';
      if (!form.course.trim()) next.course = 'Selecione o curso.';
    }
    if (!form.password) next.password = 'Crie uma senha.';
    else if (form.password.length < 6) next.password = 'A senha deve ter ao menos 6 caracteres.';
    if (form.confirmPassword !== form.password) next.confirmPassword = 'As senhas não coincidem.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      const result = register({
        name: form.name,
        email: form.email,
        registration: form.registration,
        course: form.course,
        semester: Number(form.semester),
        password: form.password,
        role: form.role,
      });
      setLoading(false);
      if (!result.ok) {
        setFormError(result.message ?? 'Não foi possível criar a conta.');
        return;
      }
      navigate('/');
    }, 400);
  };

  return (
    <AuthLayout>
      <h1 className="text-2xl font-bold text-ink">Criar conta</h1>
      <p className="mt-1.5 text-sm text-ink-soft">Preencha os dados para começar a usar o SGPA.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4" noValidate>
        {formError && (
          <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-700">
            <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        <Input
          label="Nome completo"
          placeholder="Seu nome completo"
          value={form.name}
          onChange={(e) => update('name', e.target.value)}
          error={errors.name}
        />
        <Input
          label="E-mail"
          type="email"
          placeholder="seuemail@sgpa.edu.br"
          value={form.email}
          onChange={(e) => update('email', e.target.value)}
          error={errors.email}
        />

        <Select
          label="Tipo de usuário"
          value={form.role}
          onChange={(e) => update('role', e.target.value)}
          options={roleOptions}
        />

        {form.role === 'aluno' && (
          <>
            <Input
              label="Matrícula"
              placeholder="0000000000"
              value={form.registration}
              onChange={(e) => update('registration', e.target.value)}
              error={errors.registration}
            />
            <Select
              label="Curso"
              placeholder="Selecione o curso"
              value={form.course}
              onChange={(e) => update('course', e.target.value)}
              options={courseOptions}
              error={errors.course}
            />
            <Select
              label="Semestre"
              value={form.semester}
              onChange={(e) => update('semester', e.target.value)}
              options={Array.from({ length: 10 }, (_, i) => ({
                value: String(i + 1),
                label: `${i + 1}º semestre`,
              }))}
            />
          </>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Senha"
            type="password"
            placeholder="Mínimo 6 caracteres"
            value={form.password}
            onChange={(e) => update('password', e.target.value)}
            error={errors.password}
          />
          <Input
            label="Confirmar senha"
            type="password"
            placeholder="Repita a senha"
            value={form.confirmPassword}
            onChange={(e) => update('confirmPassword', e.target.value)}
            error={errors.confirmPassword}
          />
        </div>

        <Button type="submit" icon={UserPlus} fullWidth loading={loading} size="lg">
          Criar conta
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-soft">
        Já tem uma conta?{' '}
        <Link to="/login" className="font-semibold text-primary-600 hover:text-primary-700">
          Fazer login
        </Link>
      </p>
    </AuthLayout>
  );
}
