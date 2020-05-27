// import Vue from './libraries/vue.js'
// import Vuex from './libraries/vuex.js'
// import VueRouter from './libraries/vue-router.js'
// import Vuetify from "./libraries/vuetify.js";
import { store } from './store/store.js'
import { router } from './router/router.js'

Vue.config.devtools = true

Vue.use(Vuex)
Vue.use(VueRouter)

new Vue({
  el: '#app',
  vuetify: new Vuetify({}),
  store,
  router,
  beforeCreate() {
    this.$store.commit('initialiseStore');
  }
})