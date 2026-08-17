import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Loader2 } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';
import { useGithubProjects } from '../hooks/useGithubProjects';

const Projects: React.FC = () => {
  const { projects, loading, error } = useGithubProjects();
  const [activeTag, setActiveTag] = useState('All');
  const [search, setSearch] = useState('');

  // Dynamically extract unique tags from projects
  const allTags = useMemo(() => {
    if (projects.length === 0) return ['All'];
    const tagCounts: Record<string, number> = {};
    projects.forEach(p => {
      p.tags.forEach(t => {
        tagCounts[t] = (tagCounts[t] || 0) + 1;
      });
    });
    // Sort by frequency and take top 8
    const sortedTags = Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(entry => entry[0]);
    return ['All', ...sortedTags];
  }, [projects]);

  const filtered = projects.filter((p) => {
    const matchesTag = activeTag === 'All' || p.tags.some((t) => t === activeTag || t.includes(activeTag));
    const matchesSearch =
      search === '' ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <div className="bg-[#0d1117] min-h-screen">
      <Header />

      <main>
        {/* Page Hero */}
        <section className="pt-32 pb-16 border-b border-[#30363d]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4 max-w-2xl"
            >
              <span className="text-[#f0883e] text-sm font-semibold uppercase tracking-widest">Portfolio</span>
              <h1 className="font-heading text-5xl font-bold text-[#e6edf3]">All Projects</h1>
              <p className="text-[#8b949e] text-lg leading-relaxed">
                A collection of open-source tools, backend systems, and APIs pulled directly from my GitHub.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 border-b border-[#30363d] bg-[#161b22]/30 sticky top-16 z-30 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#f0883e]/50 ${
                    activeTag === tag
                      ? 'bg-[#f0883e] text-[#0d1117]'
                      : 'bg-[#161b22] border border-[#30363d] text-[#8b949e] hover:border-[#f0883e]/40 hover:text-[#e6edf3]'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            <div className="relative w-full sm:w-64 flex-shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b949e]" />
              <input
                type="search"
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#161b22] border border-[#30363d] text-[#e6edf3] text-sm placeholder:text-[#8b949e] focus:outline-none focus:ring-2 focus:ring-[#f0883e]/50 focus:border-[#f0883e]/40 transition-all duration-200"
              />
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16 min-h-[50vh]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 space-y-4">
                <Loader2 className="w-10 h-10 text-[#f0883e] animate-spin" />
                <p className="text-[#8b949e]">Syncing repositories from GitHub...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-24 space-y-4">
                <div className="text-5xl">⚠️</div>
                <h3 className="font-heading text-xl font-semibold text-[#e6edf3]">Oops! Something went wrong.</h3>
                <p className="text-[#8b949e] text-center max-w-md">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-5 py-2 rounded-lg border border-[#30363d] text-[#8b949e] hover:text-[#e6edf3] hover:border-[#f0883e]/40 transition-all duration-200"
                >
                  Try Again
                </button>
              </div>
            ) : filtered.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((project, i) => (
                  <ProjectCard key={project.title} project={project} index={i} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 space-y-4">
                <div className="text-5xl">🔍</div>
                <h3 className="font-heading text-xl font-semibold text-[#e6edf3]">No projects found</h3>
                <p className="text-[#8b949e]">Try adjusting your search or filter criteria.</p>
                <button
                  onClick={() => { setActiveTag('All'); setSearch(''); }}
                  className="mt-4 px-5 py-2 rounded-lg border border-[#30363d] text-[#8b949e] hover:text-[#e6edf3] hover:border-[#f0883e]/40 transition-all duration-200"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Projects;