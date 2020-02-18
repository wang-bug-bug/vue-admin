<template>
    <div id='layout' :class="menuStatus?'close':'open'">
        <LayoutNav />
        <LayoutMain />
        <LayoutHeader />
    </div>
</template>
<script>
    import {
        computed
    } from '@vue/composition-api'
    import LayoutNav from './components/Nav'
    import LayoutMain from './components/Main'
    import LayoutHeader from './components/Header'
    export default {
        name: 'layout',
        components: {
            LayoutNav,
            LayoutMain,
            LayoutHeader
        },
        setup(props, {
            root
        }) {
            const menuStatus=computed(()=>{
                return root.$store.state.app.isCollapse
            })
            return {
                menuStatus
            }
        }
    }
</script>
<style lang="scss" scoped>
    #layout {
        background-color: #f7f7f7;
    }
</style>