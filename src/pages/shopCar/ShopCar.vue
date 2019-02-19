<template>
    <div>
        <div class="shop-div" v-for="item in getHasNumGoods">
            <span class="goodsName">{{item.name}}</span>
            <div class="goods-right">
                <span class="price">&yen;{{item.price*item.num}}</span>
                <Button @click="clickNumDec(item.id)">-</Button>
                <span>{{item.num}}</span>
                <Button @click="clickNumAdd(item.id)" type="warning">+</Button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        computed:{
            getHasNumGoods(){
                return this.$store.getters.getHasNum;
            }
        },
        methods:{
            clickNumDec(id){
                this.$store.commit({
                   type:'m_changeGoodsNum',
                   id:id,
                   count:-1
               })
            },
            clickNumAdd(id){
                this.$store.commit({
                   type:'m_changeGoodsNum',
                   id:id,
                   count:1
               })
            }
        }
    }
</script>

<style scoped lang="less">
.shop-div{
    overflow: hidden;
    width: 100%;
    font-size: 14px;
    line-height: 40px;
    .goodsName{
        float: left;
    }
    .goods-right{
        float: right;
        .price{
            color: #f00;
            font-size: 16px;
        }
        Button{
            border-radius: 50%;
            height: 30px;
            width: 30px;
            margin: 0 5px;
            font-size: 16px;
        }
    }
}
</style>