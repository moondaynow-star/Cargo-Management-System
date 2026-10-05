import React, { useState, useMemo } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { DataToolbar } from '@/components/table/DataToolbar';
import { TablePagination } from '@/components/table/TablePagination';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { ClientTabs } from '../components/ClientTabs';
import { ExporterTable } from '../components/ExporterTable';
import { ConsigneeTable } from '../components/ConsigneeTable';
import { ExporterForm } from '../components/ExporterForm';
import { ConsigneeForm } from '../components/ConsigneeForm';
import { mockExporters, mockConsignees } from '../mockData';
import { useModal } from '@/hooks/useModal';
import { useDebounce } from '@/hooks/useDebounce';
import { usePagination } from '@/hooks/usePagination';
import { inDateRange } from '@/utils/filters';
import type { Exporter, Consignee, ClientTab } from '../types';

const tabs = [
  { key: 'exporters', label: 'Exporters' },
  { key: 'consignees', label: 'Consignees' },
];

const uniqueCountries = (rows: { country: string }[]) =>
  Array.from(new Set(rows.map((r) => r.country)))
    .filter(Boolean)
    .sort()
    .map((c) => ({ value: c, label: c }));

export const ClientPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ClientTab>('exporters');
  const [exporters, setExporters] = useState<Exporter[]>(mockExporters);
  const [consignees, setConsignees] = useState<Consignee[]>(mockConsignees);
  const [search, setSearch] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [country, setCountry] = useState('');

  const exporterModal = useModal<Exporter>();
  const consigneeModal = useModal<Consignee>();
  const [deleteExporter, setDeleteExporter] = useState<Exporter | null>(null);
  const [deleteConsignee, setDeleteConsignee] = useState<Consignee | null>(null);

  const debouncedSearch = useDebounce(search);
  const isExporters = activeTab === 'exporters';

  const filteredExporters = useMemo(() => {
    const s = debouncedSearch.trim().toLowerCase();
    return exporters.filter((e) => {
      if (
        s &&
        !(
          e.id.toLowerCase().includes(s) ||
          e.nickName.toLowerCase().includes(s) ||
          e.companyName.toLowerCase().includes(s) ||
          e.contactName.toLowerCase().includes(s) ||
          e.gstin.toLowerCase().includes(s) ||
          e.iec.toLowerCase().includes(s)
        )
      )
        return false;
      if (country && e.country !== country) return false;
      return inDateRange(e.createdDate, dateFrom, dateTo);
    });
  }, [exporters, debouncedSearch, country, dateFrom, dateTo]);

  const filteredConsignees = useMemo(() => {
    const s = debouncedSearch.trim().toLowerCase();
    return consignees.filter((c) => {
      if (
        s &&
        !(
          c.id.toLowerCase().includes(s) ||
          c.nickName.toLowerCase().includes(s) ||
          c.companyName.toLowerCase().includes(s) ||
          c.contactName.toLowerCase().includes(s) ||
          c.country.toLowerCase().includes(s) ||
          c.contactNo.includes(s)
        )
      )
        return false;
      if (country && c.country !== country) return false;
      return inDateRange(c.createdDate, dateFrom, dateTo);
    });
  }, [consignees, debouncedSearch, country, dateFrom, dateTo]);

  const exporterPaging = usePagination(filteredExporters);
  const consigneePaging = usePagination(filteredConsignees);
  const paging = isExporters ? exporterPaging : consigneePaging;

  const resetPages = () => {
    exporterPaging.resetPage();
    consigneePaging.resetPage();
  };

  const countryOptions = useMemo(
    () => uniqueCountries(isExporters ? exporters : consignees),
    [isExporters, exporters, consignees]
  );

  const handleTabChange = (tab: ClientTab) => {
    setActiveTab(tab);
    setSearch('');
    setCountry('');
    setDateFrom('');
    setDateTo('');
    resetPages();
  };

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

  return (
    <>
      <PageContainer title="Client Management">
        <ClientTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={(t) => handleTabChange(t as ClientTab)}
        />

        <DataToolbar
          count={paging.totalItems}
          countLabel={activeTab}
          search={{
            value: search,
            onChange: (v) => {
              setSearch(v);
              resetPages();
            },
            placeholder: 'Search by name, ID, cell...',
          }}
          dateRange={{
            from: dateFrom,
            to: dateTo,
            onChange: (from, to) => {
              setDateFrom(from);
              setDateTo(to);
              resetPages();
            },
          }}
          filters={[
            {
              key: 'country',
              value: country,
              onChange: (v) => {
                setCountry(v);
                resetPages();
              },
              options: countryOptions,
              allLabel: 'All Countries',
            },
          ]}
          actions={{
            showImport: true,
            showExport: true,
            add: {
              label: isExporters ? 'Add Exporter' : 'Add Consignee',
              onClick: isExporters ? exporterModal.openAdd : consigneeModal.openAdd,
            },
          }}
        />

        {isExporters ? (
          <ExporterTable
            data={exporterPaging.pageItems}
            onEdit={exporterModal.openEdit}
            onDelete={setDeleteExporter}
          />
        ) : (
          <ConsigneeTable
            data={consigneePaging.pageItems}
            onEdit={consigneeModal.openEdit}
            onDelete={setDeleteConsignee}
          />
        )}

        <TablePagination
          currentPage={paging.page}
          totalPages={paging.totalPages}
          totalItems={paging.totalItems}
          itemsPerPage={paging.perPage}
          onPageChange={paging.setPage}
        />
      </PageContainer>

      <ExporterForm
        isOpen={exporterModal.isOpen}
        mode={exporterModal.mode}
        exporter={exporterModal.selectedItem}
        onClose={exporterModal.close}
        onSave={handleSaveExporter}
      />
      <ConsigneeForm
        isOpen={consigneeModal.isOpen}
        mode={consigneeModal.mode}
        consignee={consigneeModal.selectedItem}
        onClose={consigneeModal.close}
        onSave={handleSaveConsignee}
      />

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
