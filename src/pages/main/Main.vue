<template>
    <div id="main-Nav">
        <!-- 头部 -->
        <header>
            <!-- 头像 -->
            <img :src="avatar" style="width:70px;height:70px" />
            <!-- 右侧 -->
            <div>
                <p class="p1"><img src="../../assets/imgs/brand@2x.png" style="height:28px;"> {{ name }} </p>
                <p class="p2">{{ description }}</p>
                <p class="p3">{{ supportsStr }}</p>
            </div>
        </header>
        <!-- 导航 -->
        <nav>
            <router-link to='/'>商品</router-link>
            <router-link to='/eval'>评价</router-link>
            <router-link to='/merchant'>商家</router-link>
        </nav>
        <!-- 路由出口 -->
        <router-view></router-view>
        <!-- 购物车 -->
        <div class="shopcar-div">
            <Poptip title="购物车结算" width="300" style="float: left;">
                <img :src="shopcar" class='shopcar-logo' style="height:50px"/>
                <div class="api" slot="content">
                    <shop-car></shop-car>
                </div>
            </Poptip>
            <span class="price-lab">￥{{ getTotalPrice }}</span>
            <div class="settlement">去结算</div>
        </div>
    </div>
</template>

<script>
import { getSeller } from '../../api/api.js'
import ShopCar from '../shopCar/ShopCar'
export default {
    components:{
        ShopCar
    },
    data(){
        return{
            selected:false,
            navSelected:2,
            name:"",
            description:"",
            supports:[],
            avatar:'',
        }
    },
    computed:{
        shopcar(){
            if(this.selected)
                return require('../../assets/imgs/gouY.png');
            return require('../../assets/imgs/gouK.png');
        },
        supportsStr(){
            let str = '';
            for (const item of this.supports) {
                str += item.description +' ';
            }
            return str;
        },
        // 获取总价
        getTotalPrice(){
            let arr = this.$store.getters.getHasNum;
            if(arr.length>0){
                this.selected=true;
            }else{
                this.selected=false;
            }
            let price = 0;
            for (const value of arr) {
                price += value.price*value.num;
            }
            return price;
        }
    },
    created(){
        // 获取数据并渲染
        getSeller().then((res) => {
            let result = res.data.data;
            this.name = result.name;
            this.description = result.description;
            this.supports = result.supports;
            this.avatar = result.avatar;
        })
    }
};
</script>

<style scoped lang="less">
header{
    background: beige;
    padding: 20px;
    display: flex;
    flex-direction: row;
    img{
        margin-right: 10px;
    }
    div{
        .p1{
            img{
                float: left;
            }
            font-size: 20px;
        }
        .p2{
            font-size: 16px;
        }
        .p3{
            font-size: 14px;
        }
    }
}
nav{
    font-size: 18px;
    color: rgb(240,20,20);
    line-height: 40px;
    border-bottom: 1px solid #eeeff1;
    display: flex;
    justify-content: space-around;
    .router-link-exact-active{
        color: #f00;
    }
}
.shopcar-div{
    height: 60px;
    background: #141d27;
    width: 100%;
    position: fixed;
    bottom: 0px;
    .shopcar-logo{
        margin: 5px;
    }
    .settlement{
        background: orange;
        color: #fff;
        float: right;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        width: 100px;
    }
    .price-lab{
        font-size: 18px;
        line-height: 60px;
        float: left;
        color: #fff
    }
}
</style>