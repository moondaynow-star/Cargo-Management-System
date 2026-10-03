import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

interface TableActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export const TableActions: React.FC<TableActionsProps> = ({ onEdit, onDelete }) => {
  return (
    <div className="flex items-center justify-center gap-1.5">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onEdit();
        }}
        className="p-1.5 rounded-md text-info hover:bg-info-light transition-colors focus-ring"
        title="Edit"
        aria-label="Edit record"
      >
        <Pencil size={15} />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="p-1.5 rounded-md text-danger hover:bg-danger-light transition-colors focus-ring"
        title="Delete"
        aria-label="Delete record"
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
};
