import PageHeader from './main-page-header.js';
import { AboutYou } from './about-you.js';
import { AddMember } from './add-member-modal.js';

export const Home = Vue.component('home', {
  template: `
    <div>
      <page-header></page-header>
      <form class="form-horizontal" 
            id="familyForm"
            v-on:submit.prevent="onPageChange">
        <about-you></about-you>
        <div class="panel panel-default">
          <div class="panel-heading">
            About your family
          </div>
          <div class="panel-body">
            <table id="YourFamily" 
                   class="table table-bordered table-striped table-condensed">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date of Birth</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(member, index) in familyMembers" 
                    v-bind:key="index">
                  <td>{{member.title}} {{member.forename}} {{member.surname}}</td>
                  <td>{{new Date(member.dob).toLocaleDateString('en-GB')}}</td>
                  <td class="min">
                    <div class="pull-right btn-group btn-group-sm" 
                         role="group">
                      <button type="button" 
                              class="btn btn-danger"
                              v-on:click="removeMember(index)">
                        <i class="glyphicon glyphicon-remove" title="Remove"></i> 
                        Remove
                      </button>
                      <button type="button" 
                              class="btn btn-primary"
                              v-on:click="updateMember(index)">
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
                    v-on:click="showModal = true"
                    data-backdrop="static">
                Add Family Member
            </button>
          </div>
        </div>
        <div class="well">
          <p>There are two buttons below, they both allow you to enter further, detailed, information about your family. It'd be really great if you could try both ways and get back to us about which you prefer, and perhaps why you prefer one over the other. Please be aware that we don't have a preference, we're simply trying to find the best way for people to enter data.</p>
        </div>
        <div class="row">
          <div class="col-xs-12">
            <button type="submit" 
                    class="btn btn-primary pull-left" 
                    v-on:click="target = 'tables'">
              Add Details - TABLES
            </button>
            <button type="submit" 
                    class="btn btn-primary pull-right" 
                    v-on:click="target = 'table'">
              Add Details - TABLE
            </button>
          </div>
        </div>
      </form> 
      <!-- Modal -->
      <add-member v-if="showModal"
                  v-bind:member="member"
                  v-on:close-modal="closeModal"></add-member>
    </div>
  `,
  methods: {
    changePage(page) {
      this.$store.commit('changeView', page)  
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
    removeMember(index){
      this.$store.commit('removeMember', index)
    },
    updateMember(index){
      this.member = {...this.familyMembers[index]}
      this.member.index = index;
      this.showModal = true;
    },
    onPageChange() {
      this.$store.commit('changeView', this.target);
    }
  },
  computed: {
    familyMembers: {
      get () {
        return this.$store.state.family
      }
    }
  },
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
      showModal: false,
      target: null
    }
  }
});