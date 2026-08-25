import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Download,
  Server,
  Database,
  Cloud,
  GitBranch,
  CheckCircle2,
  Coffee,
  Loader2,
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SkillBadge from '../components/SkillBadge';
import ProjectCard, { type Project } from '../components/ProjectCard';
import ProjectOverviewDrawer from '../components/ProjectOverviewDrawer';
import { useGithubProjects } from '../hooks/useGithubProjects';

const skills = [
  { label: 'Java 17 / 21', level: 5 },
  { label: 'Spring Boot', level: 5 },
  { label: 'Spring Security', level: 4 },
  { label: 'Hibernate / JPA', level: 5 },
  { label: 'Apache Kafka', level: 4 },
  { label: 'PostgreSQL / MySQL', level: 5 },
  { label: 'Redis', level: 4 },
  { label: 'Docker & Kubernetes', level: 4 },
  { label: 'AWS / GCP', level: 3 },
  { label: 'REST & GraphQL', level: 5 },
  { label: 'Maven / Gradle', level: 5 },
  { label: 'JUnit & Mockito', level: 5 },
];

const services = [
  {
    icon: <Server className="w-6 h-6 text-[#f0883e]" />,
    title: 'Backend Architecture',
    description: 'Designing scalable, maintainable server-side systems using Java and Spring ecosystem best practices.',
  },
  {
    icon: <Database className="w-6 h-6 text-[#f0883e]" />,
    title: 'Database Design',
    description: 'Relational and NoSQL schema design, query optimization, and data migration strategies.',
  },
  {
    icon: <Cloud className="w-6 h-6 text-[#f0883e]" />,
    title: 'Cloud Deployment',
    description: 'Containerized deployments on AWS and GCP with CI/CD pipelines and infrastructure as code.',
  },
  {
    icon: <GitBranch className="w-6 h-6 text-[#f0883e]" />,
    title: 'API Development',
    description: 'RESTful and GraphQL APIs with comprehensive documentation, versioning, and security layers.',
  },
];

const stats = [
  { value: '1+', label: 'Year Experience' },
  { value: '10+', label: 'Projects Developed' },
  { value: '5+', label: 'Certifications' },
  { value: '100%', label: 'Dedication' },
];

const Home: React.FC = () => {
  const { projects, loading } = useGithubProjects();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const featuredProjects = useMemo(() => {
    return projects.filter(p => p.featured).slice(0, 3);
  }, [projects]);

  return (
    <div className="bg-[#0d1117] min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#f0883e12_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_#1f6feb18_0%,_transparent_60%)]" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-[#f0883e]/5 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#161b22] border border-[#30363d] text-[#8b949e] text-sm">
              <Coffee className="w-4 h-4 text-[#f0883e]" />
              <span>Available for new projects</span>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            </div>

            <div className="space-y-4">
              <h1 className="font-heading text-5xl lg:text-6xl xl:text-7xl font-bold text-[#e6edf3] leading-tight">
                Mayur Myana
                <span className="block text-[#f0883e]">Java Developer</span>
              </h1>
              <p className="text-[#8b949e] text-lg leading-relaxed max-w-lg">
                Passionate Java Developer with 1+ years experience building scalable backend systems, microservices architectures, and cloud-native APIs.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#f0883e] text-[#0d1117] font-semibold hover:bg-[#f0883e]/90 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#f0883e]/50"
              >
                View Projects
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="/mayur_resume.pdf"
                download="Mayur_Myana_Resume.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#30363d] text-[#e6edf3] font-semibold hover:border-[#f0883e]/50 hover:text-[#f0883e] hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#f0883e]/50"
              >
                <Download className="w-4 h-4" />
                Download CV
              </a>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              {['Java 21', 'Spring Boot', 'Microservices', 'AWS'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-md bg-[#161b22] border border-[#30363d] text-[#8b949e] text-xs font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="relative hidden lg:flex justify-center"
          >
            <div className="relative w-80 h-80 xl:w-96 xl:h-96">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#f0883e]/20 to-[#1f6feb]/20 blur-2xl" />
              <img
                src="/profile.png"
                alt="Mayur Myana, Java Developer"
                width={500}
                height={500}
                className="relative w-full h-full object-cover rounded-2xl border border-[#30363d]"
              />
              <div className="absolute -bottom-4 -right-4 px-4 py-3 rounded-xl bg-[#161b22] border border-[#30363d] shadow-xl">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-[#e6edf3] text-sm font-medium">Open to work</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-[#30363d] bg-[#161b22]/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="text-center"
              >
                <div className="font-heading text-4xl font-bold text-[#f0883e]">{stat.value}</div>
                <div className="text-[#8b949e] text-sm mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16 space-y-4"
          >
            <span className="text-[#f0883e] text-sm font-semibold uppercase tracking-widest">What I Do</span>
            <h2 className="font-heading text-4xl font-bold text-[#e6edf3]">Services & Expertise</h2>
            <p className="text-[#8b949e] max-w-xl mx-auto leading-relaxed">
              End-to-end backend engineering from architecture design to production deployment.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 rounded-xl bg-[#161b22] border border-[#30363d] hover:border-[#f0883e]/40 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 space-y-4"
              >
                <div className="w-12 h-12 rounded-lg bg-[#f0883e]/10 flex items-center justify-center">
                  {service.icon}
                </div>
                <h3 className="font-heading text-lg font-semibold text-[#e6edf3]">{service.title}</h3>
                <p className="text-[#8b949e] text-sm leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-24 bg-[#161b22]/30 border-y border-[#30363d]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16 space-y-4"
          >
            <span className="text-[#f0883e] text-sm font-semibold uppercase tracking-widest">Tech Stack</span>
            <h2 className="font-heading text-4xl font-bold text-[#e6edf3]">Skills & Technologies</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.label}
                initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <SkillBadge label={skill.label} level={skill.level} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16"
          >
            <div className="space-y-4">
              <span className="text-[#f0883e] text-sm font-semibold uppercase tracking-widest">Portfolio</span>
              <h2 className="font-heading text-4xl font-bold text-[#e6edf3]">Featured Projects</h2>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-[#f0883e] font-medium hover:gap-3 transition-all duration-200 shrink-0"
            >
              View all projects
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[300px]">
            {loading ? (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col items-center justify-center space-y-4 text-[#8b949e]">
                <Loader2 className="w-8 h-8 text-[#f0883e] animate-spin" />
                <p>Loading featured projects...</p>
              </div>
            ) : (
              featuredProjects.map((project, i) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  index={i}
                  onOpenOverview={setSelectedProject}
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-[#30363d]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="font-heading text-4xl lg:text-5xl font-bold text-[#e6edf3]">
                Let's build something
                <span className="text-[#f0883e]"> great together</span>
              </h2>
              <p className="text-[#8b949e] text-lg leading-relaxed max-w-xl mx-auto">
                Have a project in mind? I'm currently available for freelance and full-time opportunities.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-[#f0883e] text-[#0d1117] font-semibold text-lg hover:bg-[#f0883e]/90 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#f0883e]/50"
            >
              Get In Touch
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Project Overview & Journey Drawer */}
      <ProjectOverviewDrawer
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};

export default Home;