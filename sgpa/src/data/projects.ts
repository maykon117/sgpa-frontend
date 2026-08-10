import { Project } from '@/types';

export const mockProjects: Project[] = [
  {
    id: 'p1',
    userId: 'u1',
    name: 'Sistema Web de Tarefas',
    description:
      'Aplicação web para gerenciamento de tarefas em equipe, com quadros estilo kanban, notificações em tempo real e controle de prazos.',
    technologies: ['React', 'Node.js', 'MongoDB'],
    projectUrl: 'https://tarefas-app.exemplo.com',
    githubUrl: 'https://github.com/joaodasilva/sistema-tarefas',
    date: '2025-11-02',
  },
  {
    id: 'p2',
    userId: 'u1',
    name: 'App Mobile de Estudos',
    description:
      'Aplicativo para organização de rotina de estudos com flashcards, técnica pomodoro e acompanhamento de metas semanais.',
    technologies: ['Flutter', 'Firebase'],
    githubUrl: 'https://github.com/joaodasilva/app-estudos',
    date: '2025-06-18',
  },
  {
    id: 'p3',
    userId: 'u1',
    name: 'API de Gerenciamento',
    description:
      'API RESTful para gestão de estoque de pequenas empresas, com autenticação por token e geração de relatórios em PDF.',
    technologies: ['Java', 'Spring Boot', 'MySQL'],
    githubUrl: 'https://github.com/joaodasilva/api-estoque',
    date: '2025-03-22',
  },
  {
    id: 'p4',
    userId: 'u1',
    name: 'Dashboard Financeiro Pessoal',
    description:
      'Painel para controle de gastos pessoais com gráficos de categorias e metas de economia mensais.',
    technologies: ['React', 'TypeScript', 'PostgreSQL'],
    date: '2024-11-10',
  },
  {
    id: 'p5',
    userId: 'u1',
    name: 'Loja Virtual de Artesanato',
    description:
      'E-commerce simples para pequenos artesãos, com catálogo de produtos, carrinho de compras e painel administrativo.',
    technologies: ['React', 'Node.js', 'MySQL'],
    date: '2024-08-05',
  },
  {
    id: 'p6',
    userId: 'u1',
    name: 'Chatbot de Atendimento',
    description:
      'Bot de atendimento ao cliente integrado a WhatsApp para respostas automáticas de dúvidas frequentes.',
    technologies: ['Node.js', 'Docker'],
    date: '2024-05-14',
  },
  {
    id: 'p7',
    userId: 'u1',
    name: 'Sistema de Reserva de Salas',
    description:
      'Sistema acadêmico para reserva de salas e laboratórios com verificação de conflitos de horário.',
    technologies: ['Java', 'MySQL'],
    date: '2024-02-01',
  },
  {
    id: 'p8',
    userId: 'u1',
    name: 'Portfólio Pessoal',
    description: 'Site pessoal responsivo para apresentação de projetos e currículo profissional.',
    technologies: ['React', 'TypeScript'],
    date: '2023-10-19',
  },
  {
    id: 'p9',
    userId: 'u2',
    name: 'Classificador de Imagens',
    description: 'Modelo de rede neural convolucional para classificação de imagens de plantas.',
    technologies: ['Python', 'TensorFlow'],
    date: '2025-09-12',
  },
  {
    id: 'p10',
    userId: 'u3',
    name: 'Microsserviço de Pagamentos',
    description: 'Serviço de processamento de pagamentos usando arquitetura orientada a eventos.',
    technologies: ['Java', 'Spring Boot', 'Docker'],
    date: '2025-07-30',
  },
];
