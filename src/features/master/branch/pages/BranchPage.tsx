import React, { useState, useMemo } from 'react';
import { Plus, Search, Upload, Download } from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { TablePagination } from '@/components/table/TablePagination';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { BranchTable } from '../components/BranchTable';
import { BranchForm } from '../components/BranchForm';
import { mockBranches } from '../mockData';
import { useModal } from '@/hooks/useModal';
import { useDebounce } from '@/hooks/useDebounce';
import { ITEMS_PER_PAGE } from '@/utils/constants';
import type { Branch } from '../types';

export const BranchPage: React.FC = () => {
  const [branches, setBranches] = useState<Branch[]>(mockBranches);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const modal = useModal<Branch>();
  const [deleteItem, setDeleteItem] = useState<Branch | null>(null);

  const debouncedSearch = useDebounce(search);

  const filtered = useMemo(() => {
    if (!debouncedSearch) return branches;
    const s = debouncedSearch.toLowerCase();
    return branches.filter(
      (b) =>
        b.branchName.toLowerCase().includes(s) ||
        b.branchCode.toLowerCase().includes(s) ||
        b.gmName.toLowerCase().includes(s) ||
        b.cell.includes(s)
    );
  }, [branches, debouncedSearch]);

  const paginated = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, page]);

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
      <PageContainer title="Branch Master">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-4 border-b border-border">
          {/* Left: record count */}
          <p className="text-[13px] text-text-muted">
            <span className="font-semibold text-text-primary">{filtered.length}</span> branches found
          </p>

          {/* Right: controls */}
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <div className="w-full sm:w-64">
              <Input
                placeholder="Search branch name, code, GM..."
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
              Add Branch
            </Button>
          </div>
        </div>

        {/* Table */}
        <BranchTable
          data={paginated}
          onEdit={modal.openEdit}
          onDelete={setDeleteItem}
        />

        {/* Pagination */}
        <TablePagination
          currentPage={page}
          totalPages={Math.ceil(filtered.length / ITEMS_PER_PAGE)}
          totalItems={filtered.length}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={setPage}
        />
      </PageContainer>

      {/* Form Modal */}
      <BranchForm
        isOpen={modal.isOpen}
        mode={modal.mode}
        branch={modal.selectedItem}
        onClose={modal.close}
        onSave={handleSave}
      />

      {/* Delete Confirmation */}
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
