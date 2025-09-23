export function useGetFileExtension(fileName: string) {
  const extension = fileName.split('.').pop();
  return extension;
}
