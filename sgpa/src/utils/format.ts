export function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return 'Atual';
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function formatDateTime(dateStr: string): string {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function timeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return 'agora mesmo';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `há ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `há ${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `há ${days} dia${days > 1 ? 's' : ''}`;
  const months = Math.floor(days / 30);
  if (months < 12) return `há ${months} mês${months > 1 ? 'es' : ''}`;
  const years = Math.floor(months / 12);
  return `há ${years} ano${years > 1 ? 's' : ''}`;
}

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
}

export function roleLabel(role: string): string {
  const map: Record<string, string> = {
    aluno: 'Aluno',
    professor: 'Professor',
    administrador: 'Administrador',
  };
  return map[role] ?? role;
}

export function experienceTypeLabel(type: string): string {
  const map: Record<string, string> = {
    academica: 'Acadêmica',
    profissional: 'Profissional',
    estagio: 'Estágio',
    voluntariado: 'Voluntariado',
  };
  return map[type] ?? type;
}

export function skillLevelLabel(level: string): string {
  const map: Record<string, string> = {
    basico: 'Básico',
    intermediario: 'Intermediário',
    avancado: 'Avançado',
  };
  return map[level] ?? level;
}
