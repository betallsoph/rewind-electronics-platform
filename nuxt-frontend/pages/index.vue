<template>
  <IonPage>
    <IonContent :fullscreen="true" class="page">
      <div class="page-grid">
        <HeroBanner :metrics="heroMetrics" @explore="scrollToCollection" @timeline="scrollToTimeline" />
        <DeviceGrid
          ref="devicesSection"
          :devices="devices"
          @compare="openComparison"
          @filter-change="handleFilter"
        />
        <StatsPanel v-if="dashboard" :dashboard="dashboard" />
        <CollectionsShowcase v-if="collections.length" :collections="collections" />
        <MemoryTimeline v-if="memories.length" ref="timelineSection" :memories="memories" />
        <AchievementBoard v-if="achievements.length" :achievements="achievements" />
      </div>
      <ComparisonDrawer :open="comparisonOpen" :devices="comparisonDevices" @close="comparisonOpen = false" />
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue'
import { computed, ref } from 'vue'
import HeroBanner from '@/components/HeroBanner.vue'
import DeviceGrid from '@/components/DeviceGrid.vue'
import StatsPanel from '@/components/StatsPanel.vue'
import MemoryTimeline from '@/components/MemoryTimeline.vue'
import CollectionsShowcase from '@/components/CollectionsShowcase.vue'
import AchievementBoard from '@/components/AchievementBoard.vue'
import ComparisonDrawer from '@/components/ComparisonDrawer.vue'
import type { Device } from '@/types'

const api = useApi()

const [initialDevices, dashboard, memories, collections, achievements] = await Promise.all([
  api.listDevices(),
  api.getDashboard(),
  api.listMemories(),
  api.listCollections(),
  api.listAchievements()
])

const devices = ref<Device[]>(initialDevices)
const comparisonDevices = ref<Device[]>([])
const comparisonOpen = ref(false)
const timelineSection = ref<InstanceType<typeof MemoryTimeline> | null>(null)
const devicesSection = ref<InstanceType<typeof DeviceGrid> | null>(null)

const heroMetrics = computed(() => [
  { label: 'Thiết bị lưu trữ', value: dashboard.summary.totalDevices.toString() },
  { label: 'Ký ức cộng đồng', value: dashboard.summary.totalMemories.toString() },
  { label: 'Thập kỷ tiêu biểu', value: dashboard.summary.recentYears.length.toString() }
])

const comparisonDevicesIds = ref<string[]>([])

function scrollToCollection() {
  const element = devicesSection.value?.$el as HTMLElement | undefined
  element?.scrollIntoView({ behavior: 'smooth' })
}

function scrollToTimeline() {
  const element = timelineSection.value?.$el as HTMLElement | undefined
  element?.scrollIntoView({ behavior: 'smooth' })
}

async function handleFilter(payload: { search: string; rarity: string[] }) {
  const params: Record<string, string> = {}
  if (payload.search) params.search = payload.search
  if (payload.rarity.length && !payload.rarity.includes('all')) {
    params.rarity = payload.rarity.join(',')
  }
  devices.value = await api.listDevices(params)
}

async function openComparison(id: string) {
  if (comparisonDevicesIds.value.includes(id)) {
    comparisonDevices.value = comparisonDevices.value.filter((device) => device.id !== id)
    comparisonDevicesIds.value = comparisonDevicesIds.value.filter((item) => item !== id)
  } else {
    comparisonDevicesIds.value.push(id)
    comparisonDevices.value = await api.compareDevices(comparisonDevicesIds.value)
  }
  comparisonOpen.value = comparisonDevices.value.length > 0
}
</script>

<style scoped>
.page {
  --background: transparent;
  padding: 36px clamp(16px, 5vw, 60px) 80px;
}

.page-grid {
  display: grid;
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
