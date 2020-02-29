<template>
  <div style="padding: 10px;background: #f8f8f9">
    <Card title="添加商品" icon="ios-options" :padding="0" shadow style="width: 90%;">
      <div class="centerClass">
        <div class="filedClassDiv">
          <span class="spanclass">商品名称:</span>
          <Input ref="productName" prefix="ios-paper-outline" placeholder="请输入商品名称"  v-model="productName" style="width: 20%" />
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
          <Input  ref="productPrice"   v-model="productPrice" prefix="logo-yen" placeholder="请输入商品价格" style="width: 20%" />
        </div>
        <div class="filedClassDiv">
          <span class="spanclass">商品优惠价:</span>
          <Input placeholder="请输入商品优惠价"  prefix="logo-yen" ref="vipPrice"  v-model="vipPrice" style="width: 20%" />
        </div>
        <div class="filedClassDiv">
          <span class="spanclass">商品总库存:</span>
          <Input placeholder="请输入商品总库存" prefix="ios-paper-outline"  ref="totalInventory"  v-model="totalInventory" style="width: 20%" />
        </div>
        <div class="filedClassDiv">
          <span class="spanclass">商品图片:</span>
          <uploadImg @changeUploadsFile="changeUploadsFile"></uploadImg>
        </div>
        <div class="filedClassDiv">
          <span class="spanclass">商品详情图片:</span>
          <uploadImg @changeUploadsFile="changeUploadsFileDetail"></uploadImg>
        </div>
        <div class="filedClassDiv">
          <span class="spanclass">有无规格参数:</span>
          <RadioGroup @on-change="changeHasSkuStatus" v-model="hasSkus">
            <Radio label="无"></Radio>
            <Radio label="有"></Radio>
          </RadioGroup>
        </div>
        <div class="filedClassDiv" v-if="hasSkus == '有'">
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
        <div class="filedClassDiv"  v-if="hasSkus == '有'">
          <span class="spanclass"></span>
          <skuTableModal
            :showtable="showSkuTableModal"
            :parentTableData="skuTableData"
            :columnsDefault="skuTableTitleValueArr"
            @getSkuTableData="getSkuTableData"
            @editSkuTableData="editSkuTableData"
          ></skuTableModal>
        </div>
        <div class="filedClassDiv">
          <span class="spanclass">添加商品简介:</span>
          <Input
            ref="productDes"
            prefix="ios-paper-outline"
            v-model="productDes"
            style="width: 20%"
            type="textarea"
            :rows="4"
            placeholder="商品简介"
          />
        </div>
        <div class="filedClassDiv">
          <Button type="primary" @click="addProducts" long>添加商品</Button>
        </div>
      </div>
    </Card>

    <!-- 添加商品规格 -->
    <addSkuModal :show="showAddSkuModel" @changeModal="changeAddskuModal" @getSkuType="getSkuType"></addSkuModal>
  </div>
</template>

<script src="./addproducts.js"></script>

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
