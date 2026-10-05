export interface Exporter {
  id: string;
  nickName: string;
  companyName: string;
  contactName: string;
  address: string;
  country: string;
  gstin: string;
  iec: string;
  lut: string;
  /** ISO date (YYYY-MM-DD); drives the toolbar date filter. */
  createdDate: string;
}

export interface Consignee {
  id: string;
  nickName: string;
  companyName: string;
  contactName: string;
  address: string;
  country: string;
  contactNo: string;
  /** ISO date (YYYY-MM-DD); drives the toolbar date filter. */
  createdDate: string;
}

export type ClientTab = 'exporters' | 'consignees';
