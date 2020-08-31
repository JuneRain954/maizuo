<template>
    <div>
        <!-- <div class='city_body'> -->
        <div>
            <mt-index-list>
                <mt-index-section v-for='citiesInfo in citiesList' :index="citiesInfo.letter" :key='citiesInfo.letter'>
                    <div v-for='city in citiesInfo.cities' :key='city.cityId' @click='getCityId(city.cityId)'>
                        <mt-cell :title="city.name"></mt-cell>
                    </div>
                </mt-index-section>
            </mt-index-list>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'City',
    data(){
        return {
            citiesList: []
        }
    },
    methods: {
        handleCitiesData(data){
            var newList = []
            var letter = []
            /* 首先创建保存所有城市的拼音的开头字母（大写）的数组letter
            ** 即 letter = ['A', 'B', 'C', ... , 'Z]
            */
            for(var i = 65; i < 91; i++){
                letter.push(String.fromCharCode(i))
            }
            // 然后根据首大写字母A-Z分别过滤出数据中以拼音是以该大写字母开头的城市
            for(var j = 0; j < letter.length; j++){
                var arr = data.filter(item => item.pinyin.substring(0,1).toUpperCase() == letter[j])
                if(arr.length > 0){
                    newList.push({
                    letter: letter[j],
                    cities: arr
                })
                }
            }
            return newList
        },
        getCityId(id){
            console.log(id)
        }
    },
    mounted(){
        axios({
            // url: '/dianying/cities.json'
            url: 'https://m.maizuo.com/gateway?k=9397766',
            headers: {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1597822477630398119837699","bc":"441800"}',
                'X-Host': 'mall.film-ticket.city.list'
            }
        }).then(res => {
            // this.citiesList = this.handleCitiesData(res.data.cts)
            console.log(res.data.data.cities)
            this.citiesList = this.handleCitiesData(res.data.data.cities)
        })
    }
}
</script>

<style lang="scss" scoped>
    #content .city_body{
        margin-top: 45px;
        display: flex;
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
    }
    .city_body .city_list{
        flex:1;
        overflow: auto;
        background-color: #fff5f0;
    }
    .city_body .city_list::-webkit-scrollbar{
        background-color: transparent;
        width: 0;
    }
    .city_body .city_hot{
        margin-top: 20px;
    }
    .city_body .city_hot h2{
        padding-left: 15px;
        line-height: 30px;
        font-size: 14px;
        background: #f0f0f0;
        font-weight: normal;
    }
    // .city_body .city_hot ul{}

    .city_body .city_hot ul li{
        float: left;
        background-color: #fff;
        width: 29%;
        height: 33px;
        margin-top: 15px;
        margin-left: 3%;
        padding:0 4px;
        border: 1px solid #e6e6e6;
        border-radius: 3px;
        line-height: 33px;
        text-align: center;
        box-sizing: border-box;
        //********* */
    }
    // .city_body .city_sort{}

    .city_body .city_sort div{
        margin-top: 20px;
    }
    .city_body .city_sort h2{
        padding-left: 15px;
        line-height: 30px;
        font-size: 14px;
        background-color: #f0f0f0;
        font-weight: normal;
    }
    .city_body .city_sort ul{
        padding-left: 10px;
        margin-top: 10px;
    }
    .city_body .city_sort ul li{
        line-height: 30px;
    }
    .city_body .city_index{
        width: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        border-left: 1px #e6e6e6 solid;
    }
</style>
