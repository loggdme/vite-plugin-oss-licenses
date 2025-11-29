declare module "virtual:oss-licenses" {
  const licenses: {
    name: string;
    version: string;
    isDirectDependency: boolean;
    description: string | null;
    homepage: string | null;
    repository: string | null;
    license: string;
  }[];

  export default licenses;
}
