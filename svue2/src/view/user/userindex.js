import "./userIndex.less";
import { Row, Col, Icon, Cell, CellGroup } from "vant";
import { Tabbar, TabbarItem, Toast } from "vant";
import axios from "axios";
export default {
  data() {
    return {
      active: "user",
      safeareabottom: true,
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
  },
  methods: {
    changeTabbar(activeName) {
      var openid = this.$tools.parseUrl('oid');
      console.log("openid: " + openid);
      this.$router.push({
        name: activeName 
      });
    },
    toOrderList() {
      var openid = this.$tools.parseUrl('oid');
      this.$router.push({
        name: "orderList",
        params: {
          id: this.userDetail.id,
          openid: openid
        }
      });
    },
    tochangeMobile() {
      this.$router.push({
        name: "changeMobile",
        params: {
          phone: this.userDetail.mobile,
          id: this.userDetail.id
        }
      });
    },
    toOpencard() {
      this.$router.push({
        name: "opencard",
        params: {
          phone: this.userDetail.mobile,
          id: this.userDetail.id
        }
      });
    },
    toIntegral() {
      this.$router.push({
        name: "integral",
        params: {
          phone: this.userDetail.mobile,
          id: this.userDetail.id
        }
      });
    },
    toStoreInfo() {
      this.$router.push({
        name: "storeInfo"
      });
    },
    toUserChats() {
      this.$router.push({
        name: "userCharts"
      });
    },
    toshopIntegral() {
      this.$router.push({
        name: "integral"
      });
      // Toast("功能暂未开放！");
    },
    toCardList() {
      this.$router.push({
        name: "cardlist",
        params: {
          id: this.userDetail.id
        }
      });
    },
    toSwimming() {
      this.$router.push({
        name: "swimming",
        params: {
          id: this.userDetail.id
        }
      });
    },
    toAgent(flag) {
      if (!flag) {
        this.$router.push({
          name: "beagent"
        });
      } else {
        this.$router.push({
          name: "agentPage"
        });
      }

    },
    todelivergoods() {
      this.$router.push({
        name: "delivergoods",
        params: {
          id: this.userDetail.id
        }
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
            if (user.agentCode != undefined && user.agentCode != null && '' != user.agentCode) {
              this.userDetail.isagent = true;
            } else {
              this.userDetail.isagent = false;
            }
            // this.userDetail.isagent = user.agent;
          } else {
            console.log("获取用户信息失败：" + res.data.code);
          }
        })
        .catch(err => {
          console.log("获取用户信息失败");
        });
    }
  },
  filters: {
    cutOutAddress: function (addressValue) {
      if (addressValue != undefined) {
        var len = addressValue.length;
        console.log("len:" + len);
        if (len > 7) {
          return addressValue.substring(0, 7) + "...";
        }
      }
    }
  },
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [Toast.name]: Toast,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [CellGroup.name]: CellGroup
  }
};