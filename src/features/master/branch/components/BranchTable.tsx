import React from 'react';
import { DataTable } from '@/components/table/DataTable';
import { TableActions } from '@/components/table/TableActions';
import type { Branch } from '../types';
import type { Column } from '@/types/common';
import { formatPhone } from '@/utils/formatters';

interface BranchTableProps {
  data: Branch[];
  loading?: boolean;
  onEdit: (branch: Branch) => void;
  onDelete: (branch: Branch) => void;
}

const columns: Column<Branch>[] = [
  { key: 'branchName', label: 'Branch Name', width: '20%' },
  { key: 'branchCode', label: 'Branch', width: '10%' },
  { key: 'gmName', label: 'GM Name', width: '16%' },
  {
    key: 'address',
    label: 'Address',
    width: '38%',
    render: (value) => (
      <span title={String(value || '')} className="block truncate max-w-[400px]">
        {String(value || '')}
      </span>
    ),
  },
  {
    key: 'cell',
    label: 'Cell',
    width: '12%',
    render: (value) => formatPhone(String(value || '')),
  },
];

export const BranchTable: React.FC<BranchTableProps> = ({
  data,
  loading,
  onEdit,
  onDelete,
}) => {
  return (
    <DataTable<Branch>
      columns={columns}
      data={data}
      rowKey="id"
      loading={loading}
      emptyTitle="No branches found"
      emptyMessage="Add your first branch to get started."
      actions={(row) => (
        <TableActions
          onEdit={() => onEdit(row)}
          onDelete={() => onDelete(row)}
        />
      )}
    />
  );
};
