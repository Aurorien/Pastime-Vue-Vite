<template>
  <div class="d-flex flex-column align-items-center">
    <h1>Welcome!</h1>
    <label for="name-input">Input your name here:</label>
    <input v-model="name" id="name-input" type="text" />
    <!-- ref: https://codingbeautydev.com/blog/vue-router-link-button/
    <RouterLink to="/jokes/programming" custom v-slot="{ navigate }">
      <SoundButton @click="navigate" role="link">Start</SoundButton>
    </RouterLink> -->

    <!-- programmatic navigation (instead of the v-slot-version above): -->
    <div id="button-container">
      <SoundButton
        @click="navigate"
        @mouseover="onRunawayButton"
        :style="buttonStyle"
        button-padding="6px 12px"
      >
        Start
      </SoundButton>
    </div>
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
          left: `${this.left}%`
        }
      }
      //Interesting code of how you can reach media queries in javascript (though I'm not using it because there was a more effective way in this case to deal with the responsitivity with a div-container and flexbox):
      // buttonStyle() {
      //   const styles = {
      //     position: 'absolute',
      //     left: `${this.left}%`
      //   }

      //   if (window.matchMedia('(min-width: 980px)').matches) {
      //     styles.left = `${this.left + 7.5}%`
      //   }

      //   return styles
      // }
    },

    components: {
      SoundButton
    },

    data() {
      return {
        left: 25
      }
    },

    methods: {
      navigate() {
        if (this.name === '') {
          this.onRunawayButton()
        } else {
          this.$router.push('/jokes/programming')
        }
      },
      onRunawayButton() {
        if (this.name === '') {
          if (this.left === 0 || this.left === 25) {
            this.left = 52
          } else if (this.left === 52 || this.left === 25) {
            this.left = 0
          }
        }
      }
    },
    watch: {
      name() {
        if (this.name !== '') {
          this.left = 25
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  h1 {
    margin: $spacer * 1.2;
    margin-top: map-get($spacers, 8);
  }

  label {
    margin: $spacer;
  }

  #button-container {
    position: relative;
    width: 130px;
    margin-top: 25px;
  }
</style>
