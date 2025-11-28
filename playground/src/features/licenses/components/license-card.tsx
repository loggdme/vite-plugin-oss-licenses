import type { OssLicense } from "@loggd/vite-plugin-oss-licenses";
import type { FC } from "react";

type Props = {
  license: OssLicense;
};

export const LicenseCard: FC<Props> = ({ license }) => {
  return (
    <div className="flex flex-col gap-3 rounded-md border border-gray-400 p-4" key={license.name}>
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <h3 className="font-bold">{license.name}</h3>
          <div className="rounded-md border border-gray-400 bg-gray-100 px-2 py-1 text-xs">{license.license}</div>
        </div>

        <div className="text-gray-500 text-xs">v{license.version}</div>
      </div>

      <p className="text-gray-500 text-sm">{license.description}</p>

      <div className="flex gap-2 font-medium text-xs">
        {!!license.homepage && (
          <a href={license.homepage} rel="noopener noreferrer" target="_blank">
            Homepage
          </a>
        )}
        {!!license.repository && (
          <a href={license.repository} rel="noopener noreferrer" target="_blank">
            Repository
          </a>
        )}
      </div>
    </div>
  );
};
