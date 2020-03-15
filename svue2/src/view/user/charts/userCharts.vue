<template>
  <div id="iiiii">
    <schart class="wrapper" canvasId="canvas" :options="options"></schart>
    <schart class="wrapper" style="padding-top: 10px;" canvasId="canvas2" :options="options2"></schart>
  </div>
</template>

<script>
import Schart from "./vue-schart";
export default {
  name: "iiiii",
  data() {
    return {
      options: {
        type: "line",
        title: {
          text: "最近一周关注用户统计"
        },
        bgColor: "#fff",
        labels: ["周一", "周二", "周三", "周四", "周五","周六","周日"],
        datasets: [
          {
            label: "新增用户",
            fillColor: "rgba(241, 49, 74, 0.5)",
            data: [234, 278, 270, 190, 230]
          },
          {
            label: "总用户",
            data: [164, 178, 190, 135, 160]
          }
        ]
      },

      options2: {
        type: "bar",
        title: {
          text: "最近一周销售额度统计"
        },
        bgColor: "#fff",
        labels: ["周一", "周二", "周三", "周四", "周五"],
        datasets: [
          {
            label: "销售总额",
            fillColor: "rgba(241, 49, 74, 0.5)",
            data: [234, 278]
          },
          {
            label: "线上付款",
            data: [164, 178]
          },
          {
            label: "货到付款",
            data: [144, 198]
          }
        ]
      }
    };
  },
  created() {
    this.getData();
  },
  components: {
    Schart
  },
  methods: {
    getData() {

         this.$axios
                .get(`/baby/s/getUserAttentionData`)
                .then(res => {
                    console.log("getUserAttentionData : " + JSON.stringify(res));
                    if (res.data.code === "0000") {
                        var data =  res.data.attachment;
                        this.options.datasets.push(data[0]);
                    }
                })
                .catch(err => {
                    console.log("获取用户关注数据");
                });
    //   setTimeout(() => {
    //     const data = [
    //       {
    //         label: "家电",
    //         fillColor: "rgba(241, 49, 74, 0.5)",
    //         data: [234, 278, 270, 190, 230]
    //       },
    //       {
    //         label: "百货",
    //         data: [164, 178, 190, 135, 160]
    //       },
    //       {
    //         label: "食品",
    //         data: [144, 198, 150, 235, 120]
    //       }
    //     ];
    //     this.options.datasets = data;
    //   }, 1000);
    }
  }
};
</script>
<style>
.wrapper {
  width: 500px;
  height: 400px;
}
</style>