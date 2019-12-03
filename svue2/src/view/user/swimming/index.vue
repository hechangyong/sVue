<template>
  <div>
    <div class="am-padding bgWhite">
      <div class="card am-text-sm">
        <div class="card-shopname" id="shopname"></div>
        <div class="card-userinfo">
          <img @click="showBigImage" class="card-qr" alt src="../../../images/user/qcode.png" />
          <div class="card-info">
            <div class="div-member-id">
              <span id="memberID"></span>
            </div>
            <div class="div-member-name">
              <span>用户名：何长勇</span>
              <span id="memberName"></span>
            </div>
            <div class="div-member-type">
              <span>类型：游泳次卡</span>
              <span id="memberType"></span>
            </div>
          </div>
        </div>
        <div class="am-text-xs am-padding-top-sm">
          <div class="div-expiration-date">
            <span>到期日期：2020-10-10</span>
            <span id="expirationDate"></span>
          </div>
          <div class="div-expiration-date">
            <span>总次数: 100次</span>
            <span id="leftTimes" class="am-margin-right-sm">剩余次数: 10次</span>
          </div>
           
          <div class="div-prompt-msg" style="display: none;">
            <span>提示信息：</span>
            <span id="promptMsg"></span>
          </div>
        </div>
      </div>
    </div>
    <van-row gutter="20" class="rows">
      <van-col span="8"></van-col>
      <van-col span="8">宝宝游泳记录</van-col>
      <van-col span="8"></van-col>
    </van-row>
    <van-steps direction="vertical" :active="0">
      <van-step>
        <h3>【最近】</h3>
        <p>2016-07-12 12:40</p>
      </van-step>
      <van-step>
        <h3>【记录】距今天【5】天</h3>
        <p>2016-07-11 10:00</p>
      </van-step>
      <van-step>
        <h3>【记录】距今天【10】天</h3>
        <p>2016-07-11 10:00</p>
      </van-step>
      <van-step>
        <h3>【记录】距今天【15】天</h3>
        <p>2016-07-11 10:00</p>
      </van-step>
      <van-step>
        <h3>【记录】距今天【20】天</h3>
        <p>2016-07-11 10:00</p>
      </van-step>
      <van-step>
        <h3>【记录】距今天【60】天</h3>
        <p>2016-07-11 10:00</p>
      </van-step>
      <van-step>
        <h3>【记录】距今天【70】天</h3>
        <p>2016-07-11 10:00</p>
      </van-step>
      <van-step>
        <h3>【记录】距今天【140】天</h3>
        <p>2016-07-11 10:00</p>
      </van-step>
      <van-step>
        <h3>【记录】距今天【150】天</h3>
        <p>2016-07-11 10:00</p>
      </van-step>
      <van-step>
        <h3>【记录】距今天【160】天</h3>
        <p>2016-07-11 10:00</p>
      </van-step>
      <van-step>
        <h3>【记录】距今天【170】天</h3>
        <p>2016-07-11 10:00</p>
      </van-step>
      <van-step>
        <h3>【记录】距今天【180】天</h3>
        <p>2016-07-11 10:00</p>
      </van-step>
      <van-step>
        <h3>【记录】距今天【200】天</h3>
        <p>2016-07-11 10:00</p>
      </van-step>
      <van-step>
        <h3>【记录】第一次洗澡哦</h3>
        <p>2016-07-10 09:30</p>
      </van-step>
    </van-steps>

    <div class="card-fullshow" v-if="showbig==1">
      <div class="Shade-Mask"></div>
      <img class="card-big" @click="smallimg" alt src="../../../assets/images/user/qcode.png" />
    </div>
  </div>
</template>

<script>
import { Step, Steps, Row, Col } from "vant";

export default {
  name: "item",
  data() {
    return {
      showbig: 2
    };
  },
  methods: {
    showBigImage() {
      console.log("this.showbig: " + this.showbig);
      this.showbig = 1;
    },
    smallimg() {
      this.showbig = 2;
    }
  },
  components: {
    [Step.name]: Step,
    [Row.name]: Row,
    [Col.name]: Col,
    [Steps.name]: Steps
  }
};
</script>

<style scoped>
.am-margin-right-sm{
    margin-left: 15px;
}
.rows {
  font-size: 14px;
  background-color: #fff;
  font-weight: bold;
  color: #9697a7;
}

[v-cloak] {
  display: none;
}
body {
  font-size: 16px;
  max-width: 600px;
  margin: 0 auto;
  background-color: #efefef;
}

.bgWhite {
  background-color: #fff;
}

.menuitem {
  display: block;
  color: #333;
  padding: 10px 20px;
  border-bottom: 1px solid #eee;
}

.icon-left {
  color: #555;
  width: 25px;
  font-size: 16px;
  margin-right: 3px;
  text-align: center;
}

.icon-right {
  font-size: 16px;
  color: #aaa;
}

.card {
  margin: 10px;
  border-radius: 10px;
  overflow: hidden;
  padding: 20px;
  font-size: 16px;
  color: #fff;
  box-shadow: rgba(144, 97, 237, 0.6) 2px 2px 2px;
  background: -ms-linear-gradient(left, #fa3232, #ec795c);
  /*IE 10*/
  background: -moz-linear-gradient(left, #fa3232, #ec795c);
  /*火狐 #fe806d, #e47272)*/
  background: -webkit-gradient(
    linear,
    0% 0%,
    100% 0%,
    from(#f79587),
    to(#e47272)
  );
  /*谷歌 #f79587, #fb3636)*/
  background: -webkit-gradient(
    linear,
    0% 0%,
    100% 0%,
    from(#f79587),
    to(#fb3636)
  );
  /*Safari 4-5, Chrome 1-9*/
  background: -webkit-linear-gradient(left, #f79587, #fb3636);
  /*Safari 5.1 Chrome 10+*/
  background: -o-linear-gradient(left, #f79587, #fb3636);
  /*Opera 11.10+*/
  filter: progid:DXImageTransform.Microsoft.Gradient(gradientType=1, startColorStr=#f79587, endColorStr=#fb3636);
  /*IE 6 7 8*/
}

.card-shopname {
  text-align: right;
  font-size: 1.2rem;
}

.card-userinfo {
  display: flex;
}

.card-qr {
  width: 80px;
  height: 80px;
  border: 5px solid #fff;
  border-radius: 5px;
}

.card-info {
  width: 0;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding-left: 10px;
}

.div-member-name,
.div-member-type {
  color: #f6cbc2;
  margin-top: 5px;
}

.card-fullshow {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* display: none; */
}

.Shade-Mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.65);
}

.card-big {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
  width: 200px;
  height: 200px;
  border: 10px solid #fff;
}
</style>