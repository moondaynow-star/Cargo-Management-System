import React, { useState, useMemo } from 'react';
import { Plus, Search, Upload, Download } from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { TablePagination } from '@/components/table/TablePagination';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { ProductTable } from '../components/ProductTable';
import { ProductForm } from '../components/ProductForm';
import { mockProducts } from '../mockData';
import { useModal } from '@/hooks/useModal';
import { useDebounce } from '@/hooks/useDebounce';
import { ITEMS_PER_PAGE } from '@/utils/constants';
import type { Product } from '../types';

export const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const modal = useModal<Product>();
  const [deleteItem, setDeleteItem] = useState<Product | null>(null);

  const debouncedSearch = useDebounce(search);

  const filtered = useMemo(() => {
    if (!debouncedSearch) return products;
    const s = debouncedSearch.toLowerCase();
    return products.filter(
      (p) =>
        p.productName.toLowerCase().includes(s) ||
        p.hsnCode.toLowerCase().includes(s)
    );
  }, [products, debouncedSearch]);

  const paginated = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, page]);

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
      <PageContainer title="Product Master">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-4 border-b border-border">
          <p className="text-[13px] text-text-muted">
            <span className="font-semibold text-text-primary">{filtered.length}</span> products found
          </p>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <div className="w-full sm:w-64">
              <Input
                placeholder="Search product, HSN code..."
                icon={<Search size={15} />}
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              />
            </div>
            <Button variant="secondary" icon={<Upload size={15} />}>
              Import
            </Button>
            <Button variant="secondary" icon={<Download size={15} />}>
              Export
            </Button>
            <Button icon={<Plus size={15} />} onClick={modal.openAdd}>
              Add Product
            </Button>
          </div>
        </div>

        <ProductTable data={paginated} onEdit={modal.openEdit} onDelete={setDeleteItem} />

        <TablePagination
          currentPage={page}
          totalPages={Math.ceil(filtered.length / ITEMS_PER_PAGE)}
          totalItems={filtered.length}
          itemsPerPage={ITEMS_PER_PAGE}
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
