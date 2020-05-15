export const AttributeTable = Vue.component('attribute-table', {
  template: `
    <v-data-table v-bind:headers="headers"
                  v-bind:items="family"
                  v-bind:items-per-page="5"
                  class="mb-3 elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="primary white--text">
          <v-toolbar-title>
            <h3>{{tableTitle}}</h3>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" 
                    max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="secondary" 
                     dark 
                     class="mb-2" 
                     v-on="on">
                {{newButton}}
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Blah blah blah, fix this</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-form ref="form">
                    <v-select v-model="member"
                              v-bind:items="family"
                              v-bind:rules="[v => !!v || 'Item is required']"
                              label="Their title"
                              required>
                    </v-select>
                  </v-form>
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
      <template #item.attribute="{ item }">
        <template v-if="type === 'eye'">
          {{capitalise(item.multiple.eye)}}
        </template>
        <template v-if="type === 'hair'">
          {{capitalise(item.multiple.hair)}}
        </template>
        <template v-if="type === 'hand'">
          {{capitalise(item.multiple.hand)}}
        </template>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small
                v-on:click="deleteItem(item)">
                mdi-delete
        </v-icon>
        <v-icon small
                class="mr-2"
                v-on:click="editItem(item)">
                mdi-pencil
        </v-icon>            
      </template>
    </v-data-table>
  `,
  props:{
    type: {
      type: String,
      required: true
    }
  },
  computed: {
    tableTitle () {
      return `About the ${this.type === 'eye' ? 'eye colour' : this.type === 'hair' ? 'hair colour' : 'handedness'} in your family `
    },
    newButton () {
      return `Add ${this.type === 'hand' ? 'handedness' : this.type} details`
    },
    ...Vuex.mapState(['family'])
  },
  methods: {
    capitalise(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    close () {
      this.dialog = false
      this.$refs.form.resetValidation()
      this.$nextTick(() => {
        this.member = null
      })
    },
    save () {
      this.close()
    }
  },
  data() {
    return {
      dialog: false,
      member: null,
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: true,
          value: 'full_name',
        },
        { 
          text: (this.type === 'eye' ? 'Eye colour' : this.type === 'hair' ? 'Hair colour': 'Handedness'), 
          value: 'attribute' 
        },
        { 
          text: 'Actions', 
          value: 'actions', 
          sortable: false 
        }
      ],
    }
  }
})