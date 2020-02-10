<template>
    <div id="main-wrap">
        <div class="main-content">
            <div class="content">
                <router-view />
                <!-- 默认显示路由里面children里面的一个路由 -->
            </div>
        </div>

    </div>
</template>
<script>
    export default {
        name:'LayoutMain',
        setup(){

        }
    }
</script>

<style lang="scss" scoped>
    @import '../../../styles/config.scss';

    #main-wrap {
        height: 100vh;
        /* position: fixed;
        left: $navMenu;
        top: 75px;
        right: 0;
        bottom: 0;
        border: 30px solid #f7f7f7;
        border-bottom: none;
        -webkit-box-sizing: border; */
    }

    .main-content {
        width: 100%;
        height: 100%;
        padding-top: $layoutHeader + 30;
        padding-left: $navMenu + 30;
        padding-right: 30px;
        box-sizing: border-box;
        @include webkit(box-sizing,border-box);
        @include webkit(transition,all .3s ease 0s);
    }

    .content {
        width: 100%;
        height: 100%;
        padding-top: 30px;
        padding-left: 30px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background-color: #fff;
    }


    .open {
        .main-content {
            padding-left: $navMenu + 30;
        }
    }

    .close {
        .main-content {
            padding-left: 90px;
        }
    }
</style>