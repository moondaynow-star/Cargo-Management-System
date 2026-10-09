import React, { useState, useEffect } from 'react';
import { Input } from '@/components/common/Input';
import { Select } from '@/components/common/Select';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import { PasswordInput } from '@/components/common/PasswordInput';
import { USER_ROLES } from '../types';
import type { User, UserStatus } from '../types';
import type { ModalMode } from '@/types/common';
import { generateId, todayISO } from '@/utils/formatters';
import { mockBranches } from '../../branch/mockData';

interface UserFormProps {
  isOpen: boolean;
  mode: ModalMode;
  user: User | null;
  onClose: () => void;
  onSave: (user: User) => void;
}

type UserFormState = Pick<
  User,
  'userName' | 'email' | 'password' | 'branchCode' | 'role' | 'phone' | 'address' | 'status'
> & { confirmPassword?: string };

const emptyForm: UserFormState = {
  userName: '',
  email: '',
  password: '',
  confirmPassword: '',
  branchCode: '',
  role: 'BRANCH',
  status: 'Enable',
  phone: '',
  address: '',
};

const roleOptions = USER_ROLES.map((r) => ({ value: r, label: r }));
const statusOptions: { value: UserStatus; label: string }[] = [
  { value: 'Enable', label: 'Enable' },
  { value: 'Disable', label: 'Disable' },
];

export const UserForm: React.FC<UserFormProps> = ({
  isOpen,
  mode,
  user,
  onClose,
  onSave,
}) => {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const branchOptions = mockBranches.map((b) => ({
    value: b.branchCode,
    label: `${b.branchCode} - ${b.branchName}`,
  }));

  useEffect(() => {
    if (mode === 'edit' && user) {
      const { userName, email, password, branchCode, role, phone, address, status } = user;
      setForm({ userName, email, password, confirmPassword: password, branchCode, role, phone, address, status });
    } else {
      setForm(emptyForm);
    }
    setErrors({});
  }, [mode, user, isOpen]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
    }
  };

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!form.userName.trim()) e.userName = 'User Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    if (!form.password.trim()) e.password = 'Password is required';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
    if (!form.branchCode.trim()) e.branchCode = 'Branch Code is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSave({
      ...form,
      id: user?.id || generateId(),
      createdDate: user?.createdDate || todayISO(),
      status: form.status,
    } as User);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'add' ? 'Add User' : 'Edit User'}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="User Name" required value={form.userName} onChange={(e) => handleChange('userName', e.target.value)} error={errors.userName} placeholder="Enter user name" />
        <Input label="Email" required type="email" value={form.email} onChange={(e) => handleChange('email', e.target.value)} error={errors.email} placeholder="Enter email" />
        <PasswordInput label="Password" required value={form.password} onChange={(e) => handleChange('password', e.target.value)} error={errors.password} placeholder="Enter password" />
        <PasswordInput label="Confirm Password" required value={form.confirmPassword || ''} onChange={(e) => handleChange('confirmPassword', e.target.value)} error={errors.confirmPassword} placeholder="Confirm password" />
        <Select label="Branch Code" required value={form.branchCode} onChange={(e) => handleChange('branchCode', e.target.value)} error={errors.branchCode} options={branchOptions} placeholder="Select branch" />
        <Select label="Role" value={form.role} onChange={(e) => handleChange('role', e.target.value)} options={roleOptions} placeholder="Select role" />
        <Select label="Status" value={form.status} onChange={(e) => handleChange('status', e.target.value)} options={statusOptions} />
        <Input label="Phone" value={form.phone} onChange={(e) => handleChange('phone', e.target.value)} placeholder="Enter phone number" />
        <div className="md:col-span-2">
          <Input label="Address" value={form.address} onChange={(e) => handleChange('address', e.target.value)} placeholder="Enter address" />
        </div>
      </div>
    </Modal>
  );
};
