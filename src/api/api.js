

import axios from 'axios'

const SERVER_IP = 'http://172.20.10.2:3000/'
// 获取商家信息
export function getSeller(){
    return axios.get(SERVER_IP + 'api/seller')
}

// 获取商品列表
export function getGoodsList(){
    return axios.get(SERVER_IP + 'api/goods')
}

//店铺评价列表
export default function getRatingsList(){
    return axios.get(SERVER_IP + 'api/ratings')
}