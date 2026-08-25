import React from 'react';
import { ExternalLink, Github, Star, Sparkles, Clock, CheckCircle2, AlertCircle, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export type ProjectStatus = 'Complete' | 'In-Process' | 'Beta' | 'Stop / Archived' | 'Active Development';

export interface Contributor {
  name: string;
  role: string;
  avatar?: string;
  github?: string;
}

export interface Milestone {
  phase: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'planned';
  date?: string;
}

export interface Project {
  title: string;
  description: string;
  detailedDescription?: string;
  tags: string[];
  stars: number;
  githubUrl: string;
  liveUrl?: string;
  image: string;
  videoUrl?: string;
  featured?: boolean;

  // Overview Attributes
  status?: ProjectStatus;
  progress?: number; // 0 - 100
  lastUpdated?: string;
  developer?: {
    name: string;
    role: string;
    avatar: string;
  };
  contributors?: Contributor[];
  journey?: Milestone[];
  features?: string[];
}

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenOverview?: (project: Project) => void;
}

const getStatusBadge = (status?: ProjectStatus) => {
  switch (status) {
    case 'Complete':
      return {
        bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
        dot: 'bg-emerald-400',
        text: 'Complete',
      };
    case 'In-Process':
    case 'Active Development':
      return {
        bg: 'bg-[#f0883e]/10 border-[#f0883e]/30 text-[#f0883e]',
        dot: 'bg-[#f0883e] animate-pulse',
        text: status,
      };
    case 'Beta':
      return {
        bg: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400',
        dot: 'bg-indigo-400',
        text: 'Beta',
      };
    case 'Stop / Archived':
      return {
        bg: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
        dot: 'bg-rose-400',
        text: 'Stop / Archived',
      };
    default:
      return {
        bg: 'bg-[#1f6feb]/10 border-[#1f6feb]/30 text-[#58a6ff]',
        dot: 'bg-[#58a6ff]',
        text: 'Active',
      };
  }
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onOpenOverview }) => {
  const statusBadge = getStatusBadge(project.status);
  const progressPercent = project.progress ?? 100;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex flex-col rounded-xl bg-[#161b22] border border-[#30363d] hover:border-[#f0883e]/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden relative"
    >
      {/* Media Image / Video Container */}
      <div 
        className="relative overflow-hidden h-48 cursor-pointer"
        onClick={() => onOpenOverview && onOpenOverview(project)}
      >
        <img
          src={project.image}
          alt={`${project.title} preview`}
          width={600}
          height={300}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#161b22] via-[#161b22]/30 to-transparent" />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className={`px-2.5 py-1 rounded-full text-xs font-semibold border backdrop-blur-md flex items-center gap-1.5 ${statusBadge.bg}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${statusBadge.dot}`} />
            <span>{statusBadge.text}</span>
          </div>

          {project.featured && (
            <span className="px-2.5 py-1 rounded-full bg-[#f0883e] text-[#0d1117] text-xs font-bold uppercase tracking-wide shadow-md">
              Featured
            </span>
          )}
        </div>

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-[#0d1117]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <button
            type="button"
            className="px-4 py-2 rounded-lg bg-[#f0883e] text-[#0d1117] text-xs font-bold flex items-center gap-1.5 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
          >
            <Sparkles className="w-3.5 h-3.5" />
            View Overview & Journey
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        {/* Header: Title & Stars */}
        <div className="flex items-start justify-between gap-3">
          <h3 
            className="font-heading text-lg font-semibold text-[#e6edf3] leading-snug group-hover:text-[#f0883e] transition-colors duration-200 cursor-pointer"
            onClick={() => onOpenOverview && onOpenOverview(project)}
          >
            {project.title}
          </h3>
          <div className="flex items-center gap-1 text-[#8b949e] shrink-0 bg-[#0d1117] px-2 py-0.5 rounded border border-[#30363d]">
            <Star className="w-3.5 h-3.5 text-[#f0883e]" />
            <span className="text-xs font-medium">{project.stars}</span>
          </div>
        </div>

        {/* Small brief description */}
        <p className="text-[#8b949e] text-sm leading-relaxed flex-1 line-clamp-3">
          {project.description}
        </p>

        {/* Progress Bar & Status Info */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-xs text-[#8b949e]">
            <span className="flex items-center gap-1 font-medium">
              Progress
            </span>
            <span className="font-mono text-[#e6edf3]">{progressPercent}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-[#21262d] overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                progressPercent === 100
                  ? 'bg-emerald-400'
                  : progressPercent > 50
                  ? 'bg-[#f0883e]'
                  : 'bg-indigo-400'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Developer & Last Updated Pill */}
        <div className="flex items-center justify-between pt-1 text-xs text-[#8b949e] border-t border-[#21262d]">
          {project.developer && (
            <div className="flex items-center gap-1.5">
              <img
                src={project.developer.avatar}
                alt={project.developer.name}
                className="w-5 h-5 rounded-full object-cover border border-[#30363d]"
              />
              <span className="text-[#c9d1d9] truncate max-w-[100px]">{project.developer.name}</span>
            </div>
          )}
          {project.lastUpdated && (
            <div className="flex items-center gap-1 text-[#8b949e] ml-auto font-mono text-[11px]">
              <Clock className="w-3 h-3 text-[#f0883e]" />
              <span>{project.lastUpdated}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md bg-[#0d1117] border border-[#30363d] text-[#8b949e] text-xs font-mono"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="px-2 py-0.5 rounded-md bg-[#0d1117] border border-[#30363d] text-[#8b949e] text-xs font-mono">
              +{project.tags.length - 4}
            </span>
          )}
        </div>

        {/* Actions Bottom Bar */}
        <div className="flex items-center justify-between pt-3 border-t border-[#30363d]">
          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} on GitHub`}
              className="flex items-center gap-1.5 text-[#8b949e] hover:text-[#e6edf3] text-xs font-medium transition-colors duration-200"
            >
              <Github className="w-3.5 h-3.5" />
              Code
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} live demo`}
                className="flex items-center gap-1.5 text-[#f0883e] hover:text-[#f0883e]/80 text-xs font-medium transition-colors duration-200"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Live Demo
              </a>
            )}
          </div>

          <button
            type="button"
            onClick={() => onOpenOverview && onOpenOverview(project)}
            className="text-xs font-semibold text-[#f0883e] hover:text-[#e6edf3] flex items-center gap-1 transition-colors duration-200"
          >
            Overview
            <span>→</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;