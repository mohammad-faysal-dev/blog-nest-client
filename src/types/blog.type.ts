export interface BlogPost {
  id: string | number;
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  views: number;
  _count?: {
    comments: number;
  };
  isFeatured: boolean;
}
