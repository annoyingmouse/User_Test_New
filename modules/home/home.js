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
                  <td>{{member.dob}}</td>
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
      <div v-if="showModal">
        <transition name="modal">
          <div class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-dialog">
                <form class="modal-content"
                      v-on:submit.prevent="onSubmit">
                  <div class="modal-header">
                    <button type="button" 
                            class="close" 
                            v-on:click="closeModal">
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title">
                      Please tell us about the family member
                    </h4>
                  </div>
                  <div class="modal-body">
                    <div class="form-group">
                      <label for="title" 
                             class="control-label">
                        Their Title
                      </label>
                      <select class="form-control" 
                              name="title" 
                              v-model="title"
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
                             v-model="forename">
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
                             v-model="surname">
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
                             v-model="dob">
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button v-on:click="closeModal" 
                            type="button" 
                            class="btn btn-default" 
                            data-dismiss="modal">
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
      </div>
       -->
      <add-member v-if="showModal"></add-member>
    </div>
  `,
  methods: {
    changePage(page) {
      this.$store.commit('changeView', page)  
    },
    closeModal() {
      this.editingIndex = null;
      this.showModal = false;
      this.title = '';
      this.forename = '';
      this.surname = '';
      this.dob = '';
      this.buttonText = 'Add Family Member';
    },
    onSubmit() {
      const member = {
        title: this.title,
        forename: this.forename,
        surname: this.surname,
        dob: this.dob,
      }
      if(this.buttonText === 'Update Family Member'){
        const index = this.editingIndex
        this.$store.commit('updateMember', {
          index,
          member
        });
      }else{
        this.$store.commit('addMember', member);
      }
      this.closeModal()
    },
    removeMember(index){
      this.$store.commit('removeMember', index)
    },
    updateMember(index){
      this.buttonText = 'Update Family Member'
      this.editingIndex = index;
      this.showModal = true;
      this.title = this.familyMembers[index].title;
      this.forename = this.familyMembers[index].forename;
      this.surname = this.familyMembers[index].surname;
      this.dob = this.familyMembers[index].dob;
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
    PageHeader,
    AboutYou
  },
  data() {
    return {
      buttonText: 'Add Family Member',
      editingIndex: null,
      title: '',
      forename: '',
      surname: '',
      dob: '',
      showModal: false,
      target: null
    }
  }
});