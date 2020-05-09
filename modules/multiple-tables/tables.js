import PageHeader from '../shared/table-page-header.js';
import { ModalMultiple } from './modal-multiple.js';

export const MultipleTable = Vue.component('multiple-table', {
  template: `
    <div>
      <page-header></page-header>
      <div class="panel panel-default">
        <div class="panel-heading">About the eyes in your family</div>
        <div class="panel-body">
          <table class="table table-bordered table-striped table-condensed">
            <thead>
              <tr>
                <th>Name</th>
                <th>Eye Colour</th>
                <th class="min">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(member, index) in family" 
                  v-bind:key="index"
                  v-if="member.multiple.eye !== null">
                <td>{{member.title}} {{member.forename}} {{member.surname}}</td>
                <td>{{capitalise(member.multiple.eye)}}</td>
                <td>
                  <div class="pull-right btn-group btn-group-sm" 
                       role="group">
                    <button type="button" 
                            class="btn btn-danger"
                            v-on:click="nullAttribute(index, 'eye')">
                      <i class="glyphicon glyphicon-remove" title="Remove"></i> 
                      Remove
                    </button>
                    <button type="button" 
                            class="btn btn-primary"
                            v-on:click="openModal('update', 'eye', index)">
                      <i class="glyphicon glyphicon-edit" title="Edit"></i>
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <button class="btn btn-primary btn-lg btn-block" 
                  type="button"
                  v-on:click="openModal('add', 'eye')">
            Add Eye Details
          </button>
        </div>
      </div>
      <div class="panel panel-default">
        <div class="panel-heading">About the hair in your family</div>
        <div class="panel-body">
          <table class="table table-bordered table-striped table-condensed">
            <thead>
              <tr>
                <th>Name</th>
                <th>Hair Colour</th>
                <th class="min">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(member, index) in family" 
                  v-bind:key="index"
                  v-if="member.multiple.hair !== null">
                <td>{{member.title}} {{member.forename}} {{member.surname}}</td>
                <td> {{ capitalise(member.multiple.hair) }} </td>
                <td>
                  <div class="pull-right btn-group btn-group-sm" 
                       role="group">
                    <button type="button" 
                            class="btn btn-danger"
                            v-on:click="nullAttribute(index, 'hair')">
                      <i class="glyphicon glyphicon-remove" title="Remove"></i> 
                      Remove
                    </button>
                    <button type="button" 
                            class="btn btn-primary"
                            v-on:click="openModal('update', 'hair', index)">
                      <i class="glyphicon glyphicon-edit" title="Edit"></i>
                      Edit
                    </button>
                  </div>
                </td>
              </tr>            
            </tbody>
          </table>
          <button class="btn btn-primary btn-lg btn-block" 
                  type="button"
                  v-on:click="openModal('add', 'hair')">
            Add Hair Details
          </button>
        </div>
      </div>
      <div class="panel panel-default">
        <div class="panel-heading">About the handedness in your family</div>
        <div class="panel-body">
          <table class="table table-bordered table-striped table-condensed">
            <thead>
              <tr>
                <th>Name</th>
                <th>Handedness</th>
                <th class="min">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(member, index) in family" 
                  v-bind:key="index"
                  v-if="member.multiple.hand !== null">
                <td>{{member.title}} {{member.forename}} {{member.surname}}</td>
                <td>{{capitalise(member.multiple.hand)}}</td>
                <td>
                  <div class="pull-right btn-group btn-group-sm" 
                       role="group">
                    <button type="button" 
                            class="btn btn-danger"
                            v-on:click="nullAttribute(index, 'hand')">
                      <i class="glyphicon glyphicon-remove" title="Remove"></i> 
                      Remove
                    </button>
                    <button type="button" 
                            class="btn btn-primary"
                            v-on:click="openModal('update', 'hand', index)">
                      <i class="glyphicon glyphicon-edit" title="Edit"></i>
                      Edit
                    </button>
                  </div>
                </td>
              </tr> 
            </tbody>          
          </table>
          <button class="btn btn-primary btn-lg btn-block" 
                  type="button"
                  v-on:click="openModal('add', 'hand')">
            Add Handedness Details
          </button>
        </div>
      </div>
      <hr/>
      <button class="btn btn-primary btn-lg btn-block"
              v-on:click="changePage('home')">
        Go Back
      </button>
      <modal-multiple v-if="showModal"
                      v-on:close-modal="closeModal"
                      v-bind:family="localFamily"
                      v-bind:type="modalType"
                      v-bind:eye="eye"
                      v-bind:hair="hair"
                      v-bind:hand="hand"
                      v-bind:mem="selectedMember"></modal-multiple>                  
    </div>
  `,
  components: {
    PageHeader
  },
  computed: Vuex.mapState(['family']),
  data() {
    return {
      localFamily: null,
      selectedMember: -1,
      eye: -1,
      hair: -1,
      hand: -1,
      showModal: false,
      modalType: null
    }
  },
  methods: {
    capitalise(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    changePage: function (page) {
      this.$store.commit('changeView', page)
    },
    closeModal(){
      this.showModal = false;
      this.selectedMember = -1;
      this.eye = -1;
      this.hair = -1;
      this.hand = -1;
      this.localFamily = null;
    },
    openModal(type, attribute, index){
      this.modalType = attribute
      if (type === 'add') {
        this.localFamily = [...this.family]
        this.localFamily.forEach(function (element) {
          if (element.multiple[attribute] !== null) {
            element.disabled = true;
          } else {
            delete element.disabled;
          }
        });
        this.showModal = true
      }
      if (type === 'update') {
        this.localFamily = [...this.family]
        this.localFamily.forEach(function (element, i) {
          if (i !== index) {
            element.disabled = true;
          }
        });
        this[attribute] = this.family[index].multiple[attribute];
        this.selectedMember = index;
        this.showModal = true
      }
    },
    nullAttribute(index, attribute) {
      this.$store.commit('updateValue', {
        index,
        type: 'multiple',
        attribute,
        value: null
      });
    }
  }
});