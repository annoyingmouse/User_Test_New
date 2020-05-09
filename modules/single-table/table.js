import PageHeader from '../shared/table-page-header.js';
import { ModalSingle } from './modal-single.js';

export const SingleTable = Vue.component('single-table', {
  template: `
    <div>
      <page-header></page-header>
      <table class="table table-bordered table-striped table-condensed">
        <thead>
          <tr>
            <th>Name</th>
            <th class="medium">Eye Colour</th>
            <th class="medium">Hair Colour</th>
            <th class="medium">Handedness</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(member, index) in family" 
              v-bind:key="index">
            <td>{{member.title}} {{member.forename}} {{member.surname}}</td>
            <td class="medium">
              <button class="btn btn-primary"
                      v-if="member.single.eye === null"
                      v-on:click="openModal('eye', index)">
                Add Eye Colour
              </button>
              <button class="btn btn-default"
                      v-if="member.single.eye !== null"
                      v-on:click="openModal('eye', index)">
                {{capitalise(member.single.eye)}} | Edit Eye Colour
              </button>
            </td>
            <td class="medium">
              <button class="btn btn-primary"
                      v-if="member.single.hair === null"
                      v-on:click="openModal('hair', index)">
                Add Hair Colour
              </button>
              <button class="btn btn-default"
                      v-if="member.single.hair !== null"
                      v-on:click="openModal('hair', index)">
                {{capitalise(member.single.hair)}} | Edit Hair Colour
              </button>
            </td>
            <td class="medium">
              <button class="btn btn-primary"
                      v-if="member.single.hand === null"
                      v-on:click="openModal('hand', index)">
                Add Handedness
              </button>
              <button class="btn btn-default"
                      v-if="member.single.hand !== null"
                      v-on:click="openModal('hand', index)">
                {{capitalise(member.single.hand)}} | Edit Handedness
              </button>
            </td>
          </tr> 
        </tbody>
      </table>
		  <hr/>
			<button class="btn btn-primary btn-lg btn-block"
              v-on:click="changePage('home')">
        Go Back
      </button>
      <modal-single v-if="showModal"
                    v-on:close-modal="closeModal"
                    v-bind:type="modalType"
                    v-bind:eye="eye"
                    v-bind:hair="hair"
                    v-bind:hand="hand"
                    v-bind:mem="selectedMember"></modal-single>
    </div>
  `,
  data() {
    return {
      eye: -1,
      hair: -1,
      hand: -1,
      showModal: false,
      modalType: null
    }
  },
  components: {
    PageHeader
  },
  computed: Vuex.mapState(['family']),
  methods: {
    capitalise(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    changePage: function(page) {
      this.$store.commit('changeView', page)  
    },
    closeModal(){
      this.showModal = false;
      this.selectedMember = -1;
      this.eye = -1;
      this.hair = -1;
      this.hand = -1;
    },
    openModal(attribute, index){
      this.modalType = attribute
      this[attribute] = this.family[index].single[attribute];
      this.selectedMember = index;
      this.showModal = true
    }
  }
});