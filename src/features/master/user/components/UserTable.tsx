import React from 'react';
import { DataTable } from '@/components/table/DataTable';
import { TableActions } from '@/components/table/TableActions';
import type { User } from '../types';
import type { Column } from '@/types/common';

interface UserTableProps {
  data: User[];
  loading?: boolean;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

const columns: Column<User>[] = [
  { key: 'userName', label: 'User Name', width: '25%' },
  { key: 'email', label: 'Email Address', width: '35%' },
  { key: 'branchCode', label: 'Branch Code', width: '20%' },
  {
    key: 'password',
    label: 'Password',
    width: '20%',
    render: () => <span className="text-text-muted">••••••••</span>,
  },
];

export const UserTable: React.FC<UserTableProps> = ({
  data,
  loading,
  onEdit,
  onDelete,
}) => {
  return (
    <DataTable<User>
      columns={columns}
      data={data}
      rowKey="id"
      loading={loading}
      emptyTitle="No users found"
      emptyMessage="Add your first user to get started."
      actions={(row) => (
        <TableActions
          onEdit={() => onEdit(row)}
          onDelete={() => onDelete(row)}
        />
      )}
    />
  );
};
