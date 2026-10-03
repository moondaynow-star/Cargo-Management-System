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
  { key: 'service', label: 'Service Name', width: '60%' },
  { key: 'type', label: 'Service Type', width: '40%' },
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
      loading={loading}
      emptyTitle="No services found"
      emptyMessage="Add your first service to get started."
      actions={(row) => (
        <TableActions
          onEdit={() => onEdit(row)}
          onDelete={() => onDelete(row)}
        />
      )}
    />
  );
};
