<style scoped lang="scss">
  // @import '../../assets/main.scss';

  h1 {
    background-color: rgb(185, 235, 255);
    // color: $primary;
    // color: $secondary;
    color: $third;
    font-weight: $font-weight-bolder;
  }
</style>

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

<template>
  <h1 class="mb-6">{{ logo }}</h1>
</template>
