import { User } from '@/types';

interface CompletionInput {
  user: User;
  hasProjects: boolean;
  hasExperiences: boolean;
  hasCourses: boolean;
  hasCertificates: boolean;
  hasSkills: boolean;
}

export function calculateProfileCompletion(input: CompletionInput): number {
  const { user, hasProjects, hasExperiences, hasCourses, hasCertificates, hasSkills } = input;

  const checks: boolean[] = [
    Boolean(user.name),
    Boolean(user.email),
    Boolean(user.avatarUrl),
    Boolean(user.bio && user.bio.trim().length > 10),
    Boolean(user.course),
    Boolean(user.phone),
    hasProjects,
    hasExperiences,
    hasCourses,
    hasCertificates,
    hasSkills,
  ];

  const completed = checks.filter(Boolean).length;
  return Math.round((completed / checks.length) * 100);
}
