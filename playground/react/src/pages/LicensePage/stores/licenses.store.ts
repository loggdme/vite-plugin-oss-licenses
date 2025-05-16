import type { OssLicense } from '@loggd/vite-plugin-oss-licenses';
import { create } from 'zustand';

type LicenseState = { searchQuery: string; licenseFilter: string; page: number; selectedLicense: OssLicense | null };
const initialState: LicenseState = { searchQuery: '', licenseFilter: 'all', page: 1, selectedLicense: null };
export const useLicenseStore = create<LicenseState>()(() => ({ ...initialState }));
