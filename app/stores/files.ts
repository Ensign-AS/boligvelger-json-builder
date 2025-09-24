import { defineStore } from 'pinia';
import { useFileParser } from '@/composables/useFileParser';
import { useGetFileExtension } from '@/composables/useGetFileExtension';
import { useAnglesStore } from '@/stores/angles';

/**
 * Pinia store for managing file uploads and parsing.
 */
export const useFilesStore = defineStore('files', () => {
  /** List of uploaded files. */
  const files = ref<File[]>([]);

  /**
   * Reads the content of a file as text.
   * @param {File} file - The file to read.
   * @returns {Promise<string>} A promise resolving to the file's content as a string.
   */
  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  /**
   * Adds new files to the store.
   * @param {File[]} newFiles - The files to add.
   */
  const addFiles = (newFiles: File[]) => {
    files.value = [...files.value, ...newFiles];
  };

  /**
   * Parses all SVG files in the store.
   */
  async function parseFiles() {
    for (const file of files.value) {
      // Read and parse the file content
      const content = await readFileAsText(file);
      // Get the file extension
      const extension = useGetFileExtension(file.name);
      // Parse the file content based on the extension
      const parsedContent = useFileParser(content, extension);

      if (parsedContent) {
        parsedContent.forEach((shape) => {
          useAnglesStore().addAngle(shape);
        });
      }
    }
  }

  /**
   * Resets the files array.
   */
  function resetFiles() {
    files.value = [];
  }

  return {
    files,
    addFiles,
    parseFiles,
    resetFiles,
  };
});
