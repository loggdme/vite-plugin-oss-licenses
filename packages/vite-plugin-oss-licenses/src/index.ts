import { readFileSync } from 'fs';
import { resolve } from 'path';

import { globSync } from 'glob';
import type { Plugin } from 'vite';

const virtualModuleId = 'virtual:oss-licenses';
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

type Module = {
  name: string;
  version: string;
  description: string | null;
  homepage: string | null;
  repository: string | null;
  license: string;
  licenses: string[];
};

const resolveInitialDependencies = (path: string) => {
  try {
    const pkgJson = JSON.parse(readFileSync(path, 'utf-8'));
    return Object.keys(pkgJson.dependencies || {});
  } catch (_) {
    return [];
  }
};

const resolveNodeModulesFolder = (path: string) => {
  try {
    const packageFiles = globSync('**/package.json', { cwd: path, absolute: true });
    return packageFiles
      .map((file) => {
        const pkgJson = JSON.parse(readFileSync(file, 'utf-8'));
        const licenseFiles = globSync('LICENSE*', { cwd: file.replace('package.json', ''), absolute: true });

        return {
          name: pkgJson.name ?? null,
          version: pkgJson.version ?? null,
          description: pkgJson.description ?? null,
          homepage: pkgJson.homepage ?? null,
          repository: pkgJson.repository?.url ?? null,
          absolutePackagePath: file,
          license: pkgJson.license ?? null,
          licenseFiles: licenseFiles,
        };
      })
      .filter((modulePackageFile) => modulePackageFile.license !== null && modulePackageFile.name !== null && modulePackageFile.version !== null)
      .map((pkg) => pkg as InternalModule);
  } catch (_) {
    return [];
  }
};

const recursiveResolveDependencies = (modulesTree: InternalModule[], dependencies: string[]) => {
  const resolvedDependencies = new Set<Module>();

  for (const dependency of dependencies) {
    const module = modulesTree.find((mod) => mod.name === dependency);
    if (module) {
      resolvedDependencies.add({
        name: module.name,
        version: module.version,
        description: module.description,
        homepage: module.homepage,
        repository: module.repository,
        license: module.license,
        licenses: module.licenseFiles.map((file) => readFileSync(file, 'utf-8')),
      });
      const subDependencies = resolveInitialDependencies(module.absolutePackagePath);
      const subResolvedDependencies = recursiveResolveDependencies(modulesTree, subDependencies);
      subResolvedDependencies.forEach((subDep) => resolvedDependencies.add(subDep));
    }
  }

  return Array.from(resolvedDependencies);
};

export const vitePluginOSSLicenses = (): Plugin[] => {
  const plugin: Plugin = {
    name: 'vite-plugin-oss-licenses',
    resolveId: (id) => (id === virtualModuleId ? resolvedVirtualModuleId : undefined),
    config: () => ({
      build: { rollupOptions: { output: { manualChunks: (id: string) => (id.includes(virtualModuleId) ? virtualModuleId : undefined) } } },
    }),
    load: (id) => {
      if (id === resolvedVirtualModuleId) {
        const nodeModules = resolveNodeModulesFolder(resolve(process.cwd(), 'node_modules'));
        const dependencies = resolveInitialDependencies(resolve(process.cwd(), 'package.json'));
        const resolvedDependencies = recursiveResolveDependencies(nodeModules, dependencies);
        return `export default ${JSON.stringify(resolvedDependencies, null, 2)}`;
      }
    },
  };

  return [plugin];
};
