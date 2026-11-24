import React from 'react';

export interface AdminCardProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
}

export const AdminCard: React.FC<AdminCardProps> = ({
  children,
  title,
  description,
  badge,
  actions,
  footer,
  className = '',
  bodyClassName = 'p-5 sm:p-6'
}) => {
  const hasHeader = title || description || badge || actions;

  return (
    <div className={`bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden ${className}`}>
      {hasHeader && (
        <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/40">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2.5">
              {title && <h3 className="text-base font-bold text-slate-900">{title}</h3>}
              {badge}
            </div>
            {description && <p className="text-xs text-slate-500">{description}</p>}
          </div>
          {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
        </div>
      )}
      <div className={bodyClassName}>{children}</div>
      {footer && (
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between gap-3">
          {footer}
        </div>
      )}
    </div>
  );
};
