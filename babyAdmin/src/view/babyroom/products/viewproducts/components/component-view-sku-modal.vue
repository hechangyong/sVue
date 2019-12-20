<template>
  <Modal v-model="showflag" title="查看商品规格" @on-ok="ok" @on-cancel="cancel">
    <div style="padding: 10px;background: #f8f8f9">
      <Table border :columns="currentcolumnsDefault" :data="data6"></Table>
      <Button class="butclose" @click="changeEditflag">编辑</Button>
      <Button type="primary" class="butmakesure" @click="makeSureData">确定</Button>
    </div>
  </Modal>
</template>
<script>
/* eslint-disable */
export default {
  name: "viewSkuModal",
  props: {
    show: {
      type: Boolean,
      default() {
        return false;
      }
    },
    title: {
      type: String,
      default() {
        return "添加规格";
      }
    }
  },
  data() {
    return {
      buttonSize: "small",
      typedisabled: false,
      currentSkuName: "",
      currentSkuValue: "",
      skuValueArr: [],
      showflag: false,
      randomColor: "red",
      currentcolumnsDefault: [],
      data6: []
    };
  },
  watch: {
    show(val) {
      if (val) {
        this.showflag = true;
      } else {
        this.showflag = false;
      }
    },
    showflag(val) {
      if (!val) {
        this.$emit("changeModal", false);
      }
    }
  },
  methods: {
    changeEditflag() {},
    makeSureData() {},
    addskuValue() {
      var obj = this.dataCheck();
      if (obj.code != 200) {
        this.$Message.error(obj.errormsg);
        return;
      }
      this.randomColor = this.$tools.changeRandomColor(); //this.changeRandomColor();
      this.skuValueArr.push({
        name: this.currentSkuValue,
        randomColor: this.randomColor
      });
      this.currentSkuValue = "";
      this.typedisabled = true;
    },
    dataCheck() {
      var resultCode = 200;
      var errormsg = "";
      if (this.currentSkuValue == "") {
        // this.$Message.error('请输入正确的规格值！！！');
        resultCode = 500;
        errormsg = " 规格值不能为空！！！";
      }
      for (var i = 0; i < this.skuValueArr.length; i++) {
        if (this.skuValueArr[i].name == this.currentSkuValue) {
          resultCode = 500;
          errormsg = " 【" + this.currentSkuValue + "】值已存在！！！";
        }
      }
      return { code: resultCode, errormsg: errormsg };
    },
    handleClose2(event, name) {
      for (var i = 0; i < this.skuValueArr.length; i++) {
        if (this.skuValueArr[i].name == name) {
          this.skuValueArr.splice(i, 1);
          break;
        }
      }
      if (this.skuValueArr.length <= 0) {
        this.typedisabled = false;
      }
    },
    ok() {
      this.typedisabled = false;

      this.$emit("getSkuType", this.currentSkuName, this.skuValueArr);
      this.skuValueArr = [];
      this.currentSkuValue = "";
      this.currentSkuName = "";
    },
    cancel() {
      this.showflag = false;
      this.skuValueArr = [];
      this.currentSkuValue = "";
      this.currentSkuName = "";
    }
  }
};
</script>


<style>
.filedClassDiv {
  margin-top: 20px;
}
.babyClass {
  background-color: white;
}
.centerClass {
  height: 15rem;
  margin-left: 3rem;
}
.spanclass {
  margin-right: 15px;
  font-family: auto;
  width: 100px;
  float: left;
}
</style>