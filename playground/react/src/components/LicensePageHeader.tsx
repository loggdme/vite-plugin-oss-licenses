import type { FC } from 'react';

interface Props {
  className?: string;
}

export const LicensePageHeader: FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <h1 className="text-3xl font-bold mb-2">Open Source Dependencies</h1>
      <p className="text-muted-foreground">
        This page lists all the open source dependencies used in this project along with their license information. Click on any license badge to view
        the full license text.
      </p>
    </div>
  );
};
