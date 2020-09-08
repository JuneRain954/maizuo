<template>
    <div class='movie_body'>
        <Loading v-if='isLoading' class='loading'></Loading>
        <div v-else id='nowPlaying' :style='myStyle'>
            <div>
                <p id='update' :style='updateStyle'>{{ message }}</p>
                <ul>
                    <li v-for='film in movieList' :key='film.filmId'>
                        <v-touch @tap='handleToDetail(film.filmId)'>
                            <div class='pic_show'><img :src="film.poster"></div>
                        </v-touch>
                        <div class='info_list'>
                            <v-touch @tap='handleToDetail(film.filmId)'>
                                <h2><span>{{ film.name }}</span><img v-if='film.filmType.name == "3D"' src='@/assets/3D.png' class='3D'></h2>
                            </v-touch>
                            <p v-if='film.grade'>观众评分：<span class='grade'>{{ film.grade }}</span></p>
                            <p v-else>暂无评分</p>
                            <p v-if='film.actors'>主演：{{ showActors(film.actors) }}</p>
                            <p v-else>主演：不详</p>
                            <p>{{ film.nation }} | {{ film.runtime }}分钟</p>
                        </div>
                        <div class='btn_mall' @click='handleClick'>购票</div>
                    </li>
                </ul>
            </div>
            <Loader v-show='isLoadMore'></Loader>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import BScroll from 'better-scroll';
import { Toast } from 'mint-ui';

