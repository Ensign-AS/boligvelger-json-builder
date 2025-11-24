import { useSvgParser } from '@/composables/useSvgParser';
const { parseSvg } = useSvgParser();

import { useJsonParser } from '@/composables/useJsonParser';
const { parseJsonData } = useJsonParser();

export function useFileParser(content: string, filetype?: string) {
  if (filetype === 'svg') {
    const parsedContent = parseSvg(content);
    return parsedContent;
  } else if (filetype === 'json') {
    const parsedContent = parseJsonData(content);
    return parsedContent;
  } else {
    return null;
  }
}
