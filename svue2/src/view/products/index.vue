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

    <is-empty v-if="recommendGoodList.length == 0" altdes>
      <span>此商户很懒，没有推荐商品哦</span>
    </is-empty>

    <div v-if="recommendGoodList.length != 0">
      <van-grid>
        <template v-for="recommendGood in recommendGoodList">
          <van-grid-item :key="recommendGood.id" @click="toGoods(recommendGood.id)">
            <van-cell-group>
              <van-image class="feature_img" :src="recommendGood.img" />
              <van-cell class="vantCell_reload" :value="recommendGood.name" />
              <van-cell
                class="vantCell_reload"
                title-class="cell_left_title_red"
                :title="formatPrice(recommendGood.price,recommendGood.units)"
                :value="formatPrice(recommendGood.promotionprice,recommendGood.units)"
                value-class="rightCellClass"
              >
                <van-icon
                  slot="right-icon"
                  name="cart-circle"
                  color="#39b0d2"
                  style="line-height: inherit;"
                />
              </van-cell>
            </van-cell-group>
          </van-grid-item>
        </template>
      </van-grid>
    </div>

    <van-tabbar :safe-area-inset-bottom="safeareabottom" v-model="active">
      <van-tabbar-item icon="home-o">商品首页</van-tabbar-item>
      <van-tabbar-item to="/cart" icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script src="./product.js"/>