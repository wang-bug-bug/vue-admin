import Vue from "vue";
import Vuex from "vuex";
import app from './modules/app'
import login from './modules/login'
import common from './modules/common'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {}, 
  modules: {
    app,
    login,
    common
  }//模块化
});