<template>
    <div id='main'>
        <Header title='个人中心'></Header>
        <div id="content">
            <Login></Login>
        </div>
        <TabBar></TabBar>
    </div>
</template>

<script>
import Header from '@/components/Header';
import TabBar from '@/components/TabBar';
import Login from '@/components/Login';
import { messageBox } from '@/components/JS';

export default {
    name: 'Mine',
    components: {
        Header,
        TabBar,
        Login,
    },
    mounted(){
        messageBox({
            title: '提示',
            content: '快去定位吧',
            cancel: '取消',
            confirm: '确认',
            handleCancel(){
                console.log('handleCancel');
            },
            handleConfirm(){
                console.log('handleConfirm');
            }
        })
    }
}
</script>

<style lang="scss" scoped>
    
</style>
