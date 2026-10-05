import React from 'react';
import { DataTable } from '@/components/table/DataTable';
import { TableActions } from '@/components/table/TableActions';
import type { Product } from '../types';
import type { Column } from '@/types/common';

interface ProductTableProps {
  data: Product[];
  loading?: boolean;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

const columns: Column<Product>[] = [
  { key: 'productName', label: 'Product Name', minWidth: 260 },
  { key: 'hsnCode', label: 'HSN Code', width: '220px' },
];

export const ProductTable: React.FC<ProductTableProps> = ({
  data,
  loading,
  onEdit,
  onDelete,
}) => {
  return (
    <DataTable<Product>
      columns={columns}
      data={data}
      rowKey="id"
      actionsWidth={100}
      loading={loading}
      emptyTitle="No products found"
      emptyMessage="Try a different search, or add a new product."
      actions={(row) => (
        <TableActions
          onEdit={() => onEdit(row)}
          onDelete={() => onDelete(row)}
        />
      )}
    />
  );
};
