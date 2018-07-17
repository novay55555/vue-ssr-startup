import Vue from 'vue'
import App from './App.vue'
import VueProgressBar from 'vue-progressbar'
import { createRouter } from './router'
import { createStore } from './store'

Vue.use(VueProgressBar, { thickness: '4px', color: '#42b983' })

export function createApp() {
  const router = createRouter()
  const store = createStore()
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  return { app, router, store }
}
