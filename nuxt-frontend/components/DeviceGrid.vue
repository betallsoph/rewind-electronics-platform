<template>
  <section class="glass-panel" ref="gridEl">
    <header class="section-header">
      <div class="section-title">
        <IonIcon name="hardware-chip-outline" />
        <div>
          <h2>Bộ sưu tập thiết bị</h2>
          <p>Chọn một thiết bị để xem chi tiết hoặc so sánh</p>
        </div>
      </div>
      <div class="filters">
        <IonInput
          v-model="search"
          placeholder="Tìm theo tên, mô tả"
          color="light"
          clear-input
          @ionInput="handleFilter"
        >
          <IonIcon slot="start" name="search-outline" />
        </IonInput>
        <div class="chip-set">
          <button
            v-for="option in rarityOptions"
            :key="option.value"
            class="chip"
            :class="{ active: rarity.includes(option.value) }"
            @click="toggleRarity(option.value)"
          >
            {{ option.label }}
          </button>
        </div>
      </div>
    </header>
    <div class="grid-auto-fit">
      <DeviceCard
        v-for="device in filteredDevices"
        :key="device.id"
        :device="device"
        @compare="$emit('compare', $event)"
        @details="$emit('details', $event)"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { IonIcon, IonInput } from '@ionic/vue'
import { computed, nextTick, ref, watch } from 'vue'
import type { Device } from '@/types'

const props = defineProps<{ devices: Device[] }>()
const emits = defineEmits<{ (event: 'compare', id: string): void; (event: 'details', id: string): void; (event: 'filter-change', payload: { search: string; rarity: string[] }): void }>()

const search = ref('')
const rarity = ref<string[]>([])
const gridEl = ref<HTMLElement | null>(null)

const rarityOptions = [
  { label: 'Tất cả', value: 'all' },
  { label: 'Common', value: 'common' },
  { label: 'Uncommon', value: 'uncommon' },
  { label: 'Rare', value: 'rare' }
]

const filteredDevices = computed(() => {
  if (rarity.value.includes('all')) {
    return props.devices
  }
  if (!rarity.value.length) {
    return props.devices
  }
  return props.devices.filter((device) => rarity.value.includes(device.rarity.toLowerCase()))
})

function handleFilter() {
  emits('filter-change', { search: search.value, rarity: rarity.value })
}

function toggleRarity(value: string) {
  if (value === 'all') {
    rarity.value = ['all']
  } else {
    rarity.value = rarity.value.includes(value)
      ? rarity.value.filter((item) => item !== value)
      : [...rarity.value.filter((item) => item !== 'all'), value]
  }
  handleFilter()
}

watch(
  () => props.devices,
  async () => {
    await nextTick()
    gridEl.value?.scrollTo({ top: 0, behavior: 'smooth' })
  }
)
</script>

<style scoped>
.section-header {
  display: grid;
  gap: 20px;
  margin-bottom: 20px;
}

.section-header p {
  color: var(--text-secondary);
  margin-top: 4px;
}

.filters {
  display: grid;
  gap: 16px;
}

ion-input::part(native) {
  background: rgba(15, 23, 42, 0.6);
  border-radius: 16px;
  padding: 12px 18px;
  color: var(--text-primary);
}

ion-input::part(icon) {
  color: var(--text-secondary);
  margin-right: 8px;
}

@media (max-width: 768px) {
  .section-header {
    gap: 14px;
  }
}
</style>
