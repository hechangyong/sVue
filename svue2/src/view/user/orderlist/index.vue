<template>
  <div>
    <div v-if="!isEmpty">
      <van-card
        num="2"
        price="2.00"
        desc="描述信息"
        title="商品标题"
        thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
      >
        <div slot="bottom">
          <div></div>
          <van-button disabled size="mini">订单时间：{{date}}</van-button>
        </div>
      </van-card>
    </div>

    <is-empty v-if="isEmpty" altdes="1">
      <span>您还没有购物哦！</span>
    </is-empty>
  </div>
</template>

<script>
import { Card, Tag, Button } from "vant";
import IsEmpty from "@/view/is-empty/";
export default {
  data() {
    return {
      isEmpty:true,
      date: "2019-11-29"
    };
  },
  components: {
    [Card.name]: Card,
    [Tag.name]: Tag,
    [Button.name]: Button,
    [IsEmpty.name]: IsEmpty
  }
};
</script>




