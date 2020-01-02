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
        <!-- <div class="goods-price">{{ formatPrice(goods.price) }}</div> -->
        <van-cell
          class="vantCell_reload"
          title-class="cell_left_title_red"
          :title="formatPrice(goods.promotionprice)"
          :value="formatPrice(goods.price)"
          value-class="rightCellClass"
        ></van-cell>
      </van-cell>
      <van-cell class="goods-express">
        <van-col span="10">运费：{{ goods.express }}</van-col>
        <van-col span="14">剩余：{{ goods.remain }}</van-col>
      </van-cell>
    </van-cell-group>
    <div class="item_desc" v-if="desc != ''">
      <div class="item_desc_title">商品详情</div>
      <div class="item_desc_wrap" v-html="desc"></div>
    </div>

    <van-sku
      v-model="show"
      :sku="sku"
      :goods="goods"
      :goods-id="goodsId"
      :hide-stock="sku.hide_stock"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
    >
      <div slot="sku-messages"></div>
    </van-sku>

    <van-goods-action>
      <van-goods-action-icon icon="chat-o" @click="toChat" text="客服" />
      <van-goods-action-icon icon="cart-o" @click="onClickCart">购物车</van-goods-action-icon>
      <van-goods-action-button type="warning" @click="sorry">加入购物车</van-goods-action-button>
      <van-goods-action-button type="danger" @click="sorry">立即购买</van-goods-action-button>
    </van-goods-action>
  </div>
</template>

<script src="./goods.js"></script>

<style lang="less">
.cell_left_title_red {
  color: red;
  font-weight: 700;
}
.vantCell_reload {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 1px 1px;
  overflow: hidden;
  color: #323233;
  font-size: 14px;
  line-height: 24px;
  background-color: #fff;
}
.rightCellClass {
  margin-right: 5rem;
  text-decoration: line-through;
  font-size: 10px;
  text-align: inherit;
}
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
      height: 8rem;
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
    font-weight: 600;
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
