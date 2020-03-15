<template>
  <div>
    <div class="banner-agent">
      <van-button class="buttonclass-next-agent" @click="beAgent" round type="info">成为代理人</van-button>
    </div>
  </div>
</template>
<script>
import { Button } from "vant";
import axios from "axios";
export default {
  data() {
    return {};
  },
  methods: {
    beAgent() {
      axios
        .post(`/baby/a/beAgent`)
        .then(res => {
          if (res.data.code === "0000") {
            this.$router.push({
              name: "agentPage" 
            });
          } else {
            console.log("成为代理人" + res.data.code);
          }
        })
        .catch(err => {
          console.log("成为代理人");
        });
    }
  },
  components: {
    [Button.name]: Button
  }
};
</script>
<style scoped>
.buttonclass-next-agent {
  /* border: solid 1px #e0eefc;
    background-color: #cad8e6;*/
  margin-top: 11.97rem;
  width: 90%;
  margin-left: 20px;
  border-radius: 700px;
  font-size: 25px;
  font-weight: 666;
  background-color: #ec0e0e;
  border: 1px solid #fcee00;
  padding-bottom: 10px;
}
.banner-agent {
  padding: 2.8rem 10%;
  background: url("../../../../assets/images/agent/agent_explain.png") no-repeat,
    #fff;
  background-size: 100%;
}
</style>