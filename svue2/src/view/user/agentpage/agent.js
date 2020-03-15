import "./agent.less";
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
      agentCode: '',
      allRecodeList: [],
      exchangeRecordList: [],
      totalIncome: "- -",
      canWithDrawIncome: "- -",
      activeName: "a",
      showVip: false,
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
    this.getAgentRecommondRecode();
    // this.getUserIntegralRecodes();
  },
  methods: {
    showVipDes() {
      this.$router.push({
        name: "agentVip"
      });
    },
    onCopy: function (e) {
      Toast("复制成功！");
    },
    onError: function (e) {
      console.log(e)
      Toast("复制失败！");
    },
    // 1-已完成 2-在途 3-用户退货
    parseOrderstatus(code) {
      var zh_channel = "";
      if (code == 1) {
        zh_channel = zh_channel + "【获得】 购买商品获得返现：";
      } else if (code == 2) {
        zh_channel = zh_channel + " 【在途】购买商品在途返现金额：";
      } else if (code == 3) {
        zh_channel = zh_channel + " 【取消】 用户退货，去除返现金额：";
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
    getAgentRecommondRecode() {
      axios
        .post(`/baby/a/getAgentRecode`)
        .then(res => {
          console.log("res: " + res.data);
          if (res.data.code === "0000") {
            var recordList = res.data.attachment;
            console.log("RecommondRecodeList: " + JSON.stringify(recordList));
            if (recordList.length > 0) {
              this.totalIncome = 0;
            }

            this.canWithDrawIncome = "- -";
            for (var i = 0; i < recordList.length; i++) {
              if (recordList[i].orderstatus == 1 || recordList[i].orderstatus == 2) {
                this.totalIncome = this.totalIncome + recordList[i].totalamount;
              }
              if (recordList[i].orderstatus != 4) {
                this.allRecodeList.push({
                  recordText: this.parseOrderstatus(recordList[i].orderstatus) + recordList[i].totalamount,
                  time: this.$tools.formatDate(recordList[i].itime)
                })
              }
            }
            this.totalIncome = this.totalIncome + " 元"

          } else {
            console.log("获取代理人推荐记录" + res.data.code);
          }
        })
        .catch(err => {
          console.log("获取代理人推荐记录", err);
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
            this.agentCode = user.agentCode;
            if (user.agentLevel >= 4) {
              this.userDetail.level = "P";
            } else {
              this.userDetail.level = "V" + user.agentLevel;
            }

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