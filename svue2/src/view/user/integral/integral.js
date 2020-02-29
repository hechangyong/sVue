import "./integral.less";
import { Row, Col, Icon, Cell, CellGroup } from "vant";
import { Tabbar, TabbarItem, Toast } from "vant";
import { Tab, Tabs, Step, Steps, Overlay, Dialog } from "vant";
import IsEmpty from "@/view/is-empty/";
import axios from "axios";
export default {
  data() {
    return {
      active: "user",
      safeareabottom: true,
      allIntegralList: [],
      exchangeRecordList: [],
      totalIntegral: "- -",
      surplusIntegral: "- -",
      activeName: "a",
      show: false,
      userDetail: {
        nickName: "",
        headImgUrl: "",
        mobile: "",
        address: "",
        id: 0,
        status: ""
      }
    };
  },
  mounted() {
    this.getUserBaseInfo();
    this.getUserIntegralRecodes();
  },
  methods: {
    // 1-购买产品获得 2-邀请用户 3-首次关注 4-抵扣产品价钱
    parseChannel(code) {
      var zh_channel = "【获得】";
      if (code == 1) {
        zh_channel = zh_channel + " 购买商品获得：";
      } else if (code == 2) {
        zh_channel = zh_channel + " 邀请一位新用户获得：";
      } else if (code == 3) {
        zh_channel = zh_channel + " 首次关注获得：";
      } else if (code == 4) {
        zh_channel = "【兑换】购买商品使用积分： ";
      }
      return zh_channel;
    },
    showView() {
      this.show = true;
    },
    closeOverlay() {
      console.log("closeOverlay---");
      this.show = false;
    },
    getUserIntegralRecodes() {
      axios
        .post(`/baby/p/getIntegralRecords`)
        .then(res => {
          console.log("res: " + res.data);
          if (res.data.code === "0000") {
            var recordList = res.data.attachment;
            console.log("recordList: " + JSON.stringify(recordList));
            var surplusIntegral = 0;
            var totalIntegral = 0;
            for (var i = 0; i < recordList.length; i++) {
              var zh_channel = this.parseChannel(recordList[i].channel);
              if (recordList[i].integraltype == 2) {
                surplusIntegral = surplusIntegral + recordList[i].amount;
                this.exchangeRecordList.push({
                  "recordText": zh_channel + recordList[i].amount,
                  "time": this.$tools.formatDate(recordList[i].itime, "YY-MM-DD HH:mm:ss")
                });
              } else {

                totalIntegral = totalIntegral + recordList[i].amount;
                this.allIntegralList.push({
                  "recordText": zh_channel + recordList[i].amount,
                  "time": this.$tools.formatDate(recordList[i].itime, "YY-MM-DD HH:mm:ss")
                });
              }
            }
            if (recordList.length > 0) {
              this.surplusIntegral = surplusIntegral + "";
              this.totalIntegral = totalIntegral + "";
            }


            console.log("allIntegralList: " + JSON.stringify(this.allIntegralList));
          } else {
            console.log("获取活动用户积分记录" + res.data.code);
          }
        })
        .catch(err => {
          console.log("获取活动用户积分记录", err);
        });

    },
    getUserBaseInfo() {
      axios
        .post(`/baby/u/getUserInfo`)
        .then(res => {
          console.log("res: " + res.data.code);
          if (res.data.code === "0000") {
            var user = res.data.attachment;
            console.log("user.nickName: " + JSON.stringify(user));
            this.userDetail.nickName = user.nickname;
            this.userDetail.headImgUrl = user.headimgurl;
            this.userDetail.mobile = user.phone;
            this.userDetail.address = user.addressdetail;
            this.userDetail.id = user.id;
            this.userDetail.status = user.status;
          } else {
            console.log("获取用户信息失败：" + res.data.code);
          }
        })
        .catch(err => {
          console.log("获取用户信息失败");
        });
    }
  },
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [Toast.name]: Toast,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [IsEmpty.name]: IsEmpty,
    [Tabbar.name]: Tabbar,
    [Step.name]: Step,
    [Steps.name]: Steps,
    [Overlay.name]: Overlay,
    [TabbarItem.name]: TabbarItem,
    [Dialog.Component.name]: Dialog.Component,
    [CellGroup.name]: CellGroup
  }
};