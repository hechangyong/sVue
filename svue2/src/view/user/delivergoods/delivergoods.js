import { Collapse, CollapseItem } from "vant";
import { Cell, CellGroup } from "vant";
import { Tab, Tabs } from "vant";
import { Panel, Field } from "vant";
import { Card, Tag, Button, Dialog, Toast } from "vant";
import IsEmpty from "@/view/is-empty/";
export default {

  data() {
    return {
      activeNames: ["1"],
      isEmpty: false,
      activeName: "a",
      date: "2019-11-29",
      allOrderList: [],
      payDoneOrderList: [],
      unPayOrderList: [],
      wxpayDoneOrderList: [],
      popupShow: false,
      currentOrderId: 0,
      number: 0,
      message: ""
    };
  },
  mounted() {
    this.getOrderList();
  },
  methods: {
    fillOrdersList() {
      this.payDoneOrderList = [];
      this.unPayOrderList = [];
      this.wxpayDoneOrderList=[];
      for (var i = 0; i < this.allOrderList.length; i++) {
        if (this.allOrderList[i].status === '待送货') {
          this.unPayOrderList.push(this.allOrderList[i]);
        } else if (this.allOrderList[i].status === '待发货') {
          this.wxpayDoneOrderList.push(this.allOrderList[i]);
        } else if (this.allOrderList[i].status === '已完成') {
          this.payDoneOrderList.push(this.allOrderList[i]);
        }
      }
    },
    receipt(oid) {
      this.popupShow = true;
      this.currentOrderId = oid;
    },
    deliverGoods(oid) {
      this.$axios
        .post(`/baby/o/deliverGoods/` + oid)
        .then(res => {
          if (res.data.code === "0000") {
            Toast("操作成功！");
            this.getOrderList();
          }
        })
        .catch(err => {
          console.log("配送操作失败！请联系管理员");
          Toast("发货！请联系管理员！");
        });
    },
    receiptAmount() {
      this.popupShow = false;
      var obj = {};
      obj.amount = this.number;
      obj.remark = this.message;
      this.$axios
        .post(`/baby/o/receipt/` + this.currentOrderId, obj)
        .then(res => {
          if (res.data.code === "0000") {
            Toast("操作成功！");
            this.getOrderList();
            this.currentOrderId = 0;
            this.number = 0;
            this.message = '';
          }
        })
        .catch(err => {
          console.log("配送操作失败！请联系管理员");
          Toast("配送操作失败！请联系管理员！");
        });
    },
    cancelOrder(oid) {

    },
    getOrderList() {
      this.allOrderList = [];
      this.$axios
        .post(`/baby/o/getUserOrdersforAdmin`)
        .then(res => {
          if (res.data.code === "0000") {
            var shopList = res.data.attachment;
            console.log("res.data.code: " + JSON.stringify(shopList));
            for (var i = 0; i < shopList.length; i++) {
              var obj = {};
              obj.id = shopList[i].id;
              obj.title = shopList[i].title;
              if (shopList[i].payType == 1) {
                obj.status = shopList[i].status === '3' ? '待发货' :
                  shopList[i].status === '4' ? '支付失败' :
                    shopList[i].status === '0' ? '支付失败' :
                      shopList[i].status === '2' ? '取消' :
                        shopList[i].status === '1' ? '已完成' : '未知';
              } else {
                obj.status = shopList[i].status === '0' ? '待送货' :
                  shopList[i].status === '4' ? '待送货' :
                    shopList[i].status === '3' ? '待送货' :
                      shopList[i].status === '1' ? '已完成' :
                        shopList[i].status === '2' ? '已取消' : '未知';
              }

              obj.subOrders = [];
              obj.addressInfo = shopList[i].babyUserAddress;
              for (var j = 0; j < shopList[i].subOrderInfoList.length; j++) {
                obj.subOrders.push(shopList[i].subOrderInfoList[j]);
              }
              this.allOrderList.push(obj);
            }
            this.fillOrdersList();

          }
        })
        .catch(err => {
          console.log("获取订单列表失败！");
        });
    }
  },
  filters: {
    /**
     * 统计合计费用
     * @param {统计合计费用} value 
     */
    getTotalFee(value) {
      return value.map(d => d.price * d.num).reduce(function (prev, curr, idx, arr) {
        return prev + curr;
      });
    },
    assembleAddressInfo(addressInfo) {
      return addressInfo.mobile + ", " + addressInfo.province + addressInfo.city + addressInfo.county + addressInfo.addressdetail
    },
    getAddressName(value) {
      var ss = value + "_" + Math.random();
      console.log(ss);

      return ss;
    }

  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Card.name]: Card,
    [Panel.name]: Panel,
    [Field.name]: Field,
    [Toast.name]: Toast,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Tag.name]: Tag,
    [Button.name]: Button,
    [Dialog.Component.name]: Dialog.Component,
    [IsEmpty.name]: IsEmpty
  }

};