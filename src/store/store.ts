import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLoading: false
  },
  mutations: {
    startLoading (state) {
      state.isLoading = true
    },
    finishLoading (state) {
      state.isLoading = false
    }
  }
})

export default store
