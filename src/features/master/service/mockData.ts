import type { Service } from './types';

export const mockServices: Service[] = [
  { id: 'SRV001', service: 'Air Freight', type: 'International' },
  { id: 'SRV002', service: 'Sea Freight - FCL', type: 'International' },
  { id: 'SRV003', service: 'Sea Freight - LCL', type: 'International' },
  { id: 'SRV004', service: 'Road Transport', type: 'Domestic' },
  { id: 'SRV005', service: 'Rail Cargo', type: 'Domestic' },
  { id: 'SRV006', service: 'Warehousing', type: 'Domestic' },
  { id: 'SRV007', service: 'Custom Clearance', type: 'International' },
  { id: 'SRV008', service: 'Courier Express', type: 'International' },
  { id: 'SRV009', service: 'Cold Chain Logistics', type: 'Domestic' },
  { id: 'SRV010', service: 'Project Cargo', type: 'International' },
  { id: 'SRV011', service: 'Dangerous Goods Handling', type: 'International' },
  { id: 'SRV012', service: 'Last Mile Delivery', type: 'Domestic' },
];
