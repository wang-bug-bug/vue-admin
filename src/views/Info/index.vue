<template>
    <div id="infoIndex">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-row :gutter="10">
                <el-col :span="5">
                    <el-form-item label="类型">
                        <el-select v-model="formInline.category" placeholder="请选择" clearable filterable
                            style="width: 180px;">
                            <el-option label="国际信息" value="1"></el-option>
                            <el-option label="国内信息" value="2"></el-option>
                            <el-option label="行内信息" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="9">
                    <el-form-item label="日期">
                        <el-date-picker v-model="formInline.dateValue" type="datetimerange" start-placeholder="开始日期"
                            end-placeholder="结束日期" style="width: 390px;">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="9">
                    <el-form-item label="关键字">
                        <el-select v-model="formInline.key" placeholder="请选择" clearable filterable
                            style="width: 100px;">
                            <el-option v-for="item in selectkey" :key="item.id" :label="item.key" :value="item.value">
                            </el-option>
                        </el-select>
                        <el-input v-model="formInline.inputText" placeholder="请输入内容" clearable
                            style="width:230px;margin-left: 15px;"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-button type="danger">搜索</el-button>
                    <el-button type="danger" @click="dialogInfo = true">新增</el-button>
                </el-col>
            </el-row>
        </el-form>
        <div class="black-space-30"></div>
        <el-table :data="tableData" style="width: 100%;" border highlight-current-row>
            <el-table-column type="selection" width="45" align="center">
            </el-table-column>
            <el-table-column prop="title" label="标题" align="center">
            </el-table-column>
            <el-table-column prop="category" label="类型" align="center">
            </el-table-column>
            <el-table-column prop="date" label="日期" align="center">
            </el-table-column>
            <el-table-column prop="user" label="管理员" align="center">
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="success" size="small">编辑</el-button>
                    <el-button type="danger" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="black-space-30"></div>
        <el-row>
            <el-col :span="12">
                <el-button size="small">批量删除 </el-button>
            </el-col>
            <el-col :span="12">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    layout="total, sizes, prev, pager, next, jumper" :total="50" :page-sizes="[10, 20, 50]"
                    :page-size="10" class="pull-right" :current-page="1">
                </el-pagination>
            </el-col>
        </el-row>

        //弹窗组件
        <DialogInfo :flag="dialogInfo" @close="close" />

    </div>

</template>
<script>
    import {
        ref,
        reactive
    } from '@vue/composition-api'

    import DialogInfo from "./dialog/info"

    export default {
        name: 'InfoIndex',
        components: {
            DialogInfo
        },
        setup(props) {
            const dialogInfo = ref(false)

            const formInline = reactive({
                user: '',
                category: '',
                dateValue: '',
                key: 'ID',
                inputText: ''
            })

            const selectkey = reactive([{
                "key": "ID",
                "value": "id"
            }, {
                "key": "标题",
                "value": "title"
            }])
            const tableData = reactive([{
                date: '2016-05-03',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                date: '2016-05-02',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                date: '2016-05-04',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                date: '2016-05-01',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }])


            const handleSizeChange = (val) => {

            }


            const handleCurrentChange = (val) => {

            }

            const dialogTableVisible = ref(false)


            const gridData = reactive({

            })

            const close = (data) => {
                dialogInfo.value = data
            }

            return {
                formInline,
                selectkey,
                tableData,
                handleSizeChange,
                handleCurrentChange,
                dialogTableVisible,
                gridData,
                dialogInfo,
                close
            }
        }
    }
</script>
<style lang="scss" scoped>

</style>