import { ModalSingle } from './modal-single.js';

export const SingleTable = Vue.component('single-table', {
  template: `
    <div>
      <div class="page-header">
        <h1>Thank you again <small>for taking part in this test, you're very nearly done.</small></h1>
        <p>If you can see a table below with four people in it (Doctors 08 08 (08/08/0808), 09 09 (09/09/0909), 10 10 (10/10/1010) and 11 11 (11/11/1111)), then you're ready to go. We'd like you to add some details to the family. You (as Dr 08 08) have brown hair, brown eyes and you're left-handed. The rest of your family has these details:</p>
        <ul>
          <li>Dr. 09 09 is somewhat odd with silver eyes, white hair and is ambidextrous (I'm not sure I'd trust them <abbr title="To Be Honest">TBH</abbr>).</li>
          <li>Dr. 10 10 had a rather tragic accident, perhaps due to being ambilevous, and has no eyes or hair as a result.</li>
          <li>Dr. 11 11 is right-handed and has brown hair and eyes.</li>
        </ul>
        <p>If you could provide the details and be mindful about how the process feels to you, perhaps concerning how the other version felt if you've already entered the data there, then get back to us, we'd be grateful. I'll be sharing this on Facebook so putting comment there will suffice, but please try entering the data in both ways before commenting.</p>
        <p>We appreciate that the scenario is contrived, but it's just a made-up use case, and no data you enter is saved to a server, it's all in the browser. The initial page does make use of local storage so that the details of the family is maintained between sessions.</p>
      </div>
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
              <button class="btn btn-info"
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
              <button class="btn btn-info"
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
              <button class="btn btn-info"
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
                    v-bind:mem="selectedMember"></modal-single>
    </div>
  `,
  data() {
    return {
      showModal: false,
      modalType: null
    }
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
    },
    openModal(attribute, index){
      this.modalType = attribute
      this[attribute] = this.family[index].single[attribute];
      this.selectedMember = index;
      this.showModal = true
    }
  }
});