<!-- components (ej router-components): det som syns på alla sidor -->

<template>
  <RouterLink to="/" />
  <main>
    <SiteHeader logo="Pastime" />
    <RouterView @punchlinefx="onPunchlineFX" />
  </main>
</template>

<script>
  import SiteHeader from './components/SiteHeader.vue'

  export default {
    components: {
      SiteHeader
    },
    data() {
      return { soundUrl: '' }
    },
    methods: {
      onPunchlineFX() {
        console.log('the punchlinefx-emit has landed')
      }
    }
  }
</script>

<style lang="scss">
  // @import '../assets/main.scss';

  main {
    padding: $spacer;
  }
</style>
