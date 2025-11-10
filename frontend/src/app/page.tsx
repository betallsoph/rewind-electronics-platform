'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import DeviceGrid from '@/components/DeviceGrid';
import SearchBar from '@/components/SearchBar';
import DeviceModal from '@/components/DeviceModal';
import Footer from '@/components/Footer';
import { devicesApi, categoriesApi } from '@/lib/api';
import type { Device, Category } from '@/types';

export default function Home() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoriesApi.getAll();
        setCategories(response.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch devices
  useEffect(() => {
    const fetchDevices = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await devicesApi.getAll({
          category: selectedCategory !== 'all' ? selectedCategory : undefined,
          search: searchQuery || undefined,
          page,
          limit: 12,
          sortBy: 'createdAt',
          order: 'desc',
        });
        setDevices(response.data);
        if (response.pagination) {
          setTotalPages(response.pagination.pages);
        }
      } catch (err: any) {
        console.error('Error fetching devices:', err);
        setError(err.response?.data?.message || 'Không thể tải dữ liệu. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(() => {
      fetchDevices();
    }, 300);

    return () => clearTimeout(debounce);
  }, [selectedCategory, searchQuery, page]);

  const handleDeviceClick = async (device: Device) => {
    try {
      // Fetch full device details (which will increment views)
      const response = await devicesApi.getById(device._id);
      setSelectedDevice(response.data);
    } catch (err) {
      console.error('Error fetching device details:', err);
      setSelectedDevice(device);
    }
  };

  const handleLikeDevice = async (deviceId: string) => {
    try {
      await devicesApi.like(deviceId);
      // Update the device in the list
      setDevices(prevDevices =>
        prevDevices.map(d =>
          d._id === deviceId ? { ...d, likes: d.likes + 1 } : d
        )
      );
      // Update selected device if it's the one being liked
      if (selectedDevice && selectedDevice._id === deviceId) {
        setSelectedDevice({ ...selectedDevice, likes: selectedDevice.likes + 1 });
      }
    } catch (err) {
      console.error('Error liking device:', err);
    }
  };

  return (
    <div>
      <Header />
      <Navigation
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <main style={{ padding: '40px 0', minHeight: 'calc(100vh - 400px)' }}>
        <div className="container">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          
          {error && (
            <div style={{
              backgroundColor: 'rgba(255, 107, 107, 0.2)',
              border: '2px solid var(--primary-color)',
              borderRadius: '10px',
              padding: '20px',
              marginBottom: '20px',
              textAlign: 'center',
            }}>
              <p style={{ color: 'var(--primary-color)', fontSize: '1.1rem' }}>
                ⚠️ {error}
              </p>
            </div>
          )}

          <DeviceGrid
            devices={devices}
            loading={loading}
            onDeviceClick={handleDeviceClick}
            onLikeDevice={handleLikeDevice}
          />

          {!loading && devices.length > 0 && totalPages > 1 && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '10px',
              marginTop: '40px',
            }}>
              <button
                className="btn btn-secondary"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                ← Trước
              </button>
              <span style={{ color: 'var(--text-light)' }}>
                Trang {page} / {totalPages}
              </span>
              <button
                className="btn btn-secondary"
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Sau →
              </button>
            </div>
          )}
        </div>
      </main>

      {selectedDevice && (
        <DeviceModal
          device={selectedDevice}
          onClose={() => setSelectedDevice(null)}
          onLike={handleLikeDevice}
        />
      )}

      <Footer />
    </div>
  );
}
