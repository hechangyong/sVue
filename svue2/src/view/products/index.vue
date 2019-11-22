<template>
  <div class="goods">
    <van-swipe class="goods-swipe" :autoplay="3000">
      <van-swipe-item v-for="thumb in goods.thumb" :key="thumb">
        <img :src="thumb" >
      </van-swipe-item>
    </van-swipe>

    <van-cell-group>
      <van-cell>
        <div class="goods-title-1">{{ goods.title }}</div>
      </van-cell>
    </van-cell-group> 
<!-- 
     v-for="value in 8"
        :key="value"
        icon="photo-o"
        text="文字" -->
    <van-grid :gutter="10" :border="false" style="background-color: #ffffff;">
      <van-grid-item v-for="item in goods.btnList" 
      :key="item.index" 
      :text="item.text" 
      :icon="item.icon"
      :to="item.to" 
      />
    </van-grid>
    <van-cell-group class="goods-cell-group"> 
      <van-cell title="线下门店" icon="location-o" is-link @click="sorry" />
    </van-cell-group>

    <van-cell-group class="goods-cell-group">
      <van-cell title="查看商品详情" is-link @click="sorry" />
    </van-cell-group>

    <van-goods-action>
      <van-goods-action-icon icon="chat-o" @click="sorry">
        客服
      </van-goods-action-icon>
      <van-goods-action-icon icon="cart-o" @click="onClickCart">
        购物车
      </van-goods-action-icon>
      <van-goods-action-button type="warning" @click="sorry">
        加入购物车
      </van-goods-action-button>
      <van-goods-action-button type="danger" @click="sorry">
        立即购买
      </van-goods-action-button>
    </van-goods-action>
  </div>
</template>

<script>
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
  Grid,
  GridItem
} from 'vant';

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
    [GoodsActionButton.name]: GoodsActionButton,
    [Grid.name]:Grid,
    [GridItem.name]:GridItem
  },

  data() {
    return {
      goods: {
        title: '金摇篮产品导航',
        price: 2680,
        express: '免运费',
        remain: 19,
        thumb: [
          'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg',
          'https://img.yzcdn.cn/public_files/2017/10/24/1791ba14088f9c2be8c610d0a6cc0f93.jpeg' 
        ],
        btnList :[
          {text:'纸尿片' ,icon:'http://m.msjk95596.com/static/img/commit-03.21accc9.png',to:'/cart'},
          {text:'奶粉' ,icon:'http://m.msjk95596.com/static/img/introduce-03.7ece814.png',to:'/page1'},
          {text:'宝妈用品' ,icon:'http://m.msjk95596.com/static/img/commit-03.21accc9.png',to:'/page1'},
          {text:'宝宝玩具' ,icon:'http://m.msjk95596.com/static/img/introduce-03.7ece814.png',to:'/page1'},
          {text:'宝宝衣物' ,icon:'http://m.msjk95596.com/static/img/introduce-02.a68777b.png',to:'/page1'},
          {text:'更多' ,icon:'http://m.msjk95596.com/static/img/introduce-01.295f8f7.png',to:'/page1'}
         
           ]
      }
    };
  },

  methods: {
    formatPrice() {
      return '¥' + (this.goods.price / 100).toFixed(2);
    },

    onClickCart() {
      this.$router.push('cart');
    },

    sorry() {
      Toast('暂无后续逻辑~');
    }
  }
};
</script>

<style lang="less">
.van-grid-item__text {
  color: #a1a6b0;
  font-size: 12px;
  word-wrap: break-word;
}
.goods {
  padding-bottom: 50px;

  &-swipe {
    img {
      width: 100%;
      display: block;
    }
  }

  &-title-1 {
    font-size: 12px;
    color: #7caee1;
    line-height: 12px;
  }

  &-title {
    font-size: 12px;
    color: #7caee1;
    line-height: 12px;
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
