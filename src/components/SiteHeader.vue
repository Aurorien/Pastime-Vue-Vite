<template>
  <h1 class="mb-6" role="banner">{{ logo }}</h1>
</template>

<script>
  export default {
    props: {
      logo: {
        type: String,
        required: true
      }
    }
  }
</script>

<style scoped lang="scss">
  // @import '../../assets/main.scss';

  h1 {
    background-color: rgb(216, 239, 248);
    color: $third;
    font-weight: $font-weight-bolder;
  }
</style>
