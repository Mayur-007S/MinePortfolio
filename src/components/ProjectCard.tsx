import React from 'react';
import { ExternalLink, Github, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export interface Project {
  title: string;
  description: string;
  tags: string[];
  stars: number;
  githubUrl: string;
  liveUrl?: string;
  image: string;
  featured?: boolean;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex flex-col rounded-xl bg-[#161b22] border border-[#30363d] hover:border-[#f0883e]/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      <div className="relative overflow-hidden h-48">
        <img
          src={project.image}
          alt={`${project.title} project screenshot`}
          width={600}
          height={300}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#161b22] via-transparent to-transparent" />
        {project.featured && (
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#f0883e] text-[#0d1117] text-xs font-bold uppercase tracking-wide">
            Featured
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-6 gap-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-heading text-lg font-semibold text-[#e6edf3] leading-snug">
            {project.title}
          </h3>
          <div className="flex items-center gap-1 text-[#8b949e] shrink-0">
            <Star className="w-4 h-4 text-[#f0883e]" />
            <span className="text-xs font-medium">{project.stars}</span>
          </div>
        </div>

        <p className="text-[#8b949e] text-sm leading-relaxed flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-md bg-[#0d1117] border border-[#30363d] text-[#8b949e] text-xs font-mono"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 pt-2 border-t border-[#30363d]">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} on GitHub`}
            className="flex items-center gap-1.5 text-[#8b949e] hover:text-[#e6edf3] text-sm font-medium transition-colors duration-200"
          >
            <Github className="w-4 h-4" />
            Code
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} live demo`}
              className="flex items-center gap-1.5 text-[#f0883e] hover:text-[#f0883e]/80 text-sm font-medium transition-colors duration-200"
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;