<template>
  <div>
    <van-dropdown-menu>
      <van-dropdown-item v-model="value1" :options="option1" />
      <van-dropdown-item v-model="value2" :options="option2" />
    </van-dropdown-menu>

    <van-card
      num="2"
      price="2.00"
      desc="大叔大婶大所大所大所大所大所多"
      title="商品标题"
      origin-price="10.00"
      thumb="http://babyroom.hecy.top/img/3.jpg"
    >
      <div slot="footer">
        <van-button round icon="cart-circle-o" type="primary" @click="addCard" size="mini"></van-button>
      </div>
    </van-card>

    <van-sku
      v-model="show"
      :sku="sku"
      :goods="goods"
      :goods-id="goodsId"
      :hide-stock="sku.hide_stock"
      :message-config="messageConfig"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
    />
  </div>
</template>

<script>
import { DropdownMenu, DropdownItem, Card, Button, Sku } from "vant";
export default {
  data() {
    return {
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
                id: "30349", // skuValueId：规格值 id
                name: "大码", // skuValueName：规格值名称
                imgUrl: "http://babyroom.hecy.top/img/2.jpg", // 规格类目图片，只有第一个规格类目可以定义图片
                previewImgUrl: "http://babyroom.hecy.top/img/2.jpg" // 用于预览显示的规格类目图片
              },
              {
                id: "30349",
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
            s1: "1215", // 规格类目 k_s 为 s1 的对应规格值 id
            s2: "1193", // 规格类目 k_s 为 s2 的对应规格值 id
            s3: "0", // 最多包含3个规格值，为0表示不存在该规格
            stock_num: 110 // 当前 sku 组合对应的库存
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
        title: "测试商品",
        // 默认商品 sku 缩略图
        picture: "http://babyroom.hecy.top/img/2.jpg"
      },
      messageConfig: {
        // 图片上传回调，需要返回一个promise，promise正确执行的结果需要是一个图片url
        uploadImg: () => {
          return new Promise(resolve => {
            setTimeout(
              () =>
                resolve(
                  "https://img.yzcdn.cn/upload_files/2017/02/21/FjKTOxjVgnUuPmHJRdunvYky9OHP.jpg!100x100.jpg"
                ),
              1000
            );
          });
        },
        // 最大上传体积 (MB)
        uploadMaxSize: 3,
        // placeholder 配置
        placeholderMap: {
          text: "留言板"
        }
      },
      activeKey: 0,
      value1: 0,
      value2: "a",
      option1: [
        { text: "全部商品", value: 0 },
        { text: "纸尿片", value: 1 },
        { text: "奶粉", value: 2 },
        { text: "奶壶", value: 3 },
        { text: "宝妈用品", value: 4 },
        { text: "宝宝玩具", value: 5 },
        { text: "宝宝衣物", value: 6 },
        { text: "宝宝辅食", value: 7 },
        { text: "更多", value: 8 }
      ],
      option2: [
        { text: "默认排序", value: "a" },
        { text: "价格排序", value: "b" },
        { text: "销量排序", value: "c" }
      ]
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      var obj = this.$route.params;
      if (obj != undefined && JSON.stringify(obj) != "{}") {
        this.value1 = obj.id;
      } else {
        this.value1 = 0;
      }
    },
    addCard() {
      this.show = true;
    },
    onBuyClicked() {},
    onAddCartClicked(value) {
      console.log("onAddCartClicked value" + JSON.stringify(value));
    }
  },
  components: {
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Button.name]: Button,
    [Sku.name]: Sku,
    [Card.name]: Card
  }
};
</script>