<style scoped lang="scss">
  // @import '../../assets/main.scss';
</style>

<script>
  import axios from 'axios'
  import SoundButton from '../components/SoundButton.vue'

  export default {
    async created() {
      // doc: https://github.com/15Dkatz/official_joke_api
      axios
        .get('https://official-joke-api.appspot.com/jokes/programming/ten/')
        .then((response) => {
          console.log(response)
          this.results = response.data
          console.log('Resultat', this.results)
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
        results: null,
        listColor: 'lightgreen',
        punchlineShowsColor: '#fae77c'
      }
    },
    emits: ['punchlinefx'],
    methods: {
      togglePunchline(result) {
        result.showPunchline = !result.showPunchline
        this.$emit('punchlinefx')
      }
    }
  }
</script>

<template>
  <h1>Some {{ $route.params.theme }} jokes for you {{ name }}!</h1>
  <li :key="result" v-for="result in results">
    <div
      :style="{
        backgroundColor: result.showPunchline ? punchlineShowsColor : listColor
      }"
    >
      {{ result.setup }}
      <SoundButton @click="togglePunchline(result)">Show</SoundButton>
      <span v-if="result.showPunchline" id="quote-span">
        {{ result.punchline }}
      </span>
    </div>
  </li>
  <RouterLink class="d-flex flex-column align-items-center" to="/sound"
    >To Sound</RouterLink
  >
</template>
