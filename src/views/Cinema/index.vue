<template>
    <div id='main' :style='myStyle'>
        <Header title='附近影院'></Header>
        <div id='content'>
            <div class='cinema_menu'>
                <div class="city_switch" @click='handleClick'>
                    全城<i class='iconfont icon-below-s'></i>
                </div>
                <div class="brand_switch" @click='handleClick'>
                    品牌<i class='iconfont icon-below-s'></i>
                </div>
                <div class="feature_switch" @click='handleClick'>
                    特色<i class='iconfont icon-below-s'></i>
                </div>
            </div>
            <CinemaList></CinemaList>
        </div>
        <TabBar></TabBar>
    </div>
</template>

<script>
import Header from '@/components/Header';
import TabBar from '@/components/TabBar';
import CinemaList from '@/components/CinemaList';
import { Toast } from 'mint-ui';

export default {
    name: 'Cinema',
    components: {
        Header,
        TabBar,
        CinemaList
    },
    data(){
        return {
            myStyle: {
                height: '0px'
            }
        }
    },
    methods: {
        handleClick(){
            Toast({
                message: '该功能尚未开发 (●ˇ∀ˇ●)',
                duration: 1000
            })
        }
    },
    mounted(){
        // document.documentElement.clientHeight --- 当前设备屏幕的高度
        this.myStyle.height = document.documentElement.clientHeight + 'px';
    }
}
</script>

<style lang="scss" scoped>
    #content .cinema_menu{
        width: 100%;
        height: 45px;
        border-bottom: 1px solid #e6e6e6;
        display: flex;
        justify-content: space-around;
        align-items: center;
        background: white;
    }
</style>
