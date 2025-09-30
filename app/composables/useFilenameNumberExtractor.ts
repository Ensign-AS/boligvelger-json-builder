// composables/useFilenameNumberExtractor.ts

/**
 * Extracts the number from a filename with extensions like .svg, .json, or .csv.
 * @param filename The filename to extract the number from.
 * @returns The extracted number, or null if no number is found or filename is undefined.
 */
export function extractNumberFromFilename(
  filename: string | undefined
): number | null {
  if (!filename) return null;

  // Match the last occurrence of one or more digits before the file extension
  const match = filename.match(/-(\d+)\.(svg|json|csv)$/i);
  if (match && match[1]) {
    return parseInt(match[1], 10);
  }
  return null;
}

/**
 * Composable for extracting numbers from filenames.
 */
export function useFilenameNumberExtractor() {
  /**
   * Extracts the number from a filename.
   * @param filename The filename to extract the number from.
   * @returns The extracted number, or null if no number is found or filename is undefined.
   */
  const extractNumber = (filename: string | undefined): number | null => {
    return extractNumberFromFilename(filename);
  };

  return {
    extractNumber,
  };
}
