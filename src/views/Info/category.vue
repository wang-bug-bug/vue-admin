<template>
    <div id="catrgory">
        <el-button type="danger">添加一级分类 </el-button>
        <hr class="hr-e9"/>
        <div>
            <el-row>
                <el-col :span="8">
                    <div class="category-wrap">
                        <div class="category">
                            <h4>
                                <svg-icon icon-class="add"></svg-icon>
                                222
                                <div class="button-group">
                                    <el-button type="danger" size="mini" round>编辑</el-button>
                                    <el-button type="success" size="mini" round>添加子级</el-button>
                                    <el-button type="" size="mini" round>删除</el-button>
                                </div>
                            </h4>
                            <ul>
                                <li>123</li>
                                <li>123</li>
                                <li>123</li>
                                <li>123</li>
                            </ul>
                        </div>
                        <div class="category">
                            <h4>
                                <svg-icon icon-class="add"></svg-icon>
                                222
                            </h4>
                            <ul>
                                <li>123</li>
                                <li>123</li>
                                <li>123</li>
                                <li>123</li>
                            </ul>
                        </div>
                    </div>
                </el-col>
                <el-col :span="16">
                    <h4 class="menu-title">一级分类编辑</h4>
                    <el-form label-width="142px" :model="formLabelAlign" style="width:440px">
                        <el-form-item label="一级分类名称">
                            <el-input v-model="formLabelAlign.name"></el-input>
                        </el-form-item>
                        <el-form-item label="二级分类名称">
                            <el-input v-model="formLabelAlign.region"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="danger">确定</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </div>

    </div>
</template>
<script>
    import {
        ref,
        reactive
    } from '@vue/composition-api'   

    export default {
        name: 'Catrgory',
        setup(props) {
            const formLabelAlign = reactive({
                name: '',
                region: '',
                type: ''
            })

            return {
                formLabelAlign
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../styles/config.scss";

    .category-wrap {
        div:first-child {
            &:before {
                top: 20px;
            }
        }

        div:last-child {
            &:before {
                bottom: 22px;
            }
        }
    }

    .menu-title {
        line-height: 44px;
        background-color: #fff;
        padding-left: 42px;
    }

    .category {
        position: relative;
        cursor: pointer;

        &:before {
            left: 22px;
            top: 0;
            bottom: 0;
            content: '';
            position: absolute;
            width: 32px;
            border-left: 1px dotted #000;
        }

        line-height: 44px;

        h4 {
            position: relative;
            padding-left: 40px;
        }

        svg {
            position: absolute;
            top: 15px;
            left: 14px;
            font-size: 17px;
        }

        li {
            position: relative;
            padding-left: 36px;
            margin-left: 24px;

            &:before {
                left: 0px;
                top: 22px;
                content: '';
                position: absolute;
                width: 32px;
                border-bottom: 1px dotted #000;
            }
        }

        li,
        h4 {
            @include webkit(transition, all .3s ease 0s);

            &:hover {
                background-color: #f3f3f3;

                .button-group {
                    display: block;
                }
            }
        }

        .button-group {
            display: none;
            position: absolute;
            right: 11px;
            top: -1px;
            z-index: 2;

            button {
                font-size: 12px;
            }
        }
    }
    .hr-e9{
        width:calc(100% +60px);
        margin-left: -30px;
        border: none;
        margin-top: 30px;
        margin-bottom: 20px;
        border-bottom: 1px solid #e9e9e9;
    }
</style>
