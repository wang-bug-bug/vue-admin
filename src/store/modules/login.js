import {
    login
} from '@/api/login/login.js'

import {
    setToken,
    setUsername,
    removeToken,
    removeUsername
} from "../../utils/app"

import cookie from 'cookie_js'

const state = {
    token: '',
    username: cookie.get('username') || '',
    // username:''  写成这样页面不会显示出来
}
const mutations = {
    SET_TOKEN(state, value) {
        state.token = value
    },
    SET_USERNAME(state, value) {
        state.username = value
    }
}

const actions = {
    Login(content, data) {
        return new Promise((resolve, reject) => {
            login(data).then(res => {
                content.commit('SET_TOKEN', res.data.data.token)
                content.commit('SET_USERNAME', res.data.data.username)

                setToken(res.data.data.token)
                setUsername(res.data.data.username)
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    Exit(content) {
        return new Promise((resolve, reject) => {
            removeToken()
            removeUsername()
            content.commit('SET_TOKEN', "")
            content.commit('SET_USERNAME', "")
            resolve()
        })
    }
}

export default {
    namespaced: true,
    actions,
    state,
    mutations
};