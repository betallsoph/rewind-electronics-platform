<template>
  <IonModal :is-open="open" @didDismiss="$emit('close')" class="comparison-modal">
    <div class="modal-content glass-panel">
      <header>
        <div class="section-title">
          <IonIcon name="hardware-chip-outline" />
          <div>
            <h2>So sánh thiết bị</h2>
            <p>Các thông số chính được đặt cạnh nhau để bạn lựa chọn</p>
          </div>
        </div>
        <IonButton fill="clear" color="light" @click="$emit('close')">Đóng</IonButton>
      </header>
      <div class="comparison-grid">
        <article v-for="device in devices" :key="device.id" class="comparison-card">
          <h3>{{ device.name }}</h3>
          <p>{{ device.manufacturer }} · {{ device.releaseYear }}</p>
          <dl>
            <div v-for="(value, key) in device.specifications" :key="key">
              <dt>{{ key }}</dt>
              <dd>{{ value }}</dd>
            </div>
          </dl>
          <div class="price-history">
            <h4>Giá tham khảo</h4>
            <ul>
              <li v-for="point in device.priceHistory" :key="point.year">
                <span>{{ point.year }}</span>
                <strong>{{ formatPrice(point.price) }}</strong>
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  </IonModal>
</template>

<script setup lang="ts">
import { IonModal, IonButton, IonIcon } from '@ionic/vue'
import type { Device } from '@/types'

const props = defineProps<{ open: boolean; devices: Device[] }>()

defineEmits<{ (event: 'close'): void }>()

function formatPrice(value: number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
}
</script>

<style scoped>
.comparison-modal {
  --width: min(960px, 92vw);
  --height: min(90vh, 900px);
}

.modal-content {
  height: 100%;
  display: grid;
  gap: 20px;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.comparison-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 18px;
  overflow-y: auto;
  padding-right: 10px;
}

.comparison-card {
  padding: 18px;
  border-radius: 18px;
  background: rgba(15, 23, 42, 0.55);
  border: 1px solid rgba(148, 163, 184, 0.16);
  display: grid;
  gap: 12px;
}

.comparison-card p {
  color: var(--text-secondary);
}

dl {
  display: grid;
  gap: 8px;
}

dl div {
  display: grid;
  gap: 2px;
}

dl dt {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(148, 163, 184, 0.9);
}

.price-history {
  margin-top: 10px;
}

.price-history ul {
  display: grid;
  gap: 6px;
}

.price-history li {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
}
</style>
