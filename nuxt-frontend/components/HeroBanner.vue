<template>
  <section class="glass-panel hero">
    <div class="hero-content">
      <div class="badge">
        <IonIcon name="sparkles-outline" />
        Digital nostalgia
      </div>
      <h1>
        Hoài niệm <span>thiết bị điện tử</span> qua từng thời kỳ
      </h1>
      <p>
        Khám phá bộ sưu tập thiết bị huyền thoại, so sánh thông số, tìm lại ký ức và kết nối cộng đồng yêu công nghệ
        retro.
      </p>
      <div class="hero-actions">
        <IonButton shape="round" color="primary" size="large" @click="$emit('explore')">
          <IonIcon slot="start" name="rocket-outline" />
          Khám phá ngay
        </IonButton>
        <IonButton shape="round" fill="clear" color="light" size="large" @click="$emit('timeline')">
          <IonIcon slot="start" name="time-outline" />
          Dòng thời gian ký ức
        </IonButton>
      </div>
      <div class="hero-metrics">
        <div v-for="metric in metrics" :key="metric.label" class="metric">
          <strong>{{ metric.value }}</strong>
          <span>{{ metric.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { IonButton, IonIcon } from '@ionic/vue'

defineProps<{ metrics: { label: string; value: string }[] }>()
</script>

<style scoped>
.hero {
  display: grid;
  gap: 28px;
  position: relative;
  overflow: hidden;
}

.hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 20% 20%, rgba(79, 70, 229, 0.3), transparent 55%),
    radial-gradient(circle at 80% 30%, rgba(236, 72, 153, 0.2), transparent 60%);
  z-index: 0;
}

.hero-content {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 20px;
  max-width: 680px;
}

.hero h1 {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  line-height: 1.1;
}

.hero h1 span {
  color: rgba(236, 72, 153, 0.9);
  text-shadow: 0 0 20px rgba(236, 72, 153, 0.4);
}

.hero p {
  color: var(--text-secondary);
  font-size: 1.05rem;
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
}

.hero-metrics {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-top: 8px;
}

.metric {
  display: grid;
  gap: 4px;
}

.metric strong {
  font-size: 1.6rem;
  letter-spacing: 0.02em;
}

.metric span {
  font-size: 0.85rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

@media (max-width: 768px) {
  .hero-content {
    max-width: 100%;
  }

  .hero-actions {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
