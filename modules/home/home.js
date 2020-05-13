import PageHeader from './page-header.js';
import { AboutYou } from './about-you.js';
import { AddMember } from './add-member-modal.js';

export const Home = Vue.component('home', {
  template: `
    <div>
      <page-header></page-header>
      
        <form id="familyForm"
              v-on:submit.prevent="onPageChange">
          <about-you></about-you>
          <v-card>
            <v-card-text>
              <v-data-table v-bind:headers="headers"
                            v-bind:items="family.slice(1)"
                            v-bind:items-per-page="5">
                <template v-slot:top>
                  <v-toolbar flat color="white">
                    <v-toolbar-title>About your family</v-toolbar-title>
                    <v-divider class="mx-4"
                               inset
                               vertical>
                    </v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="500px">
                      <template v-slot:activator="{ on }">
                        <v-btn color="primary" 
                               dark 
                               class="mb-2" 
                               v-on="on">
                          New family member
                        </v-btn>
                      </template>
                      <v-card>
                        <v-card-title>
                          <span class="headline">{{ formTitle }}</span>
                        </v-card-title>
                        <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" 
                                   sm="6" 
                                   md="4">
                              <v-select v-model="editedItem.title"
                                        v-bind:items="titles"
                                        v-bind:rules="[v => !!v || 'Item is required']"
                                        label="Your title"
                                        required>
                              </v-select>
                          </v-col>
                          <v-col cols="12" 
                                 sm="6" 
                                 md="4">
                            <v-text-field v-model="editedItem.forename"
                                          label="Forename">
                            </v-text-field>
                          </v-col>
                          <v-col cols="12" 
                                 sm="6" 
                                 md="4">
                            <v-text-field v-model="editedItem.surname"
                                          label="Surname">
                            </v-text-field>
                          </v-col>
                          <v-col cols="12" 
                                 sm="6" 
                                 md="4">
                            <v-text-field v-model="editedItem.dob"
                                          label="Date of Birth">
                            </v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                      <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
                <template #item.full_name="{ item }">
                  {{ item.title }} {{ item.forename }} {{ item.surname }}
                </template>
                <template v-slot:item.actions="{ item }">
                  <v-icon small
                          v-on:click="deleteItem(item)">
                    mdi-delete
                  </v-icon>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>



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
      }
    },
    removeMember(index) {
      this.$store.commit('removeMember', index)
    },
    deleteItem (item) {
      const index = this.family.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.$store.commit('removeMember', index);
    },
    updateMember(index) {
      this.member = { ...this.family[index] }
      this.member.index = index;
      this.showModal = true;
    },
    onPageChange() {
      this.$store.commit('changeView', this.target);
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
    ...Vuex.mapState(['family'])
  },
  components: {
    PageHeader
  },
  data() {
    return {
      titles: [
        "Dr.",
        "Mr.",
        "Mrs.",
        "Miss.",
        "Ms."
      ],
      dialog: false,
      member: {
        index: null,
        title: '',
        forename: '',
        surname: '',
        dob: ''
      },
      showModal: false,
      editedIndex: -1,
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: true,
          value: 'full_name',
        },
        { 
          text: 'Date of Birth', 
          value: 'dob' 
        },
        { 
          text: 'Actions', 
          value: 'actions', 
          sortable: false 
        }
      ],
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
      },
    }
  }
});