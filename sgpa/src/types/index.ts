export type UserRole = 'aluno' | 'professor' | 'administrador';

export type UserStatus = 'ativo' | 'inativo';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  status: UserStatus;
  registration?: string; // matrícula
  course?: string;
  semester?: number;
  avatarUrl?: string;
  bio?: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  github?: string;
  createdAt: string;
}

export type ExperienceType = 'academica' | 'profissional' | 'estagio' | 'voluntariado';

export interface Experience {
  id: string;
  userId: string;
  institution: string;
  role: string;
  type: ExperienceType;
  startDate: string;
  endDate: string | null; // null = atual
  description: string;
}

export interface Project {
  id: string;
  userId: string;
  name: string;
  description: string;
  technologies: string[];
  projectUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  date: string;
}

export interface Course {
  id: string;
  userId: string;
  name: string;
  institution: string;
  completionDate: string;
  workload: number; // horas
  description: string;
}

export interface Certificate {
  id: string;
  userId: string;
  name: string;
  institution: string;
  date: string;
  code: string;
  url?: string;
  fileName?: string;
}

export type SkillLevel = 'basico' | 'intermediario' | 'avancado';

export interface Skill {
  id: string;
  userId: string;
  name: string;
  level: SkillLevel;
  category: 'linguagem' | 'framework' | 'ferramenta' | 'banco-de-dados' | 'outro';
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'info' | 'sucesso' | 'alerta';
}

export interface Activity {
  id: string;
  userId: string;
  description: string;
  date: string;
  entity: 'projeto' | 'experiencia' | 'curso' | 'certificado' | 'habilidade' | 'perfil';
}

export interface SemesterEvolution {
  semester: string;
  projetos: number;
  cursos: number;
  certificados: number;
}
