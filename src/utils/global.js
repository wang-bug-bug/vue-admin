import {
    MessageBox
} from 'element-ui';


export default {
    install(Vue, options) {
        Vue.prototype.confirm = (param) => {
            MessageBox.confirm(param.content, param.tip || '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                param.fn && param.fn(param.id)
            }).catch(() => {
            });
        }
    }
}