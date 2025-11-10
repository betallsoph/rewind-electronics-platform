<template>
  <section class="glass-panel achievements">
    <div class="section-title">
      <IonIcon name="trophy-outline" />
      <div>
        <h2>Thành tựu cộng đồng</h2>
        <p>Thu thập huy hiệu bằng cách khám phá và chia sẻ ký ức</p>
      </div>
    </div>
    <div class="achievement-grid">
      <article v-for="achievement in achievements" :key="achievement.id" class="achievement-card">
        <header>
          <span class="badge">{{ achievement.tier }}</span>
          <h3>{{ achievement.name }}</h3>
        </header>
        <p>{{ achievement.description }}</p>
        <footer>{{ achievement.criteria }}</footer>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { IonIcon } from '@ionic/vue'
import type { Achievement } from '@/types'

defineProps<{ achievements: Achievement[] }>()
</script>

<style scoped>
.achievement-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 18px;
}

.achievement-card {
  padding: 18px;
  border-radius: 18px;
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(99, 102, 241, 0.2);
  display: grid;
  gap: 12px;
}

.achievement-card p {
  color: var(--text-secondary);
}

footer {
  font-size: 0.85rem;
  color: rgba(165, 180, 252, 0.9);
}
</style>
