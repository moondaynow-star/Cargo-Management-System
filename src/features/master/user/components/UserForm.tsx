import React, { useState, useEffect } from 'react';
import { Input } from '@/components/common/Input';
import { Select } from '@/components/common/Select';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import type { User } from '../types';
import type { ModalMode } from '@/types/common';
import { generateId } from '@/utils/formatters';
import { mockBranches } from '../../branch/mockData';

interface UserFormProps {
  isOpen: boolean;
  mode: ModalMode;
  user: User | null;
  onClose: () => void;
  onSave: (user: User) => void;
}

const emptyForm: Omit<User, 'id'> = {
  userName: '',
  email: '',
  password: '',
  branchCode: '',
};

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
      const { id: _id, ...rest } = user;
      setForm(rest);
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
    if (!form.branchCode.trim()) e.branchCode = 'Branch Code is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSave({ ...form, id: user?.id || generateId() });
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
        <Input label="Password" required type="password" value={form.password} onChange={(e) => handleChange('password', e.target.value)} error={errors.password} placeholder="Enter password" />
        <Select label="Branch Code" required value={form.branchCode} onChange={(e) => handleChange('branchCode', e.target.value)} error={errors.branchCode} options={branchOptions} placeholder="Select branch" />
      </div>
    </Modal>
  );
};
