'use client';

import { useEffect, useState } from 'react';
import styles from './AchievementDisplay.module.css';
import { FaTrophy, FaStar, FaMedal } from 'react-icons/fa';
import axios from 'axios';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string;
}

interface UserAchievements {
  username: string;
  achievements: Achievement[];
  level: number;
  xp: number;
  stats: {
    devicesViewed: number;
    devicesLiked: number;
    memoriesShared: number;
    collectionsCreated: number;
  };
}

interface AchievementDisplayProps {
  username: string;
  mini?: boolean;
}

export default function AchievementDisplay({ username, mini = false }: AchievementDisplayProps) {
  const [data, setData] = useState<UserAchievements | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchAchievements();
  }, [username]);

  const fetchAchievements = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/achievements/${username}`);
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching achievements:', error);
    }
  };

  if (!data) return null;

  const nextLevelXP = data.level * 1000;
  const progressPercent = (data.xp % 1000) / 10;

  if (mini) {
    return (
      <div className={styles.miniDisplay}>
        <div className={styles.levelBadge}>
          <FaMedal /> Level {data.level}
        </div>
        <div className={styles.xpBar}>
          <div 
            className={styles.xpFill}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className={styles.achievementCount}>
          🏆 {data.achievements.length} Thành tích
        </div>
      </div>
    );
  }

  return (
    <div className={styles.achievementPanel}>
      <div className={styles.header}>
        <h2 className="text-gradient">
          <FaTrophy /> Thành Tích
        </h2>
      </div>

      <div className={styles.levelCard}>
        <div className={styles.levelInfo}>
          <div className={styles.levelNumber}>
            <FaStar /> Level {data.level}
          </div>
          <div className={styles.xpInfo}>
            {data.xp % 1000} / 1000 XP
          </div>
        </div>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{data.stats.devicesViewed}</div>
          <div className={styles.statLabel}>Thiết bị đã xem</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{data.stats.devicesLiked}</div>
          <div className={styles.statLabel}>Thiết bị đã thích</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{data.stats.memoriesShared}</div>
          <div className={styles.statLabel}>Ký ức chia sẻ</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{data.stats.collectionsCreated}</div>
          <div className={styles.statLabel}>Bộ sưu tập</div>
        </div>
      </div>

      <div className={styles.achievementsSection}>
        <h3>Huy Hiệu ({data.achievements.length})</h3>
        <div className={styles.achievementsGrid}>
          {data.achievements
            .slice(0, showAll ? undefined : 6)
            .map((achievement, index) => (
              <div 
                key={achievement.id} 
                className={`${styles.achievementBadge} scale-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={styles.badgeIcon}>{achievement.icon}</div>
                <div className={styles.badgeName}>{achievement.name}</div>
                <div className={styles.badgeDesc}>{achievement.description}</div>
                <div className={styles.unlockedDate}>
                  {new Date(achievement.unlockedAt).toLocaleDateString('vi-VN')}
                </div>
              </div>
            ))}
        </div>

        {data.achievements.length > 6 && (
          <button 
            className={styles.showMoreBtn}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Thu gọn' : `Xem thêm ${data.achievements.length - 6}`}
          </button>
        )}
      </div>
    </div>
  );
}
