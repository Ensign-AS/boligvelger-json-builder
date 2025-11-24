import type { NormalizedShape } from '@@/types/normalizedShape.type';

export type InputShape = {
  id: string;
  path: string;
};

export function useJsonParser() {
  /**
   * Normalize shape data from any JSON input structure
   * into the format expected by the main app
   */
  function parseJsonData(input: string): NormalizedShape[] {
    const jsonData = JSON.parse(input);
    const results: NormalizedShape[] = [];

    jsonData.forEach((shape: InputShape) => {
      results.push({
        id: shape.id,
        shapeType: 'path',
        path: shape.path,
      });
    });
    return results;
  }

  return { parseJsonData };
}
