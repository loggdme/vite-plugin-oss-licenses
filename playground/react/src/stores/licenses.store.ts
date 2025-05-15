import { create } from 'zustand';

type LicenseState = {
  searchQuery: string;
  licenseFilter: string;
  page: number;
  viewMode: 'table' | 'cards';
};

const initialState: LicenseState = {
  searchQuery: '',
  licenseFilter: 'all',
  page: 1,
  viewMode: 'table',
};

export const useLicenseStore = create<LicenseState>()(() => ({
  ...initialState,
}));
