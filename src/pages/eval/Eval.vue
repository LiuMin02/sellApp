<template>
    <div id="eval">
        <div class="eval-top-box">
            <div class="eval-top-left">
                <p class="p1">3.9</p>
                <p class="p2">综合评分</p>
                <p>高于周边商家69.2%</p>
            </div>
            <ul class="eval-top-right">
                <li>
                    <span>服务态度</span>
                    <img src="../../assets/imgs/star24_on@3x.png" class="star">
                    <img src="../../assets/imgs/star24_on@3x.png" class="star">
                    <img src="../../assets/imgs/star24_on@3x.png" class="star">
                    <img src="../../assets/imgs/star24_off@3x.png" class="star">
                    <span class="score">3.9</span>
                </li>
                <li>
                    <span>商品描述</span>
                    <img src="../../assets/imgs/star24_on@3x.png" class="star">
                    <img src="../../assets/imgs/star24_on@3x.png" class="star">
                    <img src="../../assets/imgs/star24_on@3x.png" class="star">
                    <img src="../../assets/imgs/star24_off@3x.png" class="star">
                    <span class="score">4.0</span>
                </li>
                <li><span>送达时间&emsp;44分钟</span></li>
            </ul>
        </div>
        <div class="eval-nav-box">
            <p :class="{active:selected==2}"><span @click="getRating(2)">全部</span>&nbsp;{{countAll}}</p>
            <p :class="{active:selected==0}"><span @click="getRating(0)">满意</span>&nbsp;{{countType0}}</p>
            <p :class="{active:selected==1}"><span @click="getRating(1)">不满意</span>&nbsp;{{countAll-countType0}}</p>
        </div>
        <ul class="eval-main-box">
            <li v-for="item in ratingsList">
                <img class="eval-main-left" :src="item.avatar">
                <div class="eval-main-right">
                    <p style="overflow:hidden;"><span class="username">{{item.username}}</span> <span class="rateTime">{{fmtDate(item.rateTime)}}</span></p>
                    <p>
                        <img src="../../assets/imgs/star24_on@2x.png" class="star" v-for="n in item.score">
                        <img src="../../assets/imgs/star24_off@2x.png" class="star" v-for="n in (5-item.score)"> 
                        <span>&emsp;{{item.deliveryTime}}分钟送达</span>
                    </p>
                    <p>{{item.text}}</p>
                    <p>
                        <span class="recommend" v-for="v in item.recommend">{{v}}</span>
                    </p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import getRatingsList from '../../api/api.js'
    export default {
        data(){
            return {
                ratingsList:[],
                ratingsListSave:[],
                countAll:0,
                countType0:0,
                selected:2
            }
        },
        methods:{
            // 将时间戳转正常时间格式
            fmtDate(obj){
                var date =  new Date(obj);
                var y = 1900+date.getYear();
                var m = "0"+(date.getMonth()+1);
                var d = "0"+date.getDate();
                return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
            },
            getRating(i){
                let arr = [];
                this.selected = i;
                if(i==0||i==1){
                    for (const value of this.ratingsListSave) {
                        if(value.rateType == i){
                            arr.push(value);
                        }
                    }
                    this.ratingsList = arr;
                }
                else{
                    this.ratingsList = this.ratingsListSave;
                }
            }
        },
        computed:{
            
        },
        async created(){
            let res = await getRatingsList();
            let result = res.data.data;
            this.countAll = result.length;
            let count =0;
            for (const v of result) {
                if(v.rateType === 0){
                    count +=1;
                }
            }
            this.countType0 = count;
            this.ratingsListSave = result;
            this.ratingsList = result;
            console.log(result);
            
        }
    }
</script>

<style scoped lang="less">
.eval-top-box{
    display: flex;
    flex-direction: row;
    padding: 10px;
    height: 90px;
    .eval-top-left{
        margin-right: 10px;
        text-align: center;
        .p1{
            font-size: 20px;
            color: orange;
        }
        .p2{
            font-size: 14px;
            color: rgb(7,17,27)
        }
    }
    .eval-top-right{
        list-style: none;
        font-size: 14px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        color: rgb(7,17,27);
        li{
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
        }
        .star{
            height: 20px;
            margin-left:10px;
        }
        .score{
            font-size: 16px;
            color: orange;
            margin-left: 10px;
        }
    }
}
.eval-nav-box{
    display: flex;
    flex-direction: row;
    margin: 10px;
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    p{
        background: #ccc;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 5px;
        padding: 5px;
    }
    p.active{
        background: rgb(79, 137, 245);
        color: rgb(238, 229, 229);
    }
}
.eval-main-box{
    list-style: none;
    li{
        margin: 5px 20px;
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid #ccc;
        .eval-main-left{
            width: 30px;
            height: 30px;
            border-radius: 50%;
        }
        .eval-main-right{
            margin-left: 10px;
            padding-bottom: 10px;
            width: 100%;
            font-size: 14px;
            .star{
                height: 10px;
            }
            .username{
                float: left;
            }
            .rateTime{
                float: right;
            }
            .recommend{
                display: inline-block;
                padding: 2px;
                font-size: 12px;
                border: 1px solid rgb(248, 248, 248);
            }
        }
    }
}
</style>