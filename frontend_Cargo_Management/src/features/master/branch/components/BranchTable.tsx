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
  { key: 'branchName', label: 'Branch Name', width: '240px' },
  { key: 'branchCode', label: 'Branch', width: '120px' },
  { key: 'gmName', label: 'GM Name', width: '200px' },
  { key: 'address', label: 'Address', minWidth: 300 },
  { key: 'cell', label: 'Cell', width: '140px', render: (value) => formatPhone(String(value || '')) },
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
      actionsWidth={100}
      loading={loading}
      emptyTitle="No branches found"
      emptyMessage="Try changing the filters, or add a new branch."
      actions={(row) => (
        <TableActions
          onEdit={() => onEdit(row)}
          onDelete={() => onDelete(row)}
        />
      )}
    />
  );
};
