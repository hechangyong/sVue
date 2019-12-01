<template>
  <div>
    <van-card
      num="2"
      price="2.00"
      desc="描述信息"
      title="商品标题"
      thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
    >
      <!-- <div slot="tags">
        <van-tag plain type="danger">标签</van-tag>
      </div> -->
      <div slot="footer">
         <van-button size="mini">按钮</van-button>
      </div>
      <div slot="bottom">
        <div></div>
        <van-button disabled  size="mini">订单时间：{{date}}</van-button>
       </div>
    </van-card>
  </div>
</template>

<script>
import { Card,Tag,Button   } from 'vant';
export default {
    data(){
        return {
            date: '2019-11-29'
        }
    },
    components:{
        [Card.name]:Card,
        [Tag.name]:Tag,
        [Button.name]:Button 
    }
}
</script>




