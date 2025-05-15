import type { OssLicense } from '@loggd/vite-plugin-oss-licenses';
import { useState } from 'react';

import { LicenseGridView } from '$/components/LicenseGridView';
import { LicenseTableView } from '$/components/LicenseTableView';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '$/components/ui/dialog';
import { ScrollArea } from '$/components/ui/scroll-area';
import { useLicenseStore } from '$/stores/licenses.store';

const formatLicenseText = (text: string) => {
  return text.split('\n').map((line) => (
    <div key={line} className={line.trim() === '' ? 'h-4' : ''}>
      {line}
    </div>
  ));
};

export const LicenseView = () => {
  const [open, setOpen] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState<OssLicense | null>(null);

  const viewMode = useLicenseStore((state) => state.viewMode);

  const handleLicenseClick = (license: OssLicense) => {
    setSelectedLicense(license);
    setOpen(true);
  };

  return (
    <>
      {viewMode === 'table' ? <LicenseTableView onLicenseClick={handleLicenseClick} /> : <LicenseGridView onLicenseClick={handleLicenseClick} />}

      <Dialog
        open={open}
        onOpenChange={(open) => {
          setOpen(open);
          !open && setTimeout(() => setSelectedLicense(null), 200);
        }}
      >
        <DialogContent className="sm:max-w-3xl w-full overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              {selectedLicense?.name} - {selectedLicense?.license} License
            </DialogTitle>
            <DialogDescription>Full license text for {selectedLicense?.name}</DialogDescription>
          </DialogHeader>

          <ScrollArea className="max-h-[80vh] p-4 border rounded-md bg-muted/30 font-mono text-sm whitespace-pre-wrap">
            {selectedLicense?.licenses.map((license) => formatLicenseText(license))}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
};
