<template>
    <div id="goods">
        <Row>
            <Col span="6">
                <div class="wrapper left-div">
                    <ul class="content">
                        <li v-for="(item,i) in goodsList" @click="clickLeft(i)" :class="{select:i==selectLi}"><p>{{item.name}}</p></li>
                    </ul>
                    <!-- 这里可以放一些其它的 DOM，但不会影响滚动 -->
                </div>
            </Col>
            <Col span="18">
                <div class="wrapper right-div">
                    <ul class="content" id="right-box">
                        <li v-for="(item,i) in goodsList" :id="i">
                            <h4>{{item.name}}</h4>
                            <div v-for="value in item.foods">
                                <img :src="value.icon">
                                <div>
                                    <h3>{{value.name}}</h3>
                                    <p>月销售<span>{{value.sellCount}}</span>份 好评率<span>{{value.rating}}</span>%</p>
                                    <div>
                                        <span class="price">&yen;{{value.price}}</span>&emsp;<del>{{isOldPrice(value.oldPrice)}}{{value.oldPrice}}</del>
                                        <div class="changeNum-div">
                                            <Button v-if="value.num>0" @click="clickNumDec(value.id)">-</Button>
                                            <span class="num" v-if="value.num>0">{{value.num}}</span><!-- // -->
                                            <Button type="warning" @click="clickNumAdd(value.id)">+</Button>
                                        </div>
                                        <div style="clear:both"></div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </Col>
        </Row>
    </div>
</template>

<script>
// 引入插件滚动插件
import BScroll from 'better-scroll'
    export default {
        data(){
            return{
                selectLi:0,
                right_scroll:undefined,
                heightArr:[]
            }
        },
        methods:{
            isOldPrice(oldPrice){
                 let str = '￥';
                if(oldPrice)
                    return str
                else  return;
            },
            clickLeft(index){
                this.selectLi = index;
                let el = document.getElementById(index);
                this.right_scroll.scrollToElement(el,500)
            },
            // 加减号zhizu
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
        },
        computed:{
            goodsList(){
                return this.$store.state.goodsList;
            }
        },
        created(){
            this.$store.dispatch('a_initGoodsList');
        },
        mounted(){
            // 视图挂载完毕
            let left_scroll = new BScroll('.left-div',{
                click:true
            });
            let right_scroll = new BScroll('.right-div',{
                probeType:3
            });
            // 滚动事件
            right_scroll.on('scroll', (pos) => {
                 let _y = Math.abs(Math.round(pos.y))    //返回绝对值
                // console.log(_y);
                // [568, 73, 73, 183, 128, 128, 183, 293, 348] 每个DIV的高度
                let sum = 0
                for(let i = 0; i < this.heightArr.length; i++){
                    //计算之前的总和
                    sum += this.heightArr[i]

                    //进行判断
                    if(_y >= sum){
                        this.selectLi = i+1
                    }else if(_y < this.heightArr[0]){
                        //小于第一个元素高度时，默认把左侧元素设置为第0个
                        this.selectLi = 0
                    }
                }/* */

            });
            // 记录div大容器元素的高度
            setTimeout(() => {
                let heightArr = []
                let rightBoxChild = document.getElementById('right-box').childNodes
                for(let i = 0; i < rightBoxChild.length; i++){
                    heightArr.push(rightBoxChild[i].offsetHeight)
                }

                this.heightArr = heightArr
            },0);
            this.right_scroll = right_scroll;
        }
    }
</script>

<style scoped lang='less'>
#goods{
    height: 100%;
    background: #f3f5f7;
    .left-div{
        height: 400px;
        overflow: auto;
        li{
            padding: 0 15px;
            height: 44px;;
            display: flex;
            align-items: center;
            background: #f3f5f7;
            border-bottom: 1px solid #ccc;
            p{
                width: 100%;
                
            }
        }
        li.select{
            background: #fff;
        }
    }
    .right-div{
        height: 400px;
        overflow: auto;
        ul{
            list-style: none;
            li>h4{
                line-height: 30px;
                padding-left: 20px;
            }
            li>div{
                background: #fff;
                display: flex;
                flex-direction: row;
                padding: 20px;
                border-bottom: 1px solid #ccc;
                img{
                    margin-right: 10px;
                    height: 70px;
                }
                .price{
                    font-size: 16px;
                    color: #f00;
                }
                .changeNum-div{
                    float: right;
                }
                Button{
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    padding: 0;
                    margin: 3px;
                    font-size: 16px;
                    
                }
                .num{
                    font-size: 16px;
                }
            }
        }
    }
}
</style>