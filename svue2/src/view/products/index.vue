<template>
  <div class="goods">
    <van-swipe class="goods-swipe" :autoplay="4000">
      <van-swipe-item v-for="thumb in goods.thumb" :key="thumb">
        <img class="feature_img_big" :src="thumb" />
      </van-swipe-item>
    </van-swipe>

    <van-cell-group>
      <van-cell>
        <div class="goods-title-1">{{ goods.title }}</div>
      </van-cell>
    </van-cell-group>
    <van-grid :gutter="10" :border="false" style="background-color: #ffffff;">
      <van-grid-item
        v-for="item in goods.btnList"
        :key="item.index"
        :text="item.text"
        :icon="item.icon"
        @click="toCategory(item)"
      />
    </van-grid>

    <van-cell-group>
      <van-cell>
        <div class="goods-title-1">{{ goods.title2 }}</div>
      </van-cell>
    </van-cell-group>

    <is-empty v-if="!hasRecommendGoods" altdes>
      <span>此商户很懒，没有推荐商品哦</span>
    </is-empty>

    <div v-if="hasRecommendGoods">
      <van-grid>
        <van-grid-item to="/goods">
          <van-cell-group>
            <van-image class="feature_img" src="http://babyroom.hecy.top/img/3.jpg" />
            <van-cell class="vantCell_reload" value="婴幼儿奶粉 3段 适合0-1岁宝宝食用" />
            <van-cell
              class="vantCell_reload"
              title-class="cell_left_title_red"
              title="￥9119"
              value="￥111"
              value-class="rightCellClass"
            >
              <!-- 使用 right-icon 插槽来自定义右侧图标 -->
              <van-icon
                slot="right-icon"
                name="cart-circle"
                color="#ff0000"
                style="line-height: inherit;"
              />
            </van-cell>
            <!-- <span style="text-decoration:line-through;">删除线效果</span> -->
            <!-- <del>￥59</del> -->
          </van-cell-group>
        </van-grid-item>
        <van-grid-item to="/goods">
          <van-cell-group>
            <van-image class="feature_img" src="http://babyroom.hecy.top/img/4.jpg" />
            <van-cell class="vantCell_reload" value="婴幼儿奶粉 3段 适合0-1岁宝宝食用" />
            <van-cell
              class="vantCell_reload"
              title-class="cell_left_title_red"
              title="￥999/罐"
              value="￥111"
              value-class="rightCellClass"
            >
              <!-- 使用 right-icon 插槽来自定义右侧图标 -->
              <van-icon
                slot="right-icon"
                name="cart-circle"
                color="#ff0000"
                style="line-height: inherit;"
              />
            </van-cell>
            <!-- <span style="text-decoration:line-through;">删除线效果</span> -->
            <!-- <del>￥59</del> -->
          </van-cell-group>
        </van-grid-item>
      </van-grid>
    </div>

    <van-tabbar :safe-area-inset-bottom="safeareabottom" v-model="active">
      <van-tabbar-item icon="home-o">商品首页</van-tabbar-item>
      <van-tabbar-item to="/cart" icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import IsEmpty from "@/view/is-empty/";
import {
  Swipe,
  SwipeItem,
  Grid,
  GridItem,
  Image,
  Tabbar,
  TabbarItem
} from "vant";

export default {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Image.name]: Image,
    [IsEmpty.name]: IsEmpty,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },

  data() {
    return {
      safeareabottom: true,
      hasRecommendGoods: false,
      border: false,
      active: 0,
      goods: {
        title: "金摇篮产品导航",
        title2: "金摇篮特色产品区",
        thumb: [
          "http://babyroom.hecy.top/img/1.jpg",
          "http://babyroom.hecy.top/img/2.jpg",
          "http://babyroom.hecy.top/img/3.jpg",
          "http://babyroom.hecy.top/img/4.jpg"
        ],
        btnList: [
          {
            id: 1,
            text: "纸尿片",
            icon:
              "http://babyroom.hecy.top/img_external/products/icon_b_diaper.png",
            to: "/category"
          },
          {
            id: 2,
            text: "奶粉",
            icon:
              "http://babyroom.hecy.top/img_external/products/icon_b_milk.png",
            to: "/category"
          },
          {
            id: 3,
            text: "奶壶",
            icon:
              "http://babyroom.hecy.top/img_external/products/icon_b_milkpot.png",
            to: "/category"
          },
          {
            id: 4,
            text: "宝妈用品",
            icon:
              "http://babyroom.hecy.top/img_external/products/icon_b_pmother.png",
            to: "/category"
          },
          {
            id: 5,
            text: "宝宝玩具",
            icon:
              "http://babyroom.hecy.top/img_external/products/icon_b_gifs.png",
            to: "/category"
          },
          {
            id: 6,
            text: "宝宝衣物",
            icon:
              "http://babyroom.hecy.top/img_external/products/icon_b_clothes.png",
            to: "/category"
          },
          {
            id: 7,
            text: "宝宝辅食",
            icon:
              "http://babyroom.hecy.top/img_external/products/icon_p_foods.png",
            to: "/category"
          },
          {
            id: 8,
            text: "更多",
            icon:
              "http://babyroom.hecy.top/img_external/products/icon_b_more.png",
            to: "/category"
          }
        ]
      }
    };
  },

  methods: {
    toCategory(item) {
      this.$router.push({
        name: "category",
        params: {
          id: item.id
        }
      });
    },
    sorry() {
      Toast("暂无后续逻辑~");
    }
  }
};
</script>

<style scoped src="./products_css_style.css"/>

<style lang="less">
.goods {
  padding-bottom: 50px;

  &-swipe {
    img {
      width: 100%;
      display: block;
    }
  }

  &-title-1 {
    font-size: 14px;
    color: #39b0d2;
    // line-height: 14px;
    font-weight: bold;
  }

  &-title {
    font-size: 14px;
    color: #39b0d2;
    // line-height: 14px;
    font-weight: bold;
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
