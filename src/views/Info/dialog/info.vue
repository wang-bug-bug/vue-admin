<template>
    <div>
        <el-dialog title="新增" :visible.sync="dialog_info" @close="close" width="600px">
            <el-form :model="form">
                <el-form-item label="类型" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="请选择类型">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="标题" :label-width="formLabelWidth">
                    <el-input v-model="form.name" placeholder="请输入标题" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="标题" :label-width="formLabelWidth">
                    <el-input type="textarea" v-model="form.name" placeholder="请输入概况" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="close">取 消</el-button>
                <el-button type="danger" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {
        ref,
        reactive,
        watch
    } from "@vue/composition-api"
    export default {
        name: 'dialogInfo',
        //props 单向数据流，父级--》子级 不能反向修改
        props: {
            flag: {
                type: Boolean,
                default: false,
            }
        },
        setup(props, {
            root,
            emit
        }) {
            const dialog_info = ref(false)

            const form = reactive({
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            })

            const formLabelWidth = ref("70px")

            const close = () => {
                dialog_info.value = false
                // this.$emit('update:flag',flase)  修饰器修改 需要在属性后面加上.sync,需要处理逻辑的时候使用回调方式修改值
                emit('close', false)
                //修改父组件
            }

            watch(() => {
                dialog_info.value = props.flag
            })

            return {
                dialog_info,
                form,
                formLabelWidth,
                close
            }
        }
    }
</script>
<style>

</style>