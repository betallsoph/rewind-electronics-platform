export interface DeviceMedia {
  thumbnail: string
  gallery: string[]
}

export interface PricePoint {
  year: number
  price: number
}

export interface DeviceStats {
  views: number
  likes: number
  upvotes: number
}

export interface Device {
  id: string
  name: string
  manufacturer: string
  releaseYear: number
  era: string
  categoryId: string
  description: string
  highlights: string[]
  specifications: Record<string, string>
  media: DeviceMedia
  rarity: string
  priceHistory: PricePoint[]
  stats: DeviceStats
}

export interface Category {
  id: string
  name: string
  description: string
  icon: string
  highlights: string[]
}

export interface Memory {
  id: string
  deviceId: string
  title: string
  content: string
  era: string
  author: string
  createdAt: string
  sentiment: string
}

export interface Collection {
  id: string
  name: string
  description: string
  deviceIds: string[]
  theme: string
}

export interface Achievement {
  id: string
  name: string
  description: string
  criteria: string
  tier: string
}

export interface DashboardSummary {
  totalDevices: number
  totalMemories: number
  topRarityCounts: Record<string, number>
  popularCategories: string[]
  recentYears: number[]
}

export interface DashboardResponse {
  summary: DashboardSummary
  highlights: {
    mostRecent: Device[]
    trending: Device[]
  }
}
