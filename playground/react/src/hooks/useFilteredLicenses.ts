import { useMemo } from 'react';

import { useLicenseStore } from '$/stores/licenses.store';
import licenses from 'virtual:oss-licenses';

const itemsPerPage = 9;

export const useFilteredLicenses = () => {
  const searchQuery = useLicenseStore((state) => state.searchQuery);
  const licenseFilter = useLicenseStore((state) => state.licenseFilter);
  const currentPage = useLicenseStore((state) => state.page);

  const uniqueLicenseTypes = useMemo(() => Array.from(new Set(licenses.map((dep) => dep.license))), [licenses]);

  const filteredLicenses = useMemo(
    () =>
      licenses
        .filter((dep) => {
          const matchesNameSearch = dep.name.toLowerCase().includes(searchQuery.toLowerCase());
          const matchesDescriptionSearch = dep.description?.toLowerCase().includes(searchQuery.toLowerCase());
          const matchesLicense = licenseFilter === 'all' || dep.license === licenseFilter;
          return (matchesNameSearch || matchesDescriptionSearch) && matchesLicense;
        })
        .toSorted((a, b) => a.name.localeCompare(b.name)),
    [licenses, searchQuery, licenseFilter],
  );

  const totalPages = useMemo(() => Math.ceil(filteredLicenses.length / itemsPerPage), [filteredLicenses]);

  const paginatedLicenses = useMemo(
    () => filteredLicenses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    [filteredLicenses, currentPage],
  );

  return { filteredLicenses, paginatedLicenses, uniqueLicenseTypes, totalPages };
};
