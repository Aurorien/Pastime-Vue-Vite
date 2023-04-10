<template>
  <div class="d-flex flex-column align-items-center">
    <h1>Welcome!</h1>
    <label for="name-input">Input your name here:</label>
    <input v-model="name" id="name-input" type="text" />
    <!-- ref: https://codingbeautydev.com/blog/vue-router-link-button/
    <RouterLink to="/quotes/programming" custom v-slot="{ navigate }">
      <SoundButton @click="navigate" role="link">Start</SoundButton>
    </RouterLink> -->

    <!-- programmatic navigation (instead of the v-slot-version above): -->
    <SoundButton
      id="runawayButton"
      @click="navigate"
      @mouseover="onRunawayButton"
      :style="buttonStyle"
    >
      Start
    </SoundButton>
  </div>
</template>

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
      },
      buttonStyle() {
        return {
          position: 'absolute',
          top: `${this.position.top}`,
          left: `${this.position.left}`
        }
      }
    },
    components: {
      SoundButton
    },
    data() {
      return {
        position: {
          top: '40%',
          left: '48%'
        }
      }
    },
    methods: {
      navigate() {
        this.$router.push('/quotes/programming')
      },
      onRunawayButton() {
        if (this.name === '') {
          if (this.position.left === '45%' || this.position.left === '48%') {
            this.position.left = '51%'
          } else if (
            this.position.left === '51%' ||
            this.position.left === '48%'
          ) {
            this.position.left = '45%'
          }
        }
      }
    },
    watch: {
      name() {
        if (this.name !== '') {
          this.position.left = '48%'
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  // @import '../../assets/main.scss';

  h1 {
    margin: $spacer * 1.2;
  }

  label {
    margin: $spacer;
  }

  // #runawayButton {
  //   position: absolute;
  //   top: auto;
  //   left: auto;
  // }
</style>
