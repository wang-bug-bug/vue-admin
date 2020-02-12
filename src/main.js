import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueCompositionApi from '@vue/composition-api';
//全局组件
import "./icons"
//路由守卫
import "./router/premit"

Vue.use(ElementUI);
Vue.use(VueCompositionApi);

Vue.config.productionTip = false;


//自定义全局组件，因为vue的模式的不同，再在vue.config.js里面修改vue指向   提取出来放到icons里面
// Vue.component('svg-icon',{
//   template:"<div>{{ msg }}</div>",
//   data(){
//     return {
//       msg:'哈哈'
//     }
//   }
// })


//runtime模式
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
