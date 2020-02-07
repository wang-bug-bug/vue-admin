<template>
    <div id="top-wrap">
        头部
    </div>
</template>
<script>
    export default{

    }
</script>

<style lang="scss" scoped>
    @import '../../../styles/config.scss';
    #top-wrap{
        position: fixed;
        left: $navMenu;
        height: 70px;
        top: 0;
        right: 0;
        background-color: #fff;
        -webkit-box-shadow:0 3px 16px 0 rgba(0,0,0,.1);
    }
</style>