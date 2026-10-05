import React, { useState, useMemo } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { DataToolbar } from '@/components/table/DataToolbar';
import { TablePagination } from '@/components/table/TablePagination';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { ServiceTable } from '../components/ServiceTable';
import { ServiceForm } from '../components/ServiceForm';
import { mockServices } from '../mockData';
import { useModal } from '@/hooks/useModal';
import { useDebounce } from '@/hooks/useDebounce';
import { usePagination } from '@/hooks/usePagination';
import type { Service } from '../types';

export const ServicePage: React.FC = () => {
  const [services, setServices] = useState<Service[]>(mockServices);
  const [search, setSearch] = useState('');
  const modal = useModal<Service>();
  const [deleteItem, setDeleteItem] = useState<Service | null>(null);

  const debouncedSearch = useDebounce(search);

  const filtered = useMemo(() => {
    const s = debouncedSearch.trim().toLowerCase();
    if (!s) return services;
    return services.filter(
      (sv) => sv.service.toLowerCase().includes(s) || sv.type.toLowerCase().includes(s)
    );
  }, [services, debouncedSearch]);

  const { page, setPage, resetPage, pageItems, totalItems, totalPages, perPage } =
    usePagination(filtered);

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
      <PageContainer title="Service Management">
        <DataToolbar
          count={totalItems}
          countLabel="services"
          search={{
            value: search,
            onChange: (v) => {
              setSearch(v);
              resetPage();
            },
            placeholder: 'Search service...',
          }}
          actions={{
            showImport: true,
            showExport: true,
            add: { label: 'Add Service', onClick: modal.openAdd },
          }}
        />

        <ServiceTable data={pageItems} onEdit={modal.openEdit} onDelete={setDeleteItem} />

        <TablePagination
          currentPage={page}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={perPage}
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
