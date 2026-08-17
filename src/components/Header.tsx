import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
];

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0d1117]/95 backdrop-blur-md border-b border-[#30363d]'
          : 'bg-transparent backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
        <NavLink
          to="/"
          className="flex items-center gap-2 font-heading text-xl font-bold text-[#e6edf3] tracking-tight"
        >
          <Code2 className="w-6 h-6 text-[#f0883e]" />
          <span>Mayur<span className="text-[#f0883e]">.dev</span></span>
        </NavLink>

        <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `relative text-sm font-medium transition-colors duration-200 pb-0.5 group ${
                  isActive
                    ? 'text-[#f0883e]'
                    : 'text-[#8b949e] hover:text-[#e6edf3]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px bg-[#f0883e] transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
          <NavLink
            to="/contact"
            className="ml-2 px-5 py-2 rounded-lg bg-[#f0883e] text-[#0d1117] text-sm font-semibold hover:bg-[#f0883e]/90 hover:scale-105 transition-all duration-200"
          >
            Hire Me
          </NavLink>
        </nav>

        <button
          className="md:hidden p-2 rounded-lg text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#161b22] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#f0883e]/50"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed inset-0 top-16 bg-[#0d1117] z-40 flex flex-col px-6 pt-8 gap-6 md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `text-2xl font-heading font-semibold transition-colors duration-200 ${
                    isActive ? 'text-[#f0883e]' : 'text-[#e6edf3] hover:text-[#f0883e]'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <NavLink
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="mt-4 px-6 py-3 rounded-lg bg-[#f0883e] text-[#0d1117] text-lg font-semibold text-center hover:bg-[#f0883e]/90 transition-all duration-200"
            >
              Hire Me
            </NavLink>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;