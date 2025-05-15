import type { OssLicense } from '@loggd/vite-plugin-oss-licenses';
import { ExternalLink } from 'lucide-react';
import type { FC } from 'react';

import { Badge } from '$/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '$/components/ui/table';
import { useFilteredLicenses } from '$/hooks/useFilteredLicenses';

interface Props {
  onLicenseClick: (license: OssLicense) => void;
}

export const LicenseTableView: FC<Props> = ({ onLicenseClick }) => {
  const { paginatedLicenses } = useFilteredLicenses();

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Version</TableHead>
            <TableHead className="hidden md:table-cell">Description</TableHead>
            <TableHead>License</TableHead>
            <TableHead className="hidden md:table-cell">Links</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedLicenses.map((license) => (
            <TableRow key={`${license.name}-${license.version}`}>
              <TableCell className="font-medium">{license.name}</TableCell>
              <TableCell>{license.version}</TableCell>
              <TableCell className="hidden md:table-cell max-w-xs truncate">{license.description || '—'}</TableCell>
              <TableCell>
                <Badge variant="outline" className="cursor-pointer hover:bg-accent" onClick={() => onLicenseClick(license)}>
                  {license.license}
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="flex gap-2">
                  {license.homepage && (
                    <a
                      href={license.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline inline-flex items-center"
                    >
                      <span className="sr-only">Homepage</span>
                      Homepage <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  )}
                  {license.repository && (
                    <a
                      href={license.repository}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline inline-flex items-center"
                    >
                      <span className="sr-only">Repository</span>
                      Repo <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
