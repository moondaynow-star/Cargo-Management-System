import React, { useState, useMemo } from 'react';
import { Plus, Search, Upload, Download } from 'lucide-react';
import { PageContainer } from '@/components/layout/PageContainer';
import { TablePagination } from '@/components/table/TablePagination';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { ExporterTable } from '../components/ExporterTable';
import { ConsigneeTable } from '../components/ConsigneeTable';
import { ExporterForm } from '../components/ExporterForm';
import { ConsigneeForm } from '../components/ConsigneeForm';
import { mockExporters, mockConsignees } from '../mockData';
import { useModal } from '@/hooks/useModal';
import { useDebounce } from '@/hooks/useDebounce';
import { ITEMS_PER_PAGE } from '@/utils/constants';
import type { Exporter, Consignee, ClientTab } from '../types';

export const ClientPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ClientTab>('exporters');
  const [exporters, setExporters] = useState<Exporter[]>(mockExporters);
  const [consignees, setConsignees] = useState<Consignee[]>(mockConsignees);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  
  const exporterModal = useModal<Exporter>();
  const consigneeModal = useModal<Consignee>();
  
  const [deleteExporter, setDeleteExporter] = useState<Exporter | null>(null);
  const [deleteConsignee, setDeleteConsignee] = useState<Consignee | null>(null);

  const debouncedSearch = useDebounce(search);

  // Tab switching logic
  const handleTabChange = (tab: ClientTab) => {
    setActiveTab(tab);
    setSearch('');
    setPage(1);
  };

  // Exporter data processing
  const filteredExporters = useMemo(() => {
    if (!debouncedSearch) return exporters;
    const s = debouncedSearch.toLowerCase();
    return exporters.filter(
      (e) =>
        e.nickName.toLowerCase().includes(s) ||
        e.companyName.toLowerCase().includes(s) ||
        e.gstin.toLowerCase().includes(s) ||
        e.iec.toLowerCase().includes(s)
    );
  }, [exporters, debouncedSearch]);

  const paginatedExporters = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredExporters.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredExporters, page]);

  // Consignee data processing
  const filteredConsignees = useMemo(() => {
    if (!debouncedSearch) return consignees;
    const s = debouncedSearch.toLowerCase();
    return consignees.filter(
      (c) =>
        c.nickName.toLowerCase().includes(s) ||
        c.companyName.toLowerCase().includes(s) ||
        c.country.toLowerCase().includes(s)
    );
  }, [consignees, debouncedSearch]);

  const paginatedConsignees = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredConsignees.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredConsignees, page]);

  // Handlers
  const handleSaveExporter = (exporter: Exporter) => {
    if (exporterModal.mode === 'add') {
      setExporters((prev) => [exporter, ...prev]);
    } else {
      setExporters((prev) => prev.map((e) => (e.id === exporter.id ? exporter : e)));
    }
  };

  const handleSaveConsignee = (consignee: Consignee) => {
    if (consigneeModal.mode === 'add') {
      setConsignees((prev) => [consignee, ...prev]);
    } else {
      setConsignees((prev) => prev.map((c) => (c.id === consignee.id ? consignee : c)));
    }
  };

  const handleDeleteExporter = () => {
    if (deleteExporter) {
      setExporters((prev) => prev.filter((e) => e.id !== deleteExporter.id));
      setDeleteExporter(null);
    }
  };

  const handleDeleteConsignee = () => {
    if (deleteConsignee) {
      setConsignees((prev) => prev.filter((c) => c.id !== deleteConsignee.id));
      setDeleteConsignee(null);
    }
  };

  const totalItems = activeTab === 'exporters' ? filteredExporters.length : filteredConsignees.length;

  return (
    <>
      <PageContainer title="Client Master">
        {/* Tabs */}
        <div className="flex border-b border-border">
          <button
            className={`flex-1 py-3 text-sm font-semibold transition-colors focus-ring
              ${activeTab === 'exporters' 
                ? 'text-primary border-b-2 border-primary bg-primary/5' 
                : 'text-text-secondary hover:text-primary hover:bg-gray-50'
              }
            `}
            onClick={() => handleTabChange('exporters')}
          >
            Exporters
          </button>
          <button
            className={`flex-1 py-3 text-sm font-semibold transition-colors focus-ring
              ${activeTab === 'consignees' 
                ? 'text-primary border-b-2 border-primary bg-primary/5' 
                : 'text-text-secondary hover:text-primary hover:bg-gray-50'
              }
            `}
            onClick={() => handleTabChange('consignees')}
          >
            Consignees
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-4 border-b border-border bg-white">
          <p className="text-[13px] text-text-muted">
            <span className="font-semibold text-text-primary">{totalItems}</span> {activeTab} found
          </p>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <div className="w-full sm:w-64">
              <Input
                placeholder={`Search ${activeTab}...`}
                icon={<Search size={15} />}
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              />
            </div>
            <Button variant="secondary" icon={<Upload size={15} />}>
              Import
            </Button>
            <Button variant="secondary" icon={<Download size={15} />}>
              Export
            </Button>
            <Button 
              icon={<Plus size={15} />} 
              onClick={activeTab === 'exporters' ? exporterModal.openAdd : consigneeModal.openAdd}
            >
              Add {activeTab === 'exporters' ? 'Exporter' : 'Consignee'}
            </Button>
          </div>
        </div>

        {/* Table Content */}
        {activeTab === 'exporters' ? (
          <ExporterTable 
            data={paginatedExporters} 
            onEdit={exporterModal.openEdit} 
            onDelete={setDeleteExporter} 
          />
        ) : (
          <ConsigneeTable 
            data={paginatedConsignees} 
            onEdit={consigneeModal.openEdit} 
            onDelete={setDeleteConsignee} 
          />
        )}

        {/* Pagination */}
        <TablePagination
          currentPage={page}
          totalPages={Math.ceil(totalItems / ITEMS_PER_PAGE)}
          totalItems={totalItems}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={setPage}
        />
      </PageContainer>

      {/* Forms */}
      <ExporterForm 
        isOpen={exporterModal.isOpen} 
        mode={exporterModal.mode} 
        exporter={exporterModal.selectedItem} 
        onClose={exporterModal.close} 
        onSave={(data) => handleSaveExporter(data as Exporter)} 
      />
      <ConsigneeForm 
        isOpen={consigneeModal.isOpen} 
        mode={consigneeModal.mode} 
        consignee={consigneeModal.selectedItem} 
        onClose={consigneeModal.close} 
        onSave={(data) => handleSaveConsignee(data as Consignee)} 
      />

      {/* Delete Dialogs */}
      <ConfirmDialog
        isOpen={!!deleteExporter}
        onClose={() => setDeleteExporter(null)}
        onConfirm={handleDeleteExporter}
        title="Delete Exporter"
        message={`Are you sure you want to delete "${deleteExporter?.companyName}"? This action cannot be undone.`}
      />
      <ConfirmDialog
        isOpen={!!deleteConsignee}
        onClose={() => setDeleteConsignee(null)}
        onConfirm={handleDeleteConsignee}
        title="Delete Consignee"
        message={`Are you sure you want to delete "${deleteConsignee?.companyName}"? This action cannot be undone.`}
      />
    </>
  );
};
