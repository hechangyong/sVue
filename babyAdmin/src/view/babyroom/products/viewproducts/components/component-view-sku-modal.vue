<template>
  <Modal v-model="showflag" class="modalClasa" title="查看商品规格" @on-ok="ok" @on-cancel="cancel">
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
import ViewUploads from "./component-table-upload";
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
      isloading: true,
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
      let that = this;
      this.currentcolumnsDefault = [];
      console.log("columsTitle: " + JSON.stringify(val));
      if (val != undefined && val.length > 0) {
        var obj = {};

        for (var i = 0; i < val.length; i++) {
          if (val[i].key == "d7") {
            obj = {
              title: "图片",
              key: "action",
              width: "150",
              align: "center",
              render: (h, params) => {
                console.log("params.row.d7: " + JSON.stringify(params.row.d7));
                return h(ViewUploads, {
                  props: {
                    imgs: params.row.d7
                  }
                });
              }
            };
            this.currentcolumnsDefault.push(obj);
          } else {
            this.currentcolumnsDefault.push(val[i]);
          }
        }
      }
    },
    columsData(val) {
      this.data6 = [];
      if (val != undefined && val.length > 0) {
        this.data6 = val;
        this.isloading = false;
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
    Tables,
    ViewUploads
  }
};
</script>


<style scoped lang="less">
.modalClasa {
  width: 700px !important;
}

/deep/ .ivu-modal {
  width: 50% !important;
  /* width: auto; */
  margin: 0 auto;
  position: relative;
  outline: none;
  top: 100px;
}
</style>
 