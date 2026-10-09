import React from 'react';
import { Pencil, Trash2, Ban, CheckCircle2 } from 'lucide-react';

interface TableActionsProps {
  onEdit: () => void;
  onDelete: () => void;
  /** When provided, a Disable/Enable toggle is shown (needs `status`). */
  onToggleStatus?: () => void;
  status?: 'Enable' | 'Disable';
  /** Slot for an additional module-specific action (use `ActionButton` with tone="warning"). */
  extraActions?: React.ReactNode;
}

type Tone = 'info' | 'danger' | 'danger-outline' | 'success-outline' | 'warning';

const toneClasses: Record<Tone, string> = {
  info: 'bg-info-light text-info border-info/20 hover:bg-info/15',
  danger: 'bg-danger-light text-danger border-danger/20 hover:bg-danger/15',
  'danger-outline': 'bg-white text-danger border-danger/50 hover:bg-danger-light',
  'success-outline': 'bg-white text-emerald-700 border-success/50 hover:bg-success-light',
  warning: 'bg-warning-light text-warning border-warning/25 hover:bg-warning/15',
};

interface ActionButtonProps {
  tone: Tone;
  title: string;
  onClick: () => void;
  children: React.ReactNode;
}

/** Compact 28×28 icon button used in table action cells. */
export const ActionButton: React.FC<ActionButtonProps> = ({ tone, title, onClick, children }) => (
  <button
    type="button"
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
    className={`inline-flex items-center justify-center w-7 h-7 rounded-control border transition-colors focus-ring ${toneClasses[tone]}`}
    title={title}
    aria-label={title}
  >
    {children}
  </button>
);

export const TableActions: React.FC<TableActionsProps> = ({
  onEdit,
  onDelete,
  onToggleStatus,
  status,
  extraActions,
}) => {
  return (
    <div className="flex items-center justify-center gap-1.5">
      <ActionButton tone="info" title="Edit" onClick={onEdit}>
        <Pencil size={14} />
      </ActionButton>

      {onToggleStatus && status && (
        <ActionButton
          tone={status === 'Enable' ? 'danger-outline' : 'success-outline'}
          title={status === 'Enable' ? 'Disable' : 'Enable'}
          onClick={onToggleStatus}
        >
          {status === 'Enable' ? <Ban size={14} /> : <CheckCircle2 size={14} />}
        </ActionButton>
      )}

      {extraActions}

      <ActionButton tone="danger" title="Delete" onClick={onDelete}>
        <Trash2 size={14} />
      </ActionButton>
    </div>
  );
};
