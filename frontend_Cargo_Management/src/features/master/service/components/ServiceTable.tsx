import React from 'react';
import { DataTable } from '@/components/table/DataTable';
import { TableActions } from '@/components/table/TableActions';
import type { Service } from '../types';
import type { Column } from '@/types/common';

interface ServiceTableProps {
  data: Service[];
  loading?: boolean;
  onEdit: (service: Service) => void;
  onDelete: (service: Service) => void;
}

const columns: Column<Service>[] = [
  { key: 'service', label: 'Service', minWidth: 260 },
  { key: 'type', label: 'Type', width: '220px' },
];

export const ServiceTable: React.FC<ServiceTableProps> = ({
  data,
  loading,
  onEdit,
  onDelete,
}) => {
  return (
    <DataTable<Service>
      columns={columns}
      data={data}
      rowKey="id"
      actionsWidth={100}
      loading={loading}
      emptyTitle="No services found"
      emptyMessage="Try a different search, or add a new service."
      actions={(row) => (
        <TableActions
          onEdit={() => onEdit(row)}
          onDelete={() => onDelete(row)}
        />
      )}
    />
  );
};
