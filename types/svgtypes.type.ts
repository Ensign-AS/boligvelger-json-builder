type PolygonData = {
  id: string | null;
  points: string;
  type?: 'polygon';
};

type PolylineData = {
  id: string | null;
  points: string;
  type: 'polyline';
};

type PathData = {
  id: string | null;
  path: string;
  type?: 'path';
};

export type SvgShape = PolygonData | PolylineData | PathData;
