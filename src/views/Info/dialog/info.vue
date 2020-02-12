<template>
    <div>
        <el-dialog title="收货地址" :visible.sync="dialog_info" @close="close">
            123
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: 'dialogInfo',
        data() {
            return {
                dialog_info: false
            }
        },
        //props 单向数据量，父级--》子级 不能反向修改
        props: {
            flag: {
                type: Boolean,
                default: false,
            }
        },
        watch: {
            flag: {
                handler(newValue, oldValue) {
                    this.dialog_info = newValue
                }
            }
        },
        methods: {
            close() {
                this.dialog_info = false
                this.$emit('close', false)
                //修改父组件
            }
        }
    }
</script>
<style>

</style>