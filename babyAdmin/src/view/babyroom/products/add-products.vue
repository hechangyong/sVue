<template>
  <div style="padding: 10px;background: #f8f8f9">
    <Card title="添加商品" icon="ios-options" :padding="0" shadow style="width: 90%;">
      <div class="centerClass">
        <div class="filedClassDiv">
          <span class="spanclass">商品名称:</span>

          <Input placeholder="请输入商品名称" style="width: auto" />
        </div>
        <div class="filedClassDiv">
          <span class="spanclass">商品类别:</span>
          <Select v-model="selectProductModel" style="width:200px">
            <Option
              v-for="item in productType"
              :value="item.value"
              :key="item.value"
            >{{ item.label }}</Option>
          </Select>
        </div>
        <div class="filedClassDiv">
          <span class="spanclass">商品价格:</span>
          <Input placeholder="请输入商品价格" style="width: auto" />
        </div>
        <div class="filedClassDiv">
          <span class="spanclass">商品优惠价:</span>
          <Input placeholder="请输入商品优惠价" style="width: auto" />
        </div>
        <div class="filedClassDiv">
          <span class="spanclass">商品总库存:</span>
          <Input placeholder="请输入商品总库存" style="width: auto" />
        </div>
        <div class="filedClassDiv">
          <span class="spanclass">商品图片:</span>
          <uploadImg></uploadImg>
        </div>
        <div class="filedClassDiv">
          <span class="spanclass">添加商品规格:</span>
          <Button :size="buttonSize" icon="md-add-circle" @click="addSkuModel" type="dashed">添加规格</Button>
          <Tag
            v-for="item in skuNameArr"
            style=" margin-left: 10px;"
            :color="item.randomColor"
            :key="item.name"
            :name="item.name"
            closable
            @on-close="skuNameClose"
          >{{ item.name }}</Tag>
        </div>
        <div class="filedClassDiv">
          <skuTableModal
            :showtable="showSkuTableModal"
            :parentTableData="skuTableData"
            :columnsDefault="skuTableTitleValueArr"
          ></skuTableModal>
        </div>
      </div>
    </Card>

    <!-- 添加商品规格 -->
    <addSkuModal :show="showAddSkuModel" @changeModal="changeAddskuModal" @getSkuType="getSkuType"></addSkuModal>
  </div>
</template>

<script>
import uploadImg from "./upload.vue";
import addSkuModal from "./add-sku-modal.vue";
import skuTableModal from "./sku-table-modal.vue";
export default {
  data() {
    return {
      selectProductModel: "1",
      switchValue: true,
      buttonSize: "small",
      showAddSkuModel: false,
      showSkuTableModal: false,
      randomColor: "red",
      productType: [
        {
          value: "1",
          label: "奶粉"
        },
        {
          value: "2",
          label: "奶壶"
        },
        {
          value: "3",
          label: "宝宝衣服"
        },
        {
          value: "4",
          label: "宝宝辅食"
        },
        {
          value: "5",
          label: "宝妈用品"
        },
        {
          value: "6",
          label: "其他"
        }
      ],
      skuNameArr: [],
      skuTableTitleValueArr: [],
      currentSkuValueArr: [],
      currentSkuValueArr_1: [],
      skuTableData: []
    };
  },
  methods: {
    addSkuModel() {
      this.showAddSkuModel = true;
    },
    changeAddskuModal() {
      this.showAddSkuModel = false;
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
      var ra = Math.floor(Math.random() * 16);
      this.randomColor = colors[ra];
    },
    getSkuType(skuTypeName, skuValueArr) {
      this.changeRandomColor();
      this.skuNameArr.push({
        name: skuTypeName,
        randomColor: this.randomColor
      });
      this.assembleTableColums(this.skuNameArr);
      this.assembleTableData(skuValueArr);
      this.showSkuTableModal = true;
    },
    skuNameClose(event, name) {
      var closeIndex = 0;
      var notCloseName = "";
      for (var i = 0; i < this.skuNameArr.length; i++) {
        if (this.skuNameArr[i].name == name) {
          this.skuNameArr.splice(i, 1);
          closeIndex = i;
          break;
        }
      }
      this.assembleTableColums(this.skuNameArr);
      this.assembleTableData4Close(closeIndex);
    },
    assembleTableData4Close(closeIndex) {
      this.skuTableData = [];
      if (this.skuTableTitleValueArr.length <= 0) {
        this.currentSkuValueArr = [];
        this.currentSkuValueArr_1 = [];
        return;
      }
      var tempKey = "key_0";
      var tempskuValue = [];
      console.log("closeIndex: " + closeIndex);
      if (closeIndex == 0) {
        tempskuValue = this.currentSkuValueArr_1;
      } else {
        tempskuValue = this.currentSkuValueArr;
      }
      console.log("-------: " + JSON.stringify(tempskuValue));
      for (var i = 0; i < tempskuValue.length; i++) {
        var tempObj = {};
        tempObj[tempKey] = tempskuValue[i];
        tempObj.inventory = 0;
        tempObj.saleFee = 0;
        this.skuTableData.push(tempObj);
      }
      console.log(" this.skuTableData: " + JSON.stringify(this.skuTableData));
    },
    assembleTableData(val) {
      this.skuTableData = [];
      var key0 = this.skuTableTitleValueArr[0].key;
      if (this.currentSkuValueArr.length <= 0) {
        for (var i = 0; i < val.length; i++) {
          var tempObj = {};
          tempObj[key0] = val[i].name;
          tempObj.inventory = 0;
          tempObj.saleFee = 0;
          this.skuTableData.push(tempObj);
          this.currentSkuValueArr.push(val[i].name);
        }
        console.log("skuTableData: " + JSON.stringify(this.skuTableData));
      } else {
        var key1 = this.skuTableTitleValueArr[1].key;
        for (var i = 0; i < this.currentSkuValueArr.length; i++) {
          for (var j = 0; j < val.length; j++) {
            var tempObj = {};
            tempObj[key0] = this.currentSkuValueArr[i];
            tempObj[key1] = val[j].name;
            tempObj.inventory = 0;
            tempObj.saleFee = 0;
            this.skuTableData.push(tempObj);
          }
        }
        for (var j = 0; j < val.length; j++) {
          this.currentSkuValueArr_1.push(val[j].name);
        }
      }
    },
    assembleTableColums(val) {
      this.skuTableTitleValueArr = [];
       console.log(" this.val: " + JSON.stringify(val));
      for (var i = 0; i < val.length; i++) {
        this.skuTableTitleValueArr.push({
          title: val[i].name,
          key: "key_" + i
        });
      }
    }
  },
  // watch: {
  //   skuNameArr(val) {
  //     this.skuTableTitleValueArr = [];
  //     for (var i = 0; i < val.length; i++) {
  //       this.skuTableTitleValueArr.push({
  //         title: val[i].name,
  //         key: "key_" + i
  //       });
  //     }
  //   }
  // },
  components: {
    [uploadImg.name]: uploadImg,
    [skuTableModal.name]: skuTableModal,
    [addSkuModal.name]: addSkuModal
  }
};
</script>
<style scoped>
.filedClassDiv {
  margin-top: 20px;
}
.babyClass {
  background-color: white;
}
.centerClass {
  height: 70rem;
  margin-left: 10rem;
}
.spanclass {
  margin-right: 15px;
  font-family: auto;
  width: 100px;
  float: left;
}
.skuNameClass {
  margin-left: 10px;
}
</style>