<template>
  <div>
    <div v-if="searchable && searchPlace === 'top'" class="search-con search-con-top">
      <Select v-model="searchKey" class="search-col">
        <Option
          v-for="item in columns"
          v-if="selectOptionValue(item.key)"
          :value="item.key"
          :key="`search-col-${item.key}`"
        >{{ item.title }}</Option>
      </Select>
      <Input
        v-if="showsearchInput"
        @on-change="handleClear"
        clearable
        placeholder="输入关键字搜索"
        class="search-input"
        v-model="searchValue"
      />
      <Select v-if="showproductTypeSelect" class="search-col-2" v-model="selectProductModel">
        <Option v-for="item in productType" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <Select
        v-if="showproductStatusSelect"
        class="search-col-2"
        v-model="productStatusSelectModel"
      >
        <Option v-for="item in productstatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <Button @click="handleSearch" class="search-btn" type="primary">
        <Icon type="search" />&nbsp;&nbsp;搜索
      </Button>
    </div>
    <Table
      ref="tablesMain"
      :data="insideTableData"
      :columns="insideColumns"
      :stripe="stripe"
      :border="border"
      :show-header="showHeader"
      :width="width"
      :height="height"
      :loading="loading"
      :disabled-hover="disabledHover"
      :highlight-row="highlightRow"
      :row-class-name="rowClassName"
      :size="size"
      :no-data-text="noDataText"
      :no-filtered-data-text="noFilteredDataText"
      @on-current-change="onCurrentChange"
      @on-select="onSelect"
      @on-select-cancel="onSelectCancel"
      @on-select-all="onSelectAll"
      @on-selection-change="onSelectionChange"
      @on-sort-change="onSortChange"
      @on-filter-change="onFilterChange"
      @on-row-click="onRowClick"
      @on-row-dblclick="onRowDblclick"
      @on-expand="onExpand"
    >
      <slot name="header" slot="header"></slot>
      <slot name="footer" slot="footer"></slot>
      <slot name="loading" slot="loading"></slot>
    </Table>
    <div v-if="searchable && searchPlace === 'bottom'" class="search-con search-con-top">
      <Select v-model="searchKey" class="search-col">
        <Option
          v-for="item in columns"
          v-if="item.key !== 'handle'"
          :value="item.key"
          :key="`search-col-${item.key}`"
        >{{ item.title }}</Option>
      </Select>
      <Input placeholder="输入关键字搜索" class="search-input" v-model="searchValue" />
      <Button class="search-btn" type="primary">
        <Icon type="search" />&nbsp;&nbsp;搜索
      </Button>
    </div>
    <a id="hrefToExportTable" style="display: none;width: 0px;height: 0px;"></a>
  </div>
</template>

