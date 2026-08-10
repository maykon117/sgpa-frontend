import React, { createContext, useContext } from 'react';
import {
  Activity,
  Certificate,
  Course,
  Experience,
  Notification,
  Project,
  Skill,
} from '@/types';
import { mockProjects } from '@/data/projects';
import { mockExperiences } from '@/data/experiences';
import { mockCourses } from '@/data/courses';
import { mockCertificates } from '@/data/certificates';
import { mockSkills } from '@/data/skills';
import { mockNotifications } from '@/data/notifications';
import { mockActivities } from '@/data/activities';
import { useLocalStorage } from './useLocalStorage';

interface DataContextValue {
  projects: Project[];
  experiences: Experience[];
  courses: Course[];
  certificates: Certificate[];
  skills: Skill[];
  notifications: Notification[];
  activities: Activity[];

  addProject: (p: Omit<Project, 'id'>) => void;
  updateProject: (id: string, patch: Partial<Project>) => void;
  removeProject: (id: string) => void;

  addExperience: (e: Omit<Experience, 'id'>) => void;
  updateExperience: (id: string, patch: Partial<Experience>) => void;
  removeExperience: (id: string) => void;

  addCourse: (c: Omit<Course, 'id'>) => void;
  updateCourse: (id: string, patch: Partial<Course>) => void;
  removeCourse: (id: string) => void;

  addCertificate: (c: Omit<Certificate, 'id'>) => void;
  updateCertificate: (id: string, patch: Partial<Certificate>) => void;
  removeCertificate: (id: string) => void;

  addSkill: (s: Omit<Skill, 'id'>) => void;
  updateSkill: (id: string, patch: Partial<Skill>) => void;
  removeSkill: (id: string) => void;

  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: (userId: string) => void;

  logActivity: (a: Omit<Activity, 'id' | 'date'>) => void;
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

function genId(prefix: string) {
  return `${prefix}${Date.now()}${Math.floor(Math.random() * 1000)}`;
}

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useLocalStorage<Project[]>('sgpa:projects', mockProjects);
  const [experiences, setExperiences] = useLocalStorage<Experience[]>(
    'sgpa:experiences',
    mockExperiences
  );
  const [courses, setCourses] = useLocalStorage<Course[]>('sgpa:courses', mockCourses);
  const [certificates, setCertificates] = useLocalStorage<Certificate[]>(
    'sgpa:certificates',
    mockCertificates
  );
  const [skills, setSkills] = useLocalStorage<Skill[]>('sgpa:skills', mockSkills);
  const [notifications, setNotifications] = useLocalStorage<Notification[]>(
    'sgpa:notifications',
    mockNotifications
  );
  const [activities, setActivities] = useLocalStorage<Activity[]>(
    'sgpa:activities',
    mockActivities
  );

  const logActivity: DataContextValue['logActivity'] = (a) => {
    setActivities((prev) => [
      { ...a, id: genId('a'), date: new Date().toISOString() },
      ...prev,
    ]);
  };

  const addProject: DataContextValue['addProject'] = (p) => {
    setProjects((prev) => [{ ...p, id: genId('p') }, ...prev]);
    logActivity({ userId: p.userId, description: `Adicionou o projeto "${p.name}"`, entity: 'projeto' });
  };
  const updateProject: DataContextValue['updateProject'] = (id, patch) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  };
  const removeProject: DataContextValue['removeProject'] = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const addExperience: DataContextValue['addExperience'] = (e) => {
    setExperiences((prev) => [{ ...e, id: genId('e') }, ...prev]);
    logActivity({
      userId: e.userId,
      description: `Adicionou a experiência em "${e.institution}"`,
      entity: 'experiencia',
    });
  };
  const updateExperience: DataContextValue['updateExperience'] = (id, patch) => {
    setExperiences((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  };
  const removeExperience: DataContextValue['removeExperience'] = (id) => {
    setExperiences((prev) => prev.filter((e) => e.id !== id));
  };

  const addCourse: DataContextValue['addCourse'] = (c) => {
    setCourses((prev) => [{ ...c, id: genId('c') }, ...prev]);
    logActivity({ userId: c.userId, description: `Concluiu o curso "${c.name}"`, entity: 'curso' });
  };
  const updateCourse: DataContextValue['updateCourse'] = (id, patch) => {
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  };
  const removeCourse: DataContextValue['removeCourse'] = (id) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const addCertificate: DataContextValue['addCertificate'] = (c) => {
    setCertificates((prev) => [{ ...c, id: genId('ct') }, ...prev]);
    logActivity({
      userId: c.userId,
      description: `Adicionou o certificado "${c.name}"`,
      entity: 'certificado',
    });
  };
  const updateCertificate: DataContextValue['updateCertificate'] = (id, patch) => {
    setCertificates((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  };
  const removeCertificate: DataContextValue['removeCertificate'] = (id) => {
    setCertificates((prev) => prev.filter((c) => c.id !== id));
  };

  const addSkill: DataContextValue['addSkill'] = (s) => {
    setSkills((prev) => [{ ...s, id: genId('s') }, ...prev]);
    logActivity({ userId: s.userId, description: `Adicionou a habilidade "${s.name}"`, entity: 'habilidade' });
  };
  const updateSkill: DataContextValue['updateSkill'] = (id, patch) => {
    setSkills((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  };
  const removeSkill: DataContextValue['removeSkill'] = (id) => {
    setSkills((prev) => prev.filter((s) => s.id !== id));
  };

  const markNotificationRead: DataContextValue['markNotificationRead'] = (id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };
  const markAllNotificationsRead: DataContextValue['markAllNotificationsRead'] = (userId) => {
    setNotifications((prev) =>
      prev.map((n) => (n.userId === userId ? { ...n, read: true } : n))
    );
  };

  return (
    <DataContext.Provider
      value={{
        projects,
        experiences,
        courses,
        certificates,
        skills,
        notifications,
        activities,
        addProject,
        updateProject,
        removeProject,
        addExperience,
        updateExperience,
        removeExperience,
        addCourse,
        updateCourse,
        removeCourse,
        addCertificate,
        updateCertificate,
        removeCertificate,
        addSkill,
        updateSkill,
        removeSkill,
        markNotificationRead,
        markAllNotificationsRead,
        logActivity,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useAppData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useAppData deve ser usado dentro de um DataProvider');
  return ctx;
}
