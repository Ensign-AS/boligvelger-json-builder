export type Project = {
  id: number;
  name: string;
  url: string;
  description?: string;
  appUser?: string;
  appPass?: string;
  projects?: ProjectData[];
};

export type ProjectData = {
  name: string;
  id: number;
};
