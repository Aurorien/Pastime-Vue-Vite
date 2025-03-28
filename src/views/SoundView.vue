<template>
  <div id="ctn">
    <h1 class="pt-7 mb-4 ms-5">{{ name? name : "Hey" }}, what is sounding in there?</h1>
    <div class="d-flex align-items-center" id="sound-view">
      <button id="play-button" @click="playSound">Play</button>
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
        outcome: ''
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
      async playSound() {
        if (!this.soundUrl) {
          // doc: https://freesound.org/apiv2/
          const response = await axios.get(
            'https://freesound.org/apiv2/sounds/7645/?token=***REMOVED***'
          )
          console.log('LJUDDATA', response.data)
          this.soundUrl = response.data.previews['preview-hq-mp3']
        }
        this.$refs.soundEffect.volume = 1
        this.$refs.soundEffect.src = this.soundUrl
        this.$refs.soundEffect.play()
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
  $backgr-color: #d2e7df;

  h1 {
    color: rgb(20, 1, 96);
  }

  #ctn {
    height: 100vh;
    background-color: $backgr-color;

  }

  #play-button {
    padding: map-get($spacers, 4) map-get($spacers, 6);
    border-radius: 100%;
    margin: 0 map-get($spacers, 4) map-get($spacers, 4) 0;
  }

  #sound-view {
    background-color: $backgr-color;
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
