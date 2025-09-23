type PolygonData = {
  id: string | null;
  points: string;
  shapeType?: 'polygon';
};

type PolylineData = {
  id: string | null;
  points: string;
  shapeType: 'polyline';
};

type PathData = {
  id: string | null;
  path: string;
  shapeType?: 'path';
};

export type SvgShape = PolygonData | PolylineData | PathData;
