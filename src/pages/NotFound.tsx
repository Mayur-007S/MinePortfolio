import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Code2 } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="bg-[#0d1117] min-h-screen flex items-center justify-center px-6">
      <div className="text-center space-y-8 max-w-md">
        <div className="flex justify-center">
          <Code2 className="w-16 h-16 text-[#f0883e]" />
        </div>
        <div className="space-y-3">
          <h1 className="font-heading text-8xl font-bold text-[#f0883e]">404</h1>
          <h2 className="font-heading text-2xl font-semibold text-[#e6edf3]">Page Not Found</h2>
          <p className="text-[#8b949e] leading-relaxed">
            Looks like this route doesn't exist. Let's get you back on track.
          </p>
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#f0883e] text-[#0d1117] font-semibold hover:bg-[#f0883e]/90 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#f0883e]/50"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;