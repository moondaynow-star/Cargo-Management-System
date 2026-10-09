import React, { useState, useMemo } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { DataToolbar } from '@/components/table/DataToolbar';
import { TablePagination } from '@/components/table/TablePagination';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { ProductTable } from '../components/ProductTable';
import { ProductForm } from '../components/ProductForm';
import { mockProducts } from '../mockData';
import { useModal } from '@/hooks/useModal';
import { useDebounce } from '@/hooks/useDebounce';
import { usePagination } from '@/hooks/usePagination';
import type { Product } from '../types';

export const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [search, setSearch] = useState('');
  const modal = useModal<Product>();
  const [deleteItem, setDeleteItem] = useState<Product | null>(null);

  const debouncedSearch = useDebounce(search);

  const filtered = useMemo(() => {
    const s = debouncedSearch.trim().toLowerCase();
    if (!s) return products;
    return products.filter(
      (p) => p.productName.toLowerCase().includes(s) || p.hsnCode.toLowerCase().includes(s)
    );
  }, [products, debouncedSearch]);

  const { page, setPage, resetPage, pageItems, totalItems, totalPages, perPage } =
    usePagination(filtered);

  const handleSave = (product: Product) => {
    if (modal.mode === 'add') {
      setProducts((prev) => [product, ...prev]);
    } else {
      setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)));
    }
  };

  const handleDelete = () => {
    if (deleteItem) {
      setProducts((prev) => prev.filter((p) => p.id !== deleteItem.id));
      setDeleteItem(null);
    }
  };

  return (
    <>
      <PageContainer title="Product Management">
        <DataToolbar
          count={totalItems}
          countLabel="products"
          search={{
            value: search,
            onChange: (v) => {
              setSearch(v);
              resetPage();
            },
            placeholder: 'Search product name, HSN...',
          }}
          actions={{
            showImport: true,
            showExport: true,
            add: { label: 'Add Product', onClick: modal.openAdd },
          }}
        />

        <ProductTable data={pageItems} onEdit={modal.openEdit} onDelete={setDeleteItem} />

        <TablePagination
          currentPage={page}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={perPage}
          onPageChange={setPage}
        />
      </PageContainer>

      <ProductForm isOpen={modal.isOpen} mode={modal.mode} product={modal.selectedItem} onClose={modal.close} onSave={handleSave} />

      <ConfirmDialog
        isOpen={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={handleDelete}
        title="Delete Product"
        message={`Are you sure you want to delete "${deleteItem?.productName}"? This action cannot be undone.`}
      />
    </>
  );
};
