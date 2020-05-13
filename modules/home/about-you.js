export const AboutYou = Vue.component('about-you', {
  template: `
    <v-card class="mb-3">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="headline">
            About you  
          </v-list-item-title>
        
        </v-list-item-content>
      </v-list-item>
      <v-card-text>
        <v-select v-model="ownTitle"
                  v-bind:items="titles"
                  v-bind:rules="[v => !!v || 'Item is required']"
                  label="Your title"
                  required>
        </v-select>
        <v-text-field v-model="ownForename"
                      v-bind:rules="nameRules"
                      label="Your forename"
                      required>
        </v-text-field>
        <v-text-field v-model="ownSurname"
                      v-bind:rules="nameRules"
                      label="Your surname"
                      required>
        </v-text-field>
        <v-menu ref="menu"
                v-model="menu"
                v-bind:close-on-content-click="false"
                v-bind:return-value.sync="ownDob"
                transition="scale-transition"
                offset-y
                min-width="290px">
          <template v-slot:activator="{ on }">
            <v-text-field v-model="ownDob"
                          label="Date of birth"
                          readonly
                          v-on="on">
            </v-text-field>
          </template>
          <v-date-picker v-model="ownDob">
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(ownDob)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-card-text>
    </v-card>
  `,
  data: () => ({
    titles: [
      "Dr.",
      "Mr.",
      "Mrs.",
      "Miss.",
      "Ms."
    ],
    nameRules: [
      v => !!v || 'Name is required'
    ],
    menu: false
  }),
  computed: {
    ownTitle: {
      get() {
        return this.$store.state.family[0].title
      },
      set(value) {
        this.$store.commit('update', {
          attribute: 'title',
          value
        })
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
        })
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
        })
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
        })
      }
    }
  }
});