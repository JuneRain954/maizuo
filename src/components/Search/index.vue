<template>
    <div class='search_body'>
        <div class='search_input'>
            <div class='search_input_wrapper'>
                <i class='iconfont icon-sousuo'></i>
                <input type="text" v-model='searchValue' @input="searchRes(searchValue)">
            </div>
            <div class='search_result'>
                <h3>电影/电视剧/综艺</h3>
                <ul>
                    <li v-for='film in top3Films' :key='film.id'>
                        <div class='img'><img :src="showImg(film.img)"></div>
                        <div class='info'>
                            <p>
                                <span>{{ film.nm }}</span>
                                <span v-if='film.sc != 0'>{{ film.sc }}分</span>
                                <span v-else class='noFilmSc'>暂无评分</span>
                            </p>
                            <p>{{ film.cat }}</p>
                            <p>{{ film.rt }}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Search',
    data(){
        return {
            searchValue: '',
            top3Films: []
        }
    },
    methods: {
        showImg(data){
            return data.replace('w.h', '64.90')
        },
        searchRes(data){
            console.log(data)
            var URL = encodeURI(`/ajax/search?kw=${data}&cityId=286&stype=-1`)
            console.log(URL)
            axios({
                url: URL
            }).then(res => {
                console.log(res.data)
                if(res.data.movies){
                    console.log(res.data.movies.list)
                    this.top3Films = res.data.movies.list
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    #content .search_body{
        flex:1;
        overflow: auto;
        background: #f5f5f5;
    }
    .search_body .search_input{
        // padding: 8px 10px;
        background-color:#f5f5f5;
        border-bottom: 1px solid #e5e5e5;
    }
    .search_body .search_input_wrapper{
        padding: 0 10px;
        margin: 8px 10px;
        border: 1px solid #e6e6e6;
        border-radius: 5px;
        background: #fff;
        display: flex;
        // line-height: ;
    }
    .search_body .search_input_wrapper i{
        font-size: 16px;
        padding: 4px 0;
    }
    .search_body .search_input_wrapper input{
        border: none;
        font-size: 13px;
        color: #333;
        padding: 4px 0;
        outline: none;
        margin-left: 5px;
        width: 100%;
    }
    .search_body .search_result{
        background: #fff;
        width: 100%;
        margin-top: 10px;
    }

    .search_body .search_result h3{
        font-size: 15px;
        color: #999;
        padding: 9px 15px;
        border-bottom: 1px solid #e6e6e6;
    }
    // .search_body .search_result ul{}

    .search_body .search_result li{
        border-bottom: 1px #c9c9c9 dashed;
        padding: 10px 15px;
        box-sizing: border-box;
        display: flex;
    }
    .search_body .search_result .img{
        width: 60px;
        float: left;
    }
    .search_body .search_result .img img{
        width: 100%;
    }
    .search_body .search_result .info{
        float: left;
        margin-left: 15px;
        flex: 1;
    }
    .search_body .search_result .info p{
        height: 22px;
        display: flex;
        line-height: 22px;
        font-size: 12px;
    }
    .search_body .search_result .info p:nth-of-type(1) span:nth-of-type(1){
        font-size: 18px;
        flex: 1;
    }
    .search_body .search_result .info p:nth-of-type(1) span:nth-of-type(2){
        font-size: 16px;
        color: #fc7103;
    }
    .search_body .search_result .info p:nth-of-type(1) span.noFilmSc{
        color: #8a8080;
    }
</style>
