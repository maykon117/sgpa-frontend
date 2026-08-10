import React, { useState } from 'react';
import { Bell, Lock, Palette, Trash2, Save } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';

export function Configuracoes() {
  const { user, updateUser } = useAuth();
  const [notifPrefs, setNotifPrefs] = useState({
    email: true,
    sistema: true,
    novidades: false,
  });
  const [passwordForm, setPasswordForm] = useState({ current: '', next: '', confirm: '' });
  const [passwordMessage, setPasswordMessage] = useState('');
  const [savedMessage, setSavedMessage] = useState('');

  if (!user) return null;

  const togglePref = (key: keyof typeof notifPrefs) =>
    setNotifPrefs((prev) => ({ ...prev, [key]: !prev[key] }));

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.current !== user.password) {
      setPasswordMessage('A senha atual está incorreta.');
      return;
    }
    if (passwordForm.next.length < 6) {
      setPasswordMessage('A nova senha deve ter ao menos 6 caracteres.');
      return;
    }
    if (passwordForm.next !== passwordForm.confirm) {
      setPasswordMessage('A confirmação não coincide com a nova senha.');
      return;
    }
    updateUser(user.id, { password: passwordForm.next });
    setPasswordForm({ current: '', next: '', confirm: '' });
    setPasswordMessage('Senha atualizada com sucesso.');
  };

  const handleSavePrefs = () => {
    setSavedMessage('Preferências de notificação salvas.');
    setTimeout(() => setSavedMessage(''), 2500);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-xl font-bold text-ink sm:text-2xl">Configurações</h1>
        <p className="mt-1 text-sm text-ink-soft">Gerencie preferências da sua conta.</p>
      </div>

      <section className="rounded-2xl border border-line bg-card p-6 shadow-soft">
        <div className="mb-4 flex items-center gap-2">
          <Lock size={17} className="text-primary-600" />
          <h2 className="text-sm font-semibold text-ink">Alterar senha</h2>
        </div>
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          {passwordMessage && (
            <p
              className={`rounded-lg px-3.5 py-2.5 text-sm ${
                passwordMessage.includes('sucesso')
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-red-50 text-red-700'
              }`}
            >
              {passwordMessage}
            </p>
          )}
          <Input
            label="Senha atual"
            type="password"
            value={passwordForm.current}
            onChange={(e) => setPasswordForm((p) => ({ ...p, current: e.target.value }))}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Nova senha"
              type="password"
              value={passwordForm.next}
              onChange={(e) => setPasswordForm((p) => ({ ...p, next: e.target.value }))}
            />
            <Input
              label="Confirmar nova senha"
              type="password"
              value={passwordForm.confirm}
              onChange={(e) => setPasswordForm((p) => ({ ...p, confirm: e.target.value }))}
            />
          </div>
          <Button type="submit" icon={Save}>
            Atualizar senha
          </Button>
        </form>
      </section>

      <section className="rounded-2xl border border-line bg-card p-6 shadow-soft">
        <div className="mb-4 flex items-center gap-2">
          <Bell size={17} className="text-primary-600" />
          <h2 className="text-sm font-semibold text-ink">Notificações</h2>
        </div>
        <div className="space-y-3">
          {[
            { key: 'email' as const, label: 'Receber notificações por e-mail' },
            { key: 'sistema' as const, label: 'Notificações do sistema' },
            { key: 'novidades' as const, label: 'Novidades e atualizações do SGPA' },
          ].map((item) => (
            <label key={item.key} className="flex cursor-pointer items-center justify-between gap-4">
              <span className="text-sm text-ink">{item.label}</span>
              <input
                type="checkbox"
                checked={notifPrefs[item.key]}
                onChange={() => togglePref(item.key)}
                className="h-4 w-4 rounded border-line text-primary-600 focus:ring-primary-200"
              />
            </label>
          ))}
        </div>
        {savedMessage && <p className="mt-4 text-sm text-emerald-700">{savedMessage}</p>}
        <Button className="mt-4" variant="outline" onClick={handleSavePrefs} icon={Save}>
          Salvar preferências
        </Button>
      </section>

      <section className="rounded-2xl border border-line bg-card p-6 shadow-soft">
        <div className="mb-4 flex items-center gap-2">
          <Palette size={17} className="text-primary-600" />
          <h2 className="text-sm font-semibold text-ink">Aparência</h2>
        </div>
        <p className="text-sm text-ink-soft">
          O SGPA utiliza um tema claro fixo, otimizado para leitura e apresentação acadêmica.
        </p>
      </section>

      <section className="rounded-2xl border border-red-200 bg-red-50/40 p-6">
        <div className="mb-2 flex items-center gap-2">
          <Trash2 size={17} className="text-red-600" />
          <h2 className="text-sm font-semibold text-red-700">Zona de risco</h2>
        </div>
        <p className="text-sm text-red-700/80">
          Esta é uma prévia acadêmica. Nenhum dado é enviado a um servidor — tudo é armazenado localmente no
          seu navegador.
        </p>
      </section>
    </div>
  );
}
