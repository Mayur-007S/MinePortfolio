import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ExternalLink,
  Github,
  Calendar,
  Clock,
  User,
  Users,
  CheckCircle2,
  Clock3,
  CircleDot,
  Sparkles,
  Layers,
  Code2,
  Play,
  Star,
  Activity,
  Terminal,
} from 'lucide-react';
import type { Project, ProjectStatus } from './ProjectCard';

interface ProjectOverviewDrawerProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
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

const ProjectOverviewDrawer: React.FC<ProjectOverviewDrawerProps> = ({ project, isOpen, onClose }) => {
  // Prevent scrolling behind drawer when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!project) return null;

  const statusBadge = getStatusBadge(project.status);
  const progressPercent = project.progress ?? 100;
  const developer = project.developer || {
    name: 'Mayur Myana',
    role: 'Lead Java & Backend Developer',
    avatar: '/profile.png',
  };

  const contributors = project.contributors || [
    { name: 'Mayur Myana', role: 'Architecture & Backend Core', avatar: '/profile.png' },
    { name: 'Open Source Community', role: 'Testing & Feedback', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop' },
  ];

  const journey = project.journey || [
    {
      phase: 'Phase 1: Inception',
      title: 'Requirements & Schema Design',
      description: 'Defined entity relationships, relational schema, and API contract specifications.',
      status: 'completed' as const,
      date: 'Month 1',
    },
    {
      phase: 'Phase 2: Core Development',
      title: 'Spring Boot & Database Engine',
      description: 'Implemented transactional business logic, JWT authentication, and repository queries.',
      status: 'completed' as const,
      date: 'Month 2',
    },
    {
      phase: 'Phase 3: Integration & Testing',
      title: 'Unit Tests & REST API Integration',
      description: 'Wrote JUnit integration tests and created end-to-end API documentation.',
      status: progressPercent >= 80 ? ('completed' as const) : ('in-progress' as const),
      date: 'Month 3',
    },
    {
      phase: 'Phase 4: Release & Scaling',
      title: 'Cloud Deployment & Monitoring',
      description: 'Dockerized the services and deployed with continuous integration pipelines.',
      status: progressPercent === 100 ? ('completed' as const) : ('planned' as const),
      date: 'Month 4',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm cursor-pointer"
          />

          {/* Slide-out Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative w-full max-w-2xl h-full bg-[#0d1117] border-l border-[#30363d] shadow-2xl flex flex-col z-10 overflow-hidden"
          >
            {/* Drawer Header Bar */}
            <div className="p-6 border-b border-[#30363d] bg-[#161b22]/90 backdrop-blur-md flex items-center justify-between sticky top-0 z-20">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-lg bg-[#f0883e]/10 text-[#f0883e]">
                  <Sparkles className="w-5 h-5" />
                </span>
                <div>
                  <h2 className="font-heading text-xl font-bold text-[#e6edf3]">
                    Project Overview
                  </h2>
                  <p className="text-xs text-[#8b949e]">Specifications & Journey Roadmap</p>
                </div>
              </div>

              <button
                onClick={onClose}
                aria-label="Close drawer"
                className="p-2 rounded-lg text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#21262d] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#f0883e]/50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
              {/* 1. Project Title & Status Hero */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#e6edf3]">
                    {project.title}
                  </h1>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-2 ${statusBadge.bg}`}>
                    <span className={`w-2 h-2 rounded-full ${statusBadge.dot}`} />
                    <span>{statusBadge.text}</span>
                  </div>
                </div>

                {/* 2. Small Brief */}
                <p className="text-[#8b949e] text-base leading-relaxed">
                  {project.detailedDescription || project.description}
                </p>

                {/* 3. Progress Bar */}
                <div className="p-4 rounded-xl bg-[#161b22] border border-[#30363d] space-y-2">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="text-[#c9d1d9] flex items-center gap-1.5">
                      <Activity className="w-4 h-4 text-[#f0883e]" />
                      Project Development Progress
                    </span>
                    <span className="font-mono text-[#f0883e] font-bold text-sm">
                      {progressPercent}%
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-[#21262d] overflow-hidden p-0.5">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        progressPercent === 100
                          ? 'bg-emerald-400'
                          : progressPercent > 60
                          ? 'bg-[#f0883e]'
                          : 'bg-indigo-400'
                      }`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-[#8b949e] pt-1">
                    <span>Inception</span>
                    <span>Architecture</span>
                    <span>Testing</span>
                    <span>Production</span>
                  </div>
                </div>

                {/* 4. Last Updated Pill */}
                {project.lastUpdated && (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#161b22] border border-[#30363d] text-xs text-[#8b949e]">
                    <Clock className="w-3.5 h-3.5 text-[#f0883e]" />
                    <span>Last Updated: <strong className="text-[#e6edf3] font-mono">{project.lastUpdated}</strong></span>
                  </div>
                )}
              </div>

              {/* 5. Project Image / Video Preview */}
              <div className="space-y-3">
                <h3 className="text-xs uppercase tracking-widest text-[#8b949e] font-semibold flex items-center gap-2">
                  <Play className="w-4 h-4 text-[#f0883e]" />
                  Project Media Preview
                </h3>
                <div className="relative rounded-xl overflow-hidden border border-[#30363d] bg-[#161b22] group shadow-lg">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent opacity-80" />
                  
                  {project.videoUrl ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <a
                        href={project.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 rounded-full bg-[#f0883e] text-[#0d1117] hover:scale-110 transition-transform duration-200 shadow-xl"
                      >
                        <Play className="w-6 h-6 fill-current" />
                      </a>
                    </div>
                  ) : (
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-[#8b949e]">
                      <span className="font-mono bg-[#161b22]/90 backdrop-blur-md px-2.5 py-1 rounded border border-[#30363d] text-[#e6edf3]">
                        HD Visual Blueprint
                      </span>
                      {project.stars > 0 && (
                        <span className="bg-[#161b22]/90 backdrop-blur-md px-2.5 py-1 rounded border border-[#30363d] text-[#f0883e] flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          {project.stars} Stars
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* 6. Lead Developer & 7. Contributed People */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Lead Developer Card */}
                <div className="p-4 rounded-xl bg-[#161b22] border border-[#30363d] space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8b949e]">
                    <User className="w-4 h-4 text-[#f0883e]" />
                    Lead Developer
                  </div>
                  <div className="flex items-center gap-3">
                    <img
                      src={developer.avatar}
                      alt={developer.name}
                      className="w-12 h-12 rounded-xl object-cover border-2 border-[#f0883e]/50 shadow-md"
                    />
                    <div className="space-y-0.5 min-w-0">
                      <h4 className="font-semibold text-sm text-[#e6edf3] truncate">
                        {developer.name}
                      </h4>
                      <p className="text-xs text-[#f0883e] font-mono truncate">
                        {developer.role}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contributors Card */}
                <div className="p-4 rounded-xl bg-[#161b22] border border-[#30363d] space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8b949e]">
                    <Users className="w-4 h-4 text-[#f0883e]" />
                    Contributors & Roles
                  </div>
                  <div className="space-y-2">
                    {contributors.slice(0, 2).map((contributor, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs">
                        {contributor.avatar ? (
                          <img
                            src={contributor.avatar}
                            alt={contributor.name}
                            className="w-6 h-6 rounded-full object-cover border border-[#30363d]"
                          />
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-[#30363d] flex items-center justify-center text-[10px] font-bold text-[#e6edf3]">
                            {contributor.name.charAt(0)}
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <span className="font-medium text-[#c9d1d9] block truncate">{contributor.name}</span>
                          <span className="text-[11px] text-[#8b949e] block truncate">{contributor.role}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 8. Key Features & Technologies */}
              <div className="space-y-3">
                <h3 className="text-xs uppercase tracking-widest text-[#8b949e] font-semibold flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#f0883e]" />
                  Technologies & Architecture Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-lg bg-[#161b22] border border-[#30363d] text-xs font-mono text-[#c9d1d9] flex items-center gap-1.5"
                    >
                      <Code2 className="w-3.5 h-3.5 text-[#f0883e]" />
                      {tag}
                    </span>
                  ))}
                </div>

                {project.features && project.features.length > 0 && (
                  <div className="mt-4 p-4 rounded-xl bg-[#161b22] border border-[#30363d] space-y-2">
                    <span className="text-xs font-semibold text-[#e6edf3] uppercase tracking-wider block mb-2">
                      Key Highlights & Capabilities
                    </span>
                    <ul className="space-y-2">
                      {project.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-[#8b949e] leading-relaxed">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* 9. Project Journey Timeline */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs uppercase tracking-widest text-[#8b949e] font-semibold flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#f0883e]" />
                    Project Journey & Milestone Roadmap
                  </h3>
                </div>

                <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#30363d]">
                  {journey.map((step, idx) => {
                    const isCompleted = step.status === 'completed';
                    const isInProgress = step.status === 'in-progress';

                    return (
                      <div key={idx} className="relative group">
                        {/* Status Node Icon */}
                        <div className="absolute -left-6 top-0.5">
                          {isCompleted ? (
                            <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            </div>
                          ) : isInProgress ? (
                            <div className="w-5 h-5 rounded-full bg-[#f0883e]/20 border border-[#f0883e] flex items-center justify-center text-[#f0883e] animate-pulse">
                              <Clock3 className="w-3.5 h-3.5" />
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-full bg-[#21262d] border border-[#484f58] flex items-center justify-center text-[#8b949e]">
                              <CircleDot className="w-3 h-3" />
                            </div>
                          )}
                        </div>

                        {/* Content Box */}
                        <div className="p-4 rounded-xl bg-[#161b22] border border-[#30363d] hover:border-[#f0883e]/30 transition-colors duration-200 space-y-1.5">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[11px] font-mono uppercase tracking-wider text-[#f0883e] font-semibold">
                              {step.phase}
                            </span>
                            {step.date && (
                              <span className="text-[11px] text-[#8b949e] font-mono">
                                {step.date}
                              </span>
                            )}
                          </div>
                          <h4 className="font-heading text-sm font-semibold text-[#e6edf3]">
                            {step.title}
                          </h4>
                          <p className="text-xs text-[#8b949e] leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-6 border-t border-[#30363d] bg-[#161b22] flex items-center justify-between gap-4 sticky bottom-0 z-20">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-4 rounded-lg border border-[#30363d] hover:border-[#f0883e]/50 text-[#e6edf3] hover:text-[#f0883e] text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-200"
              >
                <Github className="w-4 h-4" />
                Source Code
              </a>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-4 rounded-lg bg-[#f0883e] hover:bg-[#f0883e]/90 text-[#0d1117] text-xs font-bold flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition-all duration-200"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Preview
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectOverviewDrawer;
