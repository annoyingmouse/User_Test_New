import { store } from './store/store.js';

Vue.config.devtools = true

Vue.use(Vuex)

new Vue({
  el: '#app',
  store,
  beforeCreate() {
		this.$store.commit('initialiseStore');
	}
});

store.subscribe((mutation, state) => {
	localStorage.setItem('store', JSON.stringify(state));
});