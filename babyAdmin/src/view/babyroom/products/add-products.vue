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
          <Button :size="buttonSize" icon="md-add-circle" @click="addSkuModel" type="dashed"></Button>
        </div>
      </div>
    </Card>

    <!-- 添加商品规格 -->
    <addSkuModal :show="showAddSkuModel" @changeModal="changeAddskuModal"></addSkuModal>
  </div>
</template>

<script>
import uploadImg from "./upload.vue";
import addSkuModal from "./add-sku-modal.vue";

export default {
  data() {
    return {
      selectProductModel: "1",
      switchValue: true,
      buttonSize: "large",
      showAddSkuModel: false,
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
      ]
    };
  },
  methods: {
    addSkuModel() {
      console.log("this.showAddSkuModel: " + this.showAddSkuModel);
      this.showAddSkuModel = true;
    },
    changeAddskuModal() {
      console.log("this.showAddSkuModel: " + this.showAddSkuModel);
      this.showAddSkuModel = false;
    }
  },
  components: {
    [uploadImg.name]: uploadImg,
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
  height: 30rem;
  margin-left: 10rem;
}
.spanclass {
  margin-right: 15px;
  font-family: auto;
  width: 100px;
  float: left;
}
</style>