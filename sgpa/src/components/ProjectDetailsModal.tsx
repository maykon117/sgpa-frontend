import React from 'react';
import { ExternalLink, Github, Calendar } from 'lucide-react';
import { Modal } from './Modal';
import { Project } from '@/types';
import { formatDate } from '@/utils/format';

export function ProjectDetailsModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  return (
    <Modal open={Boolean(project)} onClose={onClose} title={project?.name ?? ''} size="md">
      {project && (
        <div className="space-y-4">
          <div className="flex items-center gap-1.5 text-xs text-ink-soft">
            <Calendar size={14} />
            {formatDate(project.date)}
          </div>
          <p className="text-sm leading-relaxed text-ink-soft">{project.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((t) => (
              <span key={t} className="rounded-full bg-primary-50 px-2.5 py-1 text-xs font-medium text-primary-700">
                {t}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 border-t border-line pt-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                <Github size={15} /> Repositório
              </a>
            )}
            {project.projectUrl && (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                <ExternalLink size={15} /> Ver projeto publicado
              </a>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}
