<template>
    <div>
        <div>
            <Loading v-if='isLoading'></Loading>
            <mt-index-list v-else>
                <div class="hotCities" v-if='hotList.length != 0'>
                    <ul>
                        <p>热门城市</p>
                        <li v-for='hotCity in hotList' :key='hotCity.cityId' @click='updateLocation(hotCity.name, hotCity.cityId)'>
                            <span>{{ hotCity.name }}</span>
                        </li>
                    </ul>
                </div>
                <mt-index-section v-for='citiesInfo in citiesList' :index="citiesInfo.letter" :key='citiesInfo.letter'>
                    <div v-for='city in citiesInfo.cities' :key='city.cityId' @click='updateLocation(city.name, city.cityId)'>
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
            citiesList: [],
            hotList: [],
            isLoading: true
        }
    },
    methods: {
        handleCitiesData(data){
            var citiesList = []
            var letter = []
            var hotList = []
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
                    citiesList.push({
                    letter: letter[j],
                    cities: arr
                })
                }
            }
            hotList = data.filter(item => item.isHot == 1)
            return {
                citiesList,
                hotList
            }
        },
        updateLocation(name, id){
            // 调用store/city/index.js中的CITY_INFO的mutation方法来修改相应状态
            this.$store.commit('city/CITY_INFO', {
                nm: name,
                id: id
            });
            localStorage.setItem('curCityName', name);
            localStorage.setItem('curCityId', id);
            this.$router.push('/movie');
        }
    },
    mounted(){
        var citiesList = localStorage.getItem('citiesList');
        var hotList = localStorage.getItem('hotList');
        if(citiesList && hotList){
            this.citiesList = JSON.parse(citiesList);
            this.hotList = JSON.parse(hotList);
            //隐藏Loading组件
            this.isLoading = false;
        }else{
            axios({
                url: 'https://m.maizuo.com/gateway?k=9397766',
                headers: {
                    'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1597822477630398119837699","bc":"441800"}',
                    'X-Host': 'mall.film-ticket.city.list'
                }
            }).then(res => {
                //隐藏Loading组件
                this.isLoading = false;
                var { citiesList, hotList} = this.handleCitiesData(res.data.data.cities);
                this.citiesList = citiesList;
                this.hotList = hotList;
                //把数据存到本地，避免频繁请求数据
                localStorage.setItem('citiesList', JSON.stringify(citiesList));
                localStorage.setItem('hotList', JSON.stringify(hotList));
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .hotCities ul{
        width: 100%;
        margin-top: 10px;
        padding: 5px;
        overflow: hidden;
    }
    .hotCities ul p{
        width: 80px;
        height: 20px;
        margin-left: 10px;
        color: rgba(0, 0, 0, 0.7);
    }
    .hotCities ul li{
        float: left;
        width: 80px;
        height: 25px;
        border: 1px solid rgb(196, 181, 181);
        text-align: center;
        line-height: 25px;
        border-radius: 5px;
        margin: 5px 15px;
        background-color: #f4f4f4;
    }
</style>
