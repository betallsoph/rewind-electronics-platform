'use client';

import { useRef, useEffect, useState } from 'react';
import type { Device } from '@/types';
import styles from './Timeline3D.module.css';

interface Timeline3DProps {
  devices: Device[];
  onDeviceClick: (device: Device) => void;
}

export default function Timeline3D({ devices, onDeviceClick }: Timeline3DProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Group devices by era
  const devicesByEra = devices.reduce((acc, device) => {
    const era = device.era || 'other';
    if (!acc[era]) acc[era] = [];
    acc[era].push(device);
    return acc;
  }, {} as Record<string, Device[]>);

  const eras = ['70s', '80s', '90s', '2000s', '2010s'].filter(era => devicesByEra[era]);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const progress = scrollLeft / (scrollWidth - clientWidth);
      setScrollProgress(progress);
    };

    const scrollEl = scrollRef.current;
    scrollEl?.addEventListener('scroll', handleScroll);

    return () => scrollEl?.removeEventListener('scroll', handleScroll);
  }, []);

  const getEraColor = (era: string) => {
    const colors: Record<string, string> = {
      '70s': '#ff6b35',
      '80s': '#f7b801',
      '90s': '#00d9f5',
      '2000s': '#a855f7',
      '2010s': '#ec4899',
    };
    return colors[era] || '#9ca3af';
  };

  return (
    <div className={styles.timelineContainer}>
      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill} 
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      <div ref={scrollRef} className={styles.timeline}>
        {eras.map((era, eraIndex) => (
          <div key={era} className={styles.eraSection}>
            <div 
              className={styles.eraHeader}
              style={{ 
                background: `linear-gradient(135deg, ${getEraColor(era)}, transparent)` 
              }}
            >
              <h2 className={styles.eraTitle}>
                Thập niên {era.toUpperCase()}
              </h2>
              <div className={styles.eraLine} style={{ background: getEraColor(era) }} />
            </div>

            <div className={styles.devicesRow}>
              {devicesByEra[era]?.map((device, index) => (
                <div
                  key={device._id}
                  className={styles.timelineCard}
                  onClick={() => onDeviceClick(device)}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    transform: `translateZ(${50 - Math.abs(index - 2) * 20}px)`,
                  }}
                >
                  <div className={styles.cardInner}>
                    <div className={styles.cardFront}>
                      <div className={styles.emoji}>{device.emoji}</div>
                      <div className={styles.year}>{device.year}</div>
                      <h3 className={styles.name}>{device.name}</h3>
                      <div className={styles.rarityIndicator}>
                        {'★'.repeat(
                          device.rarity === 'legendary' ? 4 :
                          device.rarity === 'rare' ? 3 :
                          device.rarity === 'uncommon' ? 2 : 1
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.scrollHint}>
        <span>← Kéo sang để xem timeline →</span>
      </div>
    </div>
  );
}
