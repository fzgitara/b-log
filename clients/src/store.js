import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    listArticles: []
  },
  mutations: {
    getAllArticles (state, payload) {
      state.listArticles = payload
    }
  },
  actions: {
    getAllArticles (context, payload) {
      axios.get('http://localhost:3000/articles').then(response => {
        context.commit('getAllArticles', response.data)
      })
    },
    register (context, payload) {
    }
  }
})
