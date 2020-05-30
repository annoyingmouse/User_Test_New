"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(function () {
  'use strict';

  Vue.use(Vuex);
  var store = new Vuex.Store({
    state: {
      family: [{
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
      }],
      titles: ['Dr.', 'Mr.', 'Mrs.', 'Miss.', 'Ms.'],
      eyes: ['brown', 'hazel', 'blue', 'green', 'silver', 'amber'],
      hairColour: ['black', 'brown', 'blond', 'auburn', 'chestnut', 'red', 'grey', 'white'],
      handedness: ['right-handed', 'left-handed', 'mixed-handed', 'ambidextrous', 'ambilevous']
    },
    mutations: {
      initialiseStore: function initialiseStore(state) {
        if (localStorage.getItem('store')) {
          this.replaceState(Object.assign(state, JSON.parse(localStorage.getItem('store'))));
        }
      },
      update: function update(state, _ref) {
        var attribute = _ref.attribute,
            value = _ref.value;
        state.family[0][attribute] = value;
      },
      addMember: function addMember(state, member) {
        state.family.push(member);
      },
      removeMember: function removeMember(state, index) {
        state.family.splice(index, 1);
      },
      updateMember: function updateMember(state, _ref2) {
        var index = _ref2.index,
            member = _ref2.member;
        state.family.splice(index, 1, member);
      },
      updateValue: function updateValue(state, _ref3) {
        var index = _ref3.index,
            type = _ref3.type,
            attribute = _ref3.attribute,
            value = _ref3.value;
        state.family[index][type][attribute] = value;
      }
    }
  });
  store.subscribe(function (mutation, state) {
    localStorage.setItem('store', JSON.stringify(state));
  });
  var AboutYou = Vue.component('about-you', {
    template: "\n    <v-card class=\"mb-3\">\n      <v-card-title class=\"primary white--text mb-2\">\n        <h3>\n          About you\n        </h3>\n      </v-card-title>\n      <v-card-text>\n        <v-select v-model=\"title\"\n                  v-bind:items=\"titles\"\n                  v-bind:rules=\"[v => !!v || 'Title is required']\"\n                  label=\"Your title\"\n                  required>\n        </v-select>\n        <v-text-field v-model=\"forename\"\n                      v-bind:rules=\"[v => !!v || 'Forename is required']\"\n                      label=\"Your forename\"\n                      required>\n        </v-text-field>\n        <v-text-field v-model=\"surname\"\n                      v-bind:rules=\"[v => !!v || 'Surname is required']\"\n                      label=\"Your surname\"\n                      required>\n        </v-text-field>\n        <v-menu ref=\"menu\"\n                v-model=\"menu\"\n                v-bind:close-on-content-click=\"false\"\n                v-bind:return-value.sync=\"dob\"\n                transition=\"scale-transition\"\n                offset-y\n                min-width=\"290px\">\n          <template v-slot:activator=\"{ on }\">\n            <v-text-field v-model=\"dob\"\n                          label=\"Date of birth\"\n                          v-bind:rules=\"[v => !!v || 'Date of birth is required']\"\n                          v-on=\"on\">\n            </v-text-field>\n          </template>\n          <v-date-picker v-model=\"dob\">\n            <v-spacer></v-spacer>\n            <v-btn text color=\"primary\" @click=\"menu = false\">Cancel</v-btn>\n            <v-btn text color=\"primary\" @click=\"$refs.menu.save(dob)\">OK</v-btn>\n          </v-date-picker>\n        </v-menu>\n      </v-card-text>\n    </v-card>\n  ",
    data: function data() {
      return {
        menu: false
      };
    },
    computed: _objectSpread({
      title: {
        get: function get() {
          return this.$store.state.family[0].title;
        },
        set: function set(value) {
          this.$store.commit('update', {
            attribute: 'title',
            value: value
          });
        }
      },
      forename: {
        get: function get() {
          return this.$store.state.family[0].forename;
        },
        set: function set(value) {
          this.$store.commit('update', {
            attribute: 'forename',
            value: value
          });
        }
      },
      surname: {
        get: function get() {
          return this.$store.state.family[0].surname;
        },
        set: function set(value) {
          this.$store.commit('update', {
            attribute: 'surname',
            value: value
          });
        }
      },
      dob: {
        get: function get() {
          return this.$store.state.family[0].dob;
        },
        set: function set(value) {
          this.$store.commit('update', {
            attribute: 'dob',
            value: value
          });
        }
      }
    }, Vuex.mapState(['titles']))
  });
  var FullName = Vue.component('full-name', {
    functional: true,
    render: function render(createElement, context) {
      var item = context.props.item;
      return createElement('span', "".concat(item.title, " ").concat(item.forename, " ").concat(item.surname));
    }
  });
  var FamilyTable = Vue.component('family-table', {
    template: "\n    <v-data-table v-bind:headers=\"headers\"\n                  v-bind:items=\"family.slice(1)\"\n                  v-bind:items-per-page=\"5\"\n                  class=\"mb-3 elevation-1\">\n      <template v-slot:top>\n        <v-toolbar flat \n                   color=\"primary white--text\">\n          <v-toolbar-title>\n            <h3>\n              About your family\n            </h3>\n          </v-toolbar-title>\n          <v-spacer></v-spacer>\n          <v-dialog v-model=\"dialog\" \n                    max-width=\"500px\">\n            <template v-slot:activator=\"{ on }\">\n              <v-btn color=\"secondary\" \n                     dark \n                     class=\"mb-2\" \n                     v-on=\"on\">\n                New family member\n              </v-btn>\n            </template>\n            <v-card>\n              <v-card-title>\n                <span class=\"headline\">\n                  {{ formTitle }}\n                </span>\n              </v-card-title>\n              <v-card-text>\n                <v-container>\n                  <v-form ref=\"form\">\n                    <v-select v-model=\"editedItem.title\"\n                              v-bind:items=\"titles\"\n                              v-bind:rules=\"[v => !!v || 'Item is required']\"\n                              label=\"Their title\"\n                              required>\n                    </v-select>\n                    <v-text-field v-model=\"editedItem.forename\"\n                                  label=\"Their forename\"\n                                  v-bind:rules=\"nameRules\"\n                                  required>\n                    </v-text-field>\n                    <v-text-field v-model=\"editedItem.surname\"\n                                  label=\"Their surname\"\n                                  v-bind:rules=\"nameRules\"\n                                  required>\n                    </v-text-field>\n                    <v-menu ref=\"menu\"\n                            v-model=\"menu\"\n                            v-bind:close-on-content-click=\"false\"\n                            v-bind:return-value.sync=\"editedItem.dob\"\n                            transition=\"scale-transition\"\n                            offset-y\n                            min-width=\"290px\">\n                      <template v-slot:activator=\"{ on }\">\n                        <v-text-field v-model=\"editedItem.dob\"\n                                      label=\"Their date of birth\"\n                                      v-on=\"on\">\n                        </v-text-field>\n                      </template>\n                      <v-date-picker v-model=\"editedItem.dob\">\n                        <v-spacer></v-spacer>\n                        <v-btn text \n                               color=\"primary\" \n                               v-on:click=\"menu = false\">\n                          Cancel\n                        </v-btn>\n                        <v-btn text \n                               color=\"primary\" \n                               v-on:click=\"$refs.menu.save(editedItem.dob)\">\n                          OK\n                        </v-btn>\n                      </v-date-picker>\n                    </v-menu>\n                  </v-form>\n                </v-container>\n              </v-card-text>\n              <v-card-actions>\n                <v-spacer></v-spacer>\n                <v-btn text \n                       color=\"blue darken-1\" \n                       v-on:click=\"close\">\n                  Cancel\n                </v-btn>\n                <v-btn text \n                       color=\"blue darken-1\" \n                       v-on:click=\"save\">\n                  Save\n                </v-btn>\n              </v-card-actions>\n            </v-card>\n          </v-dialog>\n        </v-toolbar>\n      </template>\n      <template v-slot:item.full_name=\"{ item }\">\n        <full-name v-bind:item=\"item\"/>\n      </template>\n      <template v-slot:item.date_of_birth=\"{ item }\">\n        {{new Date(item.dob).toLocaleDateString('en-GB')}}\n      </template>\n      <template v-slot:item.actions=\"{ item }\">\n        <v-btn-toggle class=\"ma-1\">\n          <v-btn small\n                 color=\"red accent-4\"\n                 class=\"white--text\"\n                 v-on:click=\"deleteItem(item)\">\n            <v-icon small \n                    color=\"white\">\n              mdi-delete\n            </v-icon>\n            Delete\n          </v-btn>\n          <v-btn small\n                 color=\"primary\"\n                 class=\"white--text\"\n                 v-on:click=\"editItem(item)\">\n            <v-icon small \n                    color=\"white\">\n              mdi-pencil\n            </v-icon>\n            Edit\n          </v-btn>\n        </v-btn-toggle>\n      </template>\n    </v-data-table>\n  ",
    computed: _objectSpread({
      formTitle: function formTitle() {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
      }
    }, Vuex.mapState(['family', 'titles'])),
    components: {
      FullName: FullName
    },
    methods: {
      close: function close() {
        var _this = this;

        this.dialog = false;
        this.$refs.form.resetValidation();
        this.$nextTick(function () {
          _this.editedItem = Object.assign({}, _this.defaultItem);
          _this.editedIndex = -1;
        });
      },
      save: function save() {
        if (this.$refs.form.validate()) {
          if (this.editedIndex > -1) {
            this.$store.commit('updateMember', {
              index: this.editedIndex,
              member: this.editedItem
            });
          } else {
            this.$store.commit('addMember', this.editedItem);
          }

          this.close();
        }
      },
      editItem: function editItem(item) {
        this.editedIndex = this.family.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialog = true;
      },
      deleteItem: function deleteItem(item) {
        var index = this.family.indexOf(item);
        confirm('Are you sure you want to delete this item?') && this.$store.commit('removeMember', index);
      }
    },
    data: function data() {
      return {
        nameRules: [function (v) {
          return !!v || 'Name is required';
        }],
        menu: false,
        dialog: false,
        showModal: false,
        editedIndex: -1,
        headers: [{
          text: 'Name',
          align: 'start',
          sortable: true,
          value: 'full_name'
        }, {
          text: 'Date of Birth',
          sortable: false,
          value: 'date_of_birth'
        }, {
          text: 'Actions',
          value: 'actions',
          sortable: false,
          width: 1,
          align: 'center'
        }],
        editedItem: {
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
        },
        defaultItem: {
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
      };
    }
  });
  var Home = Vue.component('home', {
    template: "\n    <div>\n      <h1>Thank you \n        <small class=\"grey--text lighten-1\">for taking part in this test.</small>\n      </h1>\n      <p>We're doing some testing on how easy it is for our users to input the members of a family and their details so we'd be grateful if you could imagine you are Dr. 08 08 with a <abbr title=\"Date of Birth\">DOB</abbr> of 08/08/0808 (you're looking perfect for your age). Further, your family is like this:</p>\n      <ul>\n        <li>Your partner is Dr. 09 09, who was born on 09/09/0909.</li>\n        <li>One child is Dr. 10 10 who was born on 10/10/1010 (they are not in the least bit lucky - more will be revealed).</li>\n        <li>The other child is Dr. 11 11 who was born on (you've guessed it, haven't you?) 11/11/1111.</li>\n      </ul>\n      <p>Please use the two boxes below to enter details about you and your family then, when you're happy with the details you've provided, use the buttons at the bottom with the titles of <strong>Add Details</strong> to tell us more about you and your family. One uses one table to enter the data (<strong>Add Details - TABLE</strong>); the other uses multiple tables (<strong>Add Details - TABLES</strong>). We don't have a preference for either as they both involve pretty much the same work, but we're interested in which is the easiest and most pleasant to use.</p>\n      <v-form ref=\"form\">\n        <about-you/>\n        <family-table/>\n        <v-card class=\"mb-3\">\n          <v-card-text>\n            <p>There are two buttons below, they both allow you to enter further, detailed, information about your family. It'd be great if you could try both ways and get back to us about which you prefer, and perhaps why you prefer one over the other. Please be aware that we don't have a preference; we're merely trying to find the best way for people to enter data.</p>\n          </v-card-text>\n        </v-card>\n        <div class=\"d-flex justify-space-between mb-6\">\n          <v-btn x-large \n                 color=\"primary\" \n                 dark\n                 v-on:click=\"moveTo('tables')\">\n            Add Details - TABLES\n          </v-btn>\n          <v-btn x-large \n                 color=\"primary\" \n                 dark\n                 v-on:click=\"moveTo('table')\">\n            Add Details - TABLE\n          </v-btn>\n        </div>\n      </v-form> \n    </div>\n  ",
    methods: {
      moveTo: function moveTo(page) {
        if (this.$refs.form.validate()) {
          this.$router.push({
            name: page
          });
        }
      }
    },
    components: {
      AboutYou: AboutYou,
      FamilyTable: FamilyTable
    }
  });
  var AttributeButton = Vue.component('attribute-button', {
    template: "\n    <span>\n      <v-btn v-if=\"!capitalisedValue\"\n             small\n             color=\"primary light\"\n             v-on:click=\"$emit('click')\">\n        Add {{label}}\n      </v-btn>\n      <v-btn v-else\n             small \n             class=\"secondary\"\n             v-on:click=\"$emit('click')\">\n        {{capitalisedValue}}\n        <v-divider color=\"white\" \n                   class=\"mx-2\"\n                   vertical/> \n        <i class=\"fa fa-edit\" title=\"Edit\"></i>\n        Edit {{label}}\n      </v-btn>\n    </span>\n  ",
    props: {
      type: {
        type: String,
        required: true
      },
      value: {
        type: String,
        required: false
      }
    },
    computed: {
      capitalisedValue: function capitalisedValue() {
        return this.value ? this.value.charAt(0).toUpperCase() + this.value.slice(1) : '';
      },
      label: function label() {
        return this.type === 'eye' ? 'eye colour' : this.type === 'hair' ? 'Hair colour' : 'handedness';
      }
    }
  });
  var SingleTable = Vue.component('single-table', {
    template: "\n    <div>\n      <h1>\n        Thank you again \n        <small class=\"grey--text lighten-1\">for taking part in this test, you're very nearly done.</small>\n      </h1>\n      <p>If you can see a table below with four people in it (Doctors 08 08 (08/08/0808), 09 09 (09/09/0909), 10 10 (10/10/1010) and 11 11 (11/11/1111)), then you're ready to go. We'd like you to add some details to the family. You (as Dr 08 08) have brown hair, brown eyes and you're left-handed. The rest of your family has these details:</p>\n      <ul>\n        <li>Dr. 09 09 is somewhat odd with silver eyes, white hair and is ambidextrous (I'm not sure I'd trust them <abbr title=\"To Be Honest\">TBH</abbr>).</li>\n        <li>Dr. 10 10 had a rather tragic accident, perhaps due to being ambilevous, and has no eyes or hair as a result.</li>\n        <li>Dr. 11 11 is right-handed and has brown hair and eyes.</li>\n      </ul>\n      <p>If you could provide the details and be mindful about how the process feels to you, perhaps concerning how the other version felt if you've already entered the data there, then get back to us, we'd be grateful. I'll be sharing this on Facebook so putting comment there will suffice, but please try entering the data in both ways before commenting.</p>\n      <p>We appreciate that the scenario is contrived, but it's just a made-up use case, and no data you enter is saved to a server, it's all in the browser. The initial page does make use of local storage so that the details of the family is maintained between sessions.</p>\n      <v-data-table v-bind:headers=\"headers\"\n                    v-bind:items=\"family\"\n                    v-bind:items-per-page=\"5\"\n                    class=\"mb-3 elevation-1\">\n        <template v-slot:top>\n          <v-toolbar flat \n                     color=\"primary white--text\">\n            <v-toolbar-title>\n              <h3>\n                About your family\n              </h3>\n            </v-toolbar-title>\n          </v-toolbar>\n        </template>\n        <template v-slot:item.full_name=\"{ item }\">\n          <full-name v-bind:item=\"item\"/>\n        </template>\n        <template v-slot:item.eye_colour=\"{ item }\">\n          <attribute-button type=\"eye\"\n                            v-bind:value=\"item.single.eye\"\n                            v-on:click=\"openModal('eye', item)\"/>\n        </template>\n        <template v-slot:item.hair_colour=\"{ item }\">\n          <attribute-button type=\"hair\"\n                            v-bind:value=\"item.single.hair\"\n                            v-on:click=\"openModal('hair', item)\"/>\n        </template>\n        <template v-slot:item.handedness=\"{ item }\">\n          <attribute-button type=\"hand\"\n                            v-bind:value=\"item.single.hand\"\n                            v-on:click=\"openModal('hand', item)\"/>\n        </template>\n      </v-data-table>\n      <v-dialog v-model=\"dialog\" \n                max-width=\"500px\">\n        <v-card>\n          <v-card-title>\n            <span class=\"headline\">{{modalHeadline}}</span>\n          </v-card-title>\n          <v-card-text>\n            <v-container>\n              <v-form ref=\"form\">\n                <v-switch v-if=\"type === 'eye' || type === 'hair'\"\n                          v-model=\"enabled\" \n                          v-bind:label=\"enabledLabel\"></v-switch>\n                <v-select v-if=\"type === 'eye'\" \n                          v-model=\"eye\"\n                          v-bind:disabled=\"!enabled\"\n                          v-bind:items=\"eyes\"\n                          v-bind:rules=\"[v => !!v || 'Eye colour is required']\"\n                          label=\"Their eye colour\"\n                          required>\n                </v-select>\n                <v-select v-if=\"type === 'hair'\" \n                          v-model=\"hair\"\n                          v-bind:disabled=\"!enabled\"\n                          v-bind:items=\"hairColour\"\n                          v-bind:rules=\"[v => !!v || 'Hair colour is required']\"\n                          label=\"Their hair colour\"\n                          required>\n                </v-select>\n                <v-select v-if=\"type === 'hand'\" \n                          v-model=\"hand\"\n                          v-bind:items=\"handedness\"\n                          v-bind:rules=\"[v => !!v || 'Handedness is required']\"\n                          label=\"Their handedness\"\n                          required>\n                </v-select>\n              </v-form>\n            </v-container>\n          </v-card-text>\n          <v-card-actions>\n            <v-spacer></v-spacer>\n            <v-btn color=\"blue darken-1\" \n                   text \n                   v-on:click=\"close\">Cancel</v-btn>\n            <v-btn color=\"blue darken-1\" \n                   text \n                   v-on:click=\"save\">Save</v-btn>\n          </v-card-actions>\n        </v-card>\n      </v-dialog>\n      <v-btn block \n             x-large\n             color=\"primary\"\n             class=\"mb-6\"\n             v-on:click=\"$router.push({\n               name: 'home'\n             })\">\n        Go Back\n      </v-btn>\n    </div>\n  ",
    data: function data() {
      return {
        headers: [{
          text: 'Name',
          align: 'start',
          sortable: true,
          value: 'full_name'
        }, {
          text: 'Eye colour',
          value: 'eye_colour',
          width: 1,
          align: 'center'
        }, {
          text: 'Hair colour',
          value: 'hair_colour',
          width: 1,
          align: 'center'
        }, {
          text: 'Handedness',
          value: 'handedness',
          width: 1,
          align: 'center'
        }],
        dialog: false,
        enabled: false,
        type: null,
        member: null,
        eye: null,
        hair: null,
        hand: null
      };
    },
    computed: _objectSpread({
      enabledLabel: function enabledLabel() {
        var _this$member, _this$member2, _this$member3;

        return "\n        ".concat((_this$member = this.member) === null || _this$member === void 0 ? void 0 : _this$member.title, " \n        ").concat((_this$member2 = this.member) === null || _this$member2 === void 0 ? void 0 : _this$member2.forename, " \n        ").concat((_this$member3 = this.member) === null || _this$member3 === void 0 ? void 0 : _this$member3.surname, " \n        has ").concat(this.type === 'eye' ? 'eyes' : 'hair');
      },
      modalHeadline: function modalHeadline() {
        return "".concat(this.type === 'eye' ? 'Eye colour' : this.type === 'hair' ? 'Hair colour' : 'Handedness');
      }
    }, Vuex.mapState(['family', 'eyes', 'hairColour', 'handedness'])),
    components: {
      FullName: FullName,
      AttributeButton: AttributeButton
    },
    methods: {
      capitalise: function capitalise(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      },
      closeModal: function closeModal() {
        this.showModal = false;
      },
      openModal: function openModal(attribute, item) {
        this.type = attribute;
        this.enabled = !!item.single[attribute];
        this[attribute] = item.single[attribute];
        this.member = item;
        this.dialog = true;
      },
      close: function close() {
        var _this2 = this;

        this.dialog = false;
        this.$refs.form.resetValidation();
        this.$nextTick(function () {
          _this2.enabled = false;
          _this2.member = null;
          _this2.eye = null;
          _this2.hair = null;
          _this2.hand = null;
        });
      },
      save: function save() {
        if (this.$refs.form.validate()) {
          if ((this.type === 'eye' || this.type === 'hair') && !this.enabled) {
            console.log("null it");
          }

          this.$store.commit('updateValue', {
            index: this.family.indexOf(this.member),
            type: 'single',
            attribute: this.type,
            value: (this.type === 'eye' || this.type === 'hair') && !this.enabled ? null : this.type === 'eye' ? this.eye : this.type === 'hair' ? this.hair : this.hand
          });
          this.close();
        }
      }
    }
  });
  var AttributeTable = Vue.component('attribute-table', {
    template: "\n    <v-data-table v-bind:headers=\"headers\"\n                  v-bind:items=\"family.filter(f => f.multiple[type])\"\n                  v-bind:items-per-page=\"5\"\n                  class=\"mb-3 elevation-1\">\n      <template v-slot:top>\n        <v-toolbar flat color=\"primary white--text\">\n          <v-toolbar-title>\n            <h3>{{tableTitle}}</h3>\n          </v-toolbar-title>\n          <v-spacer></v-spacer>\n          <v-dialog v-model=\"dialog\" \n                    max-width=\"500px\">\n            <template v-slot:activator=\"{ on }\">\n              <v-btn color=\"secondary\" \n                     dark \n                     class=\"mb-2\" \n                     v-on=\"on\">\n                {{newButton}}\n              </v-btn>\n            </template>\n            <v-card>\n              <v-card-title>\n                <span class=\"headline\">{{modalHeadline}}</span>\n              </v-card-title>\n              <v-card-text>\n                <v-container>\n                  <v-form ref=\"form\">\n                    <v-select v-model=\"member\"\n                              v-bind:items=\"member ? [member] : family.filter(f => !f.multiple[type])\"\n                              v-bind:rules=\"[v => !!v || 'Item is required']\"\n                              item-text=\"full_name\"\n                              label=\"Family member\"\n                              return-object\n                              required>\n                    </v-select>\n                    <v-select v-if=\"type === 'eye'\" \n                              v-model=\"eye\"\n                              v-bind:items=\"eyes\"\n                              v-bind:rules=\"[v => !!v || 'Eye colour is required']\"\n                              label=\"Their eye colour\"\n                              required>\n                    </v-select>\n                    <v-select v-if=\"type === 'hair'\" \n                              v-model=\"hair\"\n                              v-bind:items=\"hairColour\"\n                              v-bind:rules=\"[v => !!v || 'Hair colour is required']\"\n                              label=\"Their hair colour\"\n                              required>\n                    </v-select>\n                    <v-select v-if=\"type === 'hand'\" \n                              v-model=\"hand\"\n                              v-bind:items=\"handedness\"\n                              v-bind:rules=\"[v => !!v || 'Handedness is required']\"\n                              label=\"Their handedness\"\n                              required>\n                    </v-select>\n                  </v-form>\n                </v-container>\n              </v-card-text>\n              <v-card-actions>\n                <v-spacer></v-spacer>\n                <v-btn color=\"blue darken-1\" \n                       text \n                       v-on:click=\"close\">Cancel</v-btn>\n                <v-btn color=\"blue darken-1\" \n                       text \n                       v-on:click=\"save\">Save</v-btn>\n              </v-card-actions>\n            </v-card>\n          </v-dialog>\n        </v-toolbar>\n      </template>\n      <template v-slot:item.attribute=\"{ item }\">\n        <template v-if=\"type === 'eye'\">\n          {{capitalise(item.multiple.eye)}}\n        </template>\n        <template v-if=\"type === 'hair'\">\n          {{capitalise(item.multiple.hair)}}\n        </template>\n        <template v-if=\"type === 'hand'\">\n          {{capitalise(item.multiple.hand)}}\n        </template>\n      </template>\n      <template v-slot:item.actions=\"{ item }\">\n        <v-btn-toggle class=\"ma-1\">\n          <v-btn small\n                 color=\"red accent-4\"\n                 class=\"white--text\"\n                 v-on:click=\"deleteAttribute(item)\">\n            <v-icon small \n                    color=\"white\">\n              mdi-delete\n            </v-icon>\n            Delete\n          </v-btn>\n          <v-btn small\n                 color=\"primary\"\n                 class=\"white--text\"\n                 v-on:click=\"editAttribute(item)\">\n            <v-icon small \n                    color=\"white\">\n              mdi-pencil\n            </v-icon>\n            Edit\n          </v-btn>\n        </v-btn-toggle>\n      </template>\n    </v-data-table>\n  ",
    props: {
      type: {
        type: String,
        required: true
      }
    },
    mounted: function mounted() {
      var _this3 = this;

      this.$nextTick(function () {
        _this3.family.forEach(function (f) {
          return f.full_name = "".concat(f.title, " ").concat(f.forename, " ").concat(f.surname);
        });
      });
    },
    computed: _objectSpread({
      tableTitle: function tableTitle() {
        return "About the ".concat(this.type === 'eye' ? 'eye colour' : this.type === 'hair' ? 'hair colour' : 'handedness', " in your family");
      },
      newButton: function newButton() {
        return "Add ".concat(this.type === 'hand' ? 'handedness' : this.type, " details");
      },
      modalHeadline: function modalHeadline() {
        return "".concat(this.type === 'eye' ? 'Eye colour' : this.type === 'hair' ? 'Hair colour' : 'Handedness');
      }
    }, Vuex.mapState(['family', 'eyes', 'hairColour', 'handedness'])),
    methods: {
      deleteAttribute: function deleteAttribute(item) {
        var index = this.family.indexOf(item);
        confirm('Are you sure you want to delete this item?') && this.$store.commit('updateValue', {
          index: index,
          type: 'multiple',
          attribute: this.type,
          value: null
        });
      },
      editAttribute: function editAttribute(item) {
        this.member = item;
        this[this.type] = item.multiple[this.type];
        this.dialog = true;
      },
      capitalise: function capitalise(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      },
      close: function close() {
        var _this4 = this;

        this.dialog = false;
        this.$refs.form.resetValidation();
        this.$nextTick(function () {
          _this4.member = null;
          _this4.eye = null;
          _this4.hair = null;
          _this4.hand = null;
        });
      },
      save: function save() {
        if (this.$refs.form.validate()) {
          this.$store.commit('updateValue', {
            index: this.family.indexOf(this.member),
            type: 'multiple',
            attribute: this.type,
            value: this.type === 'eye' ? this.eye : this.type === 'hair' ? this.hair : this.hand
          });
          this.close();
        }
      }
    },
    data: function data() {
      return {
        dialog: false,
        member: null,
        eye: null,
        hair: null,
        hand: null,
        headers: [{
          text: 'Name',
          align: 'start',
          sortable: true,
          value: 'full_name'
        }, {
          text: this.type === 'eye' ? 'Eye colour' : this.type === 'hair' ? 'Hair colour' : 'Handedness',
          value: 'attribute'
        }, {
          text: 'Actions',
          value: 'actions',
          sortable: false,
          width: 1,
          align: 'center'
        }]
      };
    }
  });
  var MultipleTable = Vue.component('multiple-table', {
    template: "\n    <div>\n      <h1>\n        Thank you again \n        <small class=\"grey--text lighten-1\">for taking part in this test, you're very nearly done.</small>\n      </h1>\n      <p>If you can see three tables below, then you're ready to go. We'd like you to add some details to the family by clicking the buttons under each table. You (as Dr 08 08) have brown hair, brown eyes and you're left-handed. The rest of your family has these details:</p>\n      <ul>\n        <li>Dr. 09 09 is somewhat odd with silver eyes, white hair and is ambidextrous (I'm not sure I'd trust them <abbr title=\"To Be Honest\">TBH</abbr>).</li>\n        <li>Dr. 10 10 had a rather tragic accident, perhaps due to being ambilevous, and has no eyes or hair as a result.</li>\n        <li>Dr. 11 11 is right-handed and has brown hair and eyes.</li>\n      </ul>\n      <p>If you could provide the details and be mindful about how the process feels to you, perhaps concerning how the other version felt if you've already entered the data there, then get back to us, we'd be grateful. I'll be sharing this on Facebook so putting comment there will suffice, but please try entering the data in both ways before commenting.</p>\n      <p>We appreciate that the scenario is contrived, but it's just a made-up use case, and no data you enter is saved to a server, it's all in the browser. The initial page does make use of local storage so that the details of the family is maintained between sessions.</p>\n      <attribute-table type=\"eye\"/>\n      <attribute-table type=\"hair\"/>\n      <attribute-table type=\"hand\"/>\n      <v-btn block \n             x-large\n             color=\"primary\"\n             class=\"mb-6\"\n             v-on:click=\"$router.push({\n               name: 'home'\n             })\">\n        Go Back\n      </v-btn>\n    </div>\n  ",
    computed: Vuex.mapState(['family']),
    data: function data() {
      return {
        localFamily: null,
        selectedMember: -1,
        eye: -1,
        hair: -1,
        hand: -1,
        showModal: false,
        modalType: null
      };
    },
    components: {
      AttributeTable: AttributeTable
    },
    methods: {
      capitalise: function capitalise(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      },
      closeModal: function closeModal() {
        this.showModal = false;
        this.selectedMember = -1;
        this.eye = -1;
        this.hair = -1;
        this.hand = -1;
        this.localFamily = null;
      },
      openModal: function openModal(type, attribute, index) {
        this.modalType = attribute;

        if (type === 'add') {
          this.localFamily = _toConsumableArray(this.family);
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
          this.localFamily = _toConsumableArray(this.family);
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
      nullAttribute: function nullAttribute(index, attribute) {
        this.$store.commit('updateValue', {
          index: index,
          type: 'multiple',
          attribute: attribute,
          value: null
        });
      }
    }
  });
  var router = new VueRouter({
    routes: [{
      path: '/',
      name: 'home',
      component: Home
    }, {
      path: '/single',
      name: 'table',
      component: SingleTable
    }, {
      path: '/multiple',
      name: 'tables',
      component: MultipleTable
    }]
  });
  Vue.config.devtools = true;
  Vue.use(Vuex);
  Vue.use(VueRouter);
  new Vue({
    el: '#app',
    vuetify: new Vuetify({}),
    store: store,
    router: router,
    beforeCreate: function beforeCreate() {
      this.$store.commit('initialiseStore');
    }
  });
})();