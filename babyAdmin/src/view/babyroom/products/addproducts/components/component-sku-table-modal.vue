<template>
  <div style="margin-left: 115px; width: 60%;background-color: aliceblue;" v-if="showflag">
    <Table border :columns="currentcolumnsDefault" :data="data6"></Table>
    <Button class="butclose" @click="changeEditflag">编辑</Button>
    <Button type="primary" class="butmakesure" @click="makeSureData">确定</Button>
  </div>
</template>
<script>
/* eslint-disable */
import Uploads from "./component-table-upload.vue";
export default {
  name: "skuTableModal",
  props: {
    showtable: {
      type: Boolean,
      default() {
        return false;
      }
    },
    columnsDefault: {
      type: Array,
      default() {
        return [];
      }
    },
    parentTableData: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      showflag: false,
      uploadList: [],
      currentcolumnsDefault: [],
      columns7: [],
      data6: [],
      inputdisabled: false
    };
  },
  watch: {
    showtable(val) {
      console.log("table show value: " + val);
      if (val) {
        this.showflag = true;
      } else {
        this.showflag = false;
      }
    },
    columnsDefault(val) {
      this.currentcolumnsDefault = [];
      if (val != undefined && val.length > 0) {
        for (var i = 0; i < val.length; i++) {
          this.currentcolumnsDefault.push(val[i]);
        }
        for (var j = 0; j < this.columns7.length; j++) {
          this.currentcolumnsDefault.push(this.columns7[j]);
        }
      } else {
        this.showflag = false;
      }
    },
    parentTableData(val) {
      this.data6 = val;
    }
  },
  mounted() {
    let t = this;
    this.columns7.push({
      title: "商品库存",
      key: "inventory",
      render: (h, params) => {
        return h("div", [
          h("Input", {
            props: {
              value: params.row.inventory,
              disabled: t.inputdisabled
            },
            on: {
              "on-change"(event) {
                params.row.inventory = event.target.value;
                var currentRow = params.row;
                console.log("params.row:" + JSON.stringify(currentRow));

                t.handleEdit(currentRow, params.row.inventory);
              }
            }
          })
        ]);
      }
    });
    this.columns7.push({
      title: "销售价格",
      key: "saleFee",
      render: (h, params) => {
        return h("div", [
          h("Input", {
            props: {
              value: params.row.saleFee,
              disabled: t.inputdisabled
            },
            on: {
              "on-change"(event) {
                params.row.saleFee = event.target.value;
                var currentRow = params.row;

                t.handleEdit(currentRow, params.row.saleFee);
              }
            }
          })
        ]);
      }
    });
    this.columns7.push({
      title: "库存预警值",
      key: "alarmNumber",
      render: (h, params) => {
        return h("div", [
          h("Input", {
            props: {
              value: params.row.alarmNumber,
              disabled: t.inputdisabled
            },
            on: {
             "on-change"(event) {
                console.log("event:" + JSON.stringify(event.target._value));
                params.row.alarmNumber = event.target.value;
                var currentRow = params.row;
                t.handleEdit(currentRow, params.row.alarmNumber);
              }
            }
          })
        ]);
      }
    });
    this.columns7.push({
      title: "上传规格图片",
      key: "action",
      // width: 230,
      align: "center",
      render: (h, params) => {
        return h(
          Uploads,
          {
            on: {
              addUploads: e => {
                console.log("成功获到值", e);
                console.log(this.uploadList.push(e));
                //uploadList
                params.row.imgUrl = e;
                 var currentRow = params.row;
                t.handleEdit(currentRow, 0);
              },
              cancelUploadsFile: e => {
                console.log("删除列表", e);
                params.row.imgUrl = "";
                  var currentRow = params.row;
                t.handleEdit(currentRow, 0);
              }
            }
          },
          this.file
        );
      }
    });
  },
  methods: {
    makeSureData() {
      console.log("this.data6:" + JSON.stringify(this.data6));
      this.inputdisabled = true;
      this.$emit("getSkuTableData", this.data6);
    },
    changeEditflag() {
      this.inputdisabled = false;
      this.$emit("editSkuTableData", this.data6);
    },
    handleEdit(row, rowValue) {
      if (isNaN(rowValue)) {
        this.$Message.error("请输入合法的数字！");
        return;
      }
      for (var i = 0; i < this.data6.length; i++) {
        var currentRowData = this.data6[i];
        console.log("currentRowData.key_1:" + currentRowData.key_1);
        if (currentRowData.key_0 == row.key_0) {
          if (currentRowData.key_1 == undefined) {
            currentRowData.inventory = row.inventory;
            currentRowData.saleFee = row.saleFee;
            currentRowData.alarmNumber = row.alarmNumber;
            if(row.imgUrl != undefined){
               currentRowData.imgUrl = row.imgUrl;
            }
          }
          if (
            currentRowData.key_1 != undefined &&
            currentRowData.key_1 == row.key_1
          ) {
            currentRowData.inventory = row.inventory;
            currentRowData.saleFee = row.saleFee;
            currentRowData.alarmNumber = row.alarmNumber;
             if(row.imgUrl != undefined){
               currentRowData.imgUrl = row.imgUrl;
            }
          }
        }
        console.log("this.data6 :" + JSON.stringify(this.data6));
      }

      console.log("row:" + JSON.stringify(row));
    },
    handleSave(index) {
      this.data[index].name = this.editName;
      this.data[index].age = this.editAge;
      this.data[index].birthday = this.editBirthday;
      this.data[index].address = this.editAddress;
      this.editIndex = -1;
    }
  },
  components: {
    Uploads
  }
};
</script>

<style scoped>
.butmakesure {
  margin-top: 5px;
  margin-left: 10px;
}
.butclose {
  margin-top: 5px;
  margin-left: 35%;
}
</style>