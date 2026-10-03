import { useState, useCallback } from 'react';
import type { ModalMode } from '@/types/common';

interface UseModalReturn<T> {
  isOpen: boolean;
  mode: ModalMode;
  selectedItem: T | null;
  openAdd: () => void;
  openEdit: (item: T) => void;
  close: () => void;
}

export function useModal<T>(): UseModalReturn<T> {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<ModalMode>('add');
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  const openAdd = useCallback(() => {
    setMode('add');
    setSelectedItem(null);
    setIsOpen(true);
  }, []);

  const openEdit = useCallback((item: T) => {
    setMode('edit');
    setSelectedItem(item);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setSelectedItem(null);
  }, []);

  return { isOpen, mode, selectedItem, openAdd, openEdit, close };
}
