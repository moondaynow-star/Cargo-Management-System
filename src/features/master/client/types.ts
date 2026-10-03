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
}

export interface Consignee {
  id: string;
  nickName: string;
  companyName: string;
  contactName: string;
  address: string;
  country: string;
  contactNo: string;
}

export type ClientTab = 'exporters' | 'consignees';
