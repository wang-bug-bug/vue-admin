<template>
    <div id='layout'>
        <LayoutNav />
        <LayoutMain />
        <LayoutHeader />
    </div>
</template>
<script>
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
        setup() {

        }
    }

</script>
<style lang="scss" scoped>
    #layout{
        background-color: #f7f7f7;
    }
</style>