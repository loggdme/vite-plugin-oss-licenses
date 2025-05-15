declare module 'virtual:oss-licenses' {
  const licenses: {
    name: string;
    version: string;
    description: string | null;
    homepage: string | null;
    repository: string | null;
    license: string;
    licenses: string[];
  }[];

  export default licenses;
}
