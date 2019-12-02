<template>
  <div class="goods">
    <van-swipe class="goods-swipe" :autoplay="3000">
      <van-swipe-item v-for="thumb in goods.thumb" :key="thumb">
        <img :src="thumb" />
      </van-swipe-item>
    </van-swipe>

    <van-cell-group>
      <van-cell>
        <div class="goods-title">{{ goods.title }}</div>
        <div class="goods-des">{{ goods.des }}</div>
        <div class="goods-price">{{ formatPrice(goods.price) }}</div>
      </van-cell>
      <van-cell class="goods-express">
        <van-col span="10">运费：{{ goods.express }}</van-col>
        <van-col span="14">剩余：{{ goods.remain }}</van-col>
      </van-cell>
    </van-cell-group>
    <div class="item_desc" v-if="imageList">
      <div class="item_desc_title">商品详情</div>
      <div class="item_desc_wrap" v-html="desc"></div>
    </div>

    <!-- <img v-lazy="imageList" /> -->

    <van-goods-action>
      <van-goods-action-icon icon="chat-o" @click="toChat" text="客服" />
      <van-goods-action-icon icon="cart-o" @click="onClickCart">购物车</van-goods-action-icon>
      <van-goods-action-button type="warning" @click="sorry">加入购物车</van-goods-action-button>
      <van-goods-action-button type="danger" @click="sorry">立即购买</van-goods-action-button>
    </van-goods-action>
  </div>
</template>

<script>
import VueLazyload from "vue-lazyload";

import {
  Tag,
  Col,
  Icon,
  Cell,
  CellGroup,
  Swipe,
  Toast,
  SwipeItem,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Dialog,
  Lazyload
} from "vant";

export default {
  components: {
    [Tag.name]: Tag,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [Lazyload.name]: Lazyload,
    [Dialog.name]: Dialog,
    [GoodsActionButton.name]: GoodsActionButton
  },

  data() {
    return {
      goods: {
        title: "飞鹤奶粉",
        price: 2680,
        express: "免运费",
        des:
          "阿三大蘇打實打實大蘇打阿斯頓阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯頓法定啊師傅分大是大非阿斯蒂芬阿斯蒂芬啊手動閥手動閥",
        remain: 19,
        thumb: [
          "https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg",
          "https://img.yzcdn.cn/public_files/2017/10/24/1791ba14088f9c2be8c610d0a6cc0f93.jpeg"
        ]
      },
      desc:
        '<img alt="" src="http://pic2.moresing.com/kindeditor/php/../attached/image/20170220/20170220135343_63212.jpg">' +
        '<img alt="" src="http://pic1.moresing.com/kindeditor/php/../attached/image/20170220/20170220135343_37527.jpg">' +
        '<img alt="" src="http://pic1.moresing.com/kindeditor/php/../attached/image/20170220/20170220135343_83387.jpg">' +
        '<img alt="" src="http://pic2.moresing.com/kindeditor/php/../attached/image/20170220/20170220135344_95490.jpg">' +
        '<img alt="" src="http://pic2.moresing.com/kindeditor/php/../attached/image/20170220/20170220135344_78328.jpg">' +
        '<img alt="" src="http://pic1.moresing.com/kindeditor/php/../attached/image/20170220/20170220135344_74260.jpg">' +
        '<img alt="" src="http://pic2.moresing.com/kindeditor/php/../attached/image/20170220/20170220135344_65105.jpg">' +
        '<img alt="" src="http://pic2.moresing.com/kindeditor/php/../attached/image/20170220/20170220135344_16353.jpg">' +
        '<img alt="" src="http://pic1.moresing.com/kindeditor/php/../attached/image/20170220/20170220135344_65133.jpg">',

      imageList: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg"
      ]
    };
  },

  methods: {
    formatPrice() {
      return "¥" + (this.goods.price / 100).toFixed(2);
    },

    onClickCart() {
      this.$router.push("cart");
    },

    sorry() {
      Toast("暂无后续逻辑~");
    },
    toChat() {
      Dialog.alert({
        message: "老板手机号：17681102630"
      });
    }
  }
};
</script>

<style lang="less">
.item_desc {
  background-color: #fff;
  p {
    padding: 0 10px;
  }
  /deep/ img {
    max-width: 100%;
    display: block;
  }
}

.item_desc_title {
  font-size: 14px;
  // @include one-border;
  padding: 10px 0;
  text-align: center;
}

.goods {
  padding-bottom: 50px;

  &-swipe {
    img {
      width: 100%;
      display: block;
    }
  }
  &-des {
    font-size: 12px;
    color: #999;
  }

  &-title {
    font-size: 16px;
  }

  &-price {
    color: #f44;
  }

  &-express {
    color: #999;
    font-size: 12px;
    padding: 5px 15px;
  }

  &-cell-group {
    margin: 15px 0;

    .van-cell__value {
      color: #999;
    }
  }

  &-tag {
    margin-left: 5px;
  }
}
</style>
