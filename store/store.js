import { Home } from '../modules/home/home.js';
import { SingleTable } from '../modules/table.js';
import { MultipleTable } from '../modules/tables.js';

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    currentView: Home,
    user: {
      title: '',
      forename: '',
      surname: '',
      dob: ''
    },
    family: [
      {
        "title": "Dr.",
        "forename": "09",
        "surname": "09",
        "dob": "0909-09-09"
      },
      {
        "title": "Dr.",
        "forename": "10",
        "surname": "10",
        "dob": "1010-10-10"
      },
      {
        "title": "Dr.",
        "forename": "11",
        "surname": "11",
        "dob": "1111-11-11"
      }
    ]
  },
  mutations: {
    changeView(state, view){
      if(view === 'table'){
        state.currentView = SingleTable
      }
      if(view === 'tables'){
        state.currentView = MultipleTable
      }
      if(view === 'home'){
        state.currentView = Home
      }
    },
    updateTitle(state, title){
      state.user.title = title;
    },
    updateForename(state, forename){
      state.user.forename = forename;
    },
    updateSurname(state, surname){
      state.user.surname = surname;
    },
    updateDob(state, dob){
      state.user.dob = dob;
    },
    addMember(state, member){
      state.family.push(member);
    },
    removeMember(state, index){
      state.family.splice(index, 1);
    },
    updateMember(state, { index, member }){
      state.family.splice(index, 1, member);
    }
  },
  getters: {
    currentView: state => state.currentView,
    familyMembers: state => state.family
  }
});