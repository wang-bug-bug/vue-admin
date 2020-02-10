import {
    login
} from '@/api/login/login.js'


const Login = {
    state: {},
    getters: {},
    mutations: {},
    actions: {
        Login(content, data) {
            return new Promise((resolve, reject) => {
                login(data).then(res => {
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
};

export default Login;