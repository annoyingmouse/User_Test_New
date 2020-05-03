import PageHeader from './table-page-header.js';

export const MultipleTable = Vue.component('multiple-table', {
  template: `
    <div>
      <page-header></page-header>
      <div class="panel panel-default">
        <div class="panel-heading">About the eyes in your family</div>
        <div class="panel-body">
          <table id="eyeTable" class="table table-bordered table-striped table-condensed"></table>
          <button class="btn btn-primary btn-lg btn-block" type="button" data-toggle="modal" data-target="#eyeModal" data-backdrop="static">
            Add Eye Details
          </button>
        </div>
      </div>
      <div class="panel panel-default">
        <div class="panel-heading">About the hair in your family</div>
        <div class="panel-body">
          <table id="hairTable" class="table table-bordered table-striped table-condensed"></table>
          <button class="btn btn-primary btn-lg btn-block" type="button" data-toggle="modal" data-target="#hairModal" data-backdrop="static">
            Add Hair Details
          </button>
        </div>
      </div>
      <div class="panel panel-default">
        <div class="panel-heading">About the handedness in your family</div>
        <div class="panel-body">
          <table id="handTable" class="table table-bordered table-striped table-condensed"></table>
          <button class="btn btn-primary btn-lg btn-block" type="button" data-toggle="modal" data-target="#handModal" data-backdrop="static">
            Add Handedness Details
          </button>
        </div>
      </div>
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