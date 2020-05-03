import { store } from './store/store.js';

Vue.config.devtools = true

Vue.use(Vuex)

new Vue({
  el: '#app',
  store,
});