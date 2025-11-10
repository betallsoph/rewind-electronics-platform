import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface UploadResult {
  success: boolean;
  message: string;
  data: {
    url: string;
    key: string;
    size: number;
    mimetype: string;
  };
}

export interface MultipleUploadResult {
  success: boolean;
  message: string;
  data: Array<{
    url: string;
    key: string;
    size: number;
    mimetype: string;
  }>;
}

/**
 * Upload a single image to R2
 */
export const uploadSingleImage = async (file: File): Promise<UploadResult> => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await axios.post<UploadResult>(
    `${API_URL}/upload/single`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data;
};

/**
 * Upload multiple images to R2
 */
export const uploadMultipleImages = async (files: File[]): Promise<MultipleUploadResult> => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('images', file);
  });

  const response = await axios.post<MultipleUploadResult>(
    `${API_URL}/upload/multiple`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data;
};

/**
 * Delete an image from R2
 */
export const deleteImage = async (key: string): Promise<{ success: boolean; message: string }> => {
  const response = await axios.delete(`${API_URL}/upload/${encodeURIComponent(key)}`);
  return response.data;
};

/**
 * Upload device with image
 */
export const createDeviceWithImage = async (
  deviceData: any,
  imageFile?: File
): Promise<any> => {
  const formData = new FormData();
  
  // Append device data
  Object.keys(deviceData).forEach((key) => {
    if (deviceData[key] !== undefined && deviceData[key] !== null) {
      if (typeof deviceData[key] === 'object' && !Array.isArray(deviceData[key])) {
        formData.append(key, JSON.stringify(deviceData[key]));
      } else if (Array.isArray(deviceData[key])) {
        formData.append(key, JSON.stringify(deviceData[key]));
      } else {
        formData.append(key, deviceData[key]);
      }
    }
  });

  // Append image if provided
  if (imageFile) {
    formData.append('deviceImage', imageFile);
  }

  const response = await axios.post(`${API_URL}/devices`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

/**
 * Update device with optional new image
 */
export const updateDeviceWithImage = async (
  id: string,
  deviceData: any,
  imageFile?: File
): Promise<any> => {
  const formData = new FormData();
  
  // Append device data
  Object.keys(deviceData).forEach((key) => {
    if (deviceData[key] !== undefined && deviceData[key] !== null) {
      if (typeof deviceData[key] === 'object' && !Array.isArray(deviceData[key])) {
        formData.append(key, JSON.stringify(deviceData[key]));
      } else if (Array.isArray(deviceData[key])) {
        formData.append(key, JSON.stringify(deviceData[key]));
      } else {
        formData.append(key, deviceData[key]);
      }
    }
  });

  // Append image if provided
  if (imageFile) {
    formData.append('deviceImage', imageFile);
  }

  const response = await axios.put(`${API_URL}/devices/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
