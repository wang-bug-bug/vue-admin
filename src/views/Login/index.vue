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
                    <label for="username">邮箱</label>
                    <el-input id="username" type="text" v-model="ruleForm.username" autocomplete="off"
                        placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item prop="password" class="item-form">
                    <label for="password">密码</label>
                    <el-input id="password" type="password" v-model="ruleForm.password" autocomplete="off" minlength="6"
                        maxlength="20" placeholder="请输入密码">
                    </el-input>
                    </el-input>
                </el-form-item>
                <!-- v-show可能存在校验bug -->
                <el-form-item prop="passwords" class="item-form" v-show="this.model=='reg'">
                    <label for="passwords">重复密码</label>
                    <el-input type="password" id="passwords" v-model="ruleForm.passwords" autocomplete="off"
                        minlength="6" maxlength="20" placeholder="请输入重复密码">
                    </el-input>
                </el-form-item>
                <el-form-item prop="code" class="item-form">
                    <label for="code">验证码</label>
                    <el-row :gutter="20">
                        <el-col :span="15">
                            <el-input id="code" v-model="ruleForm.code" maxlength="6" placeholder="请输入验证码"></el-input>
                        </el-col>
                        <el-col :span="9">
                            <el-button type="success" class="block" @click="getCode()" :disabled="codeBtn.status">
                                {{codeBtn.text}}</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" class="login-btn block" @click="submitForm('ruleForm')"
                        :disabled="loginBtnStatus">{{ model==='login'?'登录':'注册'}}</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    import {
        getSms,
        register,
        login
    } from '@/api/login/login.js'
    import axios from 'axios'
    // export default不用花括号，不能存在2个export default，export可以多个，用花括号引用
    import {
        reactive,
        ref,
        root,
        toRefs,
        onMounted,
        isRef
    } from '@vue/composition-api'
    import {
        stripscript,
        validateEmail,
        validatePass,
        validateVcode
    } from '@/utils/validate';
    export default {
        name: 'login',
        setup(props, {
            refs,
            root
        }) {
            //验证验证码
            let checkCode = (rule, value, callback) => {
                let reg = /^[a-z0-9]{6}$/
                ruleForm.code = stripscript(value)
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
                ruleForm.password = stripscript(value)
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
                if (model.value === 'login') {
                    callback();
                }

                ruleForm.passwords = stripscript(value)
                if (value === '') {
                    callback(new Error('请输入重复密码'));
                } else if (ruleForm.password != value) {
                    callback(new Error("重复密码不正确"));
                } else if (validatePass(value)) {
                    callback(new Error("密码为6至20位的数字+字母"));
                } else {
                    callback();
                }
            }

            const menuTab = reactive([{
                txt: '登录',
                current: true,
                type: 'login'
            }, {
                txt: '注册',
                current: false,
                type: 'reg'
            }])

            const model = ref('login');

            const loginBtnStatus = ref(true);
            // const codeBtn = ref('获取验证码');
            // const codeBtnStatus = ref(false);

            const codeBtn = reactive({
                text: '获取验证码',
                status: false
            })
            //倒计时
            const timer = ref(null);

            onMounted(() => {

            })

            //切换菜单
            const toggleMenu = (data => {
                clearCountDown()
                refs['ruleForm'].resetFields();
                model.value = data.type
                menuTab.forEach(element => {
                    element.current = false;
                });
                data.current = true
                loginBtnStatus.value = true
            })

            //获取验证码
            const getCode = (() => {
                if (ruleForm.username === '') {
                    root.$message.error('邮箱不能为空');
                    return false;
                }
                if (validateEmail(ruleForm.username)) {
                    root.$message.error('邮箱格式不正确');
                    return false;
                }

                let data = {
                    username: ruleForm.username,
                    module: model.value
                }

                codeBtn.text = '发送中'
                codeBtn.status = true;
                if (timer.value) {
                    clearInterval(timer.value)
                }

                getSms(data).then(res => {
                    let data = res.data
                    if (data.resCode === 0) {
                        root.$message.success('验证码发送成功');
                        loginBtnStatus.value = false;
                        //启动倒计时
                        countDown(60);
                    } else {
                        codeBtn.text = '获取验证码'
                        codeBtn.status = false;
                    }
                }).catch(error => {
                    codeBtn.text = '获取验证码'
                    codeBtn.status = false;
                    console.log(error)
                })


            })

            //倒计时
            const countDown = ((number) => {
                //setTimeout:clearTimeout 只执行一次
                //setInterval:clearInterval 不断的执行，需要条件才会停止

                //判断定时器是否存在
                if (timer.value) {
                    clearInterval(timer.value)
                }

                let time = number;

                timer.value = setInterval(() => {
                    if (time === 0) {
                        clearInterval(timer.value)
                        codeBtn.text = '再次获取'
                        codeBtn.status = false
                    } else {
                        codeBtn.text = `倒计时${time}秒`
                    }
                    time--;
                }, 1000);
            })

            const Login = (() => {
                let requestData = {
                    username: ruleForm.username,
                    password: ruleForm.password,
                    code: ruleForm.code,
                    module: model.value
                }
                login(requestData).then(res => {
                    let data = res.data;
                    if (data.resCode === 0) {
                        root.$message({
                            message: data.message,
                            type: 'success'
                        })
                    }

                }).catch(error => {
                    console.log(error)
                })
            })

            const Register = (() => {
                let requestData = {
                    username: ruleForm.username,
                    password: ruleForm.password,
                    code: ruleForm.code,
                    module: model.value
                }
                register(requestData).then(res => {
                    let data = res.data;
                    if (data.resCode === 0) {
                        root.$message({
                            message: data.message,
                            type: 'success'
                        })
                        toggleMenu(menuTab[0])
                        clearCountDown()
                    }

                }).catch(error => {
                    console.log(error)
                })
            })

            //提交表单
            const submitForm = (formName => {

                refs[formName].validate((valid) => {
                    if (valid) {
                        // 为给定 ID 的 user 创建请求
                        // let requestData = {
                        //     username: ruleForm.username,
                        //     password: ruleForm.password,
                        //     code: ruleForm.code,
                        //     module: model.value
                        // }

                        model.value === 'login' ? Login() : Register()

                        // if (model.value === 'login') {
                        //     login(requestData).then(res => {
                        //         let data = res.data;
                        //         if (data.resCode === 0) {
                        //             root.$message({
                        //                 message: data.message,
                        //                 type: 'success'
                        //             })
                        //         }

                        //     }).catch(error => {
                        //         console.log(error)
                        //     })
                        // } else {
                        //     register(requestData).then(res => {
                        //         let data = res.data;
                        //         if (data.resCode === 0) {
                        //             root.$message({
                        //                 message: data.message,
                        //                 type: 'success'
                        //             })
                        //             toggleMenu(menuTab[0])
                        //             clearCountDown()
                        //         }

                        //     }).catch(error => {
                        //         console.log(error)
                        //     })
                        // }

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            })

            //清楚倒计时
            const clearCountDown = (() => {
                codeBtn.status = false
                codeBtn.text = '获取验证码'
                clearInterval(timer.value)
            })

            const ruleForm = reactive({
                username: '',
                password: '',
                code: '',
                passwords: ''
            })

            const rules = reactive({
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
            })


            return {
                menuTab,
                model,
                toggleMenu,
                submitForm,
                ruleForm,
                rules,
                getCode,
                Login,
                Register,
                clearCountDown,
                loginBtnStatus,
                codeBtn,
                // codeBtnStatus,
                // codeBtn
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