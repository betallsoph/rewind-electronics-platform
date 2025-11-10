'use client';

import type { Device } from '@/types';
import styles from './DeviceCard.module.css';
import { FaHeart, FaEye } from 'react-icons/fa';

interface DeviceCardProps {
  device: Device;
  onClick: () => void;
  onLike: (e: React.MouseEvent) => void;
}

const getCategoryName = (category: string): string => {
  const categories: Record<string, string> = {
    phone: 'Điện thoại',
    computer: 'Máy tính',
    console: 'Máy chơi game',
    audio: 'Âm thanh',
    camera: 'Máy ảnh',
    other: 'Khác',
  };
  return categories[category] || category;
};

export default function DeviceCard({ device, onClick, onLike }: DeviceCardProps) {
  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLike(e);
  };

  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.image}>{device.emoji}</div>
      <div className={styles.content}>
        <span className={styles.category}>{getCategoryName(device.category)}</span>
        <h2 className={styles.title}>{device.name}</h2>
        <p className={styles.year}>📅 {device.year}</p>
        <p className={styles.description}>{device.description}</p>
        <div className={styles.stats}>
          <button 
            className={styles.likeBtn}
            onClick={handleLike}
            aria-label="Like device"
          >
            <FaHeart /> {device.likes}
          </button>
          <span className={styles.views}>
            <FaEye /> {device.views}
          </span>
        </div>
      </div>
    </div>
  );
}
