import axios from '@/libs/api.request'






/**
 * 添加商品接口
 * @param {商品对象} productObj 
 */
export const addProductApi = (productObj) => {
    return axios.request({
        url: 'addProduct',
        method: 'post',
        params: {
            productObj
        }
    })
}