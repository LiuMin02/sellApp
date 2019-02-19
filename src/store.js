import Vue from 'vue'
import Vuex from 'vuex'
import {getGoodsList} from './api/api'

// 全局注册vuex(管理数据交互)
Vue.use(Vuex)

// new 创建仓库 管理数据
export default new Vuex.Store({
  // 定义状态 数据属性 必须
  state: {
    goodsList:[]
  },
  // 定义修改状态的函数  调用mutation函数是使用store.commit（“函数名”）
  mutations: {
    m_initGoodsList(state,obj){
      state.goodsList = obj.goodsInfo;
    },
    m_changeGoodsNum(state,obj){
      for (const v of state.goodsList) {
        for (const value of v.foods) {
          if(value.id == obj.id){
            value.num += obj.count;//加-1就是减 count是类型
            return;
          }
        }
      }
    }
  },
  // 定义异步操作  调用同理store.dispatch()
  actions: {
    async a_initGoodsList(context){
      let res = await getGoodsList();
      let result = res.data.data;
      let id = 0;
      for (const v of result) {
        for (const value of v.foods) {
          value.num = 0;
          value.id = id++;
        }
      }
      context.commit({
        type:'m_initGoodsList',
        goodsInfo:result
      });
    }
  },
  // 计算属性
  getters:{
    getHasNum(state){
      let arr = [];
      for (const v of state.goodsList) {
        for (const value of v.foods) {
          if(value.num>0){
            arr.push(value);
          }
        }
      }
      return arr;
    }
  }
})
