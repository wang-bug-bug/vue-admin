import Vue from "vue";
import Vuex from "vuex";
import app from './app'
import login from './login'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {}, 
  modules: {
    app,
    login
  }//模块化
});