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
          styles.top = `${this.position.top + 19}%`
          styles.left = `${this.position.left + 5}%`
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
          top: 45,
          left: 41
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
            if (this.position.left === 41 || this.position.left === 41) {
              this.position.left = 45
            } else if (this.position.left === 45 || this.position.left === 41) {
              this.position.left = 41
            }
          } else {
            if (this.position.left === 35 || this.position.left === 41) {
              this.position.left = 51
            } else if (this.position.left === 51 || this.position.left === 41) {
              this.position.left = 35
            }
          }
        }
      }
    },
    watch: {
      name() {
        if (this.name !== '') {
          this.position.left = 41
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
