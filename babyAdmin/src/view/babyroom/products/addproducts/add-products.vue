<template>
  <div style="padding: 10px;background: #f8f8f9">
    <Card title="添加商品" icon="ios-options" :padding="0" shadow style="width: 90%;">
      <div class="centerClass">
        <div class="filedClassDiv">
          <span class="spanclass">商品名称:</span>

          <Input placeholder="请输入商品名称" style="width: 20%" />
        </div>
        <div class="filedClassDiv">
          <span class="spanclass">商品类别:</span>
          <Select v-model="selectProductModel" style="width:20%">
            <Option
              v-for="item in productType"
              :value="item.value"
              :key="item.value"
            >{{ item.label }}</Option>
          </Select>
        </div>
        <div class="filedClassDiv">
          <span class="spanclass">商品价格:</span>
          <Input placeholder="请输入商品价格" style="width: 20%" />
        </div>
        <div class="filedClassDiv">
          <span class="spanclass">商品优惠价:</span>
          <Input placeholder="请输入商品优惠价" style="width: 20%" />
        </div>
        <div class="filedClassDiv">
          <span class="spanclass">商品总库存:</span>
          <Input placeholder="请输入商品总库存" style="width: 20%" />
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
          <span class="spanclass"></span>
          <skuTableModal
            :showtable="showSkuTableModal"
            :parentTableData="skuTableData"
            :columnsDefault="skuTableTitleValueArr"
          ></skuTableModal>
        </div>
        <div class="filedClassDiv">
          <span class="spanclass">添加商品简介:</span>
          <Input
            v-model="textareaValue"
            style="width: 20%"
            type="textarea"
            :rows="4"
            placeholder="商品简介"
          />
        </div>
        <div class="filedClassDiv">
           <Button type="primary" long>添加商品</Button>
          
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
      textareaValue: "",
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
      skuTableData: [],
      currentSkuDataObj: []
    };
  },
  methods: {
    addSkuModel() {
      if (this.currentSkuDataObj.length >= 2) {
        this.$Modal.error({
          title: "系统提示",
          content:
            "同一商品系统最多只支持添加两种规格！</br> 如果需要添加多种，请联系管理员！"
        });
        return;
      }
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
      this.assemblecurrentSkuDataObj(skuTypeName, skuValueArr);
      this.assembleTableColums(this.currentSkuDataObj);
      this.assembleTableData(skuValueArr);
      this.showSkuTableModal = true;
    },
    assemblecurrentSkuDataObj(skuName, skuValueArr) {
      this.currentSkuDataObj.push({
        k: skuName,
        v: skuValueArr
      });
    },
    assembleTableColums(val) {
      this.skuTableTitleValueArr = [];
      console.log(" this.val: " + JSON.stringify(val));
      for (var i = 0; i < val.length; i++) {
        this.skuTableTitleValueArr.push({
          title: val[i].k,
          key: "key_" + i
        });
      }
    },
    skuNameClose(event, name) {
      for (var i = 0; i < this.currentSkuDataObj.length; i++) {
        if (this.currentSkuDataObj[i].k == name) {
          this.currentSkuDataObj.splice(i, 1);
          break;
        }
      }
      for (var i = 0; i < this.skuNameArr.length; i++) {
        if (this.skuNameArr[i].name == name) {
          this.skuNameArr.splice(i, 1);
          break;
        }
      }
      this.assembleTableColums(this.currentSkuDataObj);
      this.assembleTableData();
      if (this.currentSkuDataObj.length == 0) {
        this.showSkuTableModal = false;
      }
    },
    assembleTableData() {
      this.skuTableData = [];
      var key0 = "key_0";
      var key1 = "key_1";
      if (this.currentSkuDataObj.length == 1) {
        for (var i = 0; i < this.currentSkuDataObj[0].v.length; i++) {
          var tempObj = {};
          tempObj[key0] = this.currentSkuDataObj[0].v[i].name;
          tempObj.inventory = 0;
          tempObj.saleFee = 0;
          tempObj.alarmNumber = 0;
          this.skuTableData.push(tempObj);
        }
      }
      if (this.currentSkuDataObj.length == 2) {
        for (var i = 0; i < this.currentSkuDataObj[0].v.length; i++) {
          for (var j = 0; j < this.currentSkuDataObj[1].v.length; j++) {
            var tempObj = {};
            tempObj[key0] = this.currentSkuDataObj[0].v[i].name;
            tempObj[key1] = this.currentSkuDataObj[1].v[j].name;
            tempObj.inventory = 0;
            tempObj.saleFee = 0;
            tempObj.alarmNumber = 0;
            this.skuTableData.push(tempObj);
          }
        }
      }
    }
  },
  components: {
    [uploadImg.name]: uploadImg,
    [skuTableModal.name]: skuTableModal,
    [addSkuModal.name]: addSkuModal
  }
};
</script>
<style scoped>
.ivu-btn-long {
    /* margin-left: 115px; */
    width: 35%;
}
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