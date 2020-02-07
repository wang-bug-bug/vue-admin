<template>
    <div id="main-wrap">
        <router-view /> 
        <!-- 默认显示路由里面children里面的一个路由 -->
    </div>
</template>
<script>
    export default{
        
    }
</script>

<style lang="scss" scoped>
    @import '../../../styles/config.scss';
    #main-wrap{
        position: fixed;
        left: $navMenu;
        top: 75px;
        right: 0;
        bottom: 0;
        border: 30px solid #f7f7f7;
        border-bottom: none;
        -webkit-box-sizing: border;
    }
</style>