import React from 'react';
import { DataTable } from '@/components/table/DataTable';
import { TableActions } from '@/components/table/TableActions';
import type { Consignee } from '../types';
import type { Column } from '@/types/common';

interface ConsigneeTableProps {
  data: Consignee[];
  loading?: boolean;
  onEdit: (consignee: Consignee) => void;
  onDelete: (consignee: Consignee) => void;
}

const columns: Column<Consignee>[] = [
  { key: 'nickName', label: 'Nick Name', width: '15%' },
  { key: 'companyName', label: 'Company Name', width: '25%' },
  { key: 'contactName', label: 'Contact Name', width: '15%' },
  {
    key: 'address',
    label: 'Address',
    width: '25%',
    render: (value) => (
      <span title={String(value || '')} className="block truncate max-w-[250px]">
        {String(value || '')}
      </span>
    ),
  },
  { key: 'country', label: 'Country', width: '10%' },
  { key: 'contactNo', label: 'Contact No', width: '10%' },
];

export const ConsigneeTable: React.FC<ConsigneeTableProps> = ({
  data,
  loading,
  onEdit,
  onDelete,
}) => {
  return (
    <DataTable<Consignee>
      columns={columns}
      data={data}
      rowKey="id"
      loading={loading}
      emptyTitle="No consignees found"
      emptyMessage="Add your first consignee to get started."
      actions={(row) => (
        <TableActions
          onEdit={() => onEdit(row)}
          onDelete={() => onDelete(row)}
        />
      )}
    />
  );
};
