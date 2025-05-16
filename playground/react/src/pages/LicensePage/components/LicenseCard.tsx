import type { OssLicense } from '@loggd/vite-plugin-oss-licenses';
import { ExternalLink } from 'lucide-react';
import type { FC } from 'react';

import { Badge } from '$/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$/components/ui/card';

type Props = {
  license: OssLicense;
  onLicenseClick: (license: OssLicense) => void;
};

export const LicenseCard: FC<Props> = ({ license, onLicenseClick }) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex justify-between items-start">
        <div>
          <CardTitle className="text-lg">{license.name}</CardTitle>
          <CardDescription>v{license.version}</CardDescription>
        </div>

        <Badge variant="outline" className="cursor-pointer hover:bg-accent" onClick={() => onLicenseClick(license)}>
          {license.license}
        </Badge>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 h-10">{license.description || 'No description available'}</p>
        <div className="flex gap-2 text-sm">
          {license.homepage && (
            <a href={license.homepage} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center">
              Homepage <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          )}
          {license.repository && (
            <a href={license.repository} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center">
              Repository <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
