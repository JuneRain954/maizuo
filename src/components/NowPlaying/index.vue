<template>
    <div class='movie_body'>
        <Loading v-if='isLoading' class='loading'></Loading>
        <div v-else id='nowPlaying' :style='myStyle'>
            <ul>
                <span id='update' :style='updateStyle'>{{ message }}</span>
                <li v-for='film in movieList' :key='film.id'>
                    <div class='pic_show' @click='handleToDetail(film.id)'><img :src="showImg(film.img)"></div>
                    <div class='info_list'>
                        <h2 @click='handleToDetail(film.id)'><span>{{ film.nm }}</span><img v-if='film.version == "v3d imax"' src='@/assets/3D.png' class='3D'></h2>
                        <p v-if='film.sc'>观众评分：<span class='grade'>{{ film.sc }}</span></p>
                        <p v-else>暂无评分</p>
                        <p v-if='film.star'>主演：{{ film.star }}</p>
                        <p v-else>主演：不详</p>
                        <p>{{ film.showInfo }}</p>
                    </div>
                    <div class='btn_mall' @click='handleClick'>购票</div>
                </li>
            </ul>
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
                display: 'none'
            },
            isUpdate: false,
            isLoading: true
        }
    },
    methods: {
        showImg(data){
            return data.replace('w.h', '64.90');
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
        }
    },
    mounted(){
        // 指定#nowPlaying的高度
        // document.documentElement.clientHeight --- 当前设备屏幕的高度
        // 147 --- 顶部Header组件,.movie_menu元素和底部TabBar组件的总高度
        this.myStyle.height = document.documentElement.clientHeight - 147 + 'px';
        axios({
            url: '/ajax/movieOnInfoList?token=&optimus_uuid=4ACD38B0DD3511EA92B9D96B8ADBA8017EC94C4A99EE4DFB93EA3EDFB22CF174&optimus_risk_level=71&optimus_code=10'
        }).then(res => {
            this.movieList = res.data.movieList;
            //隐藏Loading组件
            this.isLoading = false;
            // this.$nextTick()函数在axios函数结束时才会调用
            this.$nextTick(() => {
                if(!this.isUpdate){
                    var myBScroll = new BScroll('#nowPlaying', {
                        tap: true,
                        click: true,
                        probeType:1
                    })
                    myBScroll.on('scroll', (pos) => {
                        console.log('scroll');                
                        if(pos.y > 3){
                            this.message = '下拉可更新';
                            this.updateStyle.display = 'inline-block';
                        }
                        if(pos.y > 30){
                            this.message = '释放进行更新';
                            this.isUpdate = true;
                        }
                    })
                    myBScroll.on('touchEnd', (pos) => {
                        console.log('touchEnd');
                        if(this.isUpdate){
                            console.log('更新成功');
                            this.message = '更新成功';
                            this.isUpdate = false;
                            axios({
                                url: '/ajax/movieOnInfoList?token=&optimus_uuid=4ACD38B0DD3511EA92B9D96B8ADBA8017EC94C4A99EE4DFB93EA3EDFB22CF174&optimus_risk_level=71&optimus_code=10'
                            }).then(res => {
                                this.movieList = res.data.movieList;
                                this.$nextTick(() => {
                                    this.message = '';
                                    this.updateStyle.display = 'none';
                                })
                            })
                        }else{
                            this.message = '';
                            this.updateStyle.display = 'none';
                        }
                    })
                }
            })
        })
    }
}
</script>

<style lang="scss" scoped>
    #nowPlaying ul #update{
        text-align: center;
        width: 100%;
        padding-bottom: 6px;
        background: #e6e6e6;
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
