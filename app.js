import { Home } from './modules/home/home.js';
import { SingleTable } from './modules/single-table/table.js';
import { MultipleTable } from './modules/multiple-tables/tables.js';

import { store } from './store/store.js';


const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/single', name: 'single', component: SingleTable },
    { path: '/multiple', name: 'multiple', component: MultipleTable }
  ]
})

Vue.config.devtools = true

Vue.use(Vuex)

new Vue({
  el: '#app',
  store,
  router,
  beforeCreate() {
		this.$store.commit('initialiseStore');
	}
});

store.subscribe((mutation, state) => {
	localStorage.setItem('store', JSON.stringify(state));
});

