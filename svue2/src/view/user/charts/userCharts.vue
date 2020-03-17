<template>
  <div>
    <Affix>
      <div style="background-color: #ffffff;">
        <h6 style="text-align: center;font-size: 20px;">数据总览</h6>
        <van-row>
          <van-col span="12">
            <i-circle
              style="width:80%; margin-left: 20px;"
              :trail-width="4"
              :stroke-width="5"
              :percent="100"
              stroke-linecap="square"
              stroke-color="#43a3fb"
            >
              <div class="demo-Circle-custom">
                <h1>{{totalUserNumber}}</h1>
                <p></p>
                <span>关注总人数(个)</span>
              </div>
            </i-circle>
          </van-col>
          <van-col span="12">
            <i-circle
              style="width:80%; margin-left:20px;"
              :trail-width="4"
              :stroke-width="5"
              :percent="100"
              stroke-linecap="square"
              stroke-color="#f57070"
            >
              <div class="demo-Circle-custom">
                <h1>{{totalStoreConsumeAmount}}</h1>
                <p></p>
                <span>消费总金额（元）</span>
              </div>
            </i-circle>
          </van-col>
        </van-row>
      </div>
    </Affix>

    <div>
      <schart v-if="options.datasets.length != 0" class="wrapper" canvasId="canvas" :options="options"></schart>
      <schart v-if="options2.datasets.length != 0" class="wrapper" style="padding-top: 10px;" canvasId="canvas2" :options="options2"></schart>
    </div>
  </div>
</template>

<script>
import Schart from "./vue-schart";
import { Col, Row, Circle } from "vant";

export default {
  name: "iiiii",
  data() {
    return {
      currentRate: 0,
      rate: 100,
      totalUserNumber: "- -",
      totalStoreConsumeAmount: "- -",
      gradientColor: {
        "0%": "#3fecff",
        "100%": "#6149f6"
      },
      options: {
        type: "line",
        title: {
          text: "最近一周关注用户统计"
        },
        bgColor: "#fff",
        labels: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        datasets: []
      },

      options2: {
        type: "bar",
        title: {
          text: "最近一周销售额度统计"
        },
        bgColor: "#fff",
        labels: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        datasets: []
      }
    };
  },
  created() {
    this.getTotalUserNumber();
    this.getTotalStoreConsumeAmount();
    this.getData();
    this.getStoreConsumeAmountData();
    
  },
  components: {
    Schart,
    [Col.name]: Col,
    [Circle.name]: Circle,
    [Row.name]: Row
  },
  methods: {
    getTotalUserNumber(){
      this.totalUserNumber = '- -';
      this.$axios
        .get(`/baby/s/getTotalUserNumber`)
        .then(res => {
          console.log("getTotalUserNumber : " + JSON.stringify(res));
          if (res.data.code === "0000") {
            var data = res.data.attachment;
            this.totalUserNumber = data;
          }
        })
        .catch(err => {
          console.log("获取用户关注数据");
        });
    },
    getTotalStoreConsumeAmount(){
      this.totalStoreConsumeAmount = '- -';
      this.$axios
        .get(`/baby/s/getTotalStoreConsumeAmount`)
        .then(res => {
          console.log("getTotalStoreConsumeAmount : " + JSON.stringify(res));
          if (res.data.code === "0000") {
            var data = res.data.attachment;
            this.totalStoreConsumeAmount = data;
          }
        })
        .catch(err => {
          console.log("获取用户关注数据");
        });
    },
    getStoreConsumeAmountData() {
      this.$axios
        .get(`/baby/s/getStoreConsumeAmountData`)
        .then(res => {
          console.log("getStoreConsumeAmountData : " + JSON.stringify(res));
          if (res.data.code === "0000") {
            var data = res.data.attachment;
            if (data != null && data != undefined) {
              var wxData = data.wxData;
              if (wxData != null && wxData != undefined) {
                this.options2.datasets.push(wxData);
              }
              var offlineData = data.offlineData;
              if (offlineData != null && offlineData != undefined) {
                this.options2.datasets.push(offlineData);
              }
            }
          }
        })
        .catch(err => {
          console.log("获取用户关注数据");
        });
    },
    getData() {
      this.$axios
        .get(`/baby/s/getUserAttentionData`)
        .then(res => {
          console.log("getUserAttentionData : " + JSON.stringify(res));
          if (res.data.code === "0000") {
            var data = res.data.attachment;
            this.options.datasets.push(data[0]);
          }
        })
        .catch(err => {
          console.log("获取用户关注数据");
        });
    }
  }
};
</script>
<style lang="less">
.wrapper {
  width: 100%;
  height: 400px;
}
.van-circle {
  position: relative;
  display: inline-block;
  text-align: center;
  margin-left: 1rem;
}
.demo-Circle-custom {
  & h1 {
    color: #3f414d;
    font-size: 20px;
    font-weight: normal;
  }
  & p {
    color: #657180;
    font-size: 14px;
    margin: 10px 0 15px;
  }
  & span {
    display: block;
    padding-top: 15px;
    color: #657180;
    font-size: 14px;
    &:before {
      content: "";
      display: block;
      width: 50px;
      height: 1px;
      margin: 0 auto;
      background: #e0e3e6;
      position: relative;
      top: -15px;
    }
  }
  & span i {
    font-style: normal;
    color: #3f414d;
  }
}
</style>