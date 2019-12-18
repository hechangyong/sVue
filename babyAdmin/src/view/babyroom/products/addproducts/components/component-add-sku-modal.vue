<template>
  <Modal v-model="showflag" title=" 添加规格" @on-ok="ok" @on-cancel="cancel">
    <div style="padding: 10px;background: #f8f8f9">
      <Card title="添加规格" icon="ios-options" :padding="0" shadow style="width: 100%;">
        <div class="centerClass">
          <div class="filedClassDiv">
            <span class="spanclass">规格名称:</span>
            <Input
              :disabled="typedisabled"
              placeholder="规格名称：颜色"
              style="width: 40%"
              v-model="currentSkuName"
            />
          </div>
          <div class="filedClassDiv">
            <span class="spanclass">添加可选值:</span>
            <Input v-model="currentSkuValue" placeholder="请输入可选属性值" style="width: 40%" />
            <Button
              style="margin-left: 1rem;"
              icon="md-add-circle"
              clearable
              :size="buttonSize"
              @click="addskuValue"
              type="dashed"
            >添加</Button>
          </div>
          <div class="filedClassDiv">
             <span class="spanclass">已添加属性值:</span>
            <Tag
              v-for="item in skuValueArr"
              type="border"
              :key="item.name"
              :name="item.name"
              closable
              :color="item.randomColor"
              @on-close="handleClose2"
            >{{ item.name }}</Tag>
          </div>
        </div>
      </Card>
    </div>
  </Modal>
</template>
<script>
/* eslint-disable */
export default {
  name: "addSkuModal",
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
      randomColor: "red"
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