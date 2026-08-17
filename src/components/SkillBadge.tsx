import React from 'react';

interface SkillBadgeProps {
  label: string;
  level?: number;
}

const SkillBadge: React.FC<SkillBadgeProps> = ({ label, level }) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 rounded-lg bg-[#161b22] border border-[#30363d] hover:border-[#f0883e]/40 transition-all duration-200 group">
      <span className="text-[#e6edf3] text-sm font-medium group-hover:text-[#f0883e] transition-colors duration-200">
        {label}
      </span>
      {level !== undefined && (
        <div className="flex gap-1 ml-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <span
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                i <= level ? 'bg-[#f0883e]' : 'bg-[#30363d]'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillBadge;