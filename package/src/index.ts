import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { globSync } from "glob";
import type { Plugin } from "vite";

const virtualModuleId = "virtual:oss-licenses";
const resolvedVirtualModuleId = `\0${virtualModuleId}`;

type InternalModule = {
  name: string;
  version: string;
  description: string | null;
  homepage: string | null;
  repository: string | null;
  absolutePackagePath: string;
  license: string;
  licenseFiles: string[];
};

export type OssLicense = {
  name: string;
  version: string;
  isDirectDependency: boolean;
  description: string | null;
  homepage: string | null;
  repository: string | null;
  license: string;
  licenses: string[];
};

const resolveInitialDependencies = (path: string) => {
  try {
    const pkgJson = JSON.parse(readFileSync(path, "utf-8"));
    return Object.keys(pkgJson.dependencies || {});
  } catch (_) {
    return [];
  }
};

const resolveNodeModulesFolder = (path: string) => {
  try {
    const packageFiles = globSync("**/package.json", {
      cwd: path,
      absolute: true,
    });

    return packageFiles
      .map((file) => {
        const pkgJson = JSON.parse(readFileSync(file, "utf-8"));
        const licenseFiles = globSync("LICENSE*", {
          cwd: file.replace("package.json", ""),
          absolute: true,
        });

        return {
          name: pkgJson.name ?? null,
          version: pkgJson.version ?? null,
          description: pkgJson.description ?? null,
          homepage: pkgJson.homepage ?? null,
          repository: pkgJson.repository?.url?.replace("git+", "") ?? null,
          absolutePackagePath: file,
          license: pkgJson.license ?? null,
          licenseFiles,
        };
      })
      .filter(
        (modulePackageFile) =>
          modulePackageFile.license !== null && modulePackageFile.name !== null && modulePackageFile.version !== null
      )
      .map((pkg) => pkg as InternalModule);
  } catch (_) {
    return [];
  }
};

const recursiveResolveDependencies = (modulesTree: InternalModule[], dependencies: string[], isDirect: boolean) => {
  const resolvedDependencies = new Set<OssLicense>();

  for (const dependency of dependencies) {
    const module = modulesTree.find((mod) => mod.name === dependency);
    if (module) {
      resolvedDependencies.add({
        name: module.name,
        isDirectDependency: isDirect,
        version: module.version,
        description: module.description,
        homepage: module.homepage,
        repository: module.repository,
        license: module.license,
        licenses: module.licenseFiles.map((file) => readFileSync(file, "utf-8")),
      });
      const subDependencies = resolveInitialDependencies(module.absolutePackagePath);
      const subResolvedDependencies = recursiveResolveDependencies(modulesTree, subDependencies, false);
      for (const subDep of subResolvedDependencies) {
        resolvedDependencies.add(subDep);
      }
    }
  }

  return Array.from(resolvedDependencies);
};

export const vitePluginOSSLicenses = (): Plugin[] => {
  const plugin: Plugin = {
    name: "vite-plugin-oss-licenses",
    resolveId: (id) => (id === virtualModuleId ? resolvedVirtualModuleId : undefined),
    config: () => ({
      build: {
        rollupOptions: {
          output: {
            manualChunks: (id: string) => (id.includes(virtualModuleId) ? virtualModuleId : undefined),
          },
        },
      },
    }),
    load: (id) => {
      if (id === resolvedVirtualModuleId) {
        const nodeModules = resolveNodeModulesFolder(resolve(process.cwd(), "node_modules"));
        const dependencies = resolveInitialDependencies(resolve(process.cwd(), "package.json"));
        const resolvedDependencies = recursiveResolveDependencies(nodeModules, dependencies, true);

        const uniqueDependencies = new Map<string, OssLicense>();
        for (const mod of resolvedDependencies) {
          if (!uniqueDependencies.has(mod.name)) {
            uniqueDependencies.set(`${mod.name}-${mod.version}`, mod);
          }
        }

        const dedoubledResolvedDependencies = Array.from(uniqueDependencies.values());

        return `export default ${JSON.stringify(dedoubledResolvedDependencies, null, 2)}`;
      }
    },
  };

  return [plugin];
};