<script>
/* eslint-disable */
import { selectProductApi } from "@/api/product";
import TablesEdit from "./edit.vue";
import handleBtns from "./handle-btns";
import "./index.less";
import { kStringMaxLength } from "buffer";
export default {
  name: "Tables",
  props: {
    value: {
      type: Array,
      default() {
        return [];
      }
    },
    columns: {
      type: Array,
      default() {
        return [];
      }
    },
    size: String,
    width: {
      type: [Number, String]
    },
    height: {
      type: [Number, String]
    },
    stripe: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    highlightRow: {
      type: Boolean,
      default: false
    },
    rowClassName: {
      type: Function,
      default() {
        return "";
      }
    },
    context: {
      type: Object
    },
    noDataText: {
      type: String
    },
    noFilteredDataText: {
      type: String
    },
    disabledHover: {
      type: Boolean
    },
    loading: {
      type: Boolean,
      default: false
    },
    /**
     * @description 全局设置是否可编辑
     */
    editable: {
      type: Boolean,
      default: false
    },
    /**
     * @description 是否可搜索
     */
    searchable: {
      type: Boolean,
      default: false
    },
    /**
     * @description 搜索控件所在位置，'top' / 'bottom'
     */
    searchPlace: {
      type: String,
      default: "top"
    }
  },
  /**
   * Events
   * @on-start-edit 返回值 {Object} ：同iview中render函数中的params对象 { row, index, column }
   * @on-cancel-edit 返回值 {Object} 同上
   * @on-save-edit 返回值 {Object} ：除上面三个参数外，还有一个value: 修改后的数据
   */
  data() {
    return {
      insideColumns: [],
      insideTableData: [],
      edittingCellId: "",
      edittingText: "",
      searchValue: "",
      searchKey: "",
      showsearchInput: true,
      showproductStatusSelect: false,
      productStatusSelectModel: "",
      productstatus: [
        {
          value: "0",
          label: "上架"
        },
        {
          value: "1",
          label: "下架"
        },
        {
          value: "2",
          label: "初始添加"
        }
      ],
      selectProductModel: "",
      productType: [
        {
          value: "1",
          label: "纸尿片"
        },
        {
          value: "2",
          label: "奶粉"
        },
        {
          value: "3",
          label: "奶壶"
        },
        {
          value: "4",
          label: "宝妈用品"
        },
        {
          value: "5",
          label: "宝宝玩具"
        },
        {
          value: "6",
          label: "宝宝衣物"
        },
        {
          value: "7",
          label: "宝宝辅食"
        },
        {
          value: "8",
          label: "其他"
        }
      ],
      showproductTypeSelect: false
    };
  },
  methods: {
    selectOptionValue(key) {
      if (key == "name") {
        return true;
      }
      if (key == "productType") {
        return true;
      }
      if (key == "productStatus") {
        return true;
      }
      return false;
    },
    suportEdit(item, index) {
      item.render = (h, params) => {
        return h(TablesEdit, {
          props: {
            params: params,
            value: this.insideTableData[params.index][params.column.key],
            edittingCellId: this.edittingCellId,
            editable: this.editable
          },
          on: {
            input: val => {
              this.edittingText = val;
            },
            "on-start-edit": params => {
              this.edittingText = this.value[params.row.initRowIndex][
                params.column.key
              ];
              this.edittingCellId = `editting-${params.index}-${params.column.key}`;
              this.$emit("on-start-edit", params);
            },
            "on-cancel-edit": params => {
              this.edittingCellId = "";
              this.$emit("on-cancel-edit", params);
            },
            "on-save-edit": params => {
              this.value[params.row.initRowIndex][
                params.column.key
              ] = this.edittingText;
              this.$emit("input", this.value);
              this.$emit(
                "on-save-edit",
                Object.assign(params, { value: this.edittingText })
              );
              this.edittingCellId = "";
            }
          }
        });
      };
      return item;
    },
    surportHandle(item) {
      let options = item.options || [];
      let insideBtns = [];
      options.forEach(item => {
        if (handleBtns[item]) insideBtns.push(handleBtns[item]);
      });
      let btns = item.button ? [].concat(insideBtns, item.button) : insideBtns;
      item.render = (h, params) => {
        params.tableData = this.value;
        return h("div", btns.map(item => item(h, params, this)));
      };
      return item;
    },
    handleColumns(columns) {
      this.insideColumns = columns.map((item, index) => {
        let res = item;
        if (res.editable) res = this.suportEdit(res, index);
        if (res.key === "handle") res = this.surportHandle(res);
        return res;
      });
    },
    setDefaultSearchKey() {
      // this.searchKey =
      //   this.columns[0].key !== "handle"
      //     ? this.columns[0].key
      //     : this.columns.length > 1
      //     ? this.columns[1].key
      //     : "";
    },
    handleClear(e) {
      if (e.target.value === "") this.insideTableData = this.value;
    },
    handleSearch() {
      // console.log("this.searchKey: " + this.searchKey);
      
      // this.isloading = true;
      // this.tableData = [];
      // var obj = {};
      // obj.page = 1;
      // obj.pageSize = 10;
      // if (this.searchKey == "name") {
      //   obj.productName = this.searchValue;
      //   console.log("this.searchKey: " + this.searchValue);
      // }
      // if (this.searchKey == "productType") {
      //   obj.productTypeId = this.selectProductModel;
      //   console.log("this.selectProductModel: " + this.selectProductModel);
      // }
      // if (this.searchKey == "productStatus") {
      //   obj.productStatus = this.productStatusSelectModel;
      //   console.log(
      //     "this.productStatusSelectModel: " + this.productStatusSelectModel
      //   );
      // }
      // this.insideTableData = [];
      // selectProductApi(obj)
      //   .then(res => {
      //     this.isloading = false;
      //     console.log("selectProductApi res.code: " + res.data.code);
      //     if (res.data.code == "0000") {
      //       this.insideTableData = [];
      //       var tableDataTemp = res.data.attachment.result;
      //       for (var i = 0; i < tableDataTemp.length; i++) {
      //         var obj = {};
      //         var skuType = 0;
      //         if (tableDataTemp[i].skuid != "") {
      //           skuType = 1;
      //         }
      //         obj.name = tableDataTemp[i].name;
      //         obj.productType = tableDataTemp[i].categoryid;
      //         obj.productPrice = tableDataTemp[i].price;
      //         obj.vipPrice = tableDataTemp[i].promotionprice;
      //         obj.totalInventory = tableDataTemp[i].totalnumber;
      //         obj.residueInventory = tableDataTemp[i].residuenumber;
      //         obj.skuType = skuType;
      //         obj.productStatus = tableDataTemp[i].status;
      //         obj.createTime = tableDataTemp[i].itime;
      //         obj.productdes = tableDataTemp[i].description;
      //         obj.id = tableDataTemp[i].id;
      //         this.insideTableData.push(obj);
      //       }
      //      }

      //    })
      //   .catch(error => {
      //     console.log("error: " + error);
      //   });

      // if (this.searchKey != undefined && this.searchKey != "") {
      //   this.insideTableData = this.value.filter(
      //     item => item[this.searchKey].indexOf(this.searchValue) > -1
      //   );
      // }
    },
    handleTableData() {
      this.insideTableData = this.value.map((item, index) => {
        let res = item;
        res.initRowIndex = index;
        return res;
      });
    },
    exportCsv(params) {
      this.$refs.tablesMain.exportCsv(params);
    },
    clearCurrentRow() {
      this.$refs.talbesMain.clearCurrentRow();
    },
    onCurrentChange(currentRow, oldCurrentRow) {
      this.$emit("on-current-change", currentRow, oldCurrentRow);
    },
    onSelect(selection, row) {
      this.$emit("on-select", selection, row);
    },
    onSelectCancel(selection, row) {
      this.$emit("on-select-cancel", selection, row);
    },
    onSelectAll(selection) {
      this.$emit("on-select-all", selection);
    },
    onSelectionChange(selection) {
      this.$emit("on-selection-change", selection);
    },
    onSortChange(column, key, order) {
      this.$emit("on-sort-change", column, key, order);
    },
    onFilterChange(row) {
      this.$emit("on-filter-change", row);
    },
    onRowClick(row, index) {
      this.$emit("on-row-click", row, index);
    },
    onRowDblclick(row, index) {
      this.$emit("on-row-dblclick", row, index);
    },
    onExpand(row, status) {
      this.$emit("on-expand", row, status);
    }
  },
  watch: {
    columns(columns) {
      this.handleColumns(columns);
      this.setDefaultSearchKey();
    },
    value(val) {
      console.log("tables val: " + JSON.stringify(val));
      this.handleTableData();
      if (this.searchable) this.handleSearch();
    },
    searchKey(val) {
      console.log("searchKey:" + val);
      if (val === "productType") {
        this.showproductTypeSelect = true;
        this.showsearchInput = false;
        this.showproductStatusSelect = false;
      } else if (val === "productStatus") {
        this.showproductStatusSelect = true;
        this.showproductTypeSelect = false;
        this.showsearchInput = false;
      } else {
        this.showproductStatusSelect = false;
        this.showproductTypeSelect = false;
        this.showsearchInput = true;
      }
    }
  },
  mounted() {
    this.handleColumns(this.columns);
    this.setDefaultSearchKey();
    this.handleTableData();
  }
};
</script>
