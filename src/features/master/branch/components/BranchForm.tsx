import React, { useState, useEffect } from 'react';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import type { Branch } from '../types';
import type { ModalMode } from '@/types/common';
import { generateId, todayISO } from '@/utils/formatters';

interface BranchFormProps {
  isOpen: boolean;
  mode: ModalMode;
  branch: Branch | null;
  onClose: () => void;
  onSave: (branch: Branch) => void;
}

const emptyForm: Omit<Branch, 'id' | 'createdDate'> = {
  branchName: '',
  branchCode: '',
  gmName: '',
  address: '',
  cell: '',
};

export const BranchForm: React.FC<BranchFormProps> = ({
  isOpen,
  mode,
  branch,
  onClose,
  onSave,
}) => {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (mode === 'edit' && branch) {
      const { id: _id, createdDate: _created, ...rest } = branch;
      setForm(rest);
    } else {
      setForm(emptyForm);
    }
    setErrors({});
  }, [mode, branch, isOpen]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
    }
  };

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!form.branchName.trim()) e.branchName = 'Branch Name is required';
    if (!form.branchCode.trim()) e.branchCode = 'Branch Code is required';
    if (!form.gmName.trim()) e.gmName = 'GM Name is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSave({
      ...form,
      id: branch?.id || generateId(),
      createdDate: branch?.createdDate || todayISO(),
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'add' ? 'Add Branch' : 'Edit Branch'}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Branch Name" required value={form.branchName} onChange={(e) => handleChange('branchName', e.target.value)} error={errors.branchName} placeholder="Enter branch name" />
        <Input label="Branch Code" required value={form.branchCode} onChange={(e) => handleChange('branchCode', e.target.value)} error={errors.branchCode} placeholder="Enter branch code" />
        <Input label="GM Name" required value={form.gmName} onChange={(e) => handleChange('gmName', e.target.value)} error={errors.gmName} placeholder="Enter GM name" />
        <Input label="Cell" value={form.cell} onChange={(e) => handleChange('cell', e.target.value)} placeholder="Enter cell number" />
        <div className="md:col-span-2">
          <Input label="Address" value={form.address} onChange={(e) => handleChange('address', e.target.value)} placeholder="Enter full address" />
        </div>
      </div>
    </Modal>
  );
};
