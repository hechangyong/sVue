/* eslint-disable */
import Mock from 'mockjs'
import { doCustomTimes } from '@/libs/util'
import orgData from './data/org-data'
import { treeData } from './data/tree-select'
const Random = Mock.Random

export const getTableData = req => {
  let tableData = []
  doCustomTimes(10, () => {
    var proname = ['奶粉','衣服','宝妈用品']
    var index =  Random.integer(0,2);
    console.log("index:"+ index+" name:"+proname[index]);
    tableData.push(Mock.mock({
      name: proname[index],
      productType: Random.integer(1,8),
      productPrice: Random.natural(10,1000),
      vipPrice: Random.natural(10,1000),
      totalInventory: Random.integer(80,100),
      residueInventory: Random.integer(0,80),
      skuType: Random.integer(0,2),
      productStatus: Random.integer(0,2),
      createTime: Random.date('yyyy-dd-mm'),
      productdes: Random.string()
    }))
  })
  return tableData
}

export const getDragList = req => {
  let dragList = []
  doCustomTimes(5, () => {
    dragList.push(Mock.mock({
      name: Random.csentence(10, 13),
      id: Random.increment(10)
    }))
  })
  return dragList
}

export const uploadImage = req => {
  return Promise.resolve()
}

export const getOrgData = req => {
  return orgData
}

export const getTreeSelectData = req => {
  return treeData
}
