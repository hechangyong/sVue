import { Sku } from "vant";
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
    [Sku.name]: Sku,
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
        title: "",
        price: 0,
        express: "免运费",
        des: "",
        remain: 0,
        thumb: []
      },
      desc: '',
      show: false,
      goodsId: 1,
      cardOriginpriceImgs: "",
      cardOriginprice: 0,
      cardNumber: 0,
      pid: 0,
      sku: {
        tree: [],
        list: [],
        price: "",
        stock_num: 0,
        collection_id: 0, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
        hide_stock: false // 是否隐藏剩余库存
      }
    };
  },
  mounted() {
    var obj = this.$route.params;
    if (obj != undefined) {
      this.pid = obj.pid;
      this.goodsId = obj.pid;
    }
    this.initProduct();
  },
  methods: {
    initProduct() {
      this.$axios
        .post(`/baby/p/getProductInfo/` + this.pid)
        .then(res => {
          if ((res.data.code = "0000")) {
            console.log("res: " + JSON.stringify(res));
            //  "id":24,"name":"飞鹤奶粉【0-6月】"
            //  "totalnumber":100,"residuenumber":36,"categoryid":2,"status":2,"imgs":"compress_8e26d61113054e799ac3d14038f74933-12.jpg","skuid":"41,42,43","storeid":0,"isdelete":false,"itime":"2019-12-27T23:44:37.000+0000","utime":"2019-12-30T11:40:26.000+0000"}}
            var currentGoods = res.data.attachment.goods;
            var currentImgs = res.data.attachment.imgs;
            var originalImgList = res.data.attachment.originalImgList;
            this.goods.title = currentGoods.name;
            this.goods.price = currentGoods.price;
            this.goods.promotionprice = currentGoods.promotionprice;
            this.goods.des = currentGoods.description;
            this.goods.units = currentGoods.units;
            this.goods.remain = currentGoods.residuenumber;
            this.goods.id = currentGoods.id;
            this.goods.thumb = originalImgList;
            this.goods.picture = currentImgs[0];
            this.cardOriginpriceImgs = currentImgs[0];
            this.cardOriginprice = currentGoods.promotionprice;
            this.cardNumber = currentGoods.residuenumber;
            this.goodsId = currentGoods.id;
            for (var i = 0; i < originalImgList.length; i++) {
              this.desc = this.desc + '<img style="width: 100%;" alt="" src=' + originalImgList[i] + '>'
            }
          }
        })
        .catch(err => {
          console.log("err: " + JSON.stringify(err));
          Toast("添加购物车失败！请联系管理员！");
        });
    },
    formatPrice(value, units) {
      return "¥" + value + "/" + units;
      // return "¥" + (value/100).toFixed(2);
    },

    onClickCart() {
      this.$router.push("cart");
    },
    onAddCartClicked(value) {
      console.log("onAddCartClicked: " + JSON.stringify(value))
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
    },
    onAddCartClicked(value) {
      console.log("onAddCartClicked: " + JSON.stringify(value))
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
    },
    packageSkuTree(obj) {
      var skuTitle = obj.title;
      if (skuTitle.c1 != undefined) {
        var d = this.$tools.groupBy(obj.data, function (item) {
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
        var d = this.$tools.groupBy(obj.data, function (item) {
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
    },
    sorry() {

      this.$axios
        .post(`/baby/p/getProductSku/` + this.pid)
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
          console.log("err: " + JSON.stringify(err));
          Toast("获取商品规格失败！请联系管理员！" + JSON.stringify(err));
        });
    },
    toChat() {
      Dialog.alert({
        message: "老板手机号：17681102630 \n 欢迎骚扰"
      });
    }
  }
};