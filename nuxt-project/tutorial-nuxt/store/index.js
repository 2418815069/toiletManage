import axios from 'axios';
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => ({
  list: [],
  fetched: false,
});

export const mutations = {
  set (state, todos) {
    state.list = todos;
    state.fetched = true;
  },
};

export const actions = {
  async fetchUsers({ commit }) {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/users')
    commit('set', data);
  },
}

export const getters = {
  userById: (state) => (id) => {
    return state.list.find(user => user.id == id);
  },
  isFetched: state => {
    return !!state.fetched;
  },
}
