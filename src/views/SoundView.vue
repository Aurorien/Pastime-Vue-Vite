<template>
  <div>
    <h1>{{ name }}, what is sounding in there?</h1>
    <div class="space" id="sound-view">
      <button id="play-button" @click="playSound">Play Sound</button>
      <audio ref="soundEffect" volume="0" />
      <label class="space" for="guess"
        >Which instrument is sounding when you press the button to the
        left?</label
      >
      <input id="guess" type="text" v-model="instrument" />
      <SoundButton @click="guessEval" button-padding="0 5px 2px 5px"
        >Submit answer</SoundButton
      >
      <p>{{ outcome }}</p>
      <!-- {{ instrument }} -->
    </div>
  </div>
  <RouterLink
    class="d-flex flex-column align-items-center"
    to="/quotes/programming"
    >To Quote</RouterLink
  >
</template>

<script>
  import axios from 'axios'
  import SoundButton from '../components/SoundButton.vue'

  export default {
    created() {
      // doc: https://freesound.org/apiv2/
      axios
        .get(
          'https://freesound.org/apiv2/search/text/?query=8bit&token=CSI1FjT2e2oVfruB7VtJzzj3bNFoIaRqfm5XVF5U'
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
            'https://freesound.org/apiv2/sounds/7645/?token=CSI1FjT2e2oVfruB7VtJzzj3bNFoIaRqfm5XVF5U'
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
  // @import '../../assets/main.scss';

  $backgr-color: rgb(252, 247, 207);

  h1 {
    color: rgb(20, 1, 96);
  }

  #play-button {
    padding: 19px 15px 19px 15px;
    border-radius: 100%;
  }

  .space {
    padding: 1rem;
  }

  #sound-view {
    background-color: $backgr-color;
  }

  #guess {
    margin-right: 0.5rem;
  }
</style>
