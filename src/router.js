import Vue from 'vue'
import Router from 'vue-router'
import Goods from './pages/goods/Goods.vue'
import Eval from './pages/eval/Eval.vue'
import Merchant from './pages/merchant/Merchant.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Goods
    },
    {
      path: '/eval',
      component: Eval
    },
    {
      path: '/merchant',
      component: Merchant
    },
    /* {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    } */
  ]
})
