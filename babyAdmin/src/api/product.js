/* eslint-disable */

import axios from '@/libs/api.request'


/**
 * 添加商品接口
 * @param {商品对象} productObj 
 */
export const addProductApi = (productObj) => {
    return axios.request({
        url: '/baby/p/addProduct',
        method: 'post',
        data: productObj
    })
}



/**
 * 添加商品接口
 * @param {商品对象} selectParamObj 
 */
export const selectProductApi = (selectParamObj) => {
    return axios.request({
        url: '/baby/p/getProducts',
        method: 'post',
        data: selectParamObj
    })
}

/**
 * 获取商品规格
 * @param {商品对象id} pid 
 */
export const getProductSkuApi = (pid) => {
    return axios.request({
        url: '/baby/p/getProductSku/'+pid,
        method: 'post' 
    })
}