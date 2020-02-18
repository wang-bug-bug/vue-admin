/**
 * 过滤特殊字符
 * @param {*} value 
 */
export function stripscript(s) {
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{}【】‘；：”“'。，、？]")
    var rs = "";
    for (var i = 0; i < s.length; i++) {
        rs = rs + s.substr(i, 1).replace(pattern, '');
    }
    return rs;
}

/**
 * 校验邮箱
 * @param {*} value 
 */
export function validateEmail(value){
    let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    return !reg.test(value);
}

/**
 * 校验密码
 * @param {*} value 
 */
export function validatePass(value){
    let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
    return !reg.test(stripscript(value));
}

/**
 * 校验验证码
 * @param {*} value 
 */
export function validateVcode(value){
    let reg = /^[a-z0-9]{6}$/;    ;
    return !reg.test(stripscript(value));
}