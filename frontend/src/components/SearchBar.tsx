'use client';

import styles from './SearchBar.module.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className={styles.searchBox}>
      <input
        id="searchInput"
        type="text"
        placeholder="🔍 Tìm kiếm thiết bị... (nhấn / để focus)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.searchInput}
      />
    </div>
  );
}
