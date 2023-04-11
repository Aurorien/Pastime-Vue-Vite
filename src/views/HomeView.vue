<template>
  <div class="d-flex flex-column align-items-center">
    <h1>Welcome!</h1>
    <label for="name-input">Input your name here:</label>
    <input v-model="name" id="name-input" type="text" />
    <!-- ref: https://codingbeautydev.com/blog/vue-router-link-button/
    <RouterLink to="/quotes/programming" custom v-slot="{ navigate }">
      <SoundButton @click="navigate" role="link">Start</SoundButton>
    </RouterLink> -->

    <!-- :style="buttonStyle" -->

    <!-- programmatic navigation (instead of the v-slot-version above): -->
    <SoundButton
      id="runaway-btn"
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
        const styles = {
          position: 'absolute',
          top: `${this.position.top}%`,
          left: `${this.position.left}%`
        }

        if (window.matchMedia('(min-width: 980px)').matches) {
          styles.top = `${this.position.top + 4}%`
          styles.left = `${this.position.left + 7.5}%`
        }

        return styles
      }
    },
    components: {
      SoundButton
    },
    data() {
      return {
        position: {
          top: 55,
          left: 40
        }
      }
    },
    methods: {
      navigate() {
        if (this.name === '') {
          this.onRunawayButton()
        } else {
          this.$router.push('/quotes/programming')
        }
      },

      onRunawayButton() {
        if (this.name === '') {
          if (window.matchMedia('(min-width: 980px)').matches) {
            if (this.position.left === 38.2 || this.position.left === 40) {
              this.position.left = 42.7
            } else if (
              this.position.left === 42.7 ||
              this.position.left === 40
            ) {
              this.position.left = 38.2
            }
          } else {
            if (this.position.left === 30 || this.position.left === 40) {
              this.position.left = 50
            } else if (this.position.left === 50 || this.position.left === 40) {
              this.position.left = 30
            }
          }
        }
      }
    },
    watch: {
      name() {
        if (this.name !== '') {
          this.position.left = 40
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  // @import '../../assets/main.scss';

  h1 {
    margin: $spacer * 1.2;
    margin-top: map-get($spacers, 7);
  }

  label {
    margin: $spacer;
  }
</style>
