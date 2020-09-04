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
            oldCityId: -1
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
        }
    },
    activated() {
        var curCityId = localStorage.getItem('curCityId');
        if(!curCityId){
            // 默认使用广州的相关电影数据
            curCityId = 440100;
        }
        if(this.oldCityId != curCityId){
            this.oldCityId = curCityId;
            this.isLoading = true;
            axios({
                // url: '/ajax/comingList?ci=1&token=&limit=10&optimus_uuid=4ACD38B0DD3511EA92B9D96B8ADBA8017EC94C4A99EE4DFB93EA3EDFB22CF174&optimus_risk_level=71&optimus_code=10'
                url: `https://m.maizuo.com/gateway?cityId=${curCityId}&pageNum=1&pageSize=10&type=2&k=685867`,
                headers: {
                    'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1597822477630398119837699"}',
                    'X-Host': 'mall.film-ticket.film.list'
                }
            }).then(res => {
                // this.movieList = res.data.coming
                this.movieList = res.data.data.films;
                //隐藏Loading组件
                this.isLoading = false;
                // thi.$nextTick() --- axios函数结束时才会调用
                this.$nextTick(() => {
                    new BScroll('#comingSoon', {
                        fade: true,
                        interactive: false,
                        click: true
                    })
                })
            })
        }
    },
    mounted(){
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
            // url: '/ajax/comingList?ci=1&token=&limit=10&optimus_uuid=4ACD38B0DD3511EA92B9D96B8ADBA8017EC94C4A99EE4DFB93EA3EDFB22CF174&optimus_risk_level=71&optimus_code=10'
            url: `https://m.maizuo.com/gateway?cityId=${curCityId}&pageNum=1&pageSize=10&type=2&k=685867`,
            headers: {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1597822477630398119837699"}',
                'X-Host': 'mall.film-ticket.film.list'
            }
        }).then(res => {
            // this.movieList = res.data.coming
            this.movieList = res.data.data.films;
            //隐藏Loading组件
            this.isLoading = false;
            // thi.$nextTick() --- axios函数结束时才会调用
            this.$nextTick(() => {
                new BScroll('#comingSoon', {
                    fade: true,
                    interactive: false,
                    click: true
                })
            })
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
