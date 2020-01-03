import { Collapse, CollapseItem } from "vant";
import { Cell, CellGroup } from "vant";
import { Tab, Tabs } from "vant";
import { Panel } from "vant";
import { Card, Tag, Button ,Dialog,Toast} from "vant";
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
      closeOrderList: []
    };
  },
  mounted() {
    this.getOrderList();
  },
  methods: {

    fillOrdersList() {
      this.payDoneOrderList = [];
      this.closeOrderList = [];
      this.unPayOrderList = [];
      for (var i = 0; i < this.allOrderList.length; i++) {
        if (this.allOrderList[i].status === '未付款') {
          this.unPayOrderList.push(this.allOrderList[i]);
        } else if (this.allOrderList[i].status === '已完成') {
          this.payDoneOrderList.push(this.allOrderList[i]);
        } else if (this.allOrderList[i].status === '已取消') {
          this.closeOrderList.push(this.allOrderList[i]);
        }
      }
    },
    deleteOrder(oid){
      Dialog.confirm({
        title: '删除订单',
        message: '确定要删除这条订单记录吗？'
      }).then(() => {
        this.$axios
        .post(`/baby/o/deleteOrder/`+oid)
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
      console.log("取消订单：" + oid);
      // var tempOid = {};
      // for (var i = 0; i < this.allOrderList.length; i++) {
      //   if (this.allOrderList[i].id == oid) {
      //     tempOid =  this.allOrderList[i];
      //   }
      // }
      // this.allOrderList.splice(tempOid, 1);
      
      this.$axios
        .post(`/baby/o/cancelOrder/`+oid)
        .then(res => {
          if (res.data.code === "0000") {
            Toast("取消订单成功！");
            this.getOrderList();
          }
        })
        .catch(err => {
          console.log("获取用户购物车列表失败！");
        });
       
    },
    getOrderList() {
      this.allOrderList = [];
      this.$axios
        .post(`/baby/o/getUserOrders`)
        .then(res => {
          if (res.data.code === "0000") {
            var shopList = res.data.attachment;
            console.log("res.data.code: " + JSON.stringify(shopList));
            for (var i = 0; i < shopList.length; i++) {
              var obj = {};
              obj.id = shopList[i].id;
              obj.title = shopList[i].title;
              obj.status = shopList[i].status === '0' ? '未付款' :
                shopList[i].status === '1' ? '已完成' :
                  shopList[i].status === '2' ? '已取消' : '未知';
              obj.subOrders = [];
              for (var j = 0; j < shopList[i].subOrderInfoList.length; j++) {
                obj.subOrders.push(shopList[i].subOrderInfoList[j]);
              }
              this.allOrderList.push(obj);
            }
            this.fillOrdersList();

          }
        })
        .catch(err => {
          console.log("获取用户购物车列表失败！");
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
    }
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Card.name]: Card,
    [Panel.name]: Panel,
    [Toast .name]: Toast ,
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