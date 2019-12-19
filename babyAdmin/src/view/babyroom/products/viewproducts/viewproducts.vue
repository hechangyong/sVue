<template>
  <div>
    <Card>
      <tables
        ref="tables"
        editable
        border 
        searchable
         width="1300"
         search-place="top"
        :loading="isloading"
        v-model="tableData"
        :columns="columns"
        @on-delete="handleDelete"
      />
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>
      <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="100" :current="1" show-total @on-change="changePage"></Page>
      </div>
    </div>
    </Card>
    
  </div>
</template>

<script>
import Tables from "./tables.vue";
import { getTableData } from "@/api/data";
export default {
  name: "tables_page",
  components: {
    Tables
  },
  data() {
    return {
      isloading:true,
      columns: [
        { title: "名称", key: "name", width:"130", fixed: 'left', sortable: true },
        { title: "类型", key: "productType", width:"130" },
        { title: "原价", key: "productPrice", sortable: true , width:"130"},
        { title: "原价", key: "productPrice", sortable: true, width:"130" },
        { title: "原价", key: "productPrice", sortable: true , width:"130"},
        { title: "原价", key: "productPrice", sortable: true , width:"130"},
        { title: "原价", key: "productPrice", sortable: true , width:"130"},
        { title: "原价", key: "productPrice", sortable: true, width:"130" },
        { title: "原价", key: "productPrice", sortable: true , width:"130"},
        { title: "原价", key: "productPrice", sortable: true , width:"130"},
        { title: "原价", key: "productPrice", sortable: true , width:"130"},
        { title: "原价", key: "productPrice", sortable: true , width:"130"},
        { title: "优惠价", key: "vipPrice", sortable: true , width:"130"},
        { title: "总库存", key: "totalInventory", sortable: true , width:"130"},
        {
          title: "剩余库存",
          key: "status",
          width:"130",
          render: (h, params) => {
            const row = params.row;
            const color =
              row.status === 1
                ? "error"
                : row.status === 2
                ? "warning"
                : "success";
            const text =
              row.status === 1
                ? "库存: 10" 
                : row.status === 2
                ? "库存: 100"
                : "库存: 200";

            return h(
              "Tag",
              {
                props: { 
                  type:"border",
                  color: color
                }
              },
              text
            );
          }
        },
        // { title: "剩余库存", key: "email", editable: true, sortable: true },
        { title: "Create-Time", key: "createTime" , width:"100"},
        {
          title: "Handle",
          key: "handle",
           width:"130",
           button: [
            (h, params, vm) => {
              return h(
                "Poptip",
                {
                  props: {
                    confirm: true,
                    title: "你确定要删除吗?"
                  },
                  on: {
                    "on-ok": () => {
                      vm.$emit("on-delete", params);
                      vm.$emit(
                        "input",
                        params.tableData.filter(
                          (item, index) => index !== params.row.initRowIndex
                        )
                      );
                    }
                  }
                },
                [h("Button", "自定义删除")]
              );
            }
          ]
        }
      ],
      tableData: []
    };
  },
  methods: {
    handleDelete(params) {
      console.log(params);
    },
    exportExcel() {
      this.$refs.tables.exportCsv({
        filename: `table-${new Date().valueOf()}.csv`
      });
    }
  },
  mounted() {
    getTableData().then(res => {
      this.isloading = false;
      this.tableData = res.data;
    });
  }
};
</script>

<style>
</style>
