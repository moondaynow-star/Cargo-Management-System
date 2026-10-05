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
  { key: 'nickName', label: 'Nick Name', width: '150px' },
  { key: 'companyName', label: 'Company Name', width: '250px' },
  { key: 'contactName', label: 'Contact Name', width: '170px' },
  { key: 'address', label: 'Address', minWidth: 260 },
  { key: 'country', label: 'Country', width: '110px' },
  { key: 'gstin', label: 'GSTIN', width: '170px' },
  { key: 'iec', label: 'IEC', width: '130px' },
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
      actionsWidth={100}
      loading={loading}
      emptyTitle="No exporters found"
      emptyMessage="Try changing the filters, or add a new exporter."
      actions={(row) => (
        <TableActions
          onEdit={() => onEdit(row)}
          onDelete={() => onDelete(row)}
        />
      )}
    />
  );
};
