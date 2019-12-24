<template>
  <div>
    <Card>
      <tables
        ref="tables"
        editable
        border
        searchable
        search-place="top"
        :loading="isloading"
        v-model="tableData"
        :columns="columns"
        @on-delete="handleDelete"
      />
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="totalNum" :current="1" show-total @on-change="changePage"></Page>
        </div>
      </div>
    </Card>
    <viewSkuModal
      :show="viewSkuModalShowflag"
      :columsTitle="skuColumsTitles"
      @changeModal="changeSkuModal"
      :columsData="skuColumsdatas"
    ></viewSkuModal>
  </div>
</template>

<script>
/* eslint-disable */
import Tables from "./components-viewtable/tables";
import { selectProductApi, getProductSkuApi } from "@/api/product";
import viewSkuModal from "./components/component-view-sku-modal";

export default {
  name: "tables_page",
  components: {
    Tables,
    viewSkuModal
  },
  data() {
    return {
      viewSkuModalShowflag: false,
      isloading: true,
      totalNum: 0,
      columns: [],
      tableData: [],
      skuColumsTitles: [],
      skuColumsdatas: []
    };
  },
  methods: {
    changeSkuModal() {
      this.skuColumsdatas = [];
      this.skuColumsTitles = [];
      this.viewSkuModalShowflag = false;
    },
    showViewSkuModal(index) {
      getProductSkuApi(index).then(res => {
        if (res.data.code == "0000") {
          var columnstemp = res.data.attachment.title;
          var dataTemp = res.data.attachment.data;
          this.getSkuColumsData(dataTemp);
          this.getSkuColumsTitle(columnstemp);
          this.viewSkuModalShowflag = true;
        }
      });
    },
    getSkuColumsData(dataTemp) {
      this.skuColumsdatas = [];
      this.skuColumsdatas = dataTemp;
    },
    getSkuColumsTitle(columnstemp) {
      this.skuColumsTitles = [];
      if (columnstemp.c1 != undefined) {
        this.fillSkuTableColumnTitle(columnstemp.c1, "d1_data");
      }
      if (columnstemp.c2 != undefined) {
        this.fillSkuTableColumnTitle(columnstemp.c2, "d2_data");
      }
      if (columnstemp.c3 != undefined) {
        this.fillSkuTableColumnTitle(columnstemp.c3, "d3_data");
      }
      this.fillSkuTableColumnTitle(columnstemp.c4, "d4");
      this.fillSkuTableColumnTitle(columnstemp.c5, "d5");
      this.fillSkuTableColumnTitle(columnstemp.c6, "d6");
      this.fillSkuTableColumnTitle(columnstemp.c7, "d7");
    },
    fillSkuTableColumnTitle(name, key) {
      var obj = {};

      obj = {
        title: name,
        key: key,
        width: "150",
        sortable: true,
        editable: true
      };

      this.skuColumsTitles.push(obj);
    },

    handleDelete(params) {
      console.log(params);
    },
    changePage(val) {
      console.log("val: " + val);
      this.getTableDataByPage(val);
    },
    exportExcel() {
      this.$refs.tables.exportCsv({
        filename: `table-${new Date().valueOf()}.csv`
      });
    },
    getTableDataByPage(pageIndex) {
      this.isloading = true;
      this.tableData = [];
      var obj = {};
      obj.page = pageIndex;
      obj.pageSize = 10;
      selectProductApi(obj).then(res => {
        this.isloading = false;
        console.log("res.code: " + res.data.code);
        if (res.data.code == "0000") {
          var tableDataTemp = res.data.attachment.result;
          for (var i = 0; i < tableDataTemp.length; i++) {
            var obj = {};
            var skuType = 0;
            if (tableDataTemp[i].skuid != "") {
              skuType = 1;
            }
            obj.name = tableDataTemp[i].name;
            obj.productType = tableDataTemp[i].categoryid;
            obj.productPrice = tableDataTemp[i].price;
            obj.vipPrice = tableDataTemp[i].promotionprice;
            obj.totalInventory = tableDataTemp[i].totalnumber;
            obj.residueInventory = tableDataTemp[i].residuenumber;
            obj.skuType = skuType;
            obj.productStatus = tableDataTemp[i].status;
            obj.createTime = tableDataTemp[i].itime;
            obj.productdes = tableDataTemp[i].description;
            obj.id = tableDataTemp[i].id;
            this.tableData.push(obj);
          }
          this.totalNum = res.data.attachment.count;
        }

        // this.tableData = res.data;
      });
    }
  },
  mounted() {
    let that = this;
    var templateColims = [
      {
        title: "名称",
        key: "name",
        width: "150",
        fixed: "left",
        sortable: true,
        editable: true
      },
      {
        title: "类型",
        key: "productType",
        width: "150",
        render: (h, params) => {
          const row = params.row;
          const colorArr = [
            "primary",
            "success",
            "error",
            "warning",
            "magenta",
            "red",
            "lime",
            "blue"
          ];
          const type =
            row.productType === 1
              ? "纸尿片"
              : row.productType === 2
              ? "奶粉"
              : row.productType === 3
              ? "奶壶"
              : row.productType === 4
              ? "宝妈用品"
              : row.productType === 5
              ? "宝宝玩具"
              : row.productType === 6
              ? "宝宝衣物"
              : row.productType === 7
              ? "宝宝辅食"
              : "其他";
          return h(
            "Tag",
            {
              props: {
                type: "dot",
                color: "success"
              },
              style: { width: "6.1rem" }
            },
            type
          );
        }
      },
      {
        title: "状态",
        key: "productStatus",
        width: "150",
        render: (h, params) => {
          const row = params.row;
          const colorArr =
            row.productStatus === 1
              ? "success"
              : row.productStatus === 2
              ? "error"
              : "blue";

          const type =
            row.productStatus === 1
              ? "已上架"
              : row.productStatus === 2
              ? "已下架"
              : "初始添加";
          return h(
            "Tag",
            {
              props: {
                color: colorArr
              }
            },
            type
          );
        }
      },
      {
        title: "原价",
        key: "productPrice",
        editable: true,
        sortable: true,
        width: "150"
      },
      {
        title: "优惠价",
        key: "vipPrice",
        editable: true,
        sortable: true,
        width: "150"
      },
      {
        title: "总库存",
        key: "totalInventory",
        sortable: true,
        width: "150"
      },
      {
        title: "剩余库存",
        key: "residueInventory",
        width: "150",
        render: (h, params) => {
          const row = params.row;
          const color =
            row.residueInventory <= 10
              ? "error"
              : row.status <= 20 && row.status > 10
              ? "warning"
              : "success";
          const text =
            row.residueInventory <= 10
              ? "库存不足: " + row.residueInventory
              : row.status <= 20 && row.status > 10
              ? "库存紧张: " + row.residueInventory
              : "库存充足：" + row.residueInventory;

          return h(
            "Tag",
            {
              props: {
                type: "border",
                color: color
              }
            },
            text
          );
        }
      },
      {
        title: "商品规格",
        key: "skuType",
        width: "150",
        render: (h, params) => {
          const row = params.row;
          const color = row.skuType === 0 ? "error" : "dashed";
          const text = row.skuType === 0 ? "无规格" : "点击查看";
          const disabled = row.skuType === 0 ? true : false;

          return h(
            "Button",
            {
              props: {
                type: color,
                disabled: disabled
              },
              on: {
                click: () => {
                  console.log("params: " + JSON.stringify(params));
                  that.showViewSkuModal(params.row.id);
                }
              }
            },
            text
          );
        }
      },
      {
        title: "入库时间",
        key: "createTime",
        width: "150",
        render: (h, params) => {
          const row = params.row;
          const tempdate = that.$tools.formatDate(
            row.createTime,
            "YY-MM-DD HH:mm:ss"
          );
          return h("Span", {}, tempdate);
        }
      },
      {
        title: "描述",
        key: "productdes",
        ellipsis: true,
        editable: true,
        width: "150"
      },
      { title: "图片", key: "imgs", editable: true, width: "150" },
      {
        title: "操作",
        key: "handle",
        width: "150",
        align: "center",
        button: [
          (h, params, vm) => {
            const row = params.row;
            const type =
              row.productStatus === 1
                ? "下架"
                : row.productStatus === 0
                ? "上架"
                : "上架";
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "dashed",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      that.show(params.index);
                    }
                  }
                },
                type
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        ]
      }
    ];
    this.columns = templateColims;
    this.getTableDataByPage(1);
  }
};
</script>

<style>
</style>
