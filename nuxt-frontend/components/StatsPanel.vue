<template>
  <section class="glass-panel stats-panel">
    <div class="section-title">
      <IonIcon name="trophy-outline" />
      <div>
        <h2>Thành tích & số liệu</h2>
        <p>Cập nhật nhanh những chỉ số nổi bật của cộng đồng</p>
      </div>
    </div>
    <div class="stats-grid">
      <div class="stat">
        <span class="label">Tổng thiết bị</span>
        <strong>{{ dashboard.summary.totalDevices }}</strong>
      </div>
      <div class="stat">
        <span class="label">Ký ức chia sẻ</span>
        <strong>{{ dashboard.summary.totalMemories }}</strong>
      </div>
      <div class="stat">
        <span class="label">Thập kỷ nổi bật</span>
        <div class="chips">
          <span v-for="year in dashboard.summary.recentYears" :key="year" class="chip">{{ year }}</span>
        </div>
      </div>
    </div>
    <div class="highlight">
      <h3>Thiết bị nổi bật</h3>
      <div class="grid-auto-fit">
        <div v-for="device in dashboard.highlights.trending" :key="device.id" class="trend-card">
          <header>
            <span class="badge">
              <IonIcon name="flame-outline" />
              Trending
            </span>
            <strong>{{ device.name }}</strong>
          </header>
          <p>{{ device.manufacturer }} · {{ device.releaseYear }}</p>
          <div class="chips">
            <span v-for="spec in device.highlights" :key="spec" class="chip">{{ spec }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { IonIcon } from '@ionic/vue'
import type { DashboardResponse } from '@/types'

defineProps<{ dashboard: DashboardResponse }>()
</script>

<style scoped>
.stats-panel {
  display: grid;
  gap: 24px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.stat {
  padding: 18px;
  border-radius: 18px;
  background: rgba(15, 23, 42, 0.55);
  border: 1px solid rgba(148, 163, 184, 0.12);
  display: grid;
  gap: 10px;
}

.label {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-secondary);
}

strong {
  font-size: 1.6rem;
}

.highlight h3 {
  margin-bottom: 12px;
}

.trend-card {
  padding: 16px;
  border-radius: 16px;
  background: rgba(79, 70, 229, 0.15);
  border: 1px solid rgba(99, 102, 241, 0.2);
  display: grid;
  gap: 10px;
}

.trend-card p {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
