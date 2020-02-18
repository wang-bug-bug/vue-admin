import Vue from "vue";
import Vuex from "vuex";
import Cookie from 'cookie_js'
import {
  login
} from '@/api/login/login.js'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isCollapse: JSON.parse(Cookie.get('isCollapse')) || false,
    // isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
    count: 10
  },                                              
  getters: {
    count: state => state.count + 10
  },
  mutations: {
    SET_COLLAPSE(state) {
      state.isCollapse = !state.isCollapse
      Cookie.set('isCollapse', JSON.stringify(state.isCollapse))
      // window.sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))
      //window 可以省略不写   html5本地存储解决浏览器刷新之后菜单展开问题 临时的  localStorage长期必须手动清除
    },
    SET_COUNT(state, value) {
      state.count = value
      console.log(state.count)
    }
  }, //专注于修改state，理论上是修改state的唯一路径
  actions: {
    setMenuStatus(content, data) {
      //data是传入的数据
      //content 有state，getters，commit，rootGetters...可以使用结构
      content.commit('SET_COLLAPSE') //调用方法
      console.log(data)
    },
    Login(content, data) {
      return new Promise((resolve, reject) => {
        login(data).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }, //业务代码,异步请求
  modules: {}
});