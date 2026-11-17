import React from 'react';

interface BadgeProps {
  variant?: 'cyan' | 'coral' | 'slate' | 'green' | 'amber' | 'dark-cyan' | 'dark-coral' | 'dark-slate' | 'dark-emerald';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'cyan',
  children,
  className = '',
}) => {
  const variantStyles = {
    cyan: 'bg-sky-50 text-sky-900 border-sky-200',
    coral: 'bg-rose-50 text-rose-900 border-rose-200',
    slate: 'bg-slate-100 text-slate-900 border-slate-200',
    green: 'bg-emerald-50 text-emerald-900 border-emerald-200',
    amber: 'bg-amber-50 text-amber-900 border-amber-200',
    'dark-cyan': 'bg-sky-950/90 text-sky-200 border-sky-400/50 shadow-xs',
    'dark-coral': 'bg-rose-950/90 text-rose-200 border-rose-400/50 shadow-xs',
    'dark-slate': 'bg-slate-800/90 text-slate-100 border-slate-600 shadow-xs',
    'dark-emerald': 'bg-emerald-950/90 text-emerald-200 border-emerald-400/50 shadow-xs',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${variantStyles[variant]} ${className}`.trim()}
    >
      {children}
    </span>
  );
};
