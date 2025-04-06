<template>
  <ViewTitle
    >Some {{ $route.params.theme }} jokes for you{{
      name ? ` ${name}` : null
    }}!</ViewTitle
  >
  <ul class="joke-list">
    <li :key="result" v-for="result in results" class="joke-item">
      <div class="joke" :class="{ 'joke--revealed': result.showPunchline }">
        <span>{{ result.setup }}</span>
        <SoundButton
          @click="togglePunchline(result)"
          button-padding="0 3px 1px 3px"
          button-margin="5px 12px"
        >
          {{ result.showPunchline ? 'Hide' : 'Show' }}
        </SoundButton>
        <span
          v-if="result.showPunchline"
          id="joke-span"
          class="joke__punchline"
        >
          {{ result.punchline }}
        </span>
      </div>
    </li>
  </ul>
</template>

<script>
  import axios from 'axios'
  import ViewTitle from '../components/ViewTitle.vue'
  import SoundButton from '../components/SoundButton.vue'

  export default {
    async created() {
      // doc: https://github.com/15Dkatz/official_joke_api
      axios
        .get('https://official-joke-api.appspot.com/jokes/programming/ten/')
        .then((response) => {
          console.log(response)
          this.results = response.data.map((joke) => ({
            ...joke,
            showPunchline: false
          }))
          console.log('Resultat', this.results)
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
        results: null
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
  .joke-list {
    padding: 0;
  }

  .joke-item {
    list-style: none;
    display: flex;
    flex-direction: column;
    margin-bottom: map-get($spacers, 3);
  }

  .joke {
    padding: 0 map-get($spacers, 4);
    background-color: $list-color;

    &--revealed {
      background-color: $punchline-shows-color;
    }
  }
</style>
