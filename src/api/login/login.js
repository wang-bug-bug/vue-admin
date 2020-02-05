import service from '@/utils/request'   //service名称可以改变

// console.log(process.env.VUE_APP_TITLE)
// console.log(process.env.NODE_ENV)
/**
 * 获取验证码
 */
export function getSms(data){
    return service.request({
        method:"post",
        url:"/getSms/",
        data
    })
}

/**
 * 获取用户角色
 */


/**
 * 注册
 */
export function register(data){
    return service.request({
        method:"post",
        url:"/register/",
        data
    })
}

/**
 * 登录
 */
export function login(data){
    return service.request({
        method:"post",
        url:"/login/",
        data
    })
}













