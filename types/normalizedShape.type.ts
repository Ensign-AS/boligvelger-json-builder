export interface NormalizedShape {
  id: string | null;
  wpPpropertyId?: number;
  wpSectionId?: number;
  type: 'section' | 'property';
  shapeType: 'polygon' | 'polyline' | 'path';
  points?: string; // for polygon & polyline
  path?: string; // for path
}

export interface NormalizedAngle {
  angle: number;
  shapes: NormalizedShape[];
}

export interface NormalizedProjectData {
  angles: NormalizedAngle[];
}
