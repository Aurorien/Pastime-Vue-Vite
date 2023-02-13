<style lang="scss">
  // @import '../../assets/main.scss';

  .sound-button-padding {
    margin: $spacer;
  }
</style>

<script>
  import axios from 'axios'
  export default {
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
        this.$refs.soundEffect.volume = 1
        this.$refs.soundEffect.src = this.soundUrl
        this.$refs.soundEffect.play()
      }
    }
  }
</script>

<template>
  <button class="mx-2 my-2" v-bind="$attrs" @click="playSound">
    <slot>Play blipp</slot>
  </button>
  <audio ref="soundEffect" volume="0" />
</template>
