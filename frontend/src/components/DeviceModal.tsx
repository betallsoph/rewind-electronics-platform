'use client';

import { useEffect } from 'react';
import type { Device } from '@/types';
import styles from './DeviceModal.module.css';
import { FaHeart, FaEye, FaTimes } from 'react-icons/fa';

interface DeviceModalProps {
  device: Device;
  onClose: () => void;
  onLike: (deviceId: string) => void;
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

export default function DeviceModal({ device, onClose, onLike }: DeviceModalProps) {
  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    // Handle ESC key
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modal} onClick={handleBackdropClick}>
      <div className={styles.content}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
          <FaTimes />
        </button>
        
        <div className={styles.image}>{device.emoji}</div>
        
        <h2 className={styles.title}>{device.name}</h2>
        <p className={styles.year}>📅 Năm ra mắt: {device.year}</p>
        <span className={styles.category}>{getCategoryName(device.category)}</span>
        
        <p className={styles.description}>{device.description}</p>
        
        <div className={styles.memories}>
          <h3>💭 Ký ức</h3>
          <p>{device.memories}</p>
        </div>

        {device.specifications && Object.keys(device.specifications).length > 0 && (
          <div className={styles.specs}>
            <h3>🔧 Thông số kỹ thuật</h3>
            <dl>
              {Object.entries(device.specifications).map(([key, value]) => (
                <div key={key} className={styles.specItem}>
                  <dt>{key}:</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {device.tags && device.tags.length > 0 && (
          <div className={styles.tags}>
            {device.tags.map((tag) => (
              <span key={tag} className={styles.tag}>#{tag}</span>
            ))}
          </div>
        )}

        <div className={styles.stats}>
          <button 
            className={styles.likeBtn}
            onClick={() => onLike(device._id)}
            aria-label="Like device"
          >
            <FaHeart /> {device.likes} Thích
          </button>
          <span className={styles.views}>
            <FaEye /> {device.views} Lượt xem
          </span>
        </div>
      </div>
    </div>
  );
}
