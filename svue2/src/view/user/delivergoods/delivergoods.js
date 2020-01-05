import { Collapse, CollapseItem } from "vant";
import { Cell, CellGroup } from "vant";
import { Tab, Tabs } from "vant";
import { Panel } from "vant";
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
      unPayOrderList: []
      
    };
  },
  mounted() {
    this.getOrderList();
  },
  methods: {
    fillOrdersList() {
      this.payDoneOrderList = [];
      this.unPayOrderList = [];
      for (var i = 0; i < this.allOrderList.length; i++) {
        if (this.allOrderList[i].status === '未送货') {
          this.unPayOrderList.push(this.allOrderList[i]);
        } else if (this.allOrderList[i].status === '已完成') {
          this.payDoneOrderList.push(this.allOrderList[i]);
        }  
      }
    },
    deleteOrder(oid) {
      Dialog.confirm({
        title: '删除订单',
        message: '确定要删除这条订单记录吗？'
      }).then(() => {
        this.$axios
          .post(`/baby/o/deleteOrder/` + oid)
          .then(res => {
            if (res.data.code === "0000") {
              Toast("删除成功！");
              this.getOrderList();
            }
          })
          .catch(err => {
            console.log("删除订单失败！");
          });

      }).catch(() => {
        // on cancel
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
              obj.status = shopList[i].status === '0' ? '未送货' :
                shopList[i].status === '1' ? '已完成' :
                  shopList[i].status === '2' ? '已取消' : '未知';
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
    getAddressName(value){
      var ss = value + "_"+ Math.random();
      console.log(ss);
      
      return ss;
    }

  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Card.name]: Card,
    [Panel.name]: Panel,
    [Toast.name]: Toast,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Tag.name]: Tag,
    [Button.name]: Button,
    [Dialog.name]: Dialog,
    [IsEmpty.name]: IsEmpty
  }

};