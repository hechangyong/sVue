<template>
  <Modal v-model="showflag" title="查看商品规格" @on-ok="ok" @on-cancel="cancel">
    <div style="padding: 10px;background: #f8f8f9">
      <!-- <Table border :columns="currentcolumnsDefault" :data="data6"></Table> -->

      <tables
        ref="tables1"
        editable
        border
        :loading="isloading"
        :searchable="false"
        v-model="data6"
        :columns="currentcolumnsDefault"
      />
      <!-- <Button class="butclose" @click="changeEditflag">编辑</Button> -->
      <!-- <Button type="primary" class="butmakesure" @click="makeSureData">确定</Button> -->
    </div>
  </Modal>
</template>
<script>
/* eslint-disable */
import Tables from "./skuTable/tables";
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
    },
    columsTitle: {
      type: Array,
      default() {
        return [];
      }
    },
    columsData: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      isloading:true,
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
    },
    columsTitle(val) {
      this.currentcolumnsDefault = [];

      if (val!= undefined && val.length > 0) {
        this.currentcolumnsDefault = val;
        console.log(
          "columsTitle: " + JSON.stringify(this.currentcolumnsDefault)
        );
      }
    },
    columsData(val) {
      this.data6 = [];
      if (val!= undefined && val.length > 0) {
        this.data6 = val;
        this.isloading = false;
        console.log("columsData: " + JSON.stringify(this.data6));
      }
    }
  },
  methods: {
    changeEditflag() {},
    makeSureData() {},

    ok() {
      this.currentcolumnsDefault = [];
      this.showflag = false;
      this.data6 = [];
    },
    cancel() {
      this.currentcolumnsDefault = [];
      this.showflag = false;
      this.data6 = [];
    }
  },
  components: {
    Tables
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