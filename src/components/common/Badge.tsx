import React from 'react';

interface BadgeProps {
  variant?: 'cyan' | 'coral' | 'slate' | 'green' | 'amber';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'cyan',
  children,
  className = '',
}) => {
  const variantStyles = {
    cyan: 'bg-sky-50 text-sky-800 border-sky-200',
    coral: 'bg-rose-50 text-rose-800 border-rose-200',
    slate: 'bg-slate-100 text-slate-800 border-slate-200',
    green: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    amber: 'bg-amber-50 text-amber-800 border-amber-200',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
