export interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (value: unknown, row: T) => React.ReactNode;
  className?: string;
  /** Explicit column width (px or %). Columns without one share the remaining space. */
  width?: string;
  /** Minimum column width in px — drives the table's horizontal-scroll threshold. */
  minWidth?: number;
  align?: 'left' | 'center' | 'right';
  /** Single-line cell with ellipsis (default true). Set false to allow wrapping. */
  truncate?: boolean;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface SelectOption {
  value: string;
  label: string;
}

export type ModalMode = 'add' | 'edit';
