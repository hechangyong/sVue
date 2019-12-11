<template>
  <Modal v-model="showflag" title=" 添加规格" @on-ok="ok" @on-cancel="cancel">
    <div style="padding: 10px;background: #f8f8f9">
      <Card title="添加规格" icon="ios-options" :padding="0" shadow style="width: 100%;">
        <div class="centerClass">
          <div class="filedClassDiv">
            <span class="spanclass">规格名称:</span>
            <Input placeholder="规格名称：颜色" style="width: auto" />
          </div>
          <div class="filedClassDiv">
            <span class="spanclass">添加可选值:</span>
            <Input
              v-model="currentSkuValue"
              placeholder="请输入可选属性值"
              style="width: auto"
            />
            <Button
              style="margin-left: 1rem;"
              icon="md-add-circle"
              clearable
              @click="addskuValue"
              type="primary"
            ></Button>
          </div>
          <div class="filedClassDiv">
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
        return "创建活动产品";
      }
    }
  },
  data() {
    return {
      currentSkuValue: "",
      skuValueArr: [],
      showflag: false,
      randomColor: "red"
    };
  },
  watch: {
    show(val) {
      console.log("show value: " + val);
      if (val) {
        this.showflag = true;
      } else {
        this.showflag = false;
      }
    },
    showflag(val) {
      if (!val) {
        //  console.log()
        this.$emit("changeModal", false);
      }
    }
  },
  methods: {
    addskuValue(value) {
      this.changeRandomColor();
      this.skuValueArr.push({
        name: this.currentSkuValue,
        randomColor: this.randomColor
      });
    },
    changeRandomColor() {
      var colors = [
        "primary",
        "success",
        "warning",
        "error",
        "blue",
        "green",
        "red",
        "yellow",
        "pink",
        "magenta",
        "volcano",
        "orange",
        "gold",
        "lime",
        "cyan",
        "geekblue"
      ];
      var num = Math.random();
      num = Math.ceil(num * 10);
      var ra = Math.floor(Math.random() * 16);
      console.log("num: " + num);
      console.log("ra: " + ra);
      this.randomColor = colors[ra];
    }, 
    handleClose2(event, name) {
      for (var i = 0; i < this.skuValueArr.length; i++) {
        if (this.skuValueArr[i].name == name) {
          this.skuValueArr.splice(i, 1);
          break;
        }
      }
    },
    ok() {
      // this.$Message.info("Clicked ok");
    },
    cancel() {
      this.showflag = false;
      this.skuValueArr=[];
      this.currentSkuValue = "";
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
  margin-left: 5rem;
}
.spanclass {
  margin-right: 15px;
  font-family: auto;
  width: 100px;
  float: left;
}
</style>