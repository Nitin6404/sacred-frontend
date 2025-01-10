export interface Template {
  id: number;
  name: string;
  description: string;
  thumbnailUrl: string;
  previewImages: string[];
  category: string[];
  isActive: boolean;
  isFeatured: boolean;
  rating: number;
  views: number;
  createdAt: string;
  updatedAt: string;
}
