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
  { key: 'nickName', label: 'Nick Name', width: '150px' },
  { key: 'importerCompany', label: 'Importer Company', width: '270px' },
  { key: 'contactName', label: 'Contact Name', width: '180px' },
  { key: 'address', label: 'Address', minWidth: 260 },
  { key: 'country', label: 'Country', width: '160px' },
  { key: 'contactNo', label: 'Contact No', width: '160px' },
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
      actionsWidth={100}
      loading={loading}
      emptyTitle="No consignees found"
      emptyMessage="Try changing the filters, or add a new consignee."
      actions={(row) => (
        <TableActions
          onEdit={() => onEdit(row)}
          onDelete={() => onDelete(row)}
        />
      )}
    />
  );
};
