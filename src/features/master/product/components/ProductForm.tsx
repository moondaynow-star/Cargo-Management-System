import React, { useState, useEffect } from 'react';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import type { Product } from '../types';
import type { ModalMode } from '@/types/common';
import { generateId } from '@/utils/formatters';

interface ProductFormProps {
  isOpen: boolean;
  mode: ModalMode;
  product: Product | null;
  onClose: () => void;
  onSave: (product: Product) => void;
}

const emptyForm: Omit<Product, 'id'> = { productName: '', hsnCode: '' };

export const ProductForm: React.FC<ProductFormProps> = ({
  isOpen,
  mode,
  product,
  onClose,
  onSave,
}) => {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (mode === 'edit' && product) {
      const { id: _id, ...rest } = product;
      setForm(rest);
    } else {
      setForm(emptyForm);
    }
    setErrors({});
  }, [mode, product, isOpen]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
    }
  };

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!form.productName.trim()) e.productName = 'Product Name is required';
    if (!form.hsnCode.trim()) e.hsnCode = 'HSN Code is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSave({ ...form, id: product?.id || generateId() });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'add' ? 'Add Product' : 'Edit Product'}
      size="sm"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </>
      }
    >
      <div className="space-y-4">
        <Input label="Product Name" required value={form.productName} onChange={(e) => handleChange('productName', e.target.value)} error={errors.productName} placeholder="Enter product name" />
        <Input label="HSN Code" required value={form.hsnCode} onChange={(e) => handleChange('hsnCode', e.target.value)} error={errors.hsnCode} placeholder="Enter HSN code" />
      </div>
    </Modal>
  );
};
