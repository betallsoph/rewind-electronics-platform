'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload, FiX, FiImage } from 'react-icons/fi';
import styles from './ImageUpload.module.css';

interface ImageUploadProps {
  onImageSelected: (file: File) => void;
  currentImage?: string | null;
  onImageRemove?: () => void;
  maxSize?: number; // in MB
  accept?: string;
}

export default function ImageUpload({
  onImageSelected,
  currentImage,
  onImageRemove,
  maxSize = 5,
  accept = 'image/jpeg,image/jpg,image/png,image/gif,image/webp'
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    setError(null);

    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0];
      if (rejection.errors[0]?.code === 'file-too-large') {
        setError(`File quá lớn. Tối đa ${maxSize}MB`);
      } else if (rejection.errors[0]?.code === 'file-invalid-type') {
        setError('File không hợp lệ. Chỉ chấp nhận ảnh JPEG, PNG, GIF, WebP');
      } else {
        setError('Có lỗi xảy ra khi upload file');
      }
      return;
    }

    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Pass file to parent
      onImageSelected(file);
    }
  }, [onImageSelected, maxSize]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept.split(',').reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxSize: maxSize * 1024 * 1024,
    multiple: false,
  });

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    setError(null);
    if (onImageRemove) {
      onImageRemove();
    }
  };

  return (
    <div className={styles.container}>
      <div
        {...getRootProps()}
        className={`${styles.dropzone} ${isDragActive ? styles.active : ''} ${preview ? styles.hasImage : ''}`}
      >
        <input {...getInputProps()} />
        
        {preview ? (
          <div className={styles.preview}>
            <img src={preview} alt="Preview" />
            <button
              type="button"
              className={styles.removeBtn}
              onClick={handleRemove}
              title="Xóa ảnh"
            >
              <FiX />
            </button>
          </div>
        ) : (
          <div className={styles.placeholder}>
            <FiUpload className={styles.icon} />
            <p className={styles.mainText}>
              {isDragActive ? 'Thả ảnh vào đây...' : 'Kéo thả ảnh hoặc click để chọn'}
            </p>
            <p className={styles.subText}>
              JPEG, PNG, GIF, WebP • Tối đa {maxSize}MB
            </p>
          </div>
        )}
      </div>

      {error && (
        <div className={styles.error}>
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
