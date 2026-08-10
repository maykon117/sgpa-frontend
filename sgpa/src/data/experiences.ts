import { Experience } from '@/types';

export const mockExperiences: Experience[] = [
  {
    id: 'e1',
    userId: 'u1',
    institution: 'TechNova Soluções',
    role: 'Estagiário de Desenvolvimento Front-end',
    type: 'estagio',
    startDate: '2025-02-01',
    endDate: null,
    description:
      'Desenvolvimento de interfaces web com React e TypeScript, participação em cerimônias ágeis e revisão de código em equipe.',
  },
  {
    id: 'e2',
    userId: 'u1',
    institution: 'Diretório Acadêmico de Computação',
    role: 'Membro de Diretoria — Coordenação de Eventos',
    type: 'academica',
    startDate: '2024-03-01',
    endDate: '2024-12-15',
    description:
      'Organização de semanas acadêmicas e palestras técnicas, com gestão de cronograma e contato com patrocinadores.',
  },
  {
    id: 'e3',
    userId: 'u1',
    institution: 'ONG Código Futuro',
    role: 'Voluntário — Ensino de Programação',
    type: 'voluntariado',
    startDate: '2023-08-01',
    endDate: '2024-02-01',
    description:
      'Aulas introdutórias de lógica de programação para adolescentes em situação de vulnerabilidade social.',
  },
];
