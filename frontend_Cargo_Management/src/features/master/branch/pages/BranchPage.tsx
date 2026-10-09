import React, { useState, useMemo } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { DataToolbar } from '@/components/table/DataToolbar';
import { TablePagination } from '@/components/table/TablePagination';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { BranchTable } from '../components/BranchTable';
import { BranchForm } from '../components/BranchForm';
import { mockBranches } from '../mockData';
import { useModal } from '@/hooks/useModal';
import { useDebounce } from '@/hooks/useDebounce';
import { usePagination } from '@/hooks/usePagination';
import { inDateRange } from '@/utils/filters';
import type { Branch } from '../types';

export const BranchPage: React.FC = () => {
  const [branches, setBranches] = useState<Branch[]>(mockBranches);
  const [search, setSearch] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const modal = useModal<Branch>();
  const [deleteItem, setDeleteItem] = useState<Branch | null>(null);

  const debouncedSearch = useDebounce(search);

  const filtered = useMemo(() => {
    const s = debouncedSearch.trim().toLowerCase();
    return branches.filter((b) => {
      if (
        s &&
        !(
          b.branchName.toLowerCase().includes(s) ||
          b.branchCode.toLowerCase().includes(s) ||
          b.gmName.toLowerCase().includes(s) ||
          b.cell.includes(s)
        )
      )
        return false;
      return inDateRange(b.createdDate, dateFrom, dateTo);
    });
  }, [branches, debouncedSearch, dateFrom, dateTo]);

  const { page, setPage, resetPage, pageItems, totalItems, totalPages, perPage } =
    usePagination(filtered);

  const handleSave = (branch: Branch) => {
    if (modal.mode === 'add') {
      setBranches((prev) => [branch, ...prev]);
    } else {
      setBranches((prev) => prev.map((b) => (b.id === branch.id ? branch : b)));
    }
  };

  const handleDelete = () => {
    if (deleteItem) {
      setBranches((prev) => prev.filter((b) => b.id !== deleteItem.id));
      setDeleteItem(null);
    }
  };

  return (
    <>
      <PageContainer title="Branch Management">
        <DataToolbar
          count={totalItems}
          countLabel="branches"
          search={{
            value: search,
            onChange: (v) => {
              setSearch(v);
              resetPage();
            },
            placeholder: 'Search branch name, code, GM...',
          }}
          dateRange={{
            from: dateFrom,
            to: dateTo,
            onChange: (from, to) => {
              setDateFrom(from);
              setDateTo(to);
              resetPage();
            },
          }}
          actions={{
            showImport: true,
            showExport: true,
            add: { label: 'Add Branch', onClick: modal.openAdd },
          }}
        />

        <BranchTable data={pageItems} onEdit={modal.openEdit} onDelete={setDeleteItem} />

        <TablePagination
          currentPage={page}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={perPage}
          onPageChange={setPage}
        />
      </PageContainer>

      <BranchForm
        isOpen={modal.isOpen}
        mode={modal.mode}
        branch={modal.selectedItem}
        onClose={modal.close}
        onSave={handleSave}
      />

      <ConfirmDialog
        isOpen={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={handleDelete}
        title="Delete Branch"
        message={`Are you sure you want to delete "${deleteItem?.branchName}"? This action cannot be undone.`}
      />
    </>
  );
};
