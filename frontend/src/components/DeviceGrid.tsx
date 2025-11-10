'use client';

import type { Device } from '@/types';
import DeviceCard from './DeviceCard';
import styles from './DeviceGrid.module.css';

interface DeviceGridProps {
  devices: Device[];
  loading: boolean;
  onDeviceClick: (device: Device) => void;
  onLikeDevice: (deviceId: string) => void;
}

export default function DeviceGrid({ 
  devices, 
  loading, 
  onDeviceClick,
  onLikeDevice 
}: DeviceGridProps) {
  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Đang tải...</p>
      </div>
    );
  }

  if (devices.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>😢</div>
        <h2>Không tìm thấy thiết bị nào</h2>
        <p>Thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {devices.map((device) => (
        <DeviceCard
          key={device._id}
          device={device}
          onClick={() => onDeviceClick(device)}
          onLike={() => onLikeDevice(device._id)}
        />
      ))}
    </div>
  );
}
