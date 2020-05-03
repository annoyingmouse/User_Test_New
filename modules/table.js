import PageHeader from './table-page-header.js';

export const SingleTable = Vue.component('single-table', {
  template: `
    <div>
      <page-header></page-header>
      <table id="YourFamilyDetails" class="table table-bordered table-striped table-condensed"></table>
		  <hr/>
			<button class="btn btn-primary btn-lg btn-block" id="mail-link" v-on:click="changePage('home')">Go Back</button>
    </div>
  `,
  components: {
    PageHeader
  },
  methods: {
    changePage: function(page) {
      this.$store.commit('changeView', page)  
    }
  }
});