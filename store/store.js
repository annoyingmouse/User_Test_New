import { Home } from '../modules/home/home.js';
import { SingleTable } from '../modules/single-table/table.js';
import { MultipleTable } from '../modules/multiple-tables/tables.js';

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    currentView: Home,
    family: [
      {
        title: 'Dr.',
        forename: '08',
        surname: '08',
        dob: '0808-08-08',
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
      {
        title: "Dr.",
        forename: "09",
        surname: "09",
        dob: "0909-09-09",
        multiple: {
          eye: "brown",
          hair: "brown",
          hand: "right-handed"
        },
        single: {
          eye: "brown",
          hair: "brown",
          hand: "right-handed"
        }
      },
      {
        title: "Dr.",
        forename: "10",
        surname: "10",
        dob: "1010-10-10",
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
      {
        title: "Dr.",
        forename: "11",
        surname: "11",
        dob: "1111-11-11",
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
    changeView(state, view) {
      if (view === 'table') {
        state.currentView = SingleTable
      }
      if (view === 'tables') {
        state.currentView = MultipleTable
      }
      if (view === 'home') {
        state.currentView = Home
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
      state.family[index][type][attribute] = value
    }
  },
  getters: {
    currentView: state => state.currentView,
    getMemberByIndex: (state) => (i) => state.family[i]
  }
});