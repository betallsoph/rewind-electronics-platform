export interface Device {
  _id: string;
  name: string;
  year: number;
  category: 'phone' | 'computer' | 'console' | 'audio' | 'camera' | 'other';
  emoji: string;
  image?: string;
  imageUrl?: string;
  imageKey?: string;
  images?: Array<{
    url: string;
    key: string;
    caption?: string;
  }>;
  description: string;
  memories: string;
  specifications?: Record<string, string>;
  tags?: string[];
  likes: number;
  views: number;
  age?: number;
  era?: '70s' | '80s' | '90s' | '2000s' | '2010s';
  sound?: string;
  price?: {
    original?: number;
    currency?: string;
    vintageValue?: number;
  };
  predecessorId?: string;
  successorId?: string;
  relatedDevices?: string[];
  rarity?: 'common' | 'uncommon' | 'rare' | 'legendary';
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