export default {
    name: 'NowPlaying',
    data () {
        return {
            movieList: [],
            message: '',
            myStyle: {
                height: '0px'
            },
            updateStyle: {
                height: '0px',
                padding: '0',
                border: 'none',
                marginBottom: '0px',
                transition: ''
            },
            isUpdate: false,
            isLoading: true,
            oldCityId: -1,
            isLoadMore: false,
            pageNum: 1,
            total: 0,
            isFirstActivated: true,
            lastPos: 0,
            myBScroll: null,
            timerId: null
        }
    },
    methods: {
        showImg(data){
            return data.replace('w.h', '64.90');
        },
        showActors(data){
            var actorList = data.map(item => item.name);
            return actorList.join(' ');
        },
        handleToDetail(id){
            this.$router.push(`detail/1/${id}`);
        },
        handleClick(){
            Toast({
                message: '该功能尚未开发 ψ(._. )>',
                position: 'middle',
                duration: 1000
            });
        },
        updateMovieList(){
            // 顶部下拉刷新数据
            this.pageNum = 1;
            var curCityId = localStorage.getItem('curCityId');
            if(!curCityId){
                // 默认使用广州的相关电影数据
                curCityId = 440100;
            }
            axios({
                url: `https://m.maizuo.com/gateway?cityId=${curCityId}&pageNum=1&pageSize=10&type=1&k=6855649`,
                headers: {
                    'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1597822477630398119837699"}',
                    'X-Host': 'mall.film-ticket.film.list'
                }
            }).then(res => {
                this.movieList = res.data.data.films;
                this.$nextTick(() => {
                    this.controlPullDownTip(false);
                    Toast({
                        message: '更新成功',
                        duration: 1000
                    })
                })
            })
        },
        loadMore(){
            // 底部上拉加载更多数据
            if(this.total == this.movieList.length){
                this.pageNum = 1;
                Toast({
                    message: '电影全部加载完噜~',
                    duration: 1000
                })
                return;
            }
            var curCityId = localStorage.getItem('curCityId');
            this.isLoadMore = true;
            this.pageNum++;
            axios({
                url: `https://m.maizuo.com/gateway?cityId=${curCityId}&pageNum=${this.pageNum}&pageSize=10&type=1&k=6855649`,
                headers: {
                    'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1597822477630398119837699"}',
                    'X-Host': 'mall.film-ticket.film.list'
                }
            }).then(res => {
                setTimeout(() => {
                    this.movieList = [...this.movieList, ...res.data.data.films];
                    this.isLoadMore = false;
                }, 200);
            })
        },
        myScrollEvent(pos){
            if(pos.y > 5){
                this.message = '下拉刷新';
                this.controlPullDownTip(true);
            }
            if(pos.y > 80){
                this.message = '释放进行刷新';
            }
        },
        controlPullDownTip(ishow){
            if(ishow){
                this.updateStyle.height = '14px';
                this.updateStyle.padding = '8px 0';
                this.updateStyle.border = '1px dashed #7facc9';
                this.updateStyle.marginBottom = '6px';
                this.updateStyle.transition = 'height 1s';
            }else{
                while(this.updateStyle.height == '14px'){
                    this.message = '';
                    this.updateStyle.height = '0px';
                    this.updateStyle.padding = '0';
                    this.updateStyle.border = 'none';
                    this.updateStyle.marginBottom = '0px';
                    this.updateStyle.transition = 'height 0.2s';
                }
            }
        }
    },
    watch: {
        movieList: {
            // 每次movieList发生变化就初始化better-scroll
            handler(){
                this.$nextTick(() => {
                    if(this.myBScroll){
                        // 每次movieList数据变化后就重新计算better-scroll的高度
                        this.myBScroll.refresh();
                        // 避免重复绑定，每次重新初始化better-scroll前都先把前一个destory掉
                        this.myBScroll.destroy();
                    }
                    this.myBScroll = new BScroll('#nowPlaying', {
                        tap: true,
                        click: true,
                        probeType:1,
                        startY: this.lastPos,
                        pullUpLoad: {
                            threshold: -80,
                            stop: 40
                        },
                        pullDownRefresh: {
                            threshold: 80,
                            stop: 50
                        },
                        bounce: true
                    })
                    this.myBScroll.on('scroll', (pos) => {     
                        this.lastPos = pos.y - 40;
                        this.myScrollEvent(pos);
                    })
                    this.myBScroll.on('scrollEnd', () => {
                        this.$nextTick(() => {
                            this.controlPullDownTip(false);
                            if(this.timerId){
                                return;
                            }
                            this.timerId = setInterval(() => {
                                this.controlPullDownTip(false);
                                if(this.updateStyle.height == '0px'){
                                    clearInterval(this.timerId);
                                    this.timerId = null;
                                }
                            }, 200);
                            setTimeout(() => {
                                if(this.timerId){
                                    return;
                                }
                                this.timerId = setInterval(() => {
                                    this.controlPullDownTip(false);
                                    if(this.updateStyle.height == '0px'){
                                        clearInterval(this.timerId);
                                        this.timerId = null;
                                    }
                                }, 200);
                            }, 2000);
                        })
                    })
                    // 上拉加载
                    this.myBScroll.on('pullingUp', () => {
                        this.loadMore();
                        this.myBScroll.finishPullUp();
                    })
                    // 下拉刷新
                    this.myBScroll.on('pullingDown', () => {
                        this.updateMovieList();
                        this.myBScroll.finishPullDown();
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
            // 城市定位改变了才刷新数据
            axios({
                url: `https://m.maizuo.com/gateway?cityId=${curCityId}&pageNum=1&pageSize=10&type=1&k=6855649`,
                headers: {
                    'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1597822477630398119837699"}',
                    'X-Host': 'mall.film-ticket.film.list'
                }
            }).then(res => {
                this.movieList = res.data.data.films;
                this.total = res.data.data.total;
                this.isLoading = false;
            })
        }
    },
    mounted(){
        this.isFirstActivated = true;
        // 指定#nowPlaying的高度
        // document.documentElement.clientHeight --- 当前设备屏幕的高度
        // 147 --- 顶部Header组件,.movie_menu元素和底部TabBar组件的总高度
        this.myStyle.height = document.documentElement.clientHeight - 147 + 'px';
        var curCityId = localStorage.getItem('curCityId');
        if(!curCityId){
            // 默认使用广州的相关电影数据
            curCityId = 440100;
        }
        axios({
            url: `https://m.maizuo.com/gateway?cityId=${curCityId}&pageNum=1&pageSize=10&type=1&k=6855649`,
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
    #nowPlaying #update{
        text-align: center;
        line-height: 14px;
        font-weight: 700;
        color: #7facc9;
        width: 120px;
        margin: 0 auto;
        background: rgba(243, 212, 192, 0.5);
        border-radius: 10px;
        overflow: hidden;
    }
    #content .movie_body{
        flex: 1;
        overflow: auto;
        background: #e6e6e6;
    }
    .movie_body ul{
        padding: 0 12px;
        overflow: hidden;
        background-color: white;
    }
    .movie_body ul li{
        margin-top: 12px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #e6e6e6;
        padding-bottom: 10px;
        position: relative;
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
        
    }
    .movie_body .info_list h2 img{
        width: 30px;
        height: 25px;
        position: absolute;
        right: -40px;
        top: -2px;
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
    .movie_body .info_list .grade{
        font-weight: 700;
        color: #faaf00;
        font-size: 15px;
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
