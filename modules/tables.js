import PageHeader from './shared/table-page-header.js';

export const MultipleTable = Vue.component('multiple-table', {
  template: `
    <div>
      <page-header></page-header>
      <div class="panel panel-default">
        <div class="panel-heading">About the eyes in your family</div>
        <div class="panel-body">
          <table class="table table-bordered table-striped table-condensed">
          
          
          </table>
          <button class="btn btn-primary btn-lg btn-block" 
                  type="button">
            Add Eye Details
          </button>
        </div>
      </div>
      <div class="panel panel-default">
        <div class="panel-heading">About the hair in your family</div>
        <div class="panel-body">
          <table class="table table-bordered table-striped table-condensed">
          
          
          </table>
          <button class="btn btn-primary btn-lg btn-block" 
                  type="button">
            Add Hair Details
          </button>
        </div>
      </div>
      <div class="panel panel-default">
        <div class="panel-heading">About the handedness in your family</div>
        <div class="panel-body">
          <table class="table table-bordered table-striped table-condensed">
          
          
          </table>
          <button class="btn btn-primary btn-lg btn-block" type="button">
            Add Handedness Details
          </button>
        </div>
      </div>
      <hr/>
      <button class="btn btn-primary btn-lg btn-block"
              v-on:click="changePage('home')">Go Back</button>
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