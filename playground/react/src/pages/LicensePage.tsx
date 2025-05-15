import { LicenseFilter } from '$/components/LicenseFilter';
import { LicensePageHeader } from '$/components/LicensePageHeader';
import { LicensePagination } from '$/components/LicensePagination';
import { LicenseStatus } from '$/components/LicenseStatus';
import { LicenseView } from '$/components/LicenseView';

export const LicensePage = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <LicensePageHeader className="mb-8" />
      <LicenseFilter className="mb-6" />
      <LicenseView />
      <LicensePagination className="mt-6" />
      <LicenseStatus className="mt-6" />
    </div>
  );
};
