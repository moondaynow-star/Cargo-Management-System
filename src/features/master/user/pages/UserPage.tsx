import React, { useState, useMemo } from 'react';
import { Plus, Search, Upload, Download } from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { TablePagination } from '@/components/table/TablePagination';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { UserTable } from '../components/UserTable';
import { UserForm } from '../components/UserForm';
import { mockUsers } from '../mockData';
import { useModal } from '@/hooks/useModal';
import { useDebounce } from '@/hooks/useDebounce';
import { ITEMS_PER_PAGE } from '@/utils/constants';
import type { User } from '../types';

export const UserPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const modal = useModal<User>();
  const [deleteItem, setDeleteItem] = useState<User | null>(null);

  const debouncedSearch = useDebounce(search);

  const filtered = useMemo(() => {
    if (!debouncedSearch) return users;
    const s = debouncedSearch.toLowerCase();
    return users.filter(
      (u) =>
        u.userName.toLowerCase().includes(s) ||
        u.email.toLowerCase().includes(s) ||
        u.branchCode.toLowerCase().includes(s)
    );
  }, [users, debouncedSearch]);

  const paginated = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, page]);

  const handleSave = (user: User) => {
    if (modal.mode === 'add') {
      setUsers((prev) => [user, ...prev]);
    } else {
      setUsers((prev) => prev.map((u) => (u.id === user.id ? user : u)));
    }
  };

  const handleDelete = () => {
    if (deleteItem) {
      setUsers((prev) => prev.filter((u) => u.id !== deleteItem.id));
      setDeleteItem(null);
    }
  };

  return (
    <>
      <PageContainer title="User Master">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-4 border-b border-border">
          <p className="text-[13px] text-text-muted">
            <span className="font-semibold text-text-primary">{filtered.length}</span> users found
          </p>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <div className="w-full sm:w-64">
              <Input
                placeholder="Search user, email, branch..."
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
              Add User
            </Button>
          </div>
        </div>

        <UserTable data={paginated} onEdit={modal.openEdit} onDelete={setDeleteItem} />

        <TablePagination
          currentPage={page}
          totalPages={Math.ceil(filtered.length / ITEMS_PER_PAGE)}
          totalItems={filtered.length}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={setPage}
        />
      </PageContainer>

      <UserForm isOpen={modal.isOpen} mode={modal.mode} user={modal.selectedItem} onClose={modal.close} onSave={handleSave} />

      <ConfirmDialog
        isOpen={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={handleDelete}
        title="Delete User"
        message={`Are you sure you want to delete user "${deleteItem?.userName}"? This action cannot be undone.`}
      />
    </>
  );
};
