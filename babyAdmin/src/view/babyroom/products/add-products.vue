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
          <skuTableModal :showtable="showSkuTableModal" :parentTableData="skuTableData" :columnsDefault="skuTableTitleValueArr"></skuTableModal>
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
      skuTableTitleValueArr: []
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
      console.log("skuTypeName: " + skuTypeName);
      this.changeRandomColor();
      this.skuNameArr.push({
        name: skuTypeName,
        randomColor: this.randomColor
      });

      this.showSkuTableModal = true;
    },
    skuNameClose(event, name) {
      for (var i = 0; i < this.skuNameArr.length; i++) {
        if (this.skuNameArr[i].name == name) {
          this.skuNameArr.splice(i, 1);
          break;
        }
      }
    }
  },
  watch: {
    skuNameArr(val) {
      this.skuTableTitleValueArr = [];
      for (var i = 0; i < val.length; i++) {
        this.skuTableTitleValueArr.push({
          title: val[i].name,
          key: "sss"
        });
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