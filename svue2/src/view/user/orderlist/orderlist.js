import { Collapse, CollapseItem } from "vant";
import { Cell, CellGroup } from "vant";
import { Tab, Tabs } from "vant";
import { Panel, Sticky } from "vant";
import { Card, Tag, Button, Dialog, Toast } from "vant";
import IsEmpty from "@/view/is-empty/";
let tools_
export default {

  data() {
    return {
      activeNames: ["1"],
      isEmpty: false,
      activeName: "c",
      date: "2019-11-29",
      allOrderList: [],
      userOpenid: '',
      userid: -1,
      payDoneOrderList: [],
      unPayOrderList: [],
      closeOrderList: [],
      successPayList: [],
      refundOrderList:[]
    };
  },
  mounted() {
    tools_ = this.$tools;
    this.init();
    this.getOrderList();
    this.getOpenid();

  },
  methods: {
    init() {
      var obj = this.$route.params;
      if (obj != undefined) {
        this.userid = obj.id;
        this.userOpenid = obj.openid;
      }
      console.log("userOpenid: " + this.userOpenid);
    },
    getOpenid() {
      var openid = '';
      this.$axios
        .post(`/baby/u/getUserOpenid`)
        .then(res => {
          console.log("res.data.code: " + JSON.stringify(res));
          if (res.data.code === "0000") {
            openid = res.data.attachment;
            this.userOpenid = res.data.attachment;
          }
        })
        .catch(err => {
          console.log("获取用户openid");
        });
      return openid;
    },

    fillOrdersList() {
      this.payDoneOrderList = [];
      this.closeOrderList = [];
      this.unPayOrderList = [];
      this.refundOrderList=[];
      this.successPayList=[];
      for (var i = 0; i < this.allOrderList.length; i++) {
        if (this.allOrderList[i].status === '未付款' || this.allOrderList[i].status === '付款失败') {
          this.unPayOrderList.push(this.allOrderList[i]);
        } else if (this.allOrderList[i].status === '已完成') {
          this.payDoneOrderList.push(this.allOrderList[i]);
        } else if (this.allOrderList[i].status === '已取消') {
          this.closeOrderList.push(this.allOrderList[i]);
        } else if (this.allOrderList[i].status === '待收货') {
          this.successPayList.push(this.allOrderList[i]);
        } else if (this.allOrderList[i].status === '退货/款') {
          this.refundOrderList.push(this.allOrderList[i]);
        }
      }
    },
    getOrderList() {
      this.allOrderList = [];
      this.$axios
        .post(`/baby/o/getUserOrders`)
        .then(res => {
          if (res.data.code === "0000") {
            var shopList = res.data.attachment;
            for (var i = 0; i < shopList.length; i++) {
              var obj = {};
              obj.id = shopList[i].id;
              obj.title = shopList[i].title;
              obj.status = shopList[i].status === '0' ? '未付款' :
                shopList[i].status === '1' ? '已完成' :
                  shopList[i].status === '3' ? '待收货' :
                    shopList[i].status === '4' ? '未付款-付款失败' :
                      shopList[i].status === '5' ? '退货/款' :
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
    },
    // 预支付
    payMoney(code) {
      let vm = this
      try {
        // let openId = this.getOpenid();
        console.log("orderlist openid : " + this.userOpenid);
        return new Promise((resolve, reject) => {

          // let openId = this.getOpenid();
          // if (openId == undefined || openId == '' || openId == null) {
          //   openId = this.userOpenid != '' ? this.userOpenid : tools_.parseUrl('oid');
          // }
          // let openId = this.userOpenid != '' ? this.userOpenid : tools_.parseUrl('oid');
          this.$axios.get('/wechat/pay/zmbaby/pre/' + code + '?openId=' + this.userOpenid).then(res => {
            console.log('pre:', res);
            if (res.status === 200) {
              if (res.data.status === 200) {
                this.requestWechatPay(res.data.entity, code);
              }
              else {
                this.set_hint_txt('调取支付失败,请重新支付', 3);
                // this.showPrice();
                console.log("预支付成功，支付失败！");
                this.toPayResultPage(true, code, false);
              }
            }
            else {
              this.set_hint_txt('调取支付失败,请重新支付', 3);
              // this.showPrice();
              console.log("预支付失败，支付失败！");
              this.toPayResultPage(true, code, false);

            }
          });
        }).catch(err => {
          console.log("-------------------------");
          this.toPayResultPage(true, code, false);
        });
      }
      catch (err) {
        reject(err);
        this.set_hint_txt('调取支付失败,请重新支付', 3);
        // this.showPrice();
        this.toPayResultPage(true, orderId, false);

      }
    },
    // 支付
    requestWechatPay(opt, orderId) {
      let vm = this
      return new Promise((resolve, reject) => {
        if (WeixinJSBridge) {
          WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
            "appId": opt.appid, //公众号名称，由商户传入     
            "timeStamp": opt.timeStamp, //时间戳，自1970年以来的秒数     
            "nonceStr": opt.nonce_str, //随机串     
            "package": opt.packageStr,
            "signType": "MD5", //微信签名方式：     
            "paySign": opt.sign //微信签名 
          },
            (res) => {
              console.log('invoke:', res)
              if (res.err_msg == "get_brand_wcpay_request:ok") {
                // 使用以上方式判断前端返回,微信团队郑重提示：
                //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                resolve();
                // this.$router.push('/paysuccess')
                this.toPayResultPage(true, orderId, true, '');
              } else {
                reject('payfail')
                this.set_hint_txt('调取支付失败,请重新支付', 3)
                // this.showPrice()
                this.toPayResultPage(true, orderId, false);
              }
            });
        } else {
          reject('请在微信端支付');
          this.set_hint_txt('调取支付失败,请重新支付', 3)
          this.toPayResultPage(true, orderId, false);
          // this.showPrice()
        }
      })
    },
    /**
     * 跳转下单成功页面
     * @param {是否走了微信支付} iswxPayFlag 
     * @param {订单id} oid 
     * @param {微信支付状态} payStatus 
     */
    toPayResultPage(iswxPayFlag, oid, payStatus) {
      this.popupShow = false;
      this.$router.push({
        name: "successPay",
        params: {
          oid: oid,
          payStatus: payStatus,
          iswxPayFlag: iswxPayFlag
        }
      });
    },
    set_hint_txt(val, time) {
      this.popupShow = false;
      const toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: val
      });

      let second = time;
      const timer = setInterval(() => {
        second--;
        if (second) {
          toast.message = val;
        } else {
          clearInterval(timer);
          // 手动清除 Toast
          Toast.clear();
        }
      }, 1000);
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
    /**
     * 
     * @param {退换货} oid 
     */
    refundOrder(oid) {
      Dialog.confirm({
        title: '退款',
        message: '平台现不支持自动退款！此按钮会发起退款申请，平台管理员会在1-3个工作日与您联系退货事宜，' +
          '在门店确认收到退回的货物后，管理员会以微信红包的方式返还商品费用！感谢您的支持！！！'
      }).then(() => {
        console.log("退换货" + oid);
        this.$axios
          .post(`/baby/o/refundOrder/` + oid)
          .then(res => {
            if (res.data.code === "0000") {

              const toast = Toast({
                duration: 0, // 持续展示 toast
                forbidClick: true,
                message: "退款申请成功！管理员会在1-3个工作日与您联系！"
              });
              let second = 3;
              const timer = setInterval(() => {
                second--;
                if (second) {
                  toast.message = "退款申请成功！管理员会在1-3个工作日与您联系！";
                } else {
                  clearInterval(timer);
                  // 手动清除 Toast
                  Toast.clear();
                }
              }, 1000);
              this.getOrderList();
            }
          })
          .catch(err => {
            console.log("获取用户购物车列表失败！");
          });
      }).catch(() => {
        console.log("取消取消订单：" + oid);
      });
    },
    /**
     * 
     * @param {确认收货} oid 
     */
    makeSureOrder(oid) {
      Dialog.confirm({
        title: '确认收货',
        message: '确认收货后，此订单已完成！'
      }).then(() => {
        console.log("确认收货" + oid);
        this.$axios
          .post(`/baby/o/makeSureOrder/` + oid)
          .then(res => {
            if (res.data.code === "0000") {
              Toast("确认收货成功！感谢您的支持！祝您生活愉快！");
              this.getOrderList();
            }
          })
          .catch(err => {
            console.log("确认收货");
          });
      }).catch(() => {
        console.log("确认收货:" + oid);
      });
    },
    /**
     * 
     * @param {提醒卖家退款} oid 
     */
    remindStore(oid) {
      console.log("提醒卖家退款" + oid);
      Toast("提醒卖家退款成功！您可主动微信联系商户哦！");
    },
    cancelOrder(oid) {
      Dialog.confirm({
        title: '取消订单',
        message: '订单取消后，您将无法找回此订单！确认取消？'
      }).then(() => {
        console.log("取消订单：" + oid);
        this.$axios
          .post(`/baby/o/cancelOrder/` + oid)
          .then(res => {
            if (res.data.code === "0000") {
              Toast("取消订单成功！");
              this.getOrderList();
            }
          })
          .catch(err => {
            console.log("获取用户购物车列表失败！");
          });
      }).catch(() => {
        console.log("取消取消订单：" + oid);
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
    [Toast.name]: Toast,
    [Cell.name]: Cell,
    [Sticky.name]: Sticky,
    [CellGroup.name]: CellGroup,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Tag.name]: Tag,
    [Button.name]: Button,
    [Dialog.name]: Dialog,
    [IsEmpty.name]: IsEmpty
  }

};