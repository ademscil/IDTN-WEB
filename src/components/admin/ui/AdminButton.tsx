import React from 'react';
import { Loader2 } from 'lucide-react';

export interface AdminButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'danger-solid' | 'outline' | 'ghost' | 'success';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const AdminButton: React.FC<AdminButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  icon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const effectiveLeftIcon = leftIcon || icon;
  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-xl transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const sizeStyles: Record<string, string> = {
    xs: 'px-2.5 py-1 text-xs gap-1.5',
    sm: 'px-3 py-1.5 text-xs gap-2',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-5 py-2.5 text-base gap-2.5'
  };

  const variantStyles: Record<string, string> = {
    primary:
      'bg-sky-600 hover:bg-sky-700 text-white shadow-xs hover:shadow-md focus-visible:ring-sky-500 border border-sky-500/30',
    secondary:
      'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 focus-visible:ring-slate-400',
    danger:
      'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 hover:border-rose-300 focus-visible:ring-rose-500',
    'danger-solid':
      'bg-rose-600 hover:bg-rose-700 text-white shadow-xs hover:shadow-md focus-visible:ring-rose-500 border border-rose-600',
    outline:
      'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 hover:border-slate-400 focus-visible:ring-sky-500 shadow-2xs',
    ghost:
      'bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900 focus-visible:ring-slate-400',
    success:
      'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 hover:border-emerald-300 focus-visible:ring-emerald-500'
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : (
        effectiveLeftIcon && <span className="shrink-0">{effectiveLeftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
};
