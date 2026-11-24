import React from 'react';

export interface AdminBadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'info' | 'warning' | 'danger' | 'neutral' | 'purple';
  size?: 'xs' | 'sm' | 'md';
  withDot?: boolean;
  pulseDot?: boolean;
  className?: string;
}

export const AdminBadge: React.FC<AdminBadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'sm',
  withDot = false,
  pulseDot = false,
  className = ''
}) => {
  const variantStyles: Record<string, { bg: string; text: string; border: string; dot: string }> = {
    success: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'border-emerald-200/90',
      dot: 'bg-emerald-500'
    },
    info: {
      bg: 'bg-sky-50',
      text: 'text-sky-700',
      border: 'border-sky-200/90',
      dot: 'bg-sky-500'
    },
    warning: {
      bg: 'bg-amber-50',
      text: 'text-amber-800',
      border: 'border-amber-200/90',
      dot: 'bg-amber-500'
    },
    danger: {
      bg: 'bg-rose-50',
      text: 'text-rose-700',
      border: 'border-rose-200/90',
      dot: 'bg-rose-500'
    },
    neutral: {
      bg: 'bg-slate-100',
      text: 'text-slate-700',
      border: 'border-slate-200',
      dot: 'bg-slate-400'
    },
    purple: {
      bg: 'bg-indigo-50',
      text: 'text-indigo-700',
      border: 'border-indigo-200/90',
      dot: 'bg-indigo-500'
    }
  };

  const sizeStyles: Record<string, string> = {
    xs: 'px-2 py-0.5 text-[10px] gap-1',
    sm: 'px-2.5 py-0.5 text-xs gap-1.5',
    md: 'px-3 py-1 text-xs gap-1.5'
  };

  const style = variantStyles[variant];

  return (
    <span
      className={`inline-flex items-center font-medium font-mono rounded-md border select-none ${style.bg} ${style.text} ${style.border} ${sizeStyles[size]} ${className}`}
    >
      {withDot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${style.dot} ${pulseDot ? 'animate-pulse' : ''}`}
        />
      )}
      <span>{children}</span>
    </span>
  );
};
