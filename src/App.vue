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
  h1 {
    padding: $spacer map-get($spacers, 4);
    margin-bottom: 0;
  }
</style>
