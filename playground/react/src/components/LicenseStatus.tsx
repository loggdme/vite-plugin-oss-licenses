import type { FC } from 'react';

import { useFilteredLicenses } from '$/hooks/useFilteredLicenses';
import { cn } from '$/lib/utils';
import { useLicenseStore } from '$/stores/licenses.store';

interface Props {
  className?: string;
}

export const LicenseStatus: FC<Props> = ({ className }) => {
  const { filteredLicenses, paginatedLicenses } = useFilteredLicenses();

  const searchQuery = useLicenseStore((state) => state.searchQuery);
  const licenseFilter = useLicenseStore((state) => state.licenseFilter);

  return (
    <div className={cn('text-sm text-muted-foreground', className)}>
      Showing {paginatedLicenses.length} of {filteredLicenses.length} dependencies
      {licenseFilter !== 'all' && ` with ${licenseFilter} license`}
      {searchQuery && ` matching "${searchQuery}"`}
    </div>
  );
};
