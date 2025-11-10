'use client';

import { useState, useEffect } from 'react';
import CustomCursor from '@/components/CustomCursor';
import ParticleBackground from '@/components/ParticleBackground';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import DeviceGrid from '@/components/DeviceGrid';
import SearchBar from '@/components/SearchBar';
import DeviceModal from '@/components/DeviceModal';
import Footer from '@/components/Footer';
import Timeline3D from '@/components/Timeline3D';
import DeviceComparison from '@/components/DeviceComparison';
import MemoryWall from '@/components/MemoryWall';
import AchievementDisplay from '@/components/AchievementDisplay';
import KeyboardShortcuts from '@/components/KeyboardShortcuts';
import { devicesApi, categoriesApi } from '@/lib/api';
import type { Device, Category } from '@/types';
import { useToast } from '@/contexts/ToastContext';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import styles from './page.module.css';

type ViewMode = 'grid' | 'timeline' | 'memories' | 'achievements';

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
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [compareMode, setCompareMode] = useState<boolean>(false);
  const [selectedForComparison, setSelectedForComparison] = useState<Device[]>([]);
  const [showComparison, setShowComparison] = useState<boolean>(false);
  const [username] = useState('Guest_' + Math.random().toString(36).substr(2, 9));
  const toast = useToast();

  // Keyboard shortcuts
  useKeyboardShortcuts({
    '/': () => document.getElementById('searchInput')?.focus(),
    'g': () => setViewMode('grid'),
    't': () => setViewMode('timeline'),
    'm': () => setViewMode('memories'),
    'a': () => setViewMode('achievements'),
    'c': () => setCompareMode(!compareMode),
    'escape': () => {
      if (selectedDevice) setSelectedDevice(null);
      if (showComparison) {
        setShowComparison(false);
        setCompareMode(false);
        setSelectedForComparison([]);
      }
    },
  });

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
          limit: 50,
          sortBy: 'year',
          order: 'desc',
        });
        setDevices(response.data);
        if (response.pagination) {
          setTotalPages(response.pagination.pages);
        }
      } catch (err: any) {
        console.error('Error fetching devices:', err);
        const errorMsg = err.response?.data?.message || 'Không thể tải dữ liệu. Vui lòng thử lại sau.';
        setError(errorMsg);
        toast.error(errorMsg);
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
    if (compareMode) {
      if (selectedForComparison.find(d => d._id === device._id)) {
        setSelectedForComparison(prev => prev.filter(d => d._id !== device._id));
      } else if (selectedForComparison.length < 3) {
        setSelectedForComparison(prev => [...prev, device]);
      }
    } else {
      try {
        const response = await devicesApi.getById(device._id);
        setSelectedDevice(response.data);
      } catch (err) {
        console.error('Error fetching device details:', err);
        setSelectedDevice(device);
      }
    }
  };

  const handleLikeDevice = async (deviceId: string) => {
    try {
      await devicesApi.like(deviceId);
      setDevices(prevDevices =>
        prevDevices.map(d =>
          d._id === deviceId ? { ...d, likes: d.likes + 1 } : d
        )
      );
      if (selectedDevice && selectedDevice._id === deviceId) {
        setSelectedDevice({ ...selectedDevice, likes: selectedDevice.likes + 1 });
      }
      toast.success('Đã thích thiết bị! ❤️');
    } catch (err) {
      console.error('Error liking device:', err);
      toast.error('Không thể thích thiết bị');
    }
  };

  const ViewModeSelector = () => (
    <div className={styles.viewModeSelector}>
      <button
        className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.active : ''}`}
        onClick={() => setViewMode('grid')}
      >
        <span>🔲</span> Grid
      </button>
      <button
        className={`${styles.viewBtn} ${viewMode === 'timeline' ? styles.active : ''}`}
        onClick={() => setViewMode('timeline')}
      >
        <span>⏳</span> Timeline 3D
      </button>
      <button
        className={`${styles.viewBtn} ${viewMode === 'memories' ? styles.active : ''}`}
        onClick={() => setViewMode('memories')}
      >
        <span>💭</span> Ký Ức
      </button>
      <button
        className={`${styles.viewBtn} ${viewMode === 'achievements' ? styles.active : ''}`}
        onClick={() => setViewMode('achievements')}
      >
        <span>🏆</span> Thành Tích
      </button>
    </div>
  );

  const ComparisonTools = () => (
    <div className={styles.comparisonTools}>
      <button
        className={`btn-neon ${compareMode ? styles.activeCompare : ''}`}
        onClick={() => {
          setCompareMode(!compareMode);
          if (!compareMode) setSelectedForComparison([]);
        }}
      >
        {compareMode ? '✖ Hủy So Sánh' : '⚖️ So Sánh Thiết Bị'}
      </button>
      
      {compareMode && selectedForComparison.length > 0 && (
        <div className={styles.selectedCount}>
          Đã chọn: {selectedForComparison.length}/3
          {selectedForComparison.length >= 2 && (
            <button
              className="btn-neon"
              onClick={() => setShowComparison(true)}
              style={{ marginLeft: '15px' }}
            >
              So Sánh Ngay
            </button>
          )}
        </div>
      )}
    </div>
  );

  return (
    <>
      <CustomCursor />
      <ParticleBackground />
      
      <div className={styles.app}>
        <Header />
        <Navigation
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        
        <main className={styles.main}>
          <div className="container">
            <ViewModeSelector />
            
            {viewMode === 'grid' && (
              <>
                <div className={styles.topBar}>
                  <SearchBar value={searchQuery} onChange={setSearchQuery} />
                  <ComparisonTools />
                </div>

                {error && (
                  <div className={styles.errorBox}>
                    <p>⚠️ {error}</p>
                  </div>
                )}

                <DeviceGrid
                  devices={devices}
                  loading={loading}
                  onDeviceClick={handleDeviceClick}
                  onLikeDevice={handleLikeDevice}
                />

                {!loading && devices.length > 0 && totalPages > 1 && (
                  <div className={styles.pagination}>
                    <button
                      className="btn-neon"
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                    >
                      ← Trước
                    </button>
                    <span className={styles.pageInfo}>
                      Trang {page} / {totalPages}
                    </span>
                    <button
                      className="btn-neon"
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                    >
                      Sau →
                    </button>
                  </div>
                )}
              </>
            )}

            {viewMode === 'timeline' && !loading && (
              <Timeline3D 
                devices={devices}
                onDeviceClick={handleDeviceClick}
              />
            )}

            {viewMode === 'memories' && (
              <MemoryWall />
            )}

            {viewMode === 'achievements' && (
              <AchievementDisplay username={username} />
            )}
          </div>
        </main>

        {selectedDevice && !compareMode && (
          <DeviceModal
            device={selectedDevice}
            onClose={() => setSelectedDevice(null)}
            onLike={handleLikeDevice}
          />
        )}

        {showComparison && selectedForComparison.length >= 2 && (
          <DeviceComparison
            devices={selectedForComparison}
            onClose={() => {
              setShowComparison(false);
              setCompareMode(false);
              setSelectedForComparison([]);
            }}
          />
        )}

        <Footer />
        <KeyboardShortcuts />
      </div>
    </>
  );
}
