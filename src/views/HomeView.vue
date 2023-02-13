<style scoped lang="scss">
  // @import '../../assets/main.scss';

  h1 {
    margin: $spacer * 1.2;
  }
  label {
    margin: $spacer;
  }
</style>

<script>
  import SoundButton from '../components/SoundButton.vue'
  export default {
    // ref: https://vuex.vuejs.org/guide/forms.html#two-way-computed-property
    computed: {
      name: {
        get() {
          return this.$store.state.name
        },
        set(value) {
          this.$store.commit('updateName', value)
        }
      }
    },
    components: {
      SoundButton
    }
  }
</script>

<template>
  <div class="d-flex flex-column align-items-center">
    <h1>Welcome!</h1>
    <label for="name-input">Input your name here:</label>
    <input v-model="name" id="name-input" type="text" />
    <!-- ref: https://codingbeautydev.com/blog/vue-router-link-button/ -->
    <router-link to="/quotes/programming" custom v-slot="{ navigate }">
      <SoundButton @click="navigate" role="link">Start</SoundButton>
    </router-link>
  </div>
</template>
