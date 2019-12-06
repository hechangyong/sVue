<template>
  <div>
    <div class="banner">
      <div class="user-name-box flex flex-center auto">
        <img :src="userDetail.headImgUrl" alt />
        <p>{{userDetail.nickName}}</p>
      </div>
    </div>
    <!-- <img class="user-poster" src="https://img.yzcdn.cn/public_files/2017/10/23/8690bb321356070e0b8c4404d087f8fd.png"> -->
    <!--<img class="user-poster" src="../../images/user/home_bg.png">-->

    <van-row class="user-links">
      <van-col @click="toOrderList" span="8">
        <van-icon name="pending-payment" />购物清单
      </van-col>
      <van-col @click="toSwimming" span="8">
        <van-icon name="records" />我的游泳卡
      </van-col>
      <van-col span="8">
        <van-icon name="tosend" @click="toshopIntegral" />我的积分
      </van-col>
    </van-row>

    <van-cell-group class="user-group">
      <van-cell
        icon="phone-o"
        title="我的手机"
        @click="tochangeMobile"
        :value="userDetail.mobile"
        is-link
      />
    </van-cell-group>

    <van-cell-group class="user-top-group">
      <van-cell
        icon="home-o"
        title="我的地址"
        to="/addressList"
        :value="userDetail.address | cutOutAddress"
        is-link
      />
    </van-cell-group>

    <van-cell-group class="user-top-group">
      <van-cell icon="home-o" title="我的卡劵" @click="toCardList" is-link />
    </van-cell-group>
  </div>
</template>

<script>
import { Row, Col, Icon, Cell, CellGroup, Toast } from "vant";
import axios from "axios";
export default {
  data() {
    return {
      userDetail: {
        headImgUrl: "",
        nickName: "",
        mobile: "",
        address: "",
        id: 0
      }
    };
  },
  mounted() {
    this.getUserBaseInfo();
  },
  methods: {
    toOrderList() {
      this.$router.push({
        name: "orderList",
        params: {
          id: this.userDetail.id
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
    toshopIntegral() {
      Toast("功能暂未开放！");
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
    getUserBaseInfo() {
      axios
        .post(`/baby/u/getUserInfo`)
        .then(res => {
          console.log("res: " + res.data.code);
          if (res.data.code === "0000") {
            var user = res.data.attachment;
            console.log("user.nickName: " + user.nickname);
            this.userDetail.nickName = user.nickname;
            this.userDetail.headImgUrl = user.headimgurl;
            this.userDetail.mobile = user.phone;
            this.userDetail.address = user.addressdetail;
            this.userDetail.id = user.id;
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
    cutOutAddress: function(addressValue) {
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
    [CellGroup.name]: CellGroup
  }
};
</script>

<style scoped  src="./userIndex.css"></style>
<style lang="less">
.user {
  &-poster {
    width: 100%;
    height: 53vw;
    display: block;
  }

  &-group {
    margin-bottom: 15px;
    font-size: 18px;
  }
  &-top-group {
    margin-top: 15px;
  }

  &-links {
    padding: 15px 0;
    font-size: 12px;
    text-align: center;
    background-color: #fff;

    .van-icon {
      display: block;
      font-size: 24px;
    }
  }
}
</style>
