'use client';

import type { Category } from '@/types';
import styles from './Navigation.module.css';

interface NavigationProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function Navigation({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}: NavigationProps) {
  return (
    <nav className={styles.nav}>
      <div className="container">
        <div className={styles.buttonGroup}>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`${styles.navBtn} ${selectedCategory === category.id ? styles.active : ''}`}
              onClick={() => onCategoryChange(category.id)}
            >
              <span className={styles.emoji}>{category.emoji}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
