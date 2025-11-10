import { IonicVue } from '@ionic/vue'
import { addIcons } from 'ionicons'
import {
  hardwareChipOutline,
  timeOutline,
  sparklesOutline,
  albumsOutline,
  rocketOutline,
  trophyOutline,
  searchOutline,
  funnelOutline,
  flameOutline,
  flashOutline
} from 'ionicons/icons'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(IonicVue)
  addIcons({
    hardwareChipOutline,
    timeOutline,
    sparklesOutline,
    albumsOutline,
    rocketOutline,
    trophyOutline,
    searchOutline,
    funnelOutline,
    flameOutline,
    flashOutline
  })
})
