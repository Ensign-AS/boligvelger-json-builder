import { useSvgParser } from '@/composables/useSvgParser';
const { parseSvg } = useSvgParser();

export function useFileParser(content: string, filetype?: string) {
  if (filetype === 'svg') {
    const parsedContent = parseSvg(content);
    return parsedContent;
  } else {
    return null;
  }
}
