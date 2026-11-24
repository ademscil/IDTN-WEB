import React from 'react';
import { Edit2, Trash2, Eye, Copy, Star, ExternalLink, MoreHorizontal } from 'lucide-react';

export type ActionButtonVariant =
  | 'edit'
  | 'delete'
  | 'view'
  | 'copy'
  | 'star'
  | 'external'
  | 'custom';

export interface AdminActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ActionButtonVariant;
  iconOnly?: boolean;
  label?: string;
  customIcon?: React.ReactNode;
}

export const AdminActionButton: React.FC<AdminActionButtonProps> = ({
  children,
  variant = 'edit',
  iconOnly = false,
  label,
  customIcon,
  className = '',
  ...props
}) => {
  const displayLabel = label || children;

  const config: Record<
    ActionButtonVariant,
    { icon: React.ReactNode; defaultText: string; styles: string }
  > = {
    edit: {
      icon: <Edit2 className="w-3.5 h-3.5" />,
      defaultText: 'Edit',
      styles:
        'bg-sky-50 text-sky-700 border-sky-200/90 hover:bg-sky-100 hover:border-sky-300 hover:text-sky-800'
    },
    delete: {
      icon: <Trash2 className="w-3.5 h-3.5" />,
      defaultText: 'Hapus',
      styles:
        'bg-rose-50 text-rose-700 border-rose-200/90 hover:bg-rose-100 hover:border-rose-300 hover:text-rose-800'
    },
    view: {
      icon: <Eye className="w-3.5 h-3.5" />,
      defaultText: 'Detail',
      styles:
        'bg-indigo-50 text-indigo-700 border-indigo-200/90 hover:bg-indigo-100 hover:border-indigo-300 hover:text-indigo-800'
    },
    copy: {
      icon: <Copy className="w-3.5 h-3.5" />,
      defaultText: 'Salin',
      styles:
        'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300 hover:text-slate-900'
    },
    star: {
      icon: <Star className="w-3.5 h-3.5" />,
      defaultText: 'Utama',
      styles:
        'bg-amber-50 text-amber-700 border-amber-200/90 hover:bg-amber-100 hover:border-amber-300 hover:text-amber-800'
    },
    external: {
      icon: <ExternalLink className="w-3.5 h-3.5" />,
      defaultText: 'Buka',
      styles:
        'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
    },
    custom: {
      icon: customIcon || <MoreHorizontal className="w-3.5 h-3.5" />,
      defaultText: '',
      styles:
        'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
    }
  };

  const item = config[variant];
  const text = displayLabel || item.defaultText;

  return (
    <button
      type="button"
      title={typeof text === 'string' ? text : undefined}
      aria-label={typeof text === 'string' ? text : undefined}
      className={`inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer shadow-2xs select-none active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed ${item.styles} ${className}`}
      {...props}
    >
      <span className="shrink-0">{customIcon || item.icon}</span>
      {!iconOnly && text && <span>{text}</span>}
    </button>
  );
};

export const AdminActionGroup: React.FC<{
  children: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
}> = ({ children, align = 'right', className = '' }) => {
  const alignStyles = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end'
  };

  return (
    <div className={`flex flex-wrap items-center gap-1.5 ${alignStyles[align]} ${className}`}>
      {children}
    </div>
  );
};
