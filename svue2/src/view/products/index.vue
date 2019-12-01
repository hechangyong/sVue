<template>
  <div class="goods">
    <van-swipe class="goods-swipe" :autoplay="3000">
      <van-swipe-item v-for="thumb in goods.thumb" :key="thumb">
        <img :src="thumb" />
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
    text="文字"-->
    <van-grid :gutter="10" :border="false" style="background-color: #ffffff;">
      <van-grid-item
        v-for="item in goods.btnList"
        :key="item.index"
        :text="item.text"
        :icon="item.icon"
        :to="item.to"
      />
    </van-grid>
    <van-cell-group>
      <van-cell>
        <div class="goods-title-1">{{ goods.title2 }}</div>
      </van-cell>
    </van-cell-group>
    <van-grid :border="false" :column-num="2">
      <van-grid-item>
        <van-image class="feature_img" src="http://babyroom.hecy.top/img/1.jpg" />
      </van-grid-item>
      <van-grid-item>
        <van-image class="feature_img" src="http://babyroom.hecy.top/img/2.jpg" />
      </van-grid-item>
      <van-grid-item>
        <van-image class="feature_img" src="http://babyroom.hecy.top/img/3.jpg" />
      </van-grid-item>
      <van-grid-item>
        <van-image class="feature_img" src="http://babyroom.hecy.top/img/4.jpg" />
      </van-grid-item>
    </van-grid>

    <van-tabbar :safe-area-inset-bottom="safeareabottom" v-model="active">
      <van-tabbar-item  icon="home-o"> </van-tabbar-item>
      <van-tabbar-item info="4" to="/cart" icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/user">我的</van-tabbar-item>
    </van-tabbar>
    <!-- <van-grid   :border="border" :column-num="2" :gutter="10">
      <van-grid-item  v-for="i in goods.feature"
        :key="i.index"
        :icon="i.icon"
        :text="i.text"
        
      />
    </van-grid>-->
  </div>
</template>

<script>
import {
  Col,
  Icon,
  Cell,
  CellGroup,
  Swipe,
  Toast,
  SwipeItem,
  Grid,
  GridItem,
  Image,
  Tabbar,
  TabbarItem
} from "vant";

export default {
  components: {
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Image.name]: Image,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },

  data() {
    return {
      safeareabottom:true,
      border: false,
      active: 0,
      icon: {
        active: 'https://img.yzcdn.cn/vant/user-active.png',
        inactive: 'https://img.yzcdn.cn/vant/user-inactive.png'
      },
      goods: {
        title: "金摇篮产品导航",
        title2: "金摇篮特色产品区",

        price: 2680,
        express: "免运费",
        remain: 19,
        thumb: [
          "https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg",
          "https://img.yzcdn.cn/public_files/2017/10/24/1791ba14088f9c2be8c610d0a6cc0f93.jpeg"
        ],
        btnList: [
          {
            text: "纸尿片",
            icon: "http://m.msjk95596.com/static/img/commit-03.21accc9.png",
            to: "/cart"
          },
          {
            text: "奶粉",
            icon: "http://m.msjk95596.com/static/img/introduce-03.7ece814.png",
            to: "/page1"
          },
          {
            text: "宝妈用品",
            icon: "http://m.msjk95596.com/static/img/commit-03.21accc9.png",
            to: "/page1"
          },
          {
            text: "宝宝玩具",
            icon: "http://m.msjk95596.com/static/img/introduce-03.7ece814.png",
            to: "/page1"
          },
          {
            text: "宝宝衣物",
            icon: "http://m.msjk95596.com/static/img/introduce-02.a68777b.png",
            to: "/page1"
          },
          {
            text: "更多",
            icon: "http://m.msjk95596.com/static/img/introduce-01.295f8f7.png",
            to: "/page1"
          }
        ],
        feature: [
          {
            text: "纸尿片",
            icon: "../../../images/produsts/1.jpg",
            to: "/cart"
          },
          { text: "奶粉", icon: "../../images/produsts/2.jpg", to: "/cart" },
          { text: "哈哈哈", icon: "../images/produsts/3.jpg", to: "/cart" },
          {
            text: "纸尿片",
            icon: "http://babyroom.hecy.top/img/1.jpg",
            to: "/cart"
          }
        ]
      }
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
    }
  }
};
</script>

<style lang="less">
.feature_img {
  height: 164px;
  width: 164px;
}

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
