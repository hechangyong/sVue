<template>
  <div style="margin-left: 115px; width: 60%;" v-if="showflag">
    <Table border :columns="currentcolumnsDefault" :data="data6"></Table>
  </div>
</template>
<script>

import Uploads from './uploadstemp.vue'
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
      uploadList:[],
      currentcolumnsDefault: [],
      columns7: [
        {
          title: "商品库存",
          key: "inventory",
          render: (h, params) => {
            return h("div", [
              h("Input", {
                props: {
                  value: params.row.inventory
                },
                on: {
                  "on-change"(event) {
                    console.log("event:" + JSON.stringify(event.target._value));
                    params.row.name = event.target.value;
                  }
                }
              })
            ]);
          }
        },
        {
          title: "销售价格",
          key: "saleFee",
          render: (h, params) => {
            return h("div", [
              h("Input", {
                props: {
                  value: params.row.saleFee
                },
                on: {
                  "on-change"(event) {
                    params.row.name = event.target.value;
                  }
                }
              })
            ]);
          }
        },
        {
          title: "库存预警值",
          key: "alarmNumber",
          render: (h, params) => {
            return h("div", [
              h("Input", {
                props: {
                  value: params.row.alarmNumber
                },
                on: {
                  "change"(event) {
                    console.log("event:" + JSON.stringify(event.target._value));
                    params.row.name = event.target.value;
                  }
                }
              })
            ]);
          }
        },
        // {
        //   title: "上传图片",
        //   key: "action",
        //   width: 150,
        //   align: "center",
        //   render: (h, params) => {
        //     return h("div", [
        //       h(
        //         "Upload",
        //         {
        //           props: {
        //             action: "http://babyroom.hecy.top/babyroom/file/uploadFile"
        //           },
        //           style: {
        //             marginRight: "5px"
        //           },
        //           on: {
        //             click: () => {
        //               console.log("params: " + JSON.stringify(params));
        //               this.show(params.index);
        //             },
        //             "on-success"(response, file, fileList) {
        //               console.log(
        //                 "table-mo:" +
        //                   file.name +
        //                   "======" +
        //                   JSON.stringify(response)
        //               );
        //             }
        //           }
        //         },
        //         [
        //           h(
        //             "Button",
        //             {
        //               props: {
        //                 icon: "ios-cloud-upload-outline"
        //               }
        //             },
        //             "上传图片"
        //           )
        //         ]
        //       )
        //     ]);
        //   }
        // },
        {
          title: '上传升级文件',
          key: 'action',
          // width: 230,
          align: 'center',
          render: (h, params) => {
            return h(Uploads, {
              on: {
                'addUploads': (e) => {
                  console.log('成功获到值', e)
                  console.log(this.uploadList.push(e))
                  //uploadList
                },
                'cancelUploadsFile': (e) => {
                  console.log('删除列表', e)
                  let index = this.uploadList.indexOf(e);
                  console.log('index====', index)
                  this.uploadList.splice(index, 1)
                }
              }
            }, this.file);
          }
        }
      ],
      data6: []
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
  methods: {
    handleEdit(row, index) {
      this.editName = row.name;
      this.editAge = row.age;
      this.editAddress = row.address;
      this.editBirthday = row.birthday;
      this.editIndex = index;
    },
    handleSave(index) {
      this.data[index].name = this.editName;
      this.data[index].age = this.editAge;
      this.data[index].birthday = this.editBirthday;
      this.data[index].address = this.editAddress;
      this.editIndex = -1;
    },
    getBirthday(birthday) {
      const date = new Date(parseInt(birthday));
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year}-${month}-${day}`;
    }
  },components: {
    Uploads
  }
};
</script>