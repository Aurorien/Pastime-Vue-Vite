<template>
  <div>
    <ViewTitle>{{ name ? name : 'Hey' }}, what is sounding in there?</ViewTitle>
    <div class="sound-guess">
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
    // experimental watch
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
            this.soundInstrument = getSoundPath(
              '7645__noisecollector__theremin3verb.wav'
            )
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

  .sound-guess {
    display: flex;
    align-items: center;
    padding: map-get($spacers, 1) map-get($spacers, 4) map-get($spacers, 7)
      map-get($spacers, 4);
    gap: map-get($spacers, 2);
  }

  .input-guess {
    height: map-get($spacers, 3);
  }

  .outcome {
    margin: 0 0 0 map-get($spacers, 3);
  }

  @media (max-width: 1292px) {
    .sound-guess {
      flex-direction: column;
      align-items: start !important;
    }

    .play-button {
      margin-bottom: map-get($spacers, 2);
    }

    .outcome {
      margin: map-get($spacers, 2) 0 0 0;
    }
  }
</style>
