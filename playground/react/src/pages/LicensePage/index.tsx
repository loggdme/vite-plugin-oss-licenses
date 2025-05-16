import { LicenseCard } from '$/pages/LicensePage/components/LicenseCard';
import { LicenseDetailsDialog } from '$/pages/LicensePage/components/LicenseDetailsDialog';
import { LicenseFilter } from '$/pages/LicensePage/components/LicenseFilter';
import { LicensePagination } from '$/pages/LicensePage/components/LicensePagination';
import { LicenseStatus } from '$/pages/LicensePage/components/LicenseStatus';
import { useFilteredLicenses } from '$/pages/LicensePage/hooks/useFilteredLicenses';
import { useLicenseStore } from '$/pages/LicensePage/stores/licenses.store';

export const LicensePage = () => {
  const { uniqueLicenseTypes, filteredLicenses, paginatedLicenses, totalPages } = useFilteredLicenses();

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Open Source Dependencies</h1>
        <p className="text-muted-foreground">
          This page lists all the open source dependencies used in this project along with their license information. Click on any license badge to
          view the full license text.
        </p>
      </div>

      <LicenseFilter className="mb-6" uniqueLicenses={uniqueLicenseTypes} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedLicenses.map((license) => (
          <LicenseCard
            key={`${license.name}-${license.version}`}
            onLicenseClick={() => useLicenseStore.setState({ selectedLicense: license })}
            license={license}
          />
        ))}
      </div>

      <LicensePagination className="mt-6" totalPages={totalPages} />
      <LicenseStatus className="mt-6" overallCount={paginatedLicenses.length} filteredCount={filteredLicenses.length} />
      <LicenseDetailsDialog />
    </div>
  );
};
