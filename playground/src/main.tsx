import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";

import "$/styles.css";

const LicensePage = lazy(() =>
  import("$/features/licenses/pages/license-page").then((res) => ({ default: res.LicensePage }))
);

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <Suspense>
      <LicensePage />
    </Suspense>
  </StrictMode>
);
