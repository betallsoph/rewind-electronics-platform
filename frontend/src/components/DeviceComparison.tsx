'use client';

import { useState } from 'react';
import type { Device } from '@/types';
import styles from './DeviceComparison.module.css';
import { FaTimes, FaCheck, FaTimes as FaX } from 'react-icons/fa';

interface DeviceComparisonProps {
  devices: Device[];
  onClose: () => void;
}

export default function DeviceComparison({ devices, onClose }: DeviceComparisonProps) {
  const [comparedDevices, setComparedDevices] = useState<Device[]>(
    devices.slice(0, 3)
  );

  const removeDevice = (index: number) => {
    setComparedDevices(prev => prev.filter((_, i) => i !== index));
  };

  const categories = [
    { key: 'year', label: 'Năm ra mắt', format: (val: any) => val },
    { key: 'category', label: 'Danh mục', format: (val: string) => {
      const cats: Record<string, string> = {
        phone: 'Điện thoại',
        computer: 'Máy tính',
        console: 'Game',
        audio: 'Âm thanh',
        camera: 'Máy ảnh'
      };
      return cats[val] || val;
    }},
    { key: 'era', label: 'Thời đại', format: (val: string) => `Thập niên ${val.toUpperCase()}` },
    { key: 'rarity', label: 'Độ hiếm', format: (val: string) => val },
    { key: 'likes', label: 'Lượt thích', format: (val: number) => val.toLocaleString() },
    { key: 'views', label: 'Lượt xem', format: (val: number) => val.toLocaleString() },
  ];

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          <FaTimes />
        </button>

        <h2 className={styles.title}>
          <span className="text-gradient">So Sánh Thiết Bị</span>
        </h2>

        <div className={styles.comparisonGrid}>
          {comparedDevices.map((device, index) => (
            <div key={device._id} className={`${styles.deviceColumn} fade-in`}>
              <button 
                className={styles.removeBtn}
                onClick={() => removeDevice(index)}
              >
                <FaX />
              </button>

              <div className={styles.deviceHeader}>
                <div className={styles.emojiLarge}>{device.emoji}</div>
                <h3 className={styles.deviceName}>{device.name}</h3>
                <span className={`era-badge era-${device.era}`}>
                  {device.era?.toUpperCase()}
                </span>
              </div>

              <div className={styles.statsSection}>
                {categories.map(cat => (
                  <div key={cat.key} className={styles.statRow}>
                    <div className={styles.statLabel}>{cat.label}</div>
                    <div className={styles.statValue}>
                      {cat.format((device as any)[cat.key])}
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.specsSection}>
                <h4 className={styles.specsTitle}>Thông số</h4>
                {device.specifications && Object.keys(device.specifications).length > 0 ? (
                  Object.entries(device.specifications).map(([key, value]) => (
                    <div key={key} className={styles.specItem}>
                      <span className={styles.specKey}>{key}:</span>
                      <span className={styles.specValue}>{value}</span>
                    </div>
                  ))
                ) : (
                  <p className={styles.noSpecs}>Không có thông số</p>
                )}
              </div>

              {device.price?.original && (
                <div className={styles.priceSection}>
                  <div className={styles.priceRow}>
                    <span>Giá gốc:</span>
                    <span className={styles.priceOriginal}>
                      ${device.price.original.toLocaleString()}
                    </span>
                  </div>
                  {device.price.vintageValue && (
                    <div className={styles.priceRow}>
                      <span>Giá vintage:</span>
                      <span className={styles.priceVintage}>
                        ${device.price.vintageValue.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={styles.winner}>
          <div className={styles.winnerBadge}>
            <FaCheck /> Phổ biến nhất
          </div>
          <div className={styles.winnerDevice}>
            {comparedDevices.reduce((prev, current) => 
              (prev.likes + prev.views) > (current.likes + current.views) ? prev : current
            ).name}
          </div>
        </div>
      </div>
    </div>
  );
}
