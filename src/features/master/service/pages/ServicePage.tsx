import React, { useState, useMemo } from 'react';
import { Plus, Search, Upload, Download } from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { TablePagination } from '@/components/table/TablePagination';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { ServiceTable } from '../components/ServiceTable';
import { ServiceForm } from '../components/ServiceForm';
import { mockServices } from '../mockData';
import { useModal } from '@/hooks/useModal';
import { useDebounce } from '@/hooks/useDebounce';
import { ITEMS_PER_PAGE } from '@/utils/constants';
import type { Service } from '../types';

export const ServicePage: React.FC = () => {
  const [services, setServices] = useState<Service[]>(mockServices);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const modal = useModal<Service>();
  const [deleteItem, setDeleteItem] = useState<Service | null>(null);

  const debouncedSearch = useDebounce(search);

  const filtered = useMemo(() => {
    if (!debouncedSearch) return services;
    const s = debouncedSearch.toLowerCase();
    return services.filter(
      (sv) =>
        sv.service.toLowerCase().includes(s) ||
        sv.type.toLowerCase().includes(s)
    );
  }, [services, debouncedSearch]);

  const paginated = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, page]);

  const handleSave = (service: Service) => {
    if (modal.mode === 'add') {
      setServices((prev) => [service, ...prev]);
    } else {
      setServices((prev) => prev.map((s) => (s.id === service.id ? service : s)));
    }
  };

  const handleDelete = () => {
    if (deleteItem) {
      setServices((prev) => prev.filter((s) => s.id !== deleteItem.id));
      setDeleteItem(null);
    }
  };

  return (
    <>
      <PageContainer title="Service Master">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-4 border-b border-border">
          <p className="text-[13px] text-text-muted">
            <span className="font-semibold text-text-primary">{filtered.length}</span> services found
          </p>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <div className="w-full sm:w-64">
              <Input
                placeholder="Search service, type..."
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
              Add Service
            </Button>
          </div>
        </div>

        <ServiceTable data={paginated} onEdit={modal.openEdit} onDelete={setDeleteItem} />

        <TablePagination
          currentPage={page}
          totalPages={Math.ceil(filtered.length / ITEMS_PER_PAGE)}
          totalItems={filtered.length}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={setPage}
        />
      </PageContainer>

      <ServiceForm isOpen={modal.isOpen} mode={modal.mode} service={modal.selectedItem} onClose={modal.close} onSave={handleSave} />

      <ConfirmDialog
        isOpen={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={handleDelete}
        title="Delete Service"
        message={`Are you sure you want to delete "${deleteItem?.service}"? This action cannot be undone.`}
      />
    </>
  );
};
