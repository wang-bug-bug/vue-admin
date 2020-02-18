import cookie from 'cookie_js'

const tokenName = 'admin_token'
const usernameKey = 'username'

export function getToken() {
    return cookie.get(tokenName)
}

export function setToken(token) {
    return cookie.set(tokenName, token)
}

export function removeToken(){
    return cookie.remove(tokenName)
}

export function removeUsername(){
    return cookie.remove(usernameKey)
}

export function setUsername(username) {
    return cookie.set(usernameKey, username)
}

export function getUsername() {
    return cookie.get(usernameKey)
}