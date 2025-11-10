'use client';

import { useEffect } from 'react';
import styles from './Toast.module.css';
import { FaCheck, FaExclamationTriangle, FaInfoCircle, FaTimes } from 'react-icons/fa';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  message: string;
  type: ToastType;
  duration?: number;
  onClose: () => void;
}

export default function Toast({ message, type, duration = 3000, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <FaCheck />,
    error: <FaTimes />,
    info: <FaInfoCircle />,
    warning: <FaExclamationTriangle />,
  };

  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      <span className={styles.icon}>{icons[type]}</span>
      <span className={styles.message}>{message}</span>
      <button className={styles.closeBtn} onClick={onClose}>
        <FaTimes />
      </button>
    </div>
  );
}
