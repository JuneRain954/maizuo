<template>
    <div class='movie_body'>
        <ul>
            <li v-for='film in movieList' :key='film.id'>
                <div class=pic_show><img :src="showImg(film.img)"></div>
                <div class='info_list'>
                    <h2>{{ film.nm }}</h2>
                    <p><span class='person'>{{ film.wish }}</span>人想看</p>
                    <p v-if='film.star'>主演：{{ film.star }}</p>
                    <p v-else>主演：不详</p>
                    <p>{{ film.rt }}上映</p>
                </div>
                <div class='btn_pre'>预售</div>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'ComingSoon',
    data(){
        return {
            movieList: []
        }
    },
    methods: {
        showImg(data){
            return data.replace('w.h', '64.90')
        }
    },
    mounted(){
        axios({
            url: '/ajax/comingList?ci=1&token=&limit=10&optimus_uuid=4ACD38B0DD3511EA92B9D96B8ADBA8017EC94C4A99EE4DFB93EA3EDFB22CF174&optimus_risk_level=71&optimus_code=10'
        }).then(res => {
            this.movieList = res.data.coming
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
    .movie_body .info_list .person{
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
