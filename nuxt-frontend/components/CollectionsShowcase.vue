<template>
  <section class="glass-panel">
    <div class="section-title">
      <IonIcon name="albums-outline" />
      <div>
        <h2>Bộ sưu tập tuyển chọn</h2>
        <p>Gợi ý những chủ đề được cộng đồng yêu thích</p>
      </div>
    </div>
    <div class="collections">
      <article v-for="collection in collections" :key="collection.id" class="collection-card">
        <header>
          <h3>{{ collection.name }}</h3>
          <p>{{ collection.description }}</p>
        </header>
        <footer>
          <IonIcon name="flash-outline" />
          {{ collection.deviceIds.length }} thiết bị
        </footer>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { IonIcon } from '@ionic/vue'
import type { Collection } from '@/types'

defineProps<{ collections: Collection[] }>()
</script>

<style scoped>
.collections {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 18px;
}

.collection-card {
  padding: 18px;
  border-radius: 18px;
  background: rgba(15, 23, 42, 0.55);
  border: 1px solid rgba(148, 163, 184, 0.14);
  display: grid;
  gap: 12px;
}

.collection-card p {
  color: var(--text-secondary);
  line-height: 1.5;
}

footer {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: rgba(226, 232, 240, 0.9);
}

footer ion-icon {
  color: rgba(236, 72, 153, 0.8);
}
</style>
