<template>
  <h1 class="mb-5">Some {{ $route.params.theme }} jokes for you{{ name? ` ${name}` : null }}!</h1>
  <li :key="result" v-for="result in results" class="list-unstyled d-flex flex-column mb-4">
    <div
      class="joke"
      :style="{
        backgroundColor: result.showPunchline ? punchlineShowsColor : listColor
      }"
    >
      <span class="ms-2">{{ result.setup }}</span>
      <SoundButton
        @click="togglePunchline(result)"
        button-padding="0 3px 1px 3px"
        button-margin="5px 12px"
        >Show</SoundButton
      >
      <span v-if="result.showPunchline" id="joke-span">
        {{ result.punchline }}
      </span>
    </div>
  </li>
</template>

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
        listColor: '#cdf4cd',
        punchlineShowsColor: '#f4efdc'
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

<style scoped lang="scss">
  .joke {
    padding: 0 map-get($spacers, 4)
  }
</style>
