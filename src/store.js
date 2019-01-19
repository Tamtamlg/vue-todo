import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    url: "http://localhost:5000/tasks",
    tasks: [],
    isEdit: false,
    isNewTask: false
  },
  mutations: {
    getTasks(state, payload) {
      state.tasks = payload;
    },
    changeEditState(state, payload) {
      state.isEdit = payload;
    },
    toggleNewTask(state, payload) {
      state.isNewTask = payload;
    }
  },
  actions: {
    getTasks({ commit, state }) {
      axios.get(state.url).then(response => {
        if (response.data) {
          commit("getTasks", response.data);
        }
      });
    },
    addTask({ commit, state, dispatch }, payload) {
      const data = {
        title: payload.title,
        projectName: payload.projectName,
        priority: payload.priority,
        description: payload.description
      };
      axios.post(state.url, data).then(() => {
        dispatch("getTasks");
        commit("changeEditState", false);
        commit("toggleNewTask", false);
      });
    },
    editTask({ commit, state, dispatch }, payload) {
      const data = {
        id: payload.id,
        title: payload.title,
        projectName: payload.projectName,
        priority: payload.priority,
        description: payload.description
      };
      axios.put(state.url + `/${payload.id}`, data).then(() => {
        dispatch("getTasks");
        commit("changeEditState", false);
        commit("toggleNewTask", false);
      });
    },
    delTask({ state, dispatch }, payload) {
      axios.delete(state.url + `/${payload}`).then(() => {
        dispatch("getTasks");
      });
    }
  },
  getters: {
    tasks: state => {
      return state.tasks;
    },
    isEdit: state => {
      return state.isEdit;
    }
  }
});
