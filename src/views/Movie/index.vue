<template>
    <div id='main' :style='myStyle'>
        <Header ref='myheader'></Header>
        <div id='content'>
            <div class='movie_menu'>
                <router-link to="/movie/city" tag='div' activeClass='active' class='city_name'>
                    <span>{{ $store.state.city.nm }}</span><i class='iconfont icon-below-s'></i>
                </router-link>
                <div class='hot_switch'>
                    <router-link to="/movie/nowPlaying" tag='div' activeClass='active' class='hot_item'>正在热映</router-link>
                    <router-link to="/movie/comingSoon" tag='div' activeClass='active' class='hot_item'>即将上映</router-link>
                </div>
                <router-link to="/movie/search" tag='div' activeClass='active' class='search_entry'>
                            <i class='iconfont icon-sousuo'></i>
                </router-link>
            </div>
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
        <TabBar></TabBar>
        <router-view name='detail'></router-view>
    </div>
</template>

<script>
import Header from '@/components/Header';
import TabBar from '@/components/TabBar';

export default {
    name: 'Movie',
    components: {
        Header,
        TabBar
    },
    data(){
        return {
            myStyle: {
                height: '0px'
            }
        }
    },
    mounted(){
        // document.documentElement.clientHeight --- 当前设备屏幕的高度
        this.myStyle.height = document.documentElement.clientHeight + 'px';
    }
}
</script>

<style lang="scss" scoped>
    #content .movie_menu{
        width: 100%;
        height: 45px;
        border-bottom: 1px solid #e6e6e6;
        display: flex;
        justify-content: space-between;
    }
    .movie_menu .city_name{
        margin-left: 20px;
        height: 100%;
        line-height: 45px;
    }
    .movie_menu .hot_switch{
        display: flex;
        height: 100%;
        line-height: 45px;
    }
    .movie_menu .hot_item{
        font-size: 15px;
        color: #666;
        width: 80px;
        text-align: center;
        margin: 0 12px;
        font-weight: 700;
    }
    .movie_menu .search_entry{
        margin-right: 20px;
        height: 100%;
        line-height: 45px;
    }
    .movie_menu .search_entry i{
        font-size: 24px;
        color: red;
    }
    .active{
        color: #ef4238;
        border-bottom: 2px solid #ef4238;
    }
</style>
