import React, { useState, useMemo } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { DataToolbar } from '@/components/table/DataToolbar';
import { TablePagination } from '@/components/table/TablePagination';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { UserTable } from '../components/UserTable';
import { UserForm } from '../components/UserForm';
import { mockUsers } from '../mockData';
import { mockBranches } from '../../branch/mockData';
import { USER_ROLES } from '../types';
import { useModal } from '@/hooks/useModal';
import { useDebounce } from '@/hooks/useDebounce';
import { usePagination } from '@/hooks/usePagination';
import { inDateRange } from '@/utils/filters';
import type { User } from '../types';

const branchOptions = mockBranches.map((b) => ({ value: b.branchCode, label: b.branchCode }));
const roleOptions = USER_ROLES.map((r) => ({ value: r, label: r }));
const statusOptions = [
  { value: 'Enable', label: 'Enable' },
  { value: 'Disable', label: 'Disable' },
];

export const UserPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [search, setSearch] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [branch, setBranch] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');
  const modal = useModal<User>();
  const [deleteItem, setDeleteItem] = useState<User | null>(null);

  const debouncedSearch = useDebounce(search);

  const filtered = useMemo(() => {
    const s = debouncedSearch.trim().toLowerCase();
    return users.filter((u) => {
      if (
        s &&
        !(
          u.userName.toLowerCase().includes(s) ||
          u.id.toLowerCase().includes(s) ||
          u.phone.includes(s) ||
          u.email.toLowerCase().includes(s) ||
          u.branchCode.toLowerCase().includes(s)
        )
      )
        return false;
      if (!inDateRange(u.createdDate, dateFrom, dateTo)) return false;
      if (branch && u.branchCode !== branch) return false;
      if (role && u.role !== role) return false;
      if (status && u.status !== status) return false;
      return true;
    });
  }, [users, debouncedSearch, dateFrom, dateTo, branch, role, status]);

  const { page, setPage, resetPage, pageItems, totalItems, totalPages, perPage } =
    usePagination(filtered);

  /** Wrap a filter setter so changing a filter jumps back to page 1. */
  const withReset = <V,>(setter: (v: V) => void) => (v: V) => {
    setter(v);
    resetPage();
  };

  const handleSave = (user: User) => {
    if (modal.mode === 'add') {
      setUsers((prev) => [user, ...prev]);
    } else {
      setUsers((prev) => prev.map((u) => (u.id === user.id ? user : u)));
    }
  };

  const handleToggleStatus = (user: User) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === user.id ? { ...u, status: u.status === 'Enable' ? 'Disable' : 'Enable' } : u
      )
    );
  };

  const handleDelete = () => {
    if (deleteItem) {
      setUsers((prev) => prev.filter((u) => u.id !== deleteItem.id));
      setDeleteItem(null);
    }
  };

  return (
    <>
      <PageContainer title="User Management">
        <DataToolbar
          count={totalItems}
          countLabel="users"
          search={{
            value: search,
            onChange: withReset(setSearch),
            placeholder: 'Search by name, ID, phone',
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
          filters={[
            { key: 'branch', value: branch, onChange: withReset(setBranch), options: branchOptions, allLabel: 'All Branches' },
            { key: 'role', value: role, onChange: withReset(setRole), options: roleOptions, allLabel: 'All Roles' },
            { key: 'status', value: status, onChange: withReset(setStatus), options: statusOptions, allLabel: 'All Status' },
          ]}
          actions={{
            showExport: true,
            add: { label: 'Add User', onClick: modal.openAdd },
          }}
        />

        <UserTable
          data={pageItems}
          onEdit={modal.openEdit}
          onToggleStatus={handleToggleStatus}
          onDelete={setDeleteItem}
        />

        <TablePagination
          currentPage={page}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={perPage}
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
