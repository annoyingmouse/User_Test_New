export const AddMember = Vue.component('add-member', {
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
  `,
  props: {
    buttonText: {
      type: String,
      required: true
    },
    user: {
      type: Object,
      required: false,
      default: {
        index: null,
        title: '',
        forename: '',
        surname: '',
        dob: ''
      }
    }
  },
  computed: {
    buttonText() {
      return user ? 'Update Family Member' : 'Add Family Member'
    }
  },
  data() {
    return {
      title: '',
      forename: '',
      surname: '',
      dob: '',
    }
  }
});