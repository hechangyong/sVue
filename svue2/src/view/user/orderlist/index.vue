<template>
  <div>
    <van-card
      num="2"
      price="2.00"
      desc="描述信息"
      title="商品标题"
      thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
    >
      <div slot="tags">
        <van-tag plain type="danger">标签</van-tag>
      </div>
      <div slot="footer">
        <van-button size="max">按钮</van-button>
        <van-button size="mini">按钮</van-button>
      </div>
      <div slot="bottom">
        <van-button size="mini">订单时间：{{date}}</van-button>
       </div>
    </van-card>
  </div>
</template>

<script>
import { Card } from 'vant';
export default {
    data(){
        return {
            date: (new Date()).format("yyyy-MM-dd HH:mm:ss") 
        }
    },
    components:{
        [Card.name]:Card
    }
}
</script>




