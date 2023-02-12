import { createStore } from 'vuex'

const mutations = {
  updateName(state, name) {
    state.name = name
  }
}

const state = {
  name: ''
}

export default createStore({ mutations, state, strict: true })
