import { useEffect, useState } from 'react';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '$/components/ui/dialog';
import { ScrollArea } from '$/components/ui/scroll-area';
import { useLicenseStore } from '$/pages/LicensePage/stores/licenses.store';

export const LicenseDetailsDialog = () => {
  const [open, setOpen] = useState(false);
  const selectedLicense = useLicenseStore((state) => state.selectedLicense);

  useEffect(() => {
    if (selectedLicense) setOpen(true);
  }, [selectedLicense]);

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        !open && setTimeout(() => useLicenseStore.setState({ selectedLicense: null }), 200);
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
          {selectedLicense?.licenses.map((license) =>
            license.split('\n').map((line) => (
              <div key={line} className={line.trim() === '' ? 'h-4' : ''}>
                {line}
              </div>
            )),
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
