<template>
    <div class='movie_body'>
        <Loading v-if='isLoading'></Loading>
        <div v-else id="comingSoon" :style='myStyle'>
            <ul>
                <li v-for='film in movieList' :key='film.filmId'>
                    <v-touch @tap='handleToDetail(film.filmId)'>
                        <div class=pic_show><img :src="film.poster"></div>
                    </v-touch>
                    <div class='info_list'>
                        <v-touch @tap='handleToDetail(film.filmId)'>
                            <h2>{{ film.name }}</h2>
                        </v-touch>
                        <p v-if='film.actors'>主演：{{ showActors(film.actors) }}</p>
                        <p v-else>主演：不详</p>
                        <p>{{ film.nation }} | {{ film.runtime }}分钟</p>
                    </div>
                    <div class='btn_pre' @click='handleClick'>预售</div>
                </li>
            </ul>
            <Loader v-show='isLoadMore'></Loader>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import BScroll from'better-scroll';
import { Toast } from 'mint-ui';

export default {
    name: 'ComingSoon',
    data(){
        return {
            movieList: [],
            myStyle: {
                height: '0px'
            },
            isLoading: true,
            oldCityId: -1,
            myBScroll: null,
            lastPos: 0,
            isFirstActivated: true,
            isLoadMore: false,
            pageNum: 1,
            total: 0
        }
    },
    methods: {
        showImg(data){
            return data.replace('w.h', '64.90')
        },
        showActors(data){
            // 只把名字挑选出来
            var actorsList = data.map(item => item.name);
            // 使用空格把每个名字隔开
            return actorsList.join(' ');
        },
        handleToDetail(id){
            this.$router.push(`detail/2/${id}`);
        },
        handleClick(){
            Toast({
                message: '该功能尚未开发 (ಥ _ ಥ)',
                duration: 1000
            })
        },
        loadMore(){
            if(this.total == this.movieList.length){
                this.pageNum = 1;
                Toast({
                    message: '电影全部加载完噜~',
                    duration: 1000
                })
                return;
            }
            var curCityId = localStorage.getItem('curCityId');
            if(!curCityId){
                // 默认使用广州的相关电影数据
                curCityId = 440100;
            }
            this.isLoadMore = true;
            this.pageNum++;
            axios({
                url: `https://m.maizuo.com/gateway?cityId=${curCityId}&pageNum=${this.pageNum}&pageSize=10&type=2&k=685867`,
                headers: {
                    'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1597822477630398119837699"}',
                    'X-Host': 'mall.film-ticket.film.list'
                }
            }).then(res => {
                setTimeout(() => {
                    this.movieList = [...this.movieList, ...res.data.data.films];
                    //隐藏Loader组件
                    this.isLoadMore = false;
                }, 200);
            })
        }
    },
    watch: {
        movieList: {
            handler(){
                this.$nextTick(() => {
                    if(this.myBScroll){
                        // 每次movieList数据变化后就重新计算better-scroll的高度
                        this.myBScroll.refresh();
                        // 避免重复绑定，每次重新初始化better-scroll前都先把前一个destory掉
                        this.myBScroll.destroy();
                    }
                    this.myBScroll = new BScroll('#comingSoon', {
                        fade: true,
                        interactive: false,
                        click: true,
                        probeType: 1,
                        startY: this.lastPos,
                        bounce: true,
                        pullUpLoad: {
                            threshold: -80,
                            stop: 40
                        }
                    });
                    this.myBScroll.on('scroll', (pos) => {
                        this.lastPos = pos.y - 40;
                    })
                    this.myBScroll.on('pullingUp', () => {
                        this.loadMore();
                        this.myBScroll.finishPullUp();
                    })
                })
            }
        }
    },
    activated() {
        if(this.isFirstActivated){
            this.isFirstActivated = false;
            return;
        }
        var curCityId = localStorage.getItem('curCityId');
        if(!curCityId){
            // 默认使用广州的相关电影数据
            curCityId = 440100;
        }
        if(this.oldCityId != curCityId){
            this.oldCityId = curCityId;
            this.isLoading = true;
            axios({
                url: `https://m.maizuo.com/gateway?cityId=${curCityId}&pageNum=1&pageSize=10&type=2&k=685867`,
                headers: {
                    'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1597822477630398119837699"}',
                    'X-Host': 'mall.film-ticket.film.list'
                }
            }).then(res => {
                this.movieList = res.data.data.films;
                this.total = res.data.data.total;
                //隐藏Loading组件
                this.isLoading = false;
            })
        }
    },
    mounted(){
        this.isFirstActivated = true;
        // 指定#comingSoon的高度
        // document.documentElement.clientHeight --- 当前设备屏幕的高度
        // 147 --- 顶部Header组件,.movie_menu元素和底部TabBar组件的总高度
        this.myStyle.height = document.documentElement.clientHeight - 147 + 'px';
        var curCityId = localStorage.getItem('curCityId');
        if(!curCityId){
            // 默认使用广州的相关电影数据
            curCityId = 440100;
        }
        axios({
            url: `https://m.maizuo.com/gateway?cityId=${curCityId}&pageNum=1&pageSize=10&type=2&k=685867`,
            headers: {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1597822477630398119837699"}',
                'X-Host': 'mall.film-ticket.film.list'
            }
        }).then(res => {
            this.movieList = res.data.data.films;
            this.total = res.data.data.total;
            //隐藏Loading组件
            this.isLoading = false;
        })
    }
}
</script>

<style lang="scss" scoped>
        #content .movie_body{
        flex: 1;
        overflow: auto;
    }
    .movie_body ul{
        margin: 0 12px;
        overflow: hidden;
    }
    .movie_body ul li{
        margin-top: 12px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #e6e6e6;
        padding-bottom: 10px;
    }
    .movie_body .pic_show{
        width: 64px;
        height: 90px;
        overflow: hidden;
    }
    .movie_body .pic_show img{
        width: 100%;
    }
    .movie_body .info_list{
        margin-left: 10px;
        flex: 1;
        position: relative;
    }
    .movie_body .info_list h2{
        font-size: 17px;
        line-height: 24px;
        width: 150px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-bottom: 15px;
    }
    .movie_body .info_list p{
        font-size: 13px;
        color: #666;
        line-height: 22px;
        width: 200px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .movie_body .info_list img{
        width: 50px;
        position: absolute;
        right: 10px;
        top: 5px;
    }
    .movie_body .btn_mall,
    .movie_body .btn_pre{
        width: 47px;
        height: 27px;
        line-height: 28px;
        text-align: center;
        background-color: #f03d37;
        color: #fff;
        border-radius: 4px;
        font-size: 12px;
        cursor: pointer;
    }
    .movie_body .btn_pre{
        background-color: #3c9fe6;
    }
</style>
