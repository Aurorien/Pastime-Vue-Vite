<template>
  <h1>
    <slot />
  </h1>
</template>

<script>
  export default {
    name: 'ViewTitle'
  }
</script>

<style scoped lang="scss">
  h1 {
    padding: map-get($spacers, 6) map-get($spacers, 4) map-get($spacers, 5)
      map-get($spacers, 4);
  }
</style>
