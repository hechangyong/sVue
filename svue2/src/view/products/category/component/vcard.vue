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
        <span>剩余库存: {{cardNumber}}</span>
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
      <div slot="sku-messages"></div>
    </van-sku>
  </div>
</template>

<script>
import { Card, Button, Sku, Toast } from "vant";

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
      cardDesc: "",
      cardTitle: "",
      cardOriginprice: 0,
      cardOriginpriceImgs: "",
      hasProducts: true,
      show: false,
      goodsId: 1,
      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [
          //   {
          //     k: "颜色", // skuKeyName：规格类目名称
          //     v: [
          //       {
          //         id: "30349", // skuValueId：规格值 id
          //         name: "红色", // skuValueName：规格值名称
          //         imgUrl: "http://babyroom.hecy.top/img/2.jpg", // 规格类目图片，只有第一个规格类目可以定义图片
          //         previewImgUrl: "http://babyroom.hecy.top/img/2.jpg" // 用于预览显示的规格类目图片
          //       }
          //     ],
          //     k_s: "s1" // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          //   }
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
          //   {
          //     id: 2259, // skuId，下单时后端需要
          //     price: 100, // 价格（单位分）
          //     s1: "30349", // 规格类目 k_s 为 s1 的对应规格值 id
          //     s2: "30347", // 规格类目 k_s 为 s2 的对应规格值 id
          //     s3: "0", // 最多包含3个规格值，为0表示不存在该规格
          //     stock_num: 110 // 当前 sku 组合对应的库存
          //   }
        ],
        price: "", // 默认价格（单位元）
        stock_num: 0, // 商品总库存
        collection_id: 0, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
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
      this.goodsId = val.id;
    }
  },
  methods: {
    addCard() {
      var pid = this.$refs.cardInfo.id;
      console.log("addcard -pid: " + pid);
      this.$axios
        .post(`/baby/p/getProductSku/` + pid)
        .then(res => {
          this.sku = {
            tree: [],
            list: [],
            price: "",
            stock_num: 0,
            collection_id: 0,
            none_sku: false,
            hide_stock: false
          };
          if (res.data.code == "0000") {
            console.log("res: " + JSON.stringify(res));

            if (res.data.attachment.data.length > 0) {
              this.sku.none_sku = false;
              this.packageSkuInfo(res.data.attachment);
              console.log("finall  sku : " + JSON.stringify(this.sku));
            } else {
              this.sku.none_sku = true;
            }
            this.show = true;
          } else {
            console.log(res);
          }
        })
        .catch(err => {
          //   this.show = fase;
          Toast("获取商品规格失败！请联系管理员！" + JSON.stringify(err));
        });
      console.log("this.sku : " + JSON.stringify(this.sku));
    },
    packageSkuInfo(obj) {
      this.packageSkuTree(obj);
      this.packageSkuList(obj);
      this.sku.price = this.cardOriginprice;
      this.sku.stock_num = this.cardNumber;
      this.goods.title = this.cardTitle;
      this.goods.picture = this.cardOriginpriceImgs;
    },
    packageSkuList(obj) {
      console.log("--------------packageSkuList start ----------------");
      var tempData = obj.data;
      for (var i = 0; i < tempData.length; i++) {
        var listObj = {};
        listObj.id = tempData[i].gid;
        listObj.k_s_1 = tempData[i].d1_data;
        listObj.k_s_2 = tempData[i].d2_data;
        listObj.price = tempData[i].d5 * 100;
        listObj.stock_num = tempData[i].d4;
        this.sku.list.push(listObj);
      }
      console.log("--------------packageSkuList end ----------------");
    },
    packageSkuTree(obj) {
      console.log("--------------packageSkuTree start ----------------");

      var skuTitle = obj.title;
      if (skuTitle.c1 != undefined) {
        var d = this.$tools.groupBy(obj.data, function(item) {
          return [item.d1_data];
        });
        var tempTreeObj = {};
        tempTreeObj.k = skuTitle.c1;
        tempTreeObj.v = [];
        tempTreeObj.k_s = "k_s_1";
        for (var i = 0; i < d.length; i++) {
          var t = {};
          t.id = d[i][0].d1_data;
          t.name = d[i][0].d1_data;
          if (d[i][0].d7 == undefined || d[i][0].d7 == "") {
            t.imgUrl = this.cardOriginpriceImgs;
            t.previewImgUrl = this.cardOriginpriceImgs;
          } else {
            t.imgUrl = d[i][0].d7;
            t.previewImgUrl = d[i][0].d7;
          }
          tempTreeObj.v.push(t);
        }
        this.sku.tree.push(tempTreeObj);
      }
      if (skuTitle.c2 != undefined) {
        var d = this.$tools.groupBy(obj.data, function(item) {
          return [item.d2_data];
        });
        var tempTreeObj = {};
        tempTreeObj.k = skuTitle.c2;
        tempTreeObj.v = [];
        tempTreeObj.k_s = "k_s_2";
        for (var i = 0; i < d.length; i++) {
          var t = {};
          t.id = d[i][0].d2_data;
          t.name = d[i][0].d2_data;
          t.imgUrl = d[i][0].d7;
          t.previewImgUrl = d[i][0].d7;
          tempTreeObj.v.push(t);
        }
        this.sku.tree.push(tempTreeObj);
      }
      console.log("--------------packageSkuTree end ----------------");
    },

    onAddCartClicked(value) {
      var obj = value;
      if (this.sku.none_sku) {
        obj = {};
        obj.goodsId = value.goodsId;
        obj.selectedNum = value.selectedNum;
      }
      this.$axios
        .post(`/baby/o/addShoppingCart`, obj)
        .then(res => {
          if ((res.data.code = "0000")) {
            Toast("添加购物车成功！");
          }
        })
        .catch(err => {
          console.log("err: " + JSON.stringify(err));
          Toast("添加购物车失败！请联系管理员！");
        });
    },
    /**
     * 点击立即购买
     * 先将选择加入购物车，然后跳转到购物车页面
     */
    onBuyClicked(value) {
      var obj = value;
      if (this.sku.none_sku) {
        obj = {};
        obj.goodsId = value.goodsId;
        obj.selectedNum = value.selectedNum;
      }
      console.log("onBuyClicked value" + JSON.stringify(value));
      this.$axios
        .post(`/baby/o/addShoppingCart`, obj)
        .then(res => {
          console.log("onBuyClicked: " + JSON.stringify(res));
          if ((res.data.code = "0000")) {
            this.$router.push({
              name: "cart"
            });
          }
        })
        .catch(err => {
          console.log("err: " + JSON.stringify(err));
          Toast("添加购物车失败！请联系管理员！");
        });
    }
  },
  components: {
    [Button.name]: Button,
    [Sku.name]: Sku,
    [Toast.name]: Toast,
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
    this.goodsId = this.cardItem.id;
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