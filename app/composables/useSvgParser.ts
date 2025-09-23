import type { SvgShape } from '@@/types/svgtypes.type';

export function useSvgParser() {
  function parseSvg(svgString: string): SvgShape[] {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(svgString, 'image/svg+xml');

    const results: SvgShape[] = [];

    // Handle polygons
    xmlDoc.querySelectorAll('polygon').forEach((poly) => {
      const parentGroup = poly.closest('g');
      const id =
        parentGroup?.getAttribute('id') || poly.getAttribute('id') || null;

      results.push({
        id,
        points: poly.getAttribute('points')?.trim() || '',
        type: 'polygon',
      });
    });

    // Handle polylines
    xmlDoc.querySelectorAll('polyline').forEach((polyline) => {
      const parentGroup = polyline.closest('g');
      const id =
        parentGroup?.getAttribute('id') || polyline.getAttribute('id') || null;

      results.push({
        id,
        points: polyline.getAttribute('points')?.trim() || '',
        type: 'polyline',
      });
    });

    // Handle paths
    xmlDoc.querySelectorAll('path').forEach((path) => {
      const parentGroup = path.closest('g');
      const id =
        parentGroup?.getAttribute('id') || path.getAttribute('id') || null;

      results.push({
        id,
        path: path.getAttribute('d')?.trim() || '',
        type: 'path',
      });
    });

    return results;
  }

  return { parseSvg };
}
