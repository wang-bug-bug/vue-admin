import Cookie from 'cookie_js'

const state={
    isCollapse: JSON.parse(Cookie.get('isCollapse')==undefined?false:Cookie.get('isCollapse')) || false,
    // isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
}

const getters={

}

const mutations={
    SET_COLLAPSE(state) {
        
        state.isCollapse = !state.isCollapse
        console.log(state.isCollapse)
        Cookie.set('isCollapse', JSON.stringify(state.isCollapse))
        // window.sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))
        //window 可以省略不写   html5本地存储解决浏览器刷新之后菜单展开问题 临时的  localStorage长期必须手动清除
    }
}

const actions={
    setMenuStatus(content, data) {
        //data是传入的数据
        //content 有state，getters，commit，rootGetters...可以使用结构
        content.commit('SET_COLLAPSE') //调用方法
    },
}

export default{
    namespaced:true,    //命名
    state,
    getters,
    mutations,
    actions
}


// const app = {
//     state: {
//         isCollapse: JSON.parse(Cookie.get('isCollapse')) || false,
//         // isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
//     },
//     getters: {},
//     mutations: {
//         SET_COLLAPSE(state) {
//             state.isCollapse = !state.isCollapse
//             Cookie.set('isCollapse', JSON.stringify(state.isCollapse))
//             // window.sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))
//             //window 可以省略不写   html5本地存储解决浏览器刷新之后菜单展开问题 临时的  localStorage长期必须手动清除
//         }
//     },
//     actions: {
//         setMenuStatus(content, data) {
//             //data是传入的数据
//             //content 有state，getters，commit，rootGetters...可以使用结构
//             content.commit('SET_COLLAPSE') //调用方法
//         },
//     }
// };

// export default app;