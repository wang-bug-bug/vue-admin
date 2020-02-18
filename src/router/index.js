import Vue from "vue";
import VueRouter from "vue-router";
// import Layout from "../views/Layout/index.vue"
import Layout from "../views/Layout" 
//默认目录下面的index文件

Vue.use(VueRouter);

const routes = [{
    path: "/",
    redirect: "login", //重定向,
    hidden: true, //是否显示菜单，后台会判断
    meta: {
      name: '主页' //菜单名称
    }
  },
  {
    path: "/login",
    name: "Login",
    hidden: true,
    meta: {
      name: '登录'
    },
    component: () =>
      import("../views/Login/index.vue")
  },
  {
    path: "/console",
    name: "Console",
    redirect: "index",
    meta: {
      name: '控制台',
      icon: 'console'
    },
    component: Layout,
    children: [{
      path: "/index",
      name: "Index",
      meta: {
        name: '首页'
      },
      component: () =>
        import("../views/Console/index.vue")
    }]
  }, {
    path: "/info",
    name: "Info",
    meta: {
      name: '信息管理',
      icon: 'info'
    },
    component: Layout,
    children: [{
        path: "/info",
        name: "Info",
        meta: {
          name: '信息列表'
        },
        component: () =>
          import("../views/Info/index.vue")
      },
      {
        path: "/infoCategory",
        name: "InfoCategory",
        meta: {
          name: '信息分类'
        },
        component: () =>
          import("../views/Info/category.vue")
      }
    ]
  },
  {
    path: "/user",
    name: "User",
    meta: {
      name: '用户管理',
      icon:　'user'
    },
    component: Layout,
    children: [{
      path: "/user",
      name: "User",
      meta: {
        name: '用户列表'
      },
      component: () =>
        import("../views/User/index.vue")
    }]
  }
];

const router = new VueRouter({
  routes
});

export default router;