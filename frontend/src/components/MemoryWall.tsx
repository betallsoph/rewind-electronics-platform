'use client';

import { useState, useEffect } from 'react';
import styles from './MemoryWall.module.css';
import { FaHeart, FaUser, FaMapMarkerAlt, FaCalendar } from 'react-icons/fa';
import { useToast } from '@/contexts/ToastContext';
import axios from 'axios';

interface Memory {
  _id: string;
  deviceId: string;
  username: string;
  avatar?: string;
  title: string;
  story: string;
  year?: number;
  location?: string;
  upvotes: number;
  featured: boolean;
  createdAt: string;
}

interface MemoryWallProps {
  deviceId?: string;
}

export default function MemoryWall({ deviceId }: MemoryWallProps) {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    title: '',
    story: '',
    year: new Date().getFullYear(),
    location: ''
  });
  const toast = useToast();

  useEffect(() => {
    fetchMemories();
  }, [deviceId]);

  const fetchMemories = async () => {
    try {
      const params = deviceId ? { deviceId } : { featured: 'true' };
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/memories`, { params });
      setMemories(response.data.data);
    } catch (error) {
      console.error('Error fetching memories:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!deviceId) return;

    setLoading(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/memories`, {
        ...formData,
        deviceId
      });
      setShowForm(false);
      setFormData({ username: '', title: '', story: '', year: new Date().getFullYear(), location: '' });
      fetchMemories();
      toast.success('Chia sẻ ký ức thành công! 💭');
    } catch (error) {
      console.error('Error creating memory:', error);
      toast.error('Không thể chia sẻ ký ức');
    } finally {
      setLoading(false);
    }
  };

  const handleUpvote = async (memoryId: string) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/memories/${memoryId}/upvote`);
      fetchMemories();
      toast.success('Đã upvote! 👍');
    } catch (error) {
      console.error('Error upvoting:', error);
      toast.error('Không thể upvote');
    }
  };

  return (
    <div className={styles.memoryWall}>
      <div className={styles.header}>
        <h2 className="text-gradient">🏛️ Bức Tường Ký Ức</h2>
        {deviceId && (
          <button 
            className="btn-neon"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Hủy' : '+ Thêm Ký Ức'}
          </button>
        )}
      </div>

      {showForm && (
        <form className={styles.memoryForm} onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <input
              type="text"
              placeholder="Tên của bạn"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
              maxLength={50}
            />
            <input
              type="number"
              placeholder="Năm"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
              min={1900}
              max={new Date().getFullYear()}
            />
          </div>
          <input
            type="text"
            placeholder="Tiêu đề ký ức"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            maxLength={100}
          />
          <input
            type="text"
            placeholder="Địa điểm (tùy chọn)"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            maxLength={100}
          />
          <textarea
            placeholder="Chia sẻ câu chuyện của bạn..."
            value={formData.story}
            onChange={(e) => setFormData({ ...formData, story: e.target.value })}
            required
            maxLength={2000}
            rows={6}
          />
          <button type="submit" className="btn-neon" disabled={loading}>
            {loading ? 'Đang gửi...' : 'Chia Sẻ Ký Ức'}
          </button>
        </form>
      )}

      <div className={styles.memoriesGrid}>
        {memories.map((memory, index) => (
          <div 
            key={memory._id} 
            className={`${styles.memoryCard} ${memory.featured ? styles.featured : ''} fade-in`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {memory.featured && (
              <div className={styles.featuredBadge}>⭐ Nổi bật</div>
            )}

            <div className={styles.memoryHeader}>
              <div className={styles.userInfo}>
                <div className={styles.avatar}>
                  <FaUser />
                </div>
                <div>
                  <div className={styles.username}>{memory.username}</div>
                  <div className={styles.metadata}>
                    {memory.year && (
                      <span><FaCalendar /> {memory.year}</span>
                    )}
                    {memory.location && (
                      <span><FaMapMarkerAlt /> {memory.location}</span>
                    )}
                  </div>
                </div>
              </div>

              <button 
                className={styles.upvoteBtn}
                onClick={() => handleUpvote(memory._id)}
              >
                <FaHeart /> {memory.upvotes}
              </button>
            </div>

            <h3 className={styles.memoryTitle}>{memory.title}</h3>
            <p className={styles.memoryStory}>{memory.story}</p>

            <div className={styles.memoryFooter}>
              <span className={styles.date}>
                {new Date(memory.createdAt).toLocaleDateString('vi-VN')}
              </span>
            </div>
          </div>
        ))}
      </div>

      {memories.length === 0 && (
        <div className={styles.emptyState}>
          <p>Chưa có ký ức nào. Hãy là người đầu tiên chia sẻ!</p>
        </div>
      )}
    </div>
  );
}
