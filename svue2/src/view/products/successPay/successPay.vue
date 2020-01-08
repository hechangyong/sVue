<template>
  <div>
    <van-notice-bar color="#280" background="#ECFFDC">
      {{message}}
      <template slot="left-icon">
        <van-icon name="passed" class="iconclass"></van-icon>
      </template>
    </van-notice-bar>

    <div class="payedAddressInfo">
      <ul>
        <li>联系人：{{name}}</li>
        <li>手机号：{{tel}}</li>
        <li>
          应付金额：
          <span class="payedInfoPrice">￥ {{payedInfoPrice}}元</span>
        </li>
        <li>您的地址：{{addressDetail}}</li>
        <li>预计付款后，3个工作日送达！</li>
      </ul>
    </div>
    <div class="toViewOrders">
      您可以
      <router-link to="orderList">查看已经购买</router-link>
    </div>

    <van-divider
      dashed
      :style="{   color: '#1989fa', borderColor: '#969799', padding: '0 16px' ,margin: '0px 0'}"
    ></van-divider>

    <van-panel icon="warning-o" title="注意" :desc="desc"></van-panel>
  </div>
</template>

<script>
import { NoticeBar, Icon, Divider, Panel } from "vant";
export default {
  data() {
    return {
      addressDetail: "",
      tel: "",
      payedInfoPrice: 0,
      name: "",
      iswxPayFlag: false,
      desc: "",
      message: "您已成功下单",
      payStatus: false,
      oid: ""
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      var obj = this.$route.params;
      if (obj != undefined) {
        // this.name = obj.name;
        // this.tel = obj.tel;
        // this.addressDetail = obj.addressDetail;
        // this.payedInfoPrice = obj.payedInfoPrice;
        this.iswxPayFlag = obj.iswxPayFlag;
        this.payStatus = obj.payStatus;
        this.iswxPayFlag = obj.iswxPayFlag;
        this.getOrderdetailInfo(obj.oid);
      }
      if (!this.payStatus && this.iswxPayFlag) {
        this.message = "您已下单成功。但是支付失败";
      }
      if (!this.iswxPayFlag) {
        this.desc =
          "您选择了货到付款！收到货物请检查货物哦！还请保持手机通讯正常，方便工作人员与您联系！感谢您的支持！！";
      } else {
        this.desc =
          "您选择了微信支付，支付完成后，预计0-3个工作日送达！收到货物请检查货物哦！还请保持手机通讯正常，方便工作人员与您联系！ 感谢您的支持！！";
      }
    },
    getOrderdetailInfo(oid) {
      this.$axios
        .post(`/baby/o/getUserOrders/` + oid)
        .then(res => {
          console.log("res.data.code: " + res.data.attachment);
          if (res.data.code === "0000") {
            var orderinfo = res.data.attachment;
            this.name = orderinfo.babyUserAddress.name;
            this.tel = orderinfo.babyUserAddress.mobile;
            this.addressDetail = orderinfo.babyUserAddress.addressdetail;

            this.payedInfoPrice = this.getOrderPrice(orderinfo.subOrderInfoList);
          }
        })
        .catch(err => {
          Toast("获取订单信息失败，请联系管理员！");
        });
    },
    getOrderPrice(subOrderInfoList) {
       console.log("subOrderInfoList[i].price:"+ JSON.stringify(subOrderInfoList));
      var price = 0;
      for (var i = 0; i < subOrderInfoList.length; i++) {
        console.log("subOrderInfoList[i].price:"+ subOrderInfoList[i].price);
        price = price + subOrderInfoList[i].price;
      }
      return price;
    }
  },

  components: {
    [NoticeBar.name]: NoticeBar,
    [Divider.name]: Divider,
    [Panel.name]: Panel,
    [Icon.name]: Icon
  }
};
</script>
<style lang="scss" scoped>
.toViewOrders {
  padding-bottom: 10px;
  padding-left: 35px;
  font-size: 14px;
  background: #fff;
}
.van-cell__left-icon {
  min-width: 1em;
  height: 24px;
  font-size: 20px;
  color: red;
  line-height: 24px;
}
.van-divider_reload {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  color: #969799;
  font-size: 14px;
  line-height: 24px;
  /* border-color: #ebedf0; */
  border-style: solid;
  border-width: 0;
}
.warningDiv {
  font-size: 14px;
  margin: 23px 45px;
  color: black;
}
.iconclass {
  color: #280;
  margin-right: 15px;
  font-size: 35px;
}
.payedAddressInfo {
  padding: 26px 35px;
  font-size: 14px;
  background: #fff;
  > ul {
    > li {
      background-image: url(https://how2j.cn/tmall/img/site/li_dot.png);
      background-repeat: no-repeat;
      background-color: transparent;
      background-attachment: scroll;
      background-position: 0px 13px;
      list-style-type: none;
      color: #333333;
      padding-left: 15px;
      padding-top: 5px;
    }
  }
}
.payedInfoPrice {
  color: #b10000;
  font-weight: bold;
  font-size: 14px;
  font-family: arial;
}
</style>>

 