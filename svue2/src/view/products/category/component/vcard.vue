<template>
  <div>
    <van-card
      ref="cardInfo"
      :price="cardPrice"
      :desc="cardDesc"
      :title="cardTitle"
      :origin-price="cardOriginprice"
      :thumb="cardOriginpriceImgs"
      :id="cardId"
    >
      <div slot="num">
        <span>剩余数量: {{cardNumber}}</span>
      </div>
      <div slot="footer">
        <van-button round icon="cart-circle-o" @click="addCard" type="info" size="small">购物车</van-button>
      </div>
    </van-card>

    <van-sku
      v-model="show"
      :sku="sku"
      :goods="goods"
      :goods-id="goodsId"
      :hide-stock="sku.hide_stock"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
    >
      <div slot="sku-messages">
       </div>
    </van-sku>
  </div>
</template>

<script>
import { Card, Button, Sku } from "vant";

export default {
  name: "vcard",
  props: {
    keys: {
      type: Number,
      default() {
        return 0;
      }
    },
    cardItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },

  data() {
    return {
      cardId: -1,
      cardNumber: 0,
      cardPrice: 0.0,
      cardDesc: "ssss",
      cardTitle: "asdasdasda",
      cardOriginprice: 0,
      cardOriginpriceImgs: "sssssss",
      hasProducts: true,
      show: false,
      goodsId: 1,
      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [
          {
            k: "颜色", // skuKeyName：规格类目名称
            v: [
              {
                id: "30349", // skuValueId：规格值 id
                name: "红色", // skuValueName：规格值名称
                imgUrl: "http://babyroom.hecy.top/img/2.jpg", // 规格类目图片，只有第一个规格类目可以定义图片
                previewImgUrl: "http://babyroom.hecy.top/img/2.jpg" // 用于预览显示的规格类目图片
              },
              {
                id: "1215",
                name: "蓝色",
                imgUrl: "http://babyroom.hecy.top/img/2.jpg",
                previewImgUrl: "http://babyroom.hecy.top/img/2.jpg"
              }
            ],
            k_s: "s1" // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          },
          {
            k: "尺寸", // skuKeyName：规格类目名称
            v: [
              {
                id: "30347", // skuValueId：规格值 id
                name: "大码", // skuValueName：规格值名称
                imgUrl: "http://babyroom.hecy.top/img/2.jpg", // 规格类目图片，只有第一个规格类目可以定义图片
                previewImgUrl: "http://babyroom.hecy.top/img/2.jpg" // 用于预览显示的规格类目图片
              },
              {
                id: "30348",
                name: "小码",
                imgUrl: "http://babyroom.hecy.top/img/2.jpg",
                previewImgUrl: "http://babyroom.hecy.top/img/2.jpg"
              }
            ],
            k_s: "s2" // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          }
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
          {
            id: 2259, // skuId，下单时后端需要
            price: 100, // 价格（单位分）
            s1: "30349", // 规格类目 k_s 为 s1 的对应规格值 id
            s2: "30347", // 规格类目 k_s 为 s2 的对应规格值 id
            s3: "0", // 最多包含3个规格值，为0表示不存在该规格
            stock_num: 110 // 当前 sku 组合对应的库存
          },
          {
            id: 2259, // skuId，下单时后端需要
            price: 100, // 价格（单位分）
            s1: "30349", // 规格类目 k_s 为 s1 的对应规格值 id
            s2: "30348", // 规格类目 k_s 为 s2 的对应规格值 id
            s3: "0", // 最多包含3个规格值，为0表示不存在该规格
            stock_num: 117 // 当前 sku 组合对应的库存
          },
          {
            id: 2259, // skuId，下单时后端需要
            price: 100, // 价格（单位分）
            s1: "1215", // 规格类目 k_s 为 s1 的对应规格值 id
            s2: "30347", // 规格类目 k_s 为 s2 的对应规格值 id
            s3: "0", // 最多包含3个规格值，为0表示不存在该规格
            stock_num: 110 // 当前 sku 组合对应的库存
          },
          {
            id: 2259, // skuId，下单时后端需要
            price: 100, // 价格（单位分）
            s1: "1215", // 规格类目 k_s 为 s1 的对应规格值 id
            s2: "30348", // 规格类目 k_s 为 s2 的对应规格值 id
            s3: "0", // 最多包含3个规格值，为0表示不存在该规格
            stock_num: 0 // 当前 sku 组合对应的库存
          }
        ],
        price: "1.00", // 默认价格（单位元）
        stock_num: 227, // 商品总库存
        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
        messages: [
          {
            // 商品留言
            datetime: "0", // 留言类型为 time 时，是否含日期。'1' 表示包含
            multiple: "0", // 留言类型为 text 时，是否多行文本。'1' 表示多行
            name: "备注", // 留言名称
            type: "text", // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
            required: "0", // 是否必填 '1' 表示必填
            placeholder: "" // 可选值，占位文本
          }
        ],
        hide_stock: false // 是否隐藏剩余库存
      },
      goods: {
        // 商品标题
        title: "商品",
        // 默认商品 sku 缩略图
        picture: "http://babyroom.hecy.top/img/2.jpg"
      }
    };
  },
  watch: {
    cardItem(val) {
      console.log("vardval: " + val);
      this.cardNumber = val.totalInventory;
      this.cardPrice = val.productPrice;
      this.cardDesc = val.productdes;
      this.cardTitle = val.name;
      this.cardOriginprice = val.vipPrice;
      this.cardOriginpriceImgs = val.imgUrl;
      this.cardId = val.id;
    }
  },
  methods: {
    addCard() {
      this.show = true;
    },
    onAddCartClicked(value) {
      console.log("onAddCartClicked value" + JSON.stringify(value));
    },
    onBuyClicked() {}
  },
  components: {
    [Button.name]: Button,
    [Sku.name]: Sku,
    [Card.name]: Card
  },
  mounted() {
    this.cardNumber = this.cardItem.totalInventory;
    this.cardPrice = this.cardItem.productPrice;
    this.cardDesc = this.cardItem.productdes;
    this.cardTitle = this.cardItem.name;
    this.cardOriginprice = this.cardItem.vipPrice;
    this.cardOriginpriceImgs = this.cardItem.imgUrl;
    this.cardId = this.cardItem.id;
  }
};
</script>
<style scoped>
.van-card__desc {
  max-height: 20px;
  color: #7d7e80;
}
.van-card__bottom {
  line-height: 20px;
  margin-top: 15%;
}
.van-card__title {
  max-height: 32px;
  font-weight: 550;
  line-height: 16px;
}
</style>