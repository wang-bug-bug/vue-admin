<template>
    <svg :class="svgClass" aria-hidden="true">
            <use :xlink:href="iconName"></use>
           </svg>
</template>
<script>
    import {
        ref,
        reactive,
        computed
    } from '@vue/composition-api'

    export default {
        name: 'svgIcon',
        // props: [
        //     'iconClass',
        //     'className',
        // ],   简单类型写法

        props: {
            iconClass: {
                type: String, //定义接受值的类型
                default: '', //默认值，如果父组件没有传值
                // default: ()=>[],    //对象类型写法
                require: true, //必填项
                // validator:(value)=>{
                //     return 
                // }           //校验
            },
            className: {
                type: String,
                default: ''
            }
        },
        setup(props) {
            // console.log(props.iconClass)
            // console.log(props.className)
            const msg = ref("123456")

            const iconName = computed(() => `#icon-${props.iconClass}`)
            const svgClass = computed(() => {
                    if (props.iconName) {
                        return `svg-icon ${props.iconName}`
                    } else {
                        return `svg-icon`
                    }
                }

            )

            return {
                msg,
                iconName,
                svgClass
            }

        }
    }
</script>
<style lang="scss" scoped>
    .svg-icon {
        width: 1em;
        height: 1em;
        fill: currentColor;
        /* 修改字体颜色要用这个属性 */
        /* color: white; */

        &.font12 {
            font-size: 12px;
        }

        &.font50 {
            font-size: 50px;
        }
    }
</style>