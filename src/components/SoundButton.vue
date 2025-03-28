<template>
  <button
    v-bind="$attrs"
    @click="playSound"
    :style="cssProps"
  >
    <slot>Play blipp</slot>
  </button>
  <audio ref="soundEffect" volume="0" />
</template>

<script>
  import axios from 'axios'
  export default {
    computed: {
      cssProps() {
        return {
          '--button-padding': this.buttonPadding,
          '--button-margin': this.buttonMargin
        }
      }
    },
    methods: {
      async playSound() {
        if (!this.soundUrl) {
          // doc: https://freesound.org/apiv2/
          // name: "8-bit pickup sound", license: "http://creativecommons.org/publicdomain/zero/1.0/"
          const response = await axios.get(
            'https://freesound.org/apiv2/sounds/368492/?token=***REMOVED***'
          )
          console.log('LJUDDATA', response.data)

          this.soundUrl = response.data.previews['preview-hq-mp3']
        }
        this.$refs.soundEffect.volume = 0.03
        this.$refs.soundEffect.src = this.soundUrl
        this.$refs.soundEffect.play()
      }
    },
    props: {
      buttonPadding: {
        type: String,
        default: null
      },
      buttonMargin: {
        type: String,
        default: null
      }
    }
  }
</script>

<style scoped lang="scss">
  button {
    padding: var(--button-padding);
    margin: var(--button-margin);
    height: fit-content;
    text-wrap: nowrap;
    font-size: .8rem;
    border-style: groove;
    border-width: 1px;
    border-color: rgb(185, 185, 185);
    color: rgb(50, 50, 50);
  }
</style>
