<template>
    <div class='cinema_body'>
        <Loading v-if='isLoading'></Loading>
        <ul v-else>
            <li v-for='cinema in cinemas' :key='cinema.cinemaId'>
                <div>
                    <span>{{ cinema.name }}</span>
                    <span class='q'><span class='price'>{{ showPrice(cinema.lowPrice) }}</span>元起</span>
                </div>
                <div class='address'>
                    <span id='cinemaAddress'>{{ cinema.address }}</span>
                    <span>{{ showDistance(cinema.Distance) }}km</span>
                </div>
                <div class='card'>
                    <div>小吃</div>
                    <div>折扣卡</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'
import { MessageBox } from 'mint-ui'

export default {
    name: 'CinemaList',
    data(){
        return {
            cinemas: [],
            isLoading: true,
            isUpdated: false,
            oldCityId: -1
        }
    },
    methods: {
        showPrice(price){
            return (price / 100).toFixed(1)
        },
        showDistance(distcance){
            return distcance.toFixed(2)
        }
    },
    activated() {
        var curCityId = localStorage.getItem('curCityId');
        if(this.oldCityId != curCityId){
            this.isLoading = true;
            this.oldCityId = curCityId;
            axios({
                url: `https://m.maizuo.com/gateway?cityId=${curCityId}&ticketFlag=1&k=3667378`,
                headers: {
                    'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1597822477630398119837699","bc":"441800"}',
                    'X-Host': 'mall.film-ticket.cinema.list'
                }
            }).then(res => {
                this.cinemas = res.data.data.cinemas
                //隐藏Loading组件
                this.isLoading = false;
            })
        }
    },
    mounted(){
        var cityId = this.$store.state.city.id;
        // cityId初始值为-1，表示用户还没进行定位
        if(cityId == -1){
            // 用户没有进行定位则弹出提示框提示用户前往定位
            MessageBox({
                title: '提示',
                message: '还没定位噢，快去定位吧'
            }).then(res => {
                if(res === 'confirm'){
                    // 点击了确认则跳转到定位页面
                    this.isLoading = false;
                    this.$router.push('/movie/city');
                }
            })
        }else{
            // 获取城市数据列表
            axios({
                url: `https://m.maizuo.com/gateway?cityId=${this.$store.state.city.id}&ticketFlag=1&k=3667378`,
                headers: {
                    'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1597822477630398119837699","bc":"441800"}',
                    'X-Host': 'mall.film-ticket.cinema.list'
                }
            }).then(res => {
                this.cinemas = res.data.data.cinemas
                //隐藏Loading组件
                this.isLoading = false;
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    #content .cinema_body{
        flex: 1;
        overflow: auto;
    }
    .cinema_body .cinemaList{
        overflow: hidden;
    }
    .cinema_body ul{
        padding: 20px;
    }
    .cinema_body li{
        border-bottom: 1px solid #e6e6e6;
        margin-bottom: 20px;
    }
    .cinema_body div{
        margin-bottom: 10px;
    }
    .cinema_body .q{
        font-size: 11px;;
        color: #f03d37;
        float: right;
    }
    .cinema_body .price{
        font-size: 18px;
    }
    .cinema_body .address{
        font-size: 13px;
        color: #666;
    }
    .cinema_body .address #cinemaAddress{
        display: inline-block;
        width: 230px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .cinema_body .address span:nth-of-type(2){
        float: right;
    }
    .cinema_body .card{
        display: flex;
    }
    .cinema_body .card div{
        padding: 0 3px;
        height: 15px;
        line-height: 15px;
        border-radius: 2px;
        color: #f90;
        border: 1px solid #f90;
        font-size: 13px;
        margin-right: 5px;
    }
    .cinema_body .card div.or{
        color: #f90;
        border: 1px solid #f90;
    }
    .cinema_body .card div.bl{
        color: #589daf;
        border: 1px solid #589daf;
    }
</style>
