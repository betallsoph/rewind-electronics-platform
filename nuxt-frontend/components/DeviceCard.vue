<template>
  <IonCard class="device-card glass-panel">
    <div class="device-thumb">
      <img :src="device.media.thumbnail" :alt="device.name" loading="lazy" />
      <div class="rarity" :data-tier="device.rarity">{{ device.rarity }}</div>
    </div>
    <div class="device-body">
      <header>
        <h3>{{ device.name }}</h3>
        <p>{{ device.manufacturer }} · {{ device.releaseYear }}</p>
      </header>
      <div class="highlights">
        <span v-for="item in device.highlights" :key="item">{{ item }}</span>
      </div>
      <dl class="stats">
        <div>
          <dt>Lượt xem</dt>
          <dd>{{ device.stats.views.toLocaleString() }}</dd>
        </div>
        <div>
          <dt>Lượt yêu thích</dt>
          <dd>{{ device.stats.likes.toLocaleString() }}</dd>
        </div>
        <div>
          <dt>Upvotes</dt>
          <dd>{{ device.stats.upvotes.toLocaleString() }}</dd>
        </div>
      </dl>
      <div class="actions">
        <IonButton fill="outline" color="light" shape="round" size="small" @click="$emit('compare', device.id)">
          <IonIcon slot="start" name="hardware-chip-outline" />
          So sánh
        </IonButton>
        <IonButton fill="clear" color="light" shape="round" size="small" @click="$emit('details', device.id)">
          Chi tiết
        </IonButton>
      </div>
    </div>
  </IonCard>
</template>

<script setup lang="ts">
import { IonCard, IonButton, IonIcon } from '@ionic/vue'
import type { Device } from '@/types'

defineProps<{ device: Device }>()
</script>

<style scoped>
.device-card {
  display: grid;
  gap: 16px;
  background: rgba(15, 23, 42, 0.55);
  border-radius: 24px;
  padding: 0;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.device-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 30px 60px rgba(15, 23, 42, 0.45);
}

.device-thumb {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
}

.device-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(1.05);
}

.rarity {
  position: absolute;
  top: 16px;
  right: 16px;
  padding: 6px 14px;
  border-radius: 999px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.7rem;
  font-weight: 600;
  background: rgba(15, 23, 42, 0.65);
}

.rarity[data-tier='rare'] {
  background: rgba(236, 72, 153, 0.35);
  color: #fdf2f8;
}

.rarity[data-tier='uncommon'] {
  background: rgba(59, 130, 246, 0.35);
  color: #eff6ff;
}

.rarity[data-tier='common'] {
  background: rgba(148, 163, 184, 0.35);
  color: #f8fafc;
}

.device-body {
  display: grid;
  gap: 14px;
  padding: 0 24px 24px;
}

.device-body header h3 {
  font-size: 1.25rem;
  margin-bottom: 4px;
}

.device-body header p {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.highlights span {
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(99, 102, 241, 0.18);
  font-size: 0.8rem;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.stats dt {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-secondary);
}

.stats dd {
  font-weight: 600;
}

.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
