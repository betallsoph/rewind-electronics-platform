import axios from 'axios';
import type { Device, Category, ApiResponse, DeviceFilters } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Devices API
export const devicesApi = {
  // Get all devices with filters
  getAll: async (filters?: DeviceFilters): Promise<ApiResponse<Device[]>> => {
    const { data } = await api.get('/devices', { params: filters });
    return data;
  },

  // Get single device by ID
  getById: async (id: string): Promise<ApiResponse<Device>> => {
    const { data } = await api.get(`/devices/${id}`);
    return data;
  },

  // Create new device (JSON only - use upload.ts for images)
  create: async (device: Partial<Device>): Promise<ApiResponse<Device>> => {
    const { data } = await api.post('/devices', device);
    return data;
  },

  // Update device (JSON only - use upload.ts for images)
  update: async (id: string, device: Partial<Device>): Promise<ApiResponse<Device>> => {
    const { data } = await api.put(`/devices/${id}`, device);
    return data;
  },

  // Delete device
  delete: async (id: string): Promise<ApiResponse<void>> => {
    const { data } = await api.delete(`/devices/${id}`);
    return data;
  },

  // Like device
  like: async (id: string): Promise<ApiResponse<{ likes: number }>> => {
    const { data } = await api.post(`/devices/${id}/like`);
    return data;
  },

  // Get statistics
  getStats: async (): Promise<ApiResponse<any>> => {
    const { data } = await api.get('/devices/stats/overview');
    return data;
  },
};

// Categories API
export const categoriesApi = {
  // Get all categories
  getAll: async (): Promise<ApiResponse<Category[]>> => {
    const { data } = await api.get('/categories');
    return data;
  },

  // Get single category
  getById: async (id: string): Promise<ApiResponse<Category>> => {
    const { data } = await api.get(`/categories/${id}`);
    return data;
  },
};

export default api;
