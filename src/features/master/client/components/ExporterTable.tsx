import React from 'react';
import { DataTable } from '@/components/table/DataTable';
import { TableActions } from '@/components/table/TableActions';
import type { Exporter } from '../types';
import type { Column } from '@/types/common';

interface ExporterTableProps {
  data: Exporter[];
  loading?: boolean;
  onEdit: (exporter: Exporter) => void;
  onDelete: (exporter: Exporter) => void;
}

const columns: Column<Exporter>[] = [
  { key: 'nickName', label: 'Nick Name', width: '10%' },
  { key: 'companyName', label: 'Company Name', width: '20%' },
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
  { key: 'gstin', label: 'GSTIN', width: '10%' },
  { key: 'iec', label: 'IEC', width: '10%' },
];

export const ExporterTable: React.FC<ExporterTableProps> = ({
  data,
  loading,
  onEdit,
  onDelete,
}) => {
  return (
    <DataTable<Exporter>
      columns={columns}
      data={data}
      rowKey="id"
      loading={loading}
      emptyTitle="No exporters found"
      emptyMessage="Add your first exporter to get started."
      actions={(row) => (
        <TableActions
          onEdit={() => onEdit(row)}
          onDelete={() => onDelete(row)}
        />
      )}
    />
  );
};
