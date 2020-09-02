<template>
    <div id="detailContainer" :class='myClass'>
        <Header title='影片详情'>
            <i class='iconfont icon-left' @touchstart='goBack'></i>
        </Header>
        <Loading v-if='isLoading'></Loading>
        <div v-else id="content" class='contentDetail' :style='getBackGroundColor'>
            <div class="detail_list">
                <div class='detail_list_bg' :style='myStyle'></div>
                <div class='detail_list_filter'></div>
                <div class='detail_list_content'>
                    <div class='detail_list_img'>
                        <img :src="showImg(detailMovie.img)">
                    </div>
                    <div class="detail_list_info">
                        <h2>{{ detailMovie.nm }}</h2>
                        <p v-if='detailMovie.enm' class='movieEnm'>{{ detailMovie.enm }}</p>
                        <p v-else></p>
                        <p v-if='detailMovie.sc != 0' class='movieSc'>{{ detailMovie.sc }}<span class='movieSum'>({{ showSum(detailMovie.snum) }}万人评分)</span></p>
                        <p v-else>暂无评分</p>
                        <p class='movieCat'>{{ detailMovie.cat }}</p>
                        <p class='movieSrcAndDur'>{{ detailMovie.src }} / {{ detailMovie.dur }}分钟</p>
                        <p class='moviePubDesc'>{{ detailMovie.pubDesc }}</p>
                    </div>
                </div>
            </div>
            <div class="detail_intro">
                <h5>简介</h5>
                <p :style='draStyle' @click='changeHeight'>{{ detailMovie.dra }}</p>
            </div>
            <div class="detail_player swiper-container">
                <h5>剧照</h5>
                <ul class="swiper-wrapper">
                    <li class="swiper-slide" v-for='(img, index) in detailMovie.photos' :key='index'>
                        <div>
                            <img :src="showImg(img, '420.279')">
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header';
import axios from 'axios';

export default {
    name: 'Detail',
    props: ['movieId'],
    components: {
        Header
    },
    data(){
        return {
            myClass: 'slide-enter-active',
            myStyle: {
                background: 'url() 0 40%'
            },
            getBackGroundColor: {
                background: 'white',
                height: '0px'
            },
            draStyle: {
                overflow: 'hidden',
                display: '-webkit-box'
            },
            detailMovie: {},
            isLoading: true
        }
    },
    methods: {
        goBack(){
            this.myClass = 'slide-leave-active'
            setTimeout(() => {
                // 返回前一个页面
                this.$router.back();
            }, 500)
        },
        showImg(data, size){
            if(data){
                if(size){
                    return data.replace('w.h', size);
                }else{
                    return data.replace('w.h', '108.150');
                }
            }
        },
        showSum(sum){
            return (sum / 10000).toFixed(1);
        },
        changeHeight(){
            if(this.draStyle.overflow == 'hidden'){
                this.draStyle.overflow = 'auto';
                this.draStyle.display = 'block';
            }else{
                this.draStyle.overflow = 'hidden';
                this.draStyle.display = '-webkit-box';
            }
        }
    },
    mounted(){
        axios({
            url: `/ajax/detailmovie?movieId=${this.movieId}&optimus_uuid=4ACD38B0DD3511EA92B9D96B8ADBA8017EC94C4A99EE4DFB93EA3EDFB22CF174&optimus_risk_level=71&optimus_code=10`
        }).then(res => {
            //隐藏Loading组件
            this.isLoading = false;
            // 完成电影详情的背景图片的布置
            var w = document.documentElement.clientWidth;
            var imgPath = res.data.detailMovie.img.replace('w.h', `${w}.200`);
            this.myStyle.background = `url(${imgPath}) 0 40%`;
            this.getBackGroundColor.background = res.data.detailMovie.backgroundColor;
            this.getBackGroundColor.height = document.documentElement.clientHeight - 51 + 'px';
            //获取完整数据
            this.detailMovie = res.data.detailMovie;
            console.log(this.detailMovie);
            this.$nextTick(() => {
                new Swiper('.detail_player', {
                    slidesPerView: 2,
                    freeMode: true,
                    freeModeSticky: true
                })
            })
        })
    }
}
</script>

<style lang="scss" scoped>
    #detailContainer{
        position: absolute;
        left: 0;
        top: 0;
        z-index: 999;
        width: 100%;
        min-height: 100%;
        background: white;
    }
    #detailContainer.slide-enter-active{
        animation: 0.5s slideEnter;
    }
    #detailContainer.slide-leave-active{
        animation: 0.5s slideLeave;
    }
    @keyframes slideEnter {
        from{
            transform: translateX(100%);
        }
        to{
            transform: translateX(0%);
        }
    }
    @keyframes slideLeave {
        from{
            transform: translateX(0%);
        }
        to{
            transform: translateX(-100%);
        }
    }
    #content.contentDetail{
        display: block;
        margin-bottom: 0;
    }
    #content .detail_list{
        height: 200px;
        width: 100%;
        position: relative;
        overflow: hidden;
    }
    .detail_list .detail_list_bg{
        width: 100%;
        height: 100%;
        background: url() 0 40%;
        filter: blur(20px);
        background: #403723;
        // ... 
    }
    .detail_list .detail_list_filter{
        width: 100%;
        height: 100%;
        position: absolute;
        background: #40454d;
        opacity: 0.55;
        // position: ;
    }
    .detail_list .detail_list_content{
        display: flex;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 2;
    }
    .detail_list .detail_list_img{
        width: 108px;
        height: 150px;
        border: 1px solid #f0f2f3;
        margin: 20px;
    }
    .detail_list .detail_list_img img{
        width: 100%;
        height: 100%;
    }
    .detail_list .detail_list_info{
        margin-top: 20px;
    }
    .detail_list .detail_list_info .movieEnm,
    .detail_list .detail_list_info .movieCat,
    .detail_list .detail_list_info .movieSrcAndDur,
    .detail_list .detail_list_info .moviePubDesc{
        font-size: 12px;
        color: #fff;
        opacity: .8;
    }
    .detail_list .detail_list_info .movieSc{
        font-size: 18px;
        color: #ffcc00;
    }
    .detail_list .detail_list_info .movieSum{
        font-size: 12px;
        color: #fff;
        opacity: .8;
        display: inline-block;
        margin-left: 8px;
    }
    .detail_list .detail_list_info h2{
        font-size: 20px;
        color: white;
        font-weight: normal;
        line-height: 40px;
        font-weight: 700;
    }
    .detail_list .detail_list_info p{
        color: white;
        line-height: 20px;
        font-size: 14px;
        color: #ccc;
    }
    #content .detail_intro{
        padding: 10px;
        color: whitesmoke;
        margin-left: 10px;
    }
    #content .detail_intro h5{
        margin-bottom: 10px;
    }
    #content .detail_intro p{
        font-size: 13px;
        width: 330px;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
    }
    #content .detail_player{
        margin: 20px;
    }
    #content .detail_player h5{
        color: whitesmoke;
        margin-bottom: 10px;
    }
    .detail_player .swiper-slide{
        width: 70px;
        margin-right: 20px;
        height: 90px;
        overflow: hidden;
    }
    .detail_player .swiper-slide img{
        width: 100%;
        height: 100%;
        margin-bottom: 5px;
    }
</style>
