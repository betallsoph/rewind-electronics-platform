'use client';

import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className="container">
        <h1 className={styles.logo}>
          <span className={styles.icon}>📱</span>
          Hoài Niệm Thiết Bị Điện Tử
        </h1>
        <p className={styles.tagline}>Những kỷ niệm về công nghệ xưa và nay</p>
      </div>
    </header>
  );
}
