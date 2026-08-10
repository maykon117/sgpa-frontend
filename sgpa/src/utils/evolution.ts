import { SemesterEvolution } from '@/types';

function toSemesterLabel(dateStr: string): string {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const half = date.getMonth() < 6 ? 1 : 2;
  return `${year}.${half}`;
}

export function buildSemesterEvolution(
  projects: { date: string }[],
  courses: { completionDate: string }[],
  certificates: { date: string }[],
  periods = 6
): SemesterEvolution[] {
  const map = new Map<string, SemesterEvolution>();

  const bump = (label: string, key: keyof Omit<SemesterEvolution, 'semester'>) => {
    const entry = map.get(label) ?? { semester: label, projetos: 0, cursos: 0, certificados: 0 };
    entry[key] += 1;
    map.set(label, entry);
  };

  projects.forEach((p) => bump(toSemesterLabel(p.date), 'projetos'));
  courses.forEach((c) => bump(toSemesterLabel(c.completionDate), 'cursos'));
  certificates.forEach((c) => bump(toSemesterLabel(c.date), 'certificados'));

  const sorted = Array.from(map.values()).sort((a, b) => (a.semester > b.semester ? 1 : -1));
  return sorted.slice(-periods);
}
