import Vue from 'vue'
import Vuex from 'vuex'
import { fetchRepos } from './apis'

Vue.use(Vuex)

export function createStore() {
  return new Vuex.Store({
    state: {
      repos: {}
    },
    actions: {
      saveRepos({ commit }, payload = {}) {
        return fetchRepos(payload).then(res => {
          commit('SAVE_REPOS', {
            repoType: payload.repoType,
            data: res.data.items.map(el => ({
              url: el.html_url,
              name: el.full_name
            }))
          })
        })
      }
    },
    mutations: {
      SAVE_REPOS(state, payload) {
        if (!state.repos[payload.repoType]) {
          state.repos[payload.repoType] = []
        }

        const repos = state.repos[payload.repoType]
        let nextRepos = {}

        nextRepos[payload.repoType] = repos.concat(payload.data)
        state.repos = {
          ...state.repos,
          ...nextRepos
        }
      }
    }
  })
}
