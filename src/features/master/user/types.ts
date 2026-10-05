export const USER_ROLES = ['BRANCH', 'LEAD MANAGER', 'SUPER HUB', 'OPERATIONS', 'HUB'] as const;
export type UserRole = (typeof USER_ROLES)[number];

export type UserStatus = 'Enable' | 'Disable';

export interface User {
  id: string;
  /* Cargo business fields */
  userName: string;
  email: string;
  password: string;
  branchCode: string;
  /* Display / filter fields used by the User Management table */
  role: UserRole;
  phone: string;
  address: string;
  /** ISO date (YYYY-MM-DD). */
  createdDate: string;
  status: UserStatus;
}
