import { Notification } from '@/types';

export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    userId: 'u1',
    title: 'Perfil quase completo',
    message: 'Seu perfil está 85% completo. Adicione uma foto para finalizar.',
    date: '2026-08-08T09:30:00',
    read: false,
    type: 'info',
  },
  {
    id: 'n2',
    userId: 'u1',
    title: 'Certificado adicionado',
    message: 'O certificado "Certificação React Developer" foi salvo com sucesso.',
    date: '2026-08-07T16:12:00',
    read: false,
    type: 'sucesso',
  },
  {
    id: 'n3',
    userId: 'u1',
    title: 'Novo acesso ao seu perfil',
    message: 'A Profa. Renata Alves visualizou seu perfil acadêmico.',
    date: '2026-08-06T11:05:00',
    read: true,
    type: 'info',
  },
  {
    id: 'n4',
    userId: 'u1',
    title: 'Experiência sem data de término',
    message: 'Revise a experiência em "TechNova Soluções" caso ela já tenha sido encerrada.',
    date: '2026-08-04T08:45:00',
    read: true,
    type: 'alerta',
  },
  {
    id: 'n5',
    userId: 'u1',
    title: 'Projeto atualizado',
    message: 'As tecnologias do projeto "Dashboard Financeiro Pessoal" foram atualizadas.',
    date: '2026-08-01T14:20:00',
    read: true,
    type: 'sucesso',
  },
];
