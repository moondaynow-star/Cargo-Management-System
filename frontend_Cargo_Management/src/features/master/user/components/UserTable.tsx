import React from 'react';
import { DataTable } from '@/components/table/DataTable';
import { TableActions, ActionButton } from '@/components/table/TableActions';
import { RoleBadge } from '@/components/common/RoleBadge';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Key } from 'lucide-react';
import type { User } from '../types';
import type { Column } from '@/types/common';
import { formatDate, formatPhone } from '@/utils/formatters';

interface UserTableProps {
  data: User[];
  loading?: boolean;
  onEdit: (user: User) => void;
  onToggleStatus: (user: User) => void;
  onDelete: (user: User) => void;
  onResetPassword: (user: User) => void;
}

// Compact columns are fixed; ADDRESS is the single flexible column.
const columns: Column<User>[] = [
  { key: 'id', label: 'User ID', width: '100px' },
  { key: 'role', label: 'Role', width: '165px', render: (v) => <RoleBadge role={String(v)} /> },
  { key: 'branchCode', label: 'Branch Code', width: '140px' },
  { key: 'userName', label: 'User Name', width: '170px' },
  { key: 'password', label: 'Password', width: '120px', render: () => '••••••••' },
  { key: 'phone', label: 'Phone', width: '130px', render: (v) => formatPhone(String(v || '')) },
  { key: 'email', label: 'Email', width: '270px' },
  { key: 'address', label: 'Address', minWidth: 220 },
  { key: 'createdDate', label: 'Created Date', width: '140px', render: (v) => formatDate(String(v)) },
  { key: 'status', label: 'Status', width: '100px', render: (v) => <StatusBadge status={v as User['status']} /> },
];

export const UserTable: React.FC<UserTableProps> = ({
  data,
  loading,
  onEdit,
  onToggleStatus,
  onDelete,
  onResetPassword,
}) => {
  return (
    <DataTable<User>
      columns={columns}
      data={data}
      rowKey="id"
      loading={loading}
      actionsWidth={160}
      emptyTitle="No users found"
      emptyMessage="Try changing the filters, or add a new user."
      actions={(row) => (
        <TableActions
          status={row.status}
          onEdit={() => onEdit(row)}
          onToggleStatus={() => onToggleStatus(row)}
          onDelete={() => onDelete(row)}
          extraActions={
            <ActionButton tone="warning" title="Reset Password" onClick={() => onResetPassword(row)}>
              <Key size={14} />
            </ActionButton>
          }
        />
      )}
    />
  );
};
