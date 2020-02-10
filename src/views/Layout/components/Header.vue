<template>
    <div id="top-wrap">
        <div class="pull-left header-icon" @click="navMenuState">
            <svg-icon iconClass="menu" className="menu" />
        </div>
        <div class="pull-right">
            <div class="user-info pull-left">
                <img src="../../../assets/images/face.jpg" alt="">
                管理员
            </div>
            <div class="header-icon pull-left">
                <svg-icon iconClass="back" className="back" />
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'LayoutHeader',
        setup(props, {
            root
        }) {
            const navMenuState = () => {
                root.$store.dispatch('setMenuStatus',{"name":"sa"})
                // root.$store.commit('SET_COLLAPSE')
            }
            return {
                navMenuState
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../../styles/config.scss';

    #top-wrap {
        position: fixed;
        left: $navMenu;
        height: 70px;
        top: 0;
        right: 0;
        background-color: #fff;
        line-height: 75px;
        @include webkit(transition,all .3s ease 0s);
        @include webkit(box-shadow,0 3px 16px 0 rgba(0, 0, 0, .1));
    }

    .header-icon {
        padding: 0 32px;

        svg {
            margin-bottom: -8px;
            font-size: 25px;
            cursor: pointer;
        }
    }

    .user-info {
        height: 100%;
        padding: 0 32px;
        border-right: 1px solid #ededed;

        +.header-icon {
            padding: 0 28px;
        }

        img {
            display: inline-block;
            margin-bottom: -12px;
            margin-right: 18px;
            border-radius: 50px;
        }
    }

    .open {
        #top-wrap {
            left: $navMenu;
        }
    }

    .close {
        #top-wrap {
            left: 64px;
        }
    }
</style>