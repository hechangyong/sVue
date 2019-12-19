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
        data:productObj        
    })
}
