import React from 'react';
import { Loader2, Inbox } from 'lucide-react';
import { AdminButton } from './AdminButton';

export interface AdminTableProps {
  children?: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  isEmpty?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyActionLabel?: string;
  onEmptyAction?: () => void;
  className?: string;
}

export const AdminTable: React.FC<AdminTableProps> = ({
  children,
  isLoading = false,
  loadingText = 'Memuat data tabel...',
  isEmpty = false,
  emptyTitle = 'Belum ada data',
  emptyDescription = 'Data belum ditambahkan atau tidak ditemukan.',
  emptyActionLabel,
  onEmptyAction,
  className = ''
}) => {
  return (
    <div className={`bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden ${className}`}>
      {isLoading ? (
        <div className="p-12 sm:p-16 text-center text-slate-500 flex flex-col items-center justify-center">
          <Loader2 className="w-8 h-8 text-sky-600 animate-spin mb-3" />
          <p className="text-sm font-medium text-slate-700">{loadingText}</p>
        </div>
      ) : isEmpty ? (
        <div className="p-12 sm:p-16 text-center flex flex-col items-center justify-center max-w-sm mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 text-slate-400 flex items-center justify-center mb-3">
            <Inbox className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">{emptyTitle}</h3>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">{emptyDescription}</p>
          {emptyActionLabel && onEmptyAction && (
            <AdminButton
              type="button"
              variant="outline"
              size="sm"
              onClick={onEmptyAction}
              className="mt-4"
            >
              {emptyActionLabel}
            </AdminButton>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm divide-y divide-slate-100">
            {children}
          </table>
        </div>
      )}
    </div>
  );
};

export const AdminTableHead: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ''
}) => {
  return (
    <thead className={`bg-slate-50/80 text-[11px] font-bold text-slate-600 uppercase tracking-wider border-b border-slate-200 select-none ${className}`}>
      <tr>{children}</tr>
    </thead>
  );
};

export const AdminTableBody: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ''
}) => {
  return <tbody className={`divide-y divide-slate-100 ${className}`}>{children}</tbody>;
};

export const AdminTableRow: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}> = ({ children, className = '', onClick }) => {
  return (
    <tr
      onClick={onClick}
      className={`hover:bg-slate-50/80 transition-colors ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </tr>
  );
};

export const AdminTableCell: React.FC<{
  children: React.ReactNode;
  isHeader?: boolean;
  align?: 'left' | 'center' | 'right';
  className?: string;
}> = ({ children, isHeader = false, align = 'left', className = '' }) => {
  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  if (isHeader) {
    return (
      <th scope="col" className={`px-5 py-3.5 ${alignStyles[align]} ${className}`}>
        {children}
      </th>
    );
  }

  return (
    <td className={`px-5 py-3.5 ${alignStyles[align]} ${className}`}>
      {children}
    </td>
  );
};
