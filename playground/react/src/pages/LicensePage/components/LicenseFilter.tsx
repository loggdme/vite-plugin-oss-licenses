import { Filter, Search } from 'lucide-react';
import type { FC } from 'react';

import { Input } from '$/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '$/components/ui/select';
import { cn } from '$/lib/utils';
import { useLicenseStore } from '$/pages/LicensePage/stores/licenses.store';

interface Props {
  uniqueLicenses: string[];
  className?: string;
}

export const LicenseFilter: FC<Props> = ({ className, uniqueLicenses }) => {
  const searchQuery = useLicenseStore((state) => state.searchQuery);
  const licenseFilter = useLicenseStore((state) => state.licenseFilter);

  return (
    <div className={cn('flex flex-col md:flex-row gap-4', className)}>
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search dependencies..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => useLicenseStore.setState({ searchQuery: e.target.value, page: 1 })}
        />
      </div>

      <div className="flex gap-2">
        <Select value={licenseFilter} onValueChange={(value) => useLicenseStore.setState({ licenseFilter: value, page: 1 })}>
          <SelectTrigger className="w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by license" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Licenses</SelectItem>

            {uniqueLicenses.map((license) => (
              <SelectItem key={license} value={license}>
                {license}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
