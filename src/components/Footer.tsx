import React from 'react';
import { NavLink } from 'react-router-dom';
import { Code2, Github, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#010409] border-t border-[#30363d]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-[#f0883e]" />
              <span className="font-heading text-lg font-bold text-[#e6edf3]">
                Mayur<span className="text-[#f0883e]">.dev</span>
              </span>
            </div>
            <p className="text-[#8b949e] text-sm leading-relaxed max-w-xs">
              Java Developer crafting scalable backend systems, microservices architectures, and cloud-native APIs.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="p-2 rounded-lg text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#161b22] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#f0883e]/50"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="p-2 rounded-lg text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#161b22] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#f0883e]/50"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter profile"
                className="p-2 rounded-lg text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#161b22] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#f0883e]/50"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-[#e6edf3] font-semibold text-sm uppercase tracking-widest">Navigation</h3>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Home' },
                { to: '/projects', label: 'Projects' },
                { to: '/contact', label: 'Contact' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === '/'}
                    className="text-[#8b949e] hover:text-[#f0883e] text-sm transition-colors duration-200"
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-[#e6edf3] font-semibold text-sm uppercase tracking-widest">Expertise</h3>
            <ul className="space-y-3">
              {['Java & Spring Boot', 'Microservices', 'REST & GraphQL APIs', 'Cloud & DevOps', 'System Design'].map((item) => (
                <li key={item} className="text-[#8b949e] text-sm">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-[#30363d]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#8b949e] text-xs">
            © 2026 Mayur . All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[#8b949e] hover:text-[#e6edf3] text-xs transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="text-[#8b949e] hover:text-[#e6edf3] text-xs transition-colors duration-200">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;