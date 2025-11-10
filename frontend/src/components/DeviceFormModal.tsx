'use client';

import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import ImageUpload from './ImageUpload';
import styles from './DeviceFormModal.module.css';
import { createDeviceWithImage, updateDeviceWithImage } from '@/lib/upload';
import type { Device } from '@/types';

interface DeviceFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  device?: Device | null;
}

export default function DeviceFormModal({
  isOpen,
  onClose,
  onSuccess,
  device,
}: DeviceFormModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    year: new Date().getFullYear(),
    category: 'phone' as Device['category'],
    emoji: '📱',
    description: '',
    memories: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (device) {
      setFormData({
        name: device.name,
        year: device.year,
        category: device.category,
        emoji: device.emoji,
        description: device.description,
        memories: device.memories,
      });
    } else {
      setFormData({
        name: '',
        year: new Date().getFullYear(),
        category: 'phone',
        emoji: '📱',
        description: '',
        memories: '',
      });
    }
    setImageFile(null);
    setError(null);
  }, [device, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (device?._id) {
        // Update existing device
        await updateDeviceWithImage(device._id, formData, imageFile || undefined);
      } else {
        // Create new device
        await createDeviceWithImage(formData, imageFile || undefined);
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error('Error saving device:', err);
      setError(err.response?.data?.message || 'Có lỗi xảy ra khi lưu thiết bị');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>{device ? 'Chỉnh sửa thiết bị' : 'Thêm thiết bị mới'}</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <FiX />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Ảnh thiết bị</label>
            <ImageUpload
              onImageSelected={setImageFile}
              currentImage={device?.imageUrl || device?.image}
              onImageRemove={() => setImageFile(null)}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Tên thiết bị *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="VD: Nokia 1110"
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Năm *</label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
                min="1900"
                max={new Date().getFullYear()}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Danh mục *</label>
              <select name="category" value={formData.category} onChange={handleChange} required>
                <option value="phone">Điện thoại</option>
                <option value="computer">Máy tính</option>
                <option value="console">Máy chơi game</option>
                <option value="audio">Âm thanh</option>
                <option value="camera">Máy ảnh</option>
                <option value="other">Khác</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Emoji</label>
              <input
                type="text"
                name="emoji"
                value={formData.emoji}
                onChange={handleChange}
                placeholder="📱"
                maxLength={2}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Mô tả ngắn *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Mô tả ngắn gọn về thiết bị..."
              rows={3}
              maxLength={500}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Ký ức *</label>
            <textarea
              name="memories"
              value={formData.memories}
              onChange={handleChange}
              required
              placeholder="Chia sẻ ký ức về thiết bị này..."
              rows={5}
              maxLength={2000}
            />
          </div>

          {error && (
            <div className={styles.error}>
              ⚠️ {error}
            </div>
          )}

          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={styles.cancelBtn} disabled={isSubmitting}>
              Hủy
            </button>
            <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
              {isSubmitting ? 'Đang lưu...' : device ? 'Cập nhật' : 'Thêm mới'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
