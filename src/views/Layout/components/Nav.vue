<template>
    <div id="nav-wrap">
        <h1 class="logo">
            <img src="../../../assets/logo.png" alt="">
        </h1>

        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
            :collapse="isCollapse" background-color="transparent" text-color="#fff" active-text-color="#fff" router>
            <template v-for="(item,index) in routers">
                <!-- v-for 一般不和v-if同时作用   因为v-for优先级大于v-if
                    所以遍历的时候需要加上template标签，不会出现在html上面，
                    而且不在上面绑定key，这样就可以遍历元素的时候判断是否显示
                -->
                <el-submenu v-if="!item.hidden" :key="item.id" :index="`${index}`">
                    <template slot="title">
                        <svg-icon :iconClass="item.meta.icon" />
                        <span slot="title">{{item.meta.name}}</span>
                    </template>

                    <el-menu-item v-for="subItem in item.children" :key="subItem.id" :index="subItem.path">
                        {{subItem.meta.name}}
                    </el-menu-item>
                </el-submenu>
            </template>
        </el-menu>
    </div>
</template>
<script>
    import {
        ref,
        reactive,
        computed
    } from '@vue/composition-api'
    export default {
        name: 'narMenu',
        setup(props, {
            root
        }) {
            // console.log(root.$router.options.routes) 所有路由

            const routers = reactive(root.$router.options.routes)


            // const isCollapse = ref(false)

            //监听值变化        不同组件之间的联系
            const isCollapse = computed(() => {
                return root.$store.state.app.isCollapse
            })
            //一行可以省略{}，并且不用return，不然都要加上

            const handleOpen = (key, keyPath) => {}

            const handleClose = (key, keyPath) => {}

            // console.log(root.$store.state.isCollapse)    
            // console.log(root.$store.state.count)     只是获取单一的值不会变化
            // console.log(root.$store.getters.count)

            //调用
            // root.$store.commit('SET_COUNT',200)

            return {
                isCollapse,
                handleOpen,
                handleClose,
                routers
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../../styles/config.scss';

    #nav-wrap {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: $navMenu;
        background-color: #344a5f;
        @include webkit(transition,all .3s ease 0s);
        svg {
            font-size: 20px;
            margin-right: 10px;
        }
    }

    .logo {
        text-align: center;
        img {
            width: 92px;
            margin: 28px auto 25px;
            @include webkit(transition,all .3s ease 0s);
        }
    }

    .open{
        #nav-wrap{
            width: $navMenu;
        } 
    }

    .close{
        #nav-wrap{
            width: 64px;
        } 
        .logo img{
            width: 70%;
        }
        .el-submenu{
            &.is-opened{
                > .el-submenu__title{
                    background-color: red;
                }
            }
        }
    }

</style>