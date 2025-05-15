import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '$/styles/index.css';

import { LicensePage } from '$/pages/LicensePage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LicensePage />
  </StrictMode>,
);
