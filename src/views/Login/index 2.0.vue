<template>
    <div id="login">
        <div class="login-wrap">
            <ul class="menu-tab">
                <!-- item.id没有id会自动生成的 -->
                <li :class="{'current':item.current}" v-for="(item,index) in menuTab" :key="item.id"
                    @click="toggleMenu(item)">{{item.txt}}</li>
            </ul>
            <!-- 表单开始 -->
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" size="medium" class="login-form">
                <el-form-item prop="username" class="item-form">
                    <label>邮箱</label>
                    <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="password" class="item-form">
                    <label>密码</label>
                    <el-input type="text" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20">
                    </el-input>
                    </el-input>
                </el-form-item>
                <!-- v-show可能存在校验bug -->
                <el-form-item prop="passwords" class="item-form" v-show="this.model=='reg'">
                    <label>重复密码</label>
                    <el-input type="text" v-model="ruleForm.passwords" autocomplete="off" minlength="6" maxlength="20">
                    </el-input>
                </el-form-item>
                <el-form-item prop="code" class="item-form">
                    <label>验证码</label>
                    <el-row :gutter="20">
                        <el-col :span="15">
                            <el-input v-model="ruleForm.code" maxlength="6"></el-input>
                        </el-col>
                        <el-col :span="9">
                            <el-button type="success" class="block">获取验证码</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" class="login-btn block" @click="submitForm('ruleForm')">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    import {
        stripscript,
        validateEmail,
        validatePass,
        validateVcode
    } from '@/utils/validate';
    export default {
        name: 'login',
        data() {
            //验证验证码
            let checkCode = (rule, value, callback) => {
                let reg = /^[a-z0-9]{6}$/
                this.ruleForm.code = stripscript(value)
                if (!value) {
                    return callback(new Error('请输入验证码'));
                } else if (validateVcode(value)) {
                    callback(new Error("验证码格式有误"));
                } else {
                    callback();
                }

            };
            // 验证邮箱
            let validateUsername = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error("请输入用户名"));
                } else if (validateEmail(value)) {
                    callback(new Error("邮箱格式不正确"));
                } else {
                    callback();
                }
            };
            //验证密码
            let validatePassword = (rule, value, callback) => {
                this.ruleForm.password = stripscript(value)
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else if (validatePass(value)) {
                    callback(new Error("密码为6至20位的数字+字母"));
                } else {
                    callback();
                }
            };
            //验证重复密码
            let validatePasswords = (rule, value, callback) => {
                if(this.model==='login'){
                    callback();
                }

                this.ruleForm.passwords = stripscript(value)
                if (value === '') {
                    callback(new Error('请输入重复密码'));
                } else if (this.ruleForm.password != value) {
                    callback(new Error("重复密码不正确"));
                } else if (validatePass(value)) {
                    callback(new Error("密码为6至20位的数字+字母"));
                } else {
                    callback();
                }
            };
            return {
                menuTab: [{
                        txt: '登录',
                        current: true,
                        type: 'login'
                    },
                    {
                        txt: '注册',
                        current: false,
                        type: 'reg'
                    }
                ],
                model: 'login',
                isActive: true,
                ruleForm: {
                    username: '',
                    password: '',
                    code: '',
                    passwords: ''
                },
                rules: {
                    username: [{
                        validator: validateUsername,
                        trigger: 'blur'
                    }],
                    password: [{
                        validator: validatePassword,
                        trigger: 'blur'
                    }],
                    passwords: [{
                        validator: validatePasswords,
                        trigger: 'blur'
                    }],
                    code: [{
                        validator: checkCode,
                        trigger: 'blur'
                    }]
                }
            }
        },
        created() {

        },
        mounted() {

        },
        methods: {
            toggleMenu(data) {
                this.model = data.type

                this.menuTab.forEach(element => {
                    element.current = false;
                });
                data.current = true
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
<style lang="scss" scoped>
    #login {
        height: 100vh;
        background-color: #344a5f;
    }

    .login-wrap {
        width: 330px;
        margin: auto;
    }

    .menu-tab {
        text-align: center;
    }

    li {
        display: inline-block;
        width: 88px;
        line-height: 36px;
        font-size: 14px;
        color: #fff;
        border-radius: 2px;
        cursor: pointer;
    }

    .current {
        background-color: rgba(0, 0, 0, .1);
    }

    .login-form {
        margin-top: 29px;
    }

    label {
        display: block;
        font-size: 14px;
        color: #fff;
        margin-bottom: 3px;
    }

    .item-form {
        margin-bottom: 16px;
    }

    .block {
        width: 100%;
        display: block;
    }

    .login-btn {
        margin-top: 19px;
    }
</style>