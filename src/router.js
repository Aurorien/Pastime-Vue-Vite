// länkhanterare

import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from './views/HomeView.vue'
import SoundView from './views/SoundView.vue'
import QuoteView from './views/QuoteView.vue'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      component: HomeView,
      path: '/'
    },
    {
      component: SoundView,
      path: '/sound'
    },
    {
      component: QuoteView,
      path: '/quotes/:theme'
    }
  ]
})
