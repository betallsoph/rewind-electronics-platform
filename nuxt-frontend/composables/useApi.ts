import type {
  Device,
  Category,
  Memory,
  Collection,
  Achievement,
  DashboardResponse
} from '@/types'

interface FetchOptions<T> {
  params?: Record<string, any>
  default?: T
  method?: 'get' | 'post'
  body?: any
}

export const useApi = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBase

  const get = async <T>(path: string, options: FetchOptions<T> = {}) => {
    const { params, default: defaultValue } = options
    const key = `${path}-${JSON.stringify(params ?? {})}`
    const { data, error } = await useFetch<T>(`${baseURL}${path}`, {
      method: options.method ?? 'get',
      params,
      body: options.body,
      key,
      server: true
    })

    if (error.value) {
      console.error(`API error for ${path}`, error.value)
      return defaultValue as T
    }

    return (data.value ?? defaultValue) as T
  }

  return {
    listDevices: (params?: Record<string, any>) =>
      get<Device[]>('/devices', { params, default: [] }),
    getDevice: (id: string) => get<Device>(`/devices/${id}`),
    compareDevices: (ids: string[]) =>
      get<Device[]>('/devices/compare', {
        method: 'post',
        body: { ids },
        default: []
      }),
    listCategories: () => get<Category[]>('/categories', { default: [] }),
    listMemories: (deviceId?: string) =>
      get<Memory[]>('/memories', {
        params: deviceId ? { deviceId } : undefined,
        default: []
      }),
    listCollections: (theme?: string) =>
      get<Collection[]>('/collections', {
        params: theme ? { theme } : undefined,
        default: []
      }),
    listAchievements: () => get<Achievement[]>('/achievements', { default: [] }),
    getDashboard: () =>
      get<DashboardResponse>('/dashboard', {
        default: {
          summary: {
            totalDevices: 0,
            totalMemories: 0,
            topRarityCounts: {},
            popularCategories: [],
            recentYears: []
          },
          highlights: { mostRecent: [], trending: [] }
        }
      })
  }
}
