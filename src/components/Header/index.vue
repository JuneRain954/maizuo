<template>
    <header id='header'>
        <h1>{{ title }}</h1>
    </header>
</template>

<script>
export default {
    // 给组件起个名字，便于在浏览器的vue调试中展示结构
    name: 'Header',
    props: {
        // 动态切换该组件的标题
        title: {
            type: String,       // 标题的类型
            default: '电影资讯'  // 标题的默认值
        }
    }
}
</script>

<style lang="scss" scoped>
    #header{
        width:100%;
        height: 50px;
        color: #fff;
        background: #e54847;
        border-bottom: 1px solid #e54847;
        position: relative;
        h1{
            font-size: 18px;
            text-align: center;
            line-height: 50px;
            font-weight: normal;
        }
        i{
            position: absolute;
            left: 5px;
            top: 50%;
            margin-top: -13px;
            font-size: 26px;
        }
    }
</style>
