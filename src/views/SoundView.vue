<template>
  <div>
    <ViewTitle>{{ name ? name : 'Hey' }}, what is sounding in there?</ViewTitle>
    <div class="sound-view">
      <button class="play-button" @click="toggleSound">
        {{ isPlaying ? 'Stop' : 'Play' }}
      </button>
      <audio ref="soundEffect" volume="0" />
      <label for="input-guess"
        >Which instrument is sounding when you press the play button?</label
      >
      <input
        id="input-guess"
        class="input-guess"
        type="text"
        v-model="instrument"
      />
      <SoundButton
        @click="guessEval"
        button-padding="0 6px"
        @custom-sound="playSound"
        no-sound="true"
        >Submit answer</SoundButton
      >
      <p class="outcome">{{ outcome }}</p>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import ViewTitle from '../components/ViewTitle.vue'
  import SoundButton from '../components/SoundButton.vue'
  import { getSoundPath } from '../utils/paths'

  export default {
    components: {
      ViewTitle,
      SoundButton
    },
    computed: {
      name() {
        return this.$store.state.name
      }
    },
    data() {
      return {
        rightAnswer: false,
        soundInstrument: '',
        instrument: '',
        outcome: '',
        isPlaying: false
      }
    },
    watch: {
      instrument(newInstrument, oldInstrument) {
        console.log(
          `Instrumentet har ändrats från ${oldInstrument} till ${newInstrument}`
        )
      }
    },
    methods: {
      async toggleSound() {
        if (this.isPlaying) {
          this.$refs.soundEffect.pause()
          this.$refs.soundEffect.currentTime = 0
          this.isPlaying = false
        } else {
          if (!this.soundInstrument) {
            const response = await axios.get(
              'https://freesound.org/apiv2/sounds/7645/?token=***REMOVED***'
            )
            console.log('LJUDDATA', response.data)
            this.soundInstrument = response.data.previews['preview-hq-mp3']
          }
          this.$refs.soundEffect.volume = 0.4
          this.$refs.soundEffect.src = this.soundInstrument
          this.$refs.soundEffect.play()
          this.isPlaying = true
        }
      },
      guessEval() {
        if (this.instrument === 'theremin' || this.instrument === 'Theremin') {
          this.rightAnswer = true
          this.outcome = `That is right, it is a ${this.instrument}!`
        } else {
          this.rightAnswer = false
          this.outcome = 'Not the right instrument, you can try again!'
        }
      },
      playSound() {
        const audio = new Audio()
        audio.volume = 0.02
        if (this.rightAnswer) {
          audio.src = getSoundPath(
            '368492__samsterbirdies__8-bit-pickup-sound.wav'
          )
        } else {
          audio.src = getSoundPath('558735__samsterbirdies__8-bit-fail.wav')
        }
        audio.play()
      }
    }
  }
</script>

<style scoped lang="scss">
  h1 {
    color: rgb(20, 1, 96);
  }

  .play-button {
    padding: map-get($spacers, 2) map-get($spacers, 4);
    min-width: 102px;
    border-radius: 100%;
    margin: 0 map-get($spacers, 2) map-get($spacers, 1) 0;
  }

  .sound-view {
    display: flex;
    align-items: center;
    padding: map-get($spacers, 4);
    padding-top: map-get($spacers, 1);
    gap: map-get($spacers, 3);
  }

  .input-guess {
    height: 1.5rem;
  }

  .outcome {
    margin: 0 0 0 $spacer;
  }

  @media (max-width: 1292px) {
    .sound-view {
      flex-direction: column;
      align-items: start !important;
    }

    .outcome {
      margin: $spacer 0 0 0;
    }
  }
</style>
