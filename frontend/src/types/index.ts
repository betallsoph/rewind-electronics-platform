export interface Device {
  _id: string;
  name: string;
  year: number;
  category: 'phone' | 'computer' | 'console' | 'audio' | 'camera' | 'other';
  emoji: string;
  image?: string;
  description: string;
  memories: string;
  specifications?: Record<string, string>;
  tags?: string[];
  likes: number;
  views: number;
  age?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  emoji: string;
  nameEn: string;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  pagination?: PaginationInfo;
  message?: string;
}

export interface DeviceFilters {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: 'year' | 'name' | 'likes' | 'views' | 'createdAt';
  order?: 'asc' | 'desc';
}
