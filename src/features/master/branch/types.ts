export interface Branch {
  id: string;
  branchName: string;
  branchCode: string;
  gmName: string;
  address: string;
  cell: string;
  /** ISO date (YYYY-MM-DD); drives the toolbar date filter. */
  createdDate: string;
}
