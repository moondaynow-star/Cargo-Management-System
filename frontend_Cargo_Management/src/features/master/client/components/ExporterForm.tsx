import React, { useState, useEffect } from 'react';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import type { Exporter } from '../types';
import type { ModalMode } from '@/types/common';
import { generateId, todayISO } from '@/utils/formatters';

interface ExporterFormProps {
  isOpen: boolean;
  mode: ModalMode;
  exporter: Exporter | null;
  onClose: () => void;
  onSave: (exporter: Exporter) => void;
}

const emptyForm: Omit<Exporter, 'id' | 'createdDate'> = {
  nickName: '',
  exporterCompany: '',
  contactName: '',
  address: '',
  country: '',
  gstin: '',
  iec: '',
  lut: '',
  bankName: '',
  bankBranch: '',
  bankIfsc: '',
  adCode: '',
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
      const { id: _id, createdDate: _created, ...rest } = exporter;
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
    if (!form.exporterCompany.trim()) newErrors.exporterCompany = 'Exporter Company is required';
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
      createdDate: exporter?.createdDate || todayISO(),
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
        <div className="md:col-span-2 text-sm font-semibold text-text-secondary mt-2 mb-1">Company Information</div>
        <Input
          label="Nick Name"
          required
          value={form.nickName}
          onChange={(e) => handleChange('nickName', e.target.value)}
          error={errors.nickName}
          placeholder="Enter nick name"
        />
        <Input
          label="Exporter Company"
          required
          value={form.exporterCompany}
          onChange={(e) => handleChange('exporterCompany', e.target.value)}
          error={errors.exporterCompany}
          placeholder="Enter exporter company"
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
        
        <div className="md:col-span-2 text-sm font-semibold text-text-secondary mt-2 mb-1">Export Compliance</div>
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

        <div className="md:col-span-2 text-sm font-semibold text-text-secondary mt-2 mb-1">Bank Information</div>
        <Input
          label="Bank Name"
          value={form.bankName}
          onChange={(e) => handleChange('bankName', e.target.value)}
          placeholder="Enter bank name"
        />
        <Input
          label="Bank Branch"
          value={form.bankBranch}
          onChange={(e) => handleChange('bankBranch', e.target.value)}
          placeholder="Enter bank branch"
        />
        <Input
          label="Bank IFSC"
          value={form.bankIfsc}
          onChange={(e) => handleChange('bankIfsc', e.target.value)}
          placeholder="Enter bank IFSC"
        />
        <Input
          label="AD Code"
          value={form.adCode}
          onChange={(e) => handleChange('adCode', e.target.value)}
          placeholder="Enter AD code"
        />
      </div>
    </Modal>
  );
};
