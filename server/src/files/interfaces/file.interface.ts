export interface File {
  id?: number;
  name: string;
  path: string;
  type: string;
  size: number;
  userId: string;
  downloads: number;
  createdAt: Date;
}
