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
            <Input placeholder="请输入可选属性值" style="width: auto" />
            <Button
              style="margin-left: 1rem;"
              icon="md-add-circle"
              clearable
              @click="addskuValue"
              @change="onchange"
              type="primary"
            ></Button>
          </div>
          <div class="filedClassDiv">
             <Tag
              v-for="item in count"
              type="border"
              :key="item"
              :name="item"
              closable
              :color="randomColor"
              @on-close="handleClose2"
            >{{ item }}</Tag>
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
      count: [],
      showflag: false
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
      console.log();
       this.count.push(value);
    },
    randomColor(){
      let r, g, b;
				r = Math.floor(Math.random() * 256);
				g = Math.floor(Math.random() * 256);
				b = Math.floor(Math.random() * 256);
				return "rgb(" +r + ',' +g+ ',' +b+ ")"; 
    },
    onchange(value){
      console.log("value:" + value);
    },
    handleClose2(event, name) {
      console.log("name: " + name);
      const index = this.count.indexOf(name);
      this.count.splice(index, 1);
    },
    ok() {
      this.$Message.info("Clicked ok");
    },
    cancel() {
      this.$Message.info("Clicked cancel");
      this.showflag = false;
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