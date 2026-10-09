export interface Exporter {
  id: string;
  nickName: string;
  exporterCompany: string;
  contactName: string;
  address: string;
  country: string;
  gstin: string;
  iec: string;
  lut: string;
  bankName: string;
  bankBranch: string;
  bankIfsc: string;
  adCode: string;
  /** ISO date (YYYY-MM-DD); drives the toolbar date filter. */
  createdDate: string;
}

export interface Consignee {
  id: string;
  nickName: string;
  importerCompany: string;
  contactName: string;
  address: string;
  country: string;
  contactNo: string;
  /** ISO date (YYYY-MM-DD); drives the toolbar date filter. */
  createdDate: string;
}

export type ClientTab = 'exporters' | 'consignees';
