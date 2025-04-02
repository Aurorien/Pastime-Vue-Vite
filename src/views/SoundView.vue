<template>
  <div>
    <ViewTitle>{{ name? name : "Hey" }}, what is sounding in there?</ViewTitle>
    <div class="d-flex align-items-center" id="sound-view">
      <button id="play-button" @click="toggleSound">{{ isPlaying ? 'Stop' : 'Play' }}</button>
      <audio ref="soundEffect" volume="0" />
      <label for="input-guess"
        >Which instrument is sounding when you press the play button?</label
      >
      <input id="input-guess" type="text" v-model="instrument" />
      <SoundButton @click="guessEval" button-padding="0 6px"
        >Submit answer</SoundButton
      >
      <p id="outcome">{{ outcome }}</p>
      <!-- {{ instrument }} -->
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import ViewTitle from '../components/ViewTitle.vue'
  import SoundButton from '../components/SoundButton.vue'

  export default {
    created() {
      // doc: https://freesound.org/apiv2/
      axios
        .get(
          'https://freesound.org/apiv2/search/text/?query=8bit&token=***REMOVED***'
        )
        .then((response) => {
          console.log('Response', response)
        })
    },
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
        soundUrl: '',
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
          this.$refs.soundEffect.pause();
          this.$refs.soundEffect.currentTime = 0;
          this.isPlaying = false;
        } else {
          if (!this.soundUrl) {
            // doc: https://freesound.org/apiv2/
            const response = await axios.get(
              'https://freesound.org/apiv2/sounds/7645/?token=***REMOVED***'
            )
            console.log('LJUDDATA', response.data)
            this.soundUrl = response.data.previews['preview-hq-mp3']
          }
          this.$refs.soundEffect.volume = 0.5
          this.$refs.soundEffect.src = this.soundUrl
          this.$refs.soundEffect.play()
          this.isPlaying = true;
        }
      },
      guessEval() {
        if (this.instrument === 'theremin' || this.instrument === 'Theremin') {
          this.outcome = `That is right, it is a ${this.instrument}!`
        } else {
          this.outcome = 'Not the right instrument, you can try again!'
        }
      }
    }
  }
</script>

<style scoped lang="scss">

  h1 {
    color: rgb(20, 1, 96);
  }

  #play-button {
    padding: map-get($spacers, 4) map-get($spacers, 6);
    min-width: 102px;
    border-radius: 100%;
    margin: 0 map-get($spacers, 4) map-get($spacers, 4) 0;
  }

  #sound-view {
    padding: map-get($spacers, 6 ) map-get($spacers, 5) map-get($spacers, 6 ) map-get($spacers, 7);
    gap: 10px;
  }

  #input-guess {
    height: 1.5rem;
  }

  #outcome {
    margin: 0 0 0 map-get($spacers, 3);
  }

  @media (max-width: 1292px) {
    #sound-view {
      flex-direction: column;
      align-items: start !important;
    }

    #outcome {
      margin: map-get($spacers, 3) 0 0 0;
    }
  }

</style>
