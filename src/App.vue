<template>
  <RouterLink to="/" />
  <main>
    <SiteHeader logo="Pastime" />
    <RouterView />
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
    }
  }
</script>

<style lang="scss">
  h1 {
    padding: $spacer map-get($spacers, 2);
    margin-bottom: 0;
  }
</style>
