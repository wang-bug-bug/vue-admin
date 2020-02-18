<template>
    <div>
        <el-dialog title="新增" :visible.sync="dialog_info" @close="close" width="600px">
            <el-form :model="form">
                <el-form-item label="类型" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="标题" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: 'dialogInfo',
        data() {
            return {
                dialog_info: true,
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                formLabelWidth: '120px'
            }
        },
        //props 单向数据流，父级--》子级 不能反向修改
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
                // this.$emit('update:flag',flase)  修饰器修改 需要在属性后面加上.sync,需要处理逻辑的时候使用回调方式修改值
                this.$emit('close', false)
                //修改父组件
            }
        }
    }
</script>
<style>

</style>