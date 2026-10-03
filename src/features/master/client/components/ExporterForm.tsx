import React, { useState, useEffect } from 'react';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import type { Exporter } from '../types';
import type { ModalMode } from '@/types/common';
import { generateId } from '@/utils/formatters';

interface ExporterFormProps {
  isOpen: boolean;
  mode: ModalMode;
  exporter: Exporter | null;
  onClose: () => void;
  onSave: (exporter: Exporter) => void;
}

const emptyForm: Omit<Exporter, 'id'> = {
  nickName: '',
  companyName: '',
  contactName: '',
  address: '',
  country: '',
  gstin: '',
  iec: '',
  lut: '',
};

export const ExporterForm: React.FC<ExporterFormProps> = ({
  isOpen,
  mode,
  exporter,
  onClose,
  onSave,
}) => {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (mode === 'edit' && exporter) {
      const { id: _id, ...rest } = exporter;
      setForm(rest);
    } else {
      setForm(emptyForm);
    }
    setErrors({});
  }, [mode, exporter, isOpen]);

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
    if (!form.companyName.trim()) newErrors.companyName = 'Company Name is required';
    if (!form.contactName.trim()) newErrors.contactName = 'Contact Name is required';
    if (!form.country.trim()) newErrors.country = 'Country is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSave({
      ...form,
      id: exporter?.id || generateId(),
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'add' ? 'Add Exporter' : 'Edit Exporter'}
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
          label="Company Name"
          required
          value={form.companyName}
          onChange={(e) => handleChange('companyName', e.target.value)}
          error={errors.companyName}
          placeholder="Enter company name"
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
          label="GSTIN"
          value={form.gstin}
          onChange={(e) => handleChange('gstin', e.target.value)}
          placeholder="Enter GSTIN"
        />
        <Input
          label="IEC"
          value={form.iec}
          onChange={(e) => handleChange('iec', e.target.value)}
          placeholder="Enter IEC code"
        />
        <Input
          label="LUT"
          value={form.lut}
          onChange={(e) => handleChange('lut', e.target.value)}
          placeholder="Enter LUT reference"
        />
      </div>
    </Modal>
  );
};
