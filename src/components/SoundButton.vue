<template>
  <button v-bind="$attrs" @click="playSound" :style="cssProps">
    <slot>Play blipp</slot>
  </button>
  <audio ref="soundEffect" volume="0" />
</template>

<script>
  import { getSoundPath } from '../utils/paths'

  export default {
    computed: {
      cssProps() {
        return {
          '--button-padding': this.buttonPadding,
          '--button-margin': this.buttonMargin
        }
      }
    },
    data() {
      return {
        defaultSoundUrl: getSoundPath(
          '368492__samsterbirdies__8-bit-pickup-sound.wav'
        )
      }
    },
    emits: ['custom-sound'],
    methods: {
      async playSound() {
        this.$emit('custom-sound')

        if (!this.noSound) {
          this.$refs.soundEffect.pause()
          this.$refs.soundEffect.currentTime = 0

          this.$refs.soundEffect.volume = 0.03
          this.$refs.soundEffect.src = this.soundUrl || this.defaultSoundUrl
          this.$refs.soundEffect.play()
        }
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
      },
      soundUrl: {
        type: String,
        default: null
      },
      noSound: {
        type: Boolean,
        default: false
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
    font-size: 0.8rem;
    border-style: groove;
    border-width: 1px;
    border-color: rgb(185, 185, 185);
    color: rgb(50, 50, 50);
  }
</style>
