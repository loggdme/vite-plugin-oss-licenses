import type { FC } from 'react';

import { cn } from '$/lib/utils';
import { useLicenseStore } from '$/pages/LicensePage/stores/licenses.store';

interface Props {
  overallCount: number;
  filteredCount: number;
  className?: string;
}

export const LicenseStatus: FC<Props> = ({ className, filteredCount, overallCount }) => {
  const searchQuery = useLicenseStore((state) => state.searchQuery);
  const licenseFilter = useLicenseStore((state) => state.licenseFilter);

  return (
    <div className={cn('text-sm text-muted-foreground', className)}>
      Showing {filteredCount} of {overallCount} dependencies
      {licenseFilter !== 'all' && ` with ${licenseFilter} license`}
      {searchQuery && ` matching "${searchQuery}"`}
    </div>
  );
};
