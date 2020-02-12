import router from "./index";
import {
    getToken,
    removeToken,
    removeUsername
} from "../utils/app"

import store from "../store/index"


//生成白名单
const whiteRouter = ['/login']


//路由守卫
router.beforeEach((to, from, next) => {

    if (getToken()) {
        if(to.path === '/login'){
            //去除cookie
            removeToken()
            removeUsername()

            store.commit("login/SETTOKEN","")
            store.commit("login/SET_USERNAME","")
            next()
        }else{
            next()
        }

        // console.log("存在")
        
    } else {
        // next("/login")   直接写会形成死循环，发生路由指向的时候又会重新进入这个方法
        // console.log("不存在")

        if (whiteRouter.indexOf(to.path) !== -1) {
            next();
        } else {
            console.log("123")
            next('/login');
        }

    }

    // console.log(to) 
    // console.log(from)
    // console.log(next)
    // next() //不带参数进入to里面                          
})