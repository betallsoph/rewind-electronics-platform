<template>
  <section class="glass-panel">
    <div class="section-title">
      <IonIcon name="time-outline" />
      <div>
        <h2>Hành trình ký ức</h2>
        <p>Những câu chuyện được cộng đồng chia sẻ theo dòng thời gian</p>
      </div>
    </div>
    <div class="timeline">
      <article v-for="memory in memories" :key="memory.id" class="timeline-item">
        <header>
          <div class="badge">
            <IonIcon name="albums-outline" />
            {{ memory.era }}
          </div>
          <h3>{{ memory.title }}</h3>
          <p class="meta">{{ formatDate(memory.createdAt) }} · {{ memory.author }}</p>
        </header>
        <p class="content">{{ memory.content }}</p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { IonIcon } from '@ionic/vue'
import type { Memory } from '@/types'

const props = defineProps<{ memories: Memory[] }>()

function formatDate(value: string) {
  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(value))
}
</script>

<style scoped>
.meta {
  color: var(--text-secondary);
  font-size: 0.85rem;
}

.content {
  margin-top: 10px;
  color: rgba(226, 232, 240, 0.9);
  line-height: 1.65;
}
</style>
