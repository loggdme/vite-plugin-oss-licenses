import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';

import '$/styles/index.css';

const LicensePage = lazy(() => import('$/pages/LicensePage').then((res) => ({ default: res.LicensePage })));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense>
      <LicensePage />
    </Suspense>
  </StrictMode>,
);
