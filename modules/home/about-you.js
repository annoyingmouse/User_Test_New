export const AboutYou = Vue.component('about-you', {
  template: `
    <div class="panel panel-default">
      <div class="panel-heading">About you</div>
      <div class="panel-body">
        <div class="form-group">
          <label for="ownTitle" 
                  class="col-sm-2 control-label">
            Your Title
          </label>
          <div class="col-sm-10">
            <select class="form-control" 
                    name="ownTitle" 
                    v-model="ownTitle" 
                    required>
              <option value="">Please Choose</option>
              <option value="Dr.">Dr.</option>
              <option value="Mr.">Mr.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Miss.">Miss.</option>
              <option value="Ms.">Ms.</option>
            </select>
          </div>
        </div>
        <div class="form-group">
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
        <div class="form-group">
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
        <div class="form-group">
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
      get () {
        return this.$store.state.user.title
      },
      set (value) {
        this.$store.commit('updateTitle', value)
      }
    },
    ownForename: {
      get () {
        return this.$store.state.user.forename
      },
      set (value) {
        this.$store.commit('updateForename', value)
      }
    },
    ownSurname: {
      get () {
        return this.$store.state.user.surname
      },
      set (value) {
        this.$store.commit('updateSurname', value)
      }
    },
    ownDob: {
      get () {
        return this.$store.state.user.dob
      },
      set (value) {
        this.$store.commit('updateDob', value)
      }
    }
  }
})