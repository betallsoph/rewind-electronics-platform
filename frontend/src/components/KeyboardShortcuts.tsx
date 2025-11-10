'use client';

import { useState } from 'react';
import styles from './KeyboardShortcuts.module.css';
import { FaKeyboard, FaTimes } from 'react-icons/fa';

export default function KeyboardShortcuts() {
  const [show, setShow] = useState(false);

  const shortcuts = [
    { key: '/', desc: 'Focus vào tìm kiếm' },
    { key: 'G', desc: 'Chế độ Grid' },
    { key: 'T', desc: 'Chế độ Timeline 3D' },
    { key: 'M', desc: 'Chế độ Ký ức' },
    { key: 'A', desc: 'Chế độ Thành tích' },
    { key: 'C', desc: 'Bật/tắt So sánh' },
    { key: 'ESC', desc: 'Đóng modal' },
  ];

  return (
    <>
      <button 
        className={styles.trigger}
        onClick={() => setShow(!show)}
        title="Keyboard Shortcuts"
      >
        <FaKeyboard />
      </button>

      {show && (
        <div className={styles.modal} onClick={() => setShow(false)}>
          <div className={styles.content} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setShow(false)}>
              <FaTimes />
            </button>
            
            <h2 className={styles.title}>⌨️ Phím tắt</h2>
            
            <div className={styles.shortcuts}>
              {shortcuts.map((shortcut, index) => (
                <div key={index} className={styles.shortcut}>
                  <kbd className={styles.key}>{shortcut.key}</kbd>
                  <span className={styles.desc}>{shortcut.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
