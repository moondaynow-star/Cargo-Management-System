import React, { useState, useEffect } from 'react';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import type { Consignee } from '../types';
import type { ModalMode } from '@/types/common';
import { generateId, todayISO } from '@/utils/formatters';

interface ConsigneeFormProps {
  isOpen: boolean;
  mode: ModalMode;
  consignee: Consignee | null;
  onClose: () => void;
  onSave: (consignee: Consignee) => void;
}

const emptyForm: Omit<Consignee, 'id' | 'createdDate'> = {
  nickName: '',
  importerCompany: '',
  contactName: '',
  address: '',
  country: '',
  contactNo: '',
};

export const ConsigneeForm: React.FC<ConsigneeFormProps> = ({
  isOpen,
  mode,
  consignee,
  onClose,
  onSave,
}) => {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (mode === 'edit' && consignee) {
      const { id: _id, createdDate: _created, ...rest } = consignee;
      setForm(rest);
    } else {
      setForm(emptyForm);
    }
    setErrors({});
  }, [mode, consignee, isOpen]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form.nickName.trim()) newErrors.nickName = 'Nick Name is required';
    if (!form.importerCompany.trim()) newErrors.importerCompany = 'Importer Company is required';
    if (!form.contactName.trim()) newErrors.contactName = 'Contact Name is required';
    if (!form.country.trim()) newErrors.country = 'Country is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSave({
      ...form,
      id: consignee?.id || generateId(),
      createdDate: consignee?.createdDate || todayISO(),
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'add' ? 'Add Consignee' : 'Edit Consignee'}
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Nick Name"
          required
          value={form.nickName}
          onChange={(e) => handleChange('nickName', e.target.value)}
          error={errors.nickName}
          placeholder="Enter nick name"
        />
        <Input
          label="Importer Company"
          required
          value={form.importerCompany}
          onChange={(e) => handleChange('importerCompany', e.target.value)}
          error={errors.importerCompany}
          placeholder="Enter importer company"
        />
        <Input
          label="Contact Name"
          required
          value={form.contactName}
          onChange={(e) => handleChange('contactName', e.target.value)}
          error={errors.contactName}
          placeholder="Enter contact name"
        />
        <Input
          label="Country"
          required
          value={form.country}
          onChange={(e) => handleChange('country', e.target.value)}
          error={errors.country}
          placeholder="Enter country"
        />
        <div className="md:col-span-2">
          <Input
            label="Address"
            value={form.address}
            onChange={(e) => handleChange('address', e.target.value)}
            placeholder="Enter full address"
          />
        </div>
        <Input
          label="Contact No"
          value={form.contactNo}
          onChange={(e) => handleChange('contactNo', e.target.value)}
          placeholder="Enter contact number"
        />
      </div>
    </Modal>
  );
};
