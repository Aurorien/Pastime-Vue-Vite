<!-- eslint-disable vue/attribute-hyphenation -->
 <!-- the above eslint-disable because of noOverlay which is how that prop is supposed to be written -->
<template>
  <div class="position-relative" role="banner">
    <h1 id="banner-title">{{ logo }}</h1>
    <div class="burger" v-if="!isStartView">
      <Slide right width="120" noOverlay>
        <RouterLink to="/">
          Start
        </RouterLink>
        <RouterLink to="/jokes/programming">
          Jokes
        </RouterLink>
        <RouterLink to="/sound">
          Sound
        </RouterLink>
      </Slide>
    </div>
  </div>
</template>

<script>
  import { Slide } from 'vue3-burger-menu';
  import { useRoute } from 'vue-router';
  import { computed } from 'vue';


  export default {
    props: {
      logo: {
        type: String,
        required: true
      }
    },
    components: {
      Slide
    },
    setup() {
      const route = useRoute();

      const isStartView = computed(() => {
        return route.path === '/' || route.path === '';
      });

      return {
        isStartView
      };
    }
  }
</script>

<style scoped lang="scss">
  .burger {
  right: 0;
  }

  :deep(.bm-burger-button) {
    position: absolute;
    width: 21px;
    height: 20px;
    left: auto;
    right: map-get($spacers, 5);
    top: 50%;
    transform: translateY(-50%);
  }

  :deep(.bm-menu) {
    background-color: #3a5746;
  }

  :deep(.bm-burger-bars) {
    background-color: #656565;
  }

  :deep(.bm-cross) {
    background: #9f9f9f;
  }

  #banner-title {
    position: relative;
    background-color: #d8eff8;
    color: $third;
    font-weight: $font-weight-bolder;
  }
</style>
