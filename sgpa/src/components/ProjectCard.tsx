import React from 'react';
import { ExternalLink, Github, FolderKanban, Pencil, Trash2 } from 'lucide-react';
import { Project } from '@/types';
import { formatDate } from '@/utils/format';

interface ProjectCardProps {
  project: Project;
  onViewDetails?: (project: Project) => void;
  onEdit?: (project: Project) => void;
  onDelete?: (project: Project) => void;
  editable?: boolean;
}

export function ProjectCard({ project, onViewDetails, onEdit, onDelete, editable }: ProjectCardProps) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-soft transition-shadow hover:shadow-card">
      <div className="flex h-32 items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
        <FolderKanban className="text-primary-400" size={32} />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-ink">{project.name}</h3>
          {editable && (
            <div className="flex flex-shrink-0 gap-1 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
              <button
                onClick={() => onEdit?.(project)}
                aria-label={`Editar ${project.name}`}
                className="rounded-md p-1.5 text-ink-soft hover:bg-slate-100 hover:text-primary-600"
              >
                <Pencil size={14} />
              </button>
              <button
                onClick={() => onDelete?.(project)}
                aria-label={`Excluir ${project.name}`}
                className="rounded-md p-1.5 text-ink-soft hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 size={14} />
              </button>
            </div>
          )}
        </div>
        <p className="mt-1.5 line-clamp-2 flex-1 text-xs text-ink-soft">{project.description}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-primary-50 px-2 py-0.5 text-[11px] font-medium text-primary-700"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
          <span className="text-[11px] text-ink-soft">{formatDate(project.date)}</span>
          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Ver repositório no GitHub"
                className="text-ink-soft hover:text-ink"
              >
                <Github size={15} />
              </a>
            )}
            {project.projectUrl && (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Ver projeto publicado"
                className="text-ink-soft hover:text-ink"
              >
                <ExternalLink size={15} />
              </a>
            )}
            <button
              onClick={() => onViewDetails?.(project)}
              className="text-xs font-semibold text-primary-600 hover:text-primary-700"
            >
              Ver detalhes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
