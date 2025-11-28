import { LicenseCard } from "$/features/licenses/components/license-card";
import licenses from "virtual:oss-licenses";

export const LicensePage = () => {
  const directLicenses = licenses.filter((license) => license.isDirectDependency);
  const indirectLicenses = licenses.filter((license) => !license.isDirectDependency);

  return (
    <div className="container mx-auto flex flex-col gap-8 px-4 py-8">
      <div className="flex flex-col gap-4">
        <h2 className="font-bold text-2xl">Direct Dependencies</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {directLicenses.map((license) => (
            <LicenseCard key={license.name} license={license} />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-bold text-2xl">Indirect Dependencies</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {indirectLicenses.map((license) => (
            <LicenseCard key={license.name} license={license} />
          ))}
        </div>
      </div>
    </div>
  );
};
