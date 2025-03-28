import { createRouter, createWebHashHistory } from "vue-router"

import StartView from "./views/StartView.vue"
import SoundView from "./views/SoundView.vue"
import JokeView from "./views/JokeView.vue"

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      component: StartView,
      path: "/"
    },
    {
      component: SoundView,
      path: "/sound"
    },
    {
      component: JokeView,
      path: "/jokes/:theme"
    }
  ]
})
