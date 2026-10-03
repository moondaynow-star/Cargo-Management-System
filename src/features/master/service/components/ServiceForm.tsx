import React, { useState, useEffect } from 'react';
import { Input } from '@/components/common/Input';
import { Select } from '@/components/common/Select';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import type { Service } from '../types';
import type { ModalMode } from '@/types/common';
import { generateId } from '@/utils/formatters';

interface ServiceFormProps {
  isOpen: boolean;
  mode: ModalMode;
  service: Service | null;
  onClose: () => void;
  onSave: (service: Service) => void;
}

const emptyForm: Omit<Service, 'id'> = { service: '', type: '' };

const typeOptions = [
  { value: 'Domestic', label: 'Domestic' },
  { value: 'International', label: 'International' },
];

export const ServiceForm: React.FC<ServiceFormProps> = ({
  isOpen,
  mode,
  service,
  onClose,
  onSave,
}) => {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (mode === 'edit' && service) {
      const { id: _id, ...rest } = service;
      setForm(rest);
    } else {
      setForm(emptyForm);
    }
    setErrors({});
  }, [mode, service, isOpen]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
    }
  };

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!form.service.trim()) e.service = 'Service is required';
    if (!form.type.trim()) e.type = 'Type is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSave({ ...form, id: service?.id || generateId() });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'add' ? 'Add Service' : 'Edit Service'}
      size="sm"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </>
      }
    >
      <div className="space-y-4">
        <Input label="Service" required value={form.service} onChange={(e) => handleChange('service', e.target.value)} error={errors.service} placeholder="Enter service name" />
        <Select label="Type" required value={form.type} onChange={(e) => handleChange('type', e.target.value)} error={errors.type} options={typeOptions} placeholder="Select type" />
      </div>
    </Modal>
  );
};
