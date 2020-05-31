(function () {
  'use strict';

  Vue.use(Vuex);

  const store = new Vuex.Store({
    state: {
      family: [
        {
          title: null,
          forename: null,
          surname: null,
          dob: null,
          multiple: {
            eye: null,
            hair: null,
            hand: null
          },
          single: {
            eye: null,
            hair: null,
            hand: null
          }
        }
      ]
    },
    mutations: {
      initialiseStore(state) {
  			if(localStorage.getItem('store')) {
  				this.replaceState(
  					Object.assign(state, JSON.parse(localStorage.getItem('store')))
  				);
  			}
  		},
      update(state, { attribute, value }) {
        state.family[0][attribute] = value;
      },
      addMember(state, member) {
        state.family.push(member);
      },
      removeMember(state, index) {
        state.family.splice(index, 1);
      },
      updateMember(state, { index, member }) {
        state.family.splice(index, 1, member);
      },
      updateValue(state, { index, type, attribute, value }) {
        state.family[index][type][attribute] = value;
      }
    },
    getters: {
      currentView: state => state.currentView,
      getMemberByIndex: (state) => (i) => state.family[i]
    }
  });

  store.subscribe((mutation, state) => {
  	localStorage.setItem('store', JSON.stringify(state));
  });

  var PageHeader = {
    template: `
    <div class="page-header">
      <h1>Thank you 
        <small>for taking part in this test.</small>
      </h1>
      <p>We're doing some testing on how easy it is for our users to input the members of a family and their details so we'd be grateful if you could imagine you are Dr. 08 08 with a <abbr title="Date of Birth">DOB</abbr> of 08/08/0808 (you're looking perfect for your age). Further, your family is like this:</p>
      <ul>
        <li>Your partner is Dr. 09 09, who was born on 09/09/0909.</li>
        <li>One child is Dr. 10 10 who was born on 10/10/1010 (they are not in the least bit lucky - more will be revealed).</li>
        <li>The other child is Dr. 11 11 who was born on (you've guessed it, haven't you?) 11/11/1111.</li>
      </ul>
      <p>Please use the two boxes below to enter details about you and your family then, when you're happy with the details you've provided, use the buttons at the bottom with the titles of <strong>Add Details</strong> to tell us more about you and your family. One uses one table to enter the data (<strong>Add Details - TABLE</strong>); the other uses multiple tables (<strong>Add Details - TABLES</strong>). We don't have a preference for either as they both involve pretty much the same work, but we're interested in which is the easiest and most pleasant to use.</p>
    </div>
  `
  };

  const AboutYou = Vue.component('about-you', {
    template: `
    <div class="card mb-3">
      <div class="card-header">About you</div>
      <div class="card-body">
        <div class="form-group row">
          <label for="ownTitle" 
                 class="col-sm-2 control-label">
            Your Title
          </label>
          <div class="col-sm-10">
            <select class="form-control" 
                    name="ownTitle" 
                    v-model="ownTitle" 
                    required>
              <option value="null">Please Choose</option>
              <option value="Dr.">Dr.</option>
              <option value="Mr.">Mr.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Miss.">Miss.</option>
              <option value="Ms.">Ms.</option>
            </select>
          </div>
        </div>
        <div class="form-group row">
          <label for="ownForename" 
                 class="col-sm-2 control-label">
            Your Forename
          </label>
          <div class="col-sm-10">
            <input type="text" 
                   class="form-control" 
                   name="ownForename" 
                   v-model="ownForename" 
                   placeholder="John" 
                   required>
          </div>
        </div>
        <div class="form-group row">
          <label for="ownSurname" 
                 class="col-sm-2 control-label">
            Your Surname
          </label>
          <div class="col-sm-10">
            <input type="text" 
                   class="form-control" 
                   v-model="ownSurname" 
                   name="ownSurname" 
                   placeholder="Smith" 
                   required>
          </div>
        </div>
        <div class="form-group row">
          <label for="ownDob" 
                 class="col-sm-2 control-label">
            Your Date of Birth
          </label>
          <div class="col-sm-10">
            <input type="date" 
                   class="form-control" 
                   v-model="ownDob" 
                   name="ownDob" 
                   placeholder="dd/mm/yyyy" 
                   required>
          </div>
        </div>
      </div>
    </div>
  `,
    computed: {
      ownTitle: {
        get() {
          return this.$store.state.family[0].title
        },
        set(value) {
          this.$store.commit('update', {
            attribute: 'title',
            value
          });
        }
      },
      ownForename: {
        get() {
          return this.$store.state.family[0].forename
        },
        set(value) {
          this.$store.commit('update', {
            attribute: 'forename',
            value
          });
        }
      },
      ownSurname: {
        get() {
          return this.$store.state.family[0].surname
        },
        set(value) {
          this.$store.commit('update', {
            attribute: 'surname',
            value
          });
        }
      },
      ownDob: {
        get() {
          return this.$store.state.family[0].dob
        },
        set(value) {
          this.$store.commit('update', {
            attribute: 'dob',
            value
          });
        }
      }
    }
  });

  const AddMember = Vue.component('add-member', {
    template: `
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-dialog">
            <form class="modal-content"
                  v-on:submit.prevent="onSubmit">
              <input type="hidden"
                     v-model="user.index"/>
              <div class="modal-header">       
                <h5 class="modal-title">
                  Please tell us about the family member
                </h5>
                <button type="button" 
                        class="close"
                        aria-label="Close" 
                        v-on:click="closeModal">
                  <span aria-hidden="true">&times;</span>
                </button>                  
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <label for="title" 
                         class="control-label">
                    Their Title
                  </label>
                  <select class="form-control" 
                          name="title" 
                          v-model="user.title"
                          required>
                    <option value="">Please Choose</option>
                    <option value="Dr.">Dr.</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Miss.">Miss.</option>
                    <option value="Ms.">Ms.</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="forename" 
                         class="control-label">
                    Their Forename
                  </label>
                  <input type="text" 
                         class="form-control" 
                         name="forename" 
                         placeholder="Jane" 
                         required 
                         v-model="user.forename">
                </div>
                <div class="form-group">
                  <label for="surname" 
                         class="control-label">
                    Their Surname
                  </label>
                  <input type="text" 
                         class="form-control" 
                         name="surname" 
                         placeholder="Smith" 
                         required 
                         v-model="user.surname">
                </div>
                <div class="form-group">
                  <label for="dob" 
                         class="control-label">
                    Their Date of Birth
                  </label>
                  <input type="date" 
                         class="form-control" 
                         name="dob" 
                         placeholder="dd/mm/yyyy" 
                         required 
                         v-model="user.dob">
                </div>
              </div>
              <div class="modal-footer">
                <button v-on:click="closeModal" 
                        type="button" 
                        class="btn btn-secondary">
                  Close
                </button>
                <button type="submit"
                        class="btn btn-primary">
                  {{buttonText}}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </transition>
  `,
    props: {
      member: {
        type: Object,
        required: true
      }
    },
    computed: {
      buttonText() {
        return this.member.index === null ?
          'Add Family Member' :
          'Update Family Member'
      }
    },
    methods: {
      closeModal() {
        this.$emit('close-modal');
      },
      onSubmit() {
        const member = {
          title: this.user.title,
          forename: this.user.forename,
          surname: this.user.surname,
          dob: this.user.dob,
          multiple: {
            eye: null,
            hair: null,
            hand: null
          },
          single: {
            eye: null,
            hair: null,
            hand: null
          }
        };
        if (this.member.index === null) {
          this.$store.commit('addMember', member);
        } else {
          const index = this.user.index;
          this.$store.commit('updateMember', {
            index,
            member
          });
        }
        this.closeModal();
      }
    },
    data() {
      return {
        user: { ...this.member }
      }
    }
  });

  const Home = Vue.component('home', {
    template: `
    <div>
      <page-header></page-header>
      <form class="form-horizontal" 
            id="familyForm"
            v-on:submit.prevent="onPageChange">
        <about-you></about-you>
        <div class="card mb-3">
          <div class="card-header">
            About your family
          </div>
          <div class="card-body">
            <table class="table table-bordered table-striped table-condensed">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Date of Birth</th>
                  <th scope="col" class="fifth">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(member, index) in family" 
                    v-bind:key="index"
                    v-if="index">
                  <td>{{member.title}} {{member.forename}} {{member.surname}}</td>
                  <td>{{new Date(member.dob).toLocaleDateString('en-GB')}}</td>
                  <td class="fifth">
                    <div class="pull-right btn-group btn-group-sm" 
                         role="group">
                      <button type="button" 
                              class="btn btn-danger"
                              v-on:click="removeMember(index)">
                        <i class="fa fa-trash" title="Remove"></i> 
                        Remove
                      </button>
                      <button type="button" 
                              class="btn btn-primary"
                              v-on:click="updateMember(index)">
                        <i class="fa fa-edit" title="Edit"></i>
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <button class="btn btn-primary btn-lg btn-block" 
                    type="button"
                    v-on:click="showModal = true">
                Add Family Member
            </button>
          </div>
        </div>
        <div class="card bg-light mb-3">
          <div class="card-body">
            <p>There are two buttons below, they both allow you to enter further, detailed, information about your family. It'd be great if you could try both ways and get back to us about which you prefer, and perhaps why you prefer one over the other. Please be aware that we don't have a preference; we're merely trying to find the best way for people to enter data.</p>
          </div>
        </div>
        <div class="d-flex justify-content-between mb-4">
          <button type="submit" 
                  class="btn btn-primary float-left" 
                  v-on:click="submitForm('tables')">
            Add Details - TABLES
          </button>
          <button type="submit" 
                  class="btn btn-primary float-right" 
                  v-on:click="submitForm('table')">
            Add Details - TABLE
          </button>
        </div>
      </form> 
      <add-member v-if="showModal"
                  v-bind:member="member"
                  v-on:close-modal="closeModal"></add-member>
    </div>
  `,
    methods: {
      submitForm(page) {
        if (this.validateForm()) {
          this.$router.push({name: page});
        }
      },
      validateForm () {
        var formId = 'familyForm';
        var nodes = document.querySelectorAll(`#${formId} :invalid`);
        if (nodes.length > 0) {
          return false;
        } else {
          return true;
        }
      },
      closeModal() {
        this.showModal = false;
        this.member = {
          index: null,
          title: '',
          forename: '',
          surname: '',
          dob: ''
        };
      },
      removeMember(index) {
        this.$store.commit('removeMember', index);
      },
      updateMember(index) {
        this.member = { ...this.family[index] };
        this.member.index = index;
        this.showModal = true;
      },
      onPageChange() {
        this.$store.commit('changeView', this.target);
      }
    },
    computed: Vuex.mapState(['family']),
    components: {
      PageHeader
    },
    data() {
      return {
        member: {
          index: null,
          title: '',
          forename: '',
          surname: '',
          dob: ''
        },
        showModal: false
      }
    }
  });

  const ModalSingle = Vue.component('modal-single', {
    template: `
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-dialog" role="document">
            <form class="modal-content"
                  v-on:submit.prevent="onSubmit">
              <div class="modal-header">
                <h5 class="modal-title">
                  {{title}}
                </h5>
              </div>
              <div class="modal-body" v-if="type === 'eye'">
                <div class="checkbox">
                  <label>
                    <input type="checkbox"
                           v-model="eyeDisabled">
                    <span>{{memberForDisplay}} has eyes</span>
                  </label>
                </div>
                <div class="form-group">
                  <label for="eye" 
                         class="control-label">
                    What colour are their eyes?
                  </label>
                  <select class="form-control" 
                          name="eye"
                          required
                          v-model="eye"
                          v-bind:disabled="!eyeDisabled">
                    <option value="null">Please Choose</option>
                    <option value="brown">Brown</option>
                    <option value="hazel">Hazel</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    <option value="silver">Silver</option>
                    <option value="amber">Amber</option>
                  </select>
                </div>
              </div>
              <div class="modal-body" v-if="type === 'hair'">
                <div class="checkbox">
                  <label>
                    <input type="checkbox" 
                           v-model="hairDisabled">
                    <span>{{memberForDisplay}} has hair</span>
                  </label>
                </div>
                <div class="form-group">
                  <label for="hair" 
                         class="control-label">
                    What colour are is their hair?
                  </label>
                  <select class="form-control" 
                          name="hair"
                          required
                          v-model="hair"
                          v-bind:disabled="!hairDisabled">
                    <option value="null">Please Choose</option>
                    <option value="black">Black</option>
                    <option value="brown">Brown</option>
                    <option value="blond">Blond</option>
                    <option value="auburn">Auburn</option>
                    <option value="chestnut">Chestnut</option>
                    <option value="red">Red</option>
                    <option value="grey">Grey</option>
                    <option value="white">White</option>
                  </select>
                </div>
              </div>
              <div class="modal-body" v-if="type === 'hand'">
                <div class="form-group">
                  <label for="hand" 
                         class="control-label">
                    What is their handedness?
                  </label>
                  <select class="form-control" 
                          name="handedness"
                          required
                          v-model="hand">
                    <option value="null">Please Choose</option>
                    <option value="right-handed">Right-handed</option>
                    <option value="left-handed">Left-handed</option>
                    <option value="mixed-handed">Mixed-handed</option>
                    <option value="ambidextrous">Ambidextrous</option>
                    <option value="ambilevous">Ambilevous</option>
                  </select>
                </div>
              </div>
              <div class="modal-footer">
                <button type="submit" 
                        class="btn btn-primary">{{button}}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </transition>
  `,
    props: {
      type: {
        type: String,
        required: true
      },
      mem: {
        type: Number,
        required: false,
        default: -1
      }
    },
    data() {
      return {
        eyeDisabled: true,
        hairDisabled: true
      }
    },
    computed: {
      eye: {
        get () {
          return this.$store.state.family[this.mem].single.eye
        },
        set (value) {
          this.$store.commit('updateValue', {
            index: this.mem,
            type: 'single',
            attribute:'eye', 
            value
          });
        }
      },
      hair: {
        get () {
          return this.$store.state.family[this.mem].single.hair
        },
        set (value) {
          this.$store.commit('updateValue', {
            index: this.mem,
            type: 'single',
            attribute:'hair', 
            value
          });
        }
      },
      hand: {
        get () {
          return this.$store.state.family[this.mem].single.hand
        },
        set (value) {
          this.$store.commit('updateValue', {
            index: this.mem,
            type: 'single',
            attribute:'hand', 
            value
          });
        }
      },
      title() {
        const str = `Please tell us about ${this.memberForDisplay}'s `;
        return str + (this.type === "eye"
          ? "eyes"
          : this.type === "hair"
            ? "hair"
            : "handedess")
      },
      button() {
        const str = this.mem === -1 ? "Add " : "Update ";
        return str + (this.type === "eye"
          ? "Eye Colour"
          : this.type === "hair"
            ? "Hair Colour"
            : "Handedness")
      },
      memberForDisplay() {
        const m = this.$store.getters.getMemberByIndex(this.mem);
        return `${m.title} ${m.forename} ${m.surname}`
      }
    },
    watch: {
      eyeDisabled(val){
        if(!val){
          this.nullAttribute(this.mem, 'eye');
        }
      },
      hairDisabled(val){
        if(!val){
          this.nullAttribute(this.mem, 'hair');
        }
      }
    },
    methods: {
      closeModal() {
        this.$emit('close-modal');
      },
      onSubmit() {
        this.closeModal();
      },
      nullAttribute(index, attribute) {
        this.$store.commit('updateValue', {
          index,
          type: 'single',
          attribute,
          value: null
        });
      }
    },
    mounted: function () {
      this.eyeDisabled = this.eye !== null;
      this.hairDisabled = this.hair !== null;
    }
  });

  const SingleTable = Vue.component('single-table', {
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
            <th scope="col">Name</th>
            <th scope="col" class="quarter">Eye Colour</th>
            <th scope="col" class="quarter">Hair Colour</th>
            <th scope="col" class="quarter">Handedness</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(member, index) in family" 
              v-bind:key="index">
            <td>{{member.title}} {{member.forename}} {{member.surname}}</td>
            <td class="quarter">
              <button class="btn btn-primary"
                      v-if="member.single.eye === null"
                      v-on:click="openModal('eye', index)">
                Add Eye Colour
              </button>
              <template v-if="member.single.eye !== null">
                <strong class="pr-2">
                  {{capitalise(member.single.eye)}}
                </strong>
                <button class="btn btn-info"
                        v-on:click="openModal('eye', index)">
                  <i class="fa fa-edit" title="Edit"></i>
                  Edit Eye Colour
                </button>
              </template>
            </td>
            <td class="quarter">
              <button class="btn btn-primary"
                      v-if="member.single.hair === null"
                      v-on:click="openModal('hair', index)">
                Add Hair Colour
              </button>
              <template v-if="member.single.hair !== null">
                <strong class="pr-2">
                  {{capitalise(member.single.hair)}}
                </strong>
                <button class="btn btn-info"
                        v-on:click="openModal('hair', index)">
                  <i class="fa fa-edit" title="Edit"></i>
                  Edit Hair Colour
                </button>
              </template>
            </td>
            <td class="quarter">
              <button class="btn btn-primary"
                      v-if="member.single.hand === null"
                      v-on:click="openModal('hand', index)">
                Add Handedness
              </button>
              <template v-if="member.single.hand !== null">
                <strong class="pr-2">
                  {{capitalise(member.single.hand)}}
                </strong>
                <button class="btn btn-info"
                        v-on:click="openModal('hand', index)">
                  <i class="fa fa-edit" title="Edit"></i>
                  Edit Handedness
                </button>
              </template>
            </td>
          </tr> 
        </tbody>
      </table>
		  <hr/>
			<button class="btn btn-primary btn-lg btn-block"
              v-on:click="$router.push({name: 'home'})">
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
      closeModal(){
        this.showModal = false;
      },
      openModal(attribute, index){
        this.modalType = attribute;
        this[attribute] = this.family[index].single[attribute];
        this.selectedMember = index;
        this.showModal = true;
      }
    }
  });

  const ModalMultiple = Vue.component('modal-multiple', {
    template: `
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-dialog" role="document">
            <form class="modal-content"
                  v-on:submit.prevent="onSubmit">
              <div class="modal-header">
                <h5 class="modal-title">
                  {{title}}
                </h5>
                <button type="button" 
                        class="close" 
                        v-on:click="closeModal">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <label for="name" 
                         class="control-label">
                    Please choose a family member
                  </label>
                  <select class="form-control" 
                          name="name"
                          required="true"
                          v-model="member"
                          v-bind:disabled="mem !== -1">
                    <option value="-1" disabled>Please Choose</option>
                    <option v-for="(member, index) in family" 
                            v-bind:key="index"
                            v-bind:value="index"
                            v-bind:disabled="member.disabled">
                      {{member.title}} 
                      {{member.forename}} 
                      {{member.surname}}
                    </option>
                  </select>
                </div>
                <div class="form-group" v-if="type === 'eye'">
                  <label for="eyeColour" 
                         class="control-label">
                    What colour are their eyes?
                  </label>
                  <select class="form-control" 
                          name="eyeColour"
                          required
                          v-bind:disabled="member < 0"
                          v-model="eyeColour">
                    <option value="-1" selected disabled>Please Choose</option>
                    <option value="brown">Brown</option>
                    <option value="hazel">Hazel</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    <option value="silver">Silver</option>
                    <option value="amber">Amber</option>
                  </select>
                </div>
                <div class="form-group" v-if="type === 'hair'">
                  <label for="hairColour" 
                         class="control-label">
                    What colour are is their hair?
                  </label>
                  <select class="form-control" 
                          name="hairColour"
                          required
                          v-bind:disabled="member < 0"
                          v-model="hairColour">
                    <option value="-1" selected disabled>Please Choose</option>
                    <option value="black">Black</option>
                    <option value="brown">Brown</option>
                    <option value="blond">Blond</option>
                    <option value="auburn">Auburn</option>
                    <option value="chestnut">Chestnut</option>
                    <option value="red">Red</option>
                    <option value="grey">Grey</option>
                    <option value="white">White</option>
                  </select>
                </div>
                <div class="form-group" v-if="type === 'hand'">
                  <label for="handedness" 
                         class="control-label">
                    What is their handedness?
                  </label>
                  <select class="form-control" 
                          name="handedness"
                          required
                          v-bind:disabled="member < 0"
                          v-model="handedness">
                    <option value="-1" selected disabled>Please Choose</option>
                    <option value="right-handed">Right-handed</option>
                    <option value="left-handed">Left-handed</option>
                    <option value="mixed-handed">Mixed-handed</option>
                    <option value="ambidextrous">Ambidextrous</option>
                    <option value="ambilevous">Ambilevous</option>
                  </select>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" 
                        class="btn btn-secondary" 
                        v-on:click="closeModal">
                  Close
                </button>
                <button type="submit" 
                        class="btn btn-primary">{{button}}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </transition>
  `,
    props: {
      family: {
        type: Array,
        required: true
      },
      type: {
        type: String,
        required: true
      },
      mem: {
        type: Number,
        required: false,
        default: -1
      },
      eye: {
        required: false,
        default: -1
      },
      hair: {
        required: false,
        default: -1
      },
      hand: {
        required: false,
        default: -1
      }
    },
    data() {
      return {
        member: this.mem,
        eyeColour: this.eye,
        hairColour: this.eye,
        handedness: this.hand
      }
    },
    computed: {
      title() {
        return this.type === "eye"
          ? "Please tell us about eyes"
          : this.type === "hair"
            ? "Please tell us about hair"
            : "Please tell us about handedess"
      },
      button() {
        const str = this.mem === -1 ? "Add " : "Update ";
        return str + (this.type === "eye"
          ? "Eye Colour"
          : this.type === "hair"
            ? "Hair Colour"
            : "Handedness")

      }
    },
    methods: {
      closeModal() {
        this.$emit('close-modal');
      },
      onSubmit() {
        this.$store.commit('updateValue', {
          index: this.member,
          type: 'multiple',
          attribute: this.type,
          value: this.type === 'eye'
            ? this.eyeColour
            : this.type === 'hair'
              ? this.hairColour
              : this.handedness,

        });
        this.member = -1;
        this.eyeColour = -1;
        this.hairColour = -1;
        this.handedness = -1;
        this.closeModal();
      }
    }
  });

  const MultipleTable = Vue.component('multiple-table', {
    template: `
    <div>
      <div class="page-header">
        <h1>Thank you again <small>for taking part in this test, you're very nearly done.</small></h1>
        <p>If you can see three tables below, then you're ready to go. We'd like you to add some details to the family by clicking the buttons under each table. You (as Dr 08 08) have brown hair, brown eyes and you're left-handed. The rest of your family has these details:</p>
        <ul>
          <li>Dr. 09 09 is somewhat odd with silver eyes, white hair and is ambidextrous (I'm not sure I'd trust them <abbr title="To Be Honest">TBH</abbr>).</li>
          <li>Dr. 10 10 had a rather tragic accident, perhaps due to being ambilevous, and has no eyes or hair as a result.</li>
          <li>Dr. 11 11 is right-handed and has brown hair and eyes.</li>
        </ul>
        <p>If you could provide the details and be mindful about how the process feels to you, perhaps concerning how the other version felt if you've already entered the data there, then get back to us, we'd be grateful. I'll be sharing this on Facebook so putting comment there will suffice, but please try entering the data in both ways before commenting.</p>
        <p>We appreciate that the scenario is contrived, but it's just a made-up use case, and no data you enter is saved to a server, it's all in the browser. The initial page does make use of local storage so that the details of the family is maintained between sessions.</p>
      </div>
      <div class="card mb-3">
        <div class="card-header">About the eyes in your family</div>
        <div class="card-body">
          <table class="table table-bordered table-striped table-condensed">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Eye Colour</th>
                <th scope="col" class="fifth">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(member, index) in family" 
                  v-bind:key="index"
                  v-if="member.multiple.eye !== null">
                <td>{{member.title}} {{member.forename}} {{member.surname}}</td>
                <td>{{capitalise(member.multiple.eye)}}</td>
                <td class="fifth">
                  <div class="pull-right btn-group btn-group-sm" 
                       role="group">
                    <button type="button" 
                            class="btn btn-danger"
                            v-on:click="nullAttribute(index, 'eye')">
                      <i class="fa fa-trash" title="Remove"></i> 
                      Remove
                    </button>
                    <button type="button" 
                            class="btn btn-primary"
                            v-on:click="openModal('update', 'eye', index)">
                      <i class="fa fa-edit" title="Edit"></i>
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
      <div class="card mb-3">
        <div class="card-header">About the hair in your family</div>
        <div class="card-body">
          <table class="table table-bordered table-striped table-condensed">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Hair Colour</th>
                <th scope="col" class="fifth">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(member, index) in family" 
                  v-bind:key="index"
                  v-if="member.multiple.hair !== null">
                <td>{{member.title}} {{member.forename}} {{member.surname}}</td>
                <td> {{ capitalise(member.multiple.hair) }} </td>
                <td class="fifth">
                  <div class="pull-right btn-group btn-group-sm" 
                       role="group">
                    <button type="button" 
                            class="btn btn-danger"
                            v-on:click="nullAttribute(index, 'hair')">
                      <i class="fa fa-trash" title="Remove"></i> 
                      Remove
                    </button>
                    <button type="button" 
                            class="btn btn-primary"
                            v-on:click="openModal('update', 'hair', index)">
                      <i class="fa fa-edit" title="Edit"></i>
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
      <div class="card mb-3">
        <div class="card-header">About the handedness in your family</div>
        <div class="card-body">
          <table class="table table-bordered table-striped table-condensed">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Handedness</th>
                <th scope="col" class="fifth">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(member, index) in family" 
                  v-bind:key="index"
                  v-if="member.multiple.hand !== null">
                <td>{{member.title}} {{member.forename}} {{member.surname}}</td>
                <td>{{capitalise(member.multiple.hand)}}</td>
                <td class="fifth">
                  <div class="pull-right btn-group btn-group-sm" 
                       role="group">
                    <button type="button" 
                            class="btn btn-danger"
                            v-on:click="nullAttribute(index, 'hand')">
                      <i class="fa fa-trash" title="Remove"></i> 
                      Remove
                    </button>
                    <button type="button" 
                            class="btn btn-primary"
                            v-on:click="openModal('update', 'hand', index)">
                      <i class="fa fa-edit" title="Edit"></i>
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
      <button class="btn btn-primary btn-lg btn-block"
              v-on:click="$router.push({name: 'home'})">
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
      closeModal(){
        this.showModal = false;
        this.selectedMember = -1;
        this.eye = -1;
        this.hair = -1;
        this.hand = -1;
        this.localFamily = null;
      },
      openModal(type, attribute, index){
        this.modalType = attribute;
        if (type === 'add') {
          this.localFamily = [...this.family];
          this.localFamily.forEach(function (element) {
            if (element.multiple[attribute] !== null) {
              element.disabled = true;
            } else {
              delete element.disabled;
            }
          });
          this.showModal = true;
        }
        if (type === 'update') {
          this.localFamily = [...this.family];
          this.localFamily.forEach(function (element, i) {
            if (i !== index) {
              element.disabled = true;
            }
          });
          this[attribute] = this.family[index].multiple[attribute];
          this.selectedMember = index;
          this.showModal = true;
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

  const router = new VueRouter({
    routes: [
      { 
        path: '/', 
        name: 'home', 
        component: Home 
      },
      { 
        path: '/single', 
        name: 'table', 
        component: SingleTable 
      },
      { 
        path: '/multiple', 
        name: 'tables', 
        component: MultipleTable 
      }
    ]
  });

  Vue.config.devtools = true;

  Vue.use(VueRouter);

  new Vue({
    el: '#app',
    store,
    router,
    beforeCreate() {
  		this.$store.commit('initialiseStore');
  	}
  });

}());
