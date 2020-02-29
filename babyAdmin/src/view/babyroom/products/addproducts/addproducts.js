/* eslint-disable */
import uploadImg from "./components/component-upload.vue";
import addSkuModal from "./components/component-add-sku-modal.vue";
import skuTableModal from "./components/component-sku-table-modal.vue";
import { addProductApi } from '@/api/product'
export default {
  data() {
    return {
      productDes: "",
      selectProductModel: "1",
      switchValue: true,
      buttonSize: "small",
      showAddSkuModel: false,
      showSkuTableModal: false,
      randomColor: "red",
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
      skuNameArr: [],
      skuTableTitleValueArr: [],
      skuTableData: [],
      currentSkuDataObj: [],
      callbackSkuTableData: [],
      sureSkuTableDataFlag: false,
      hasSkus: "无",
      productName: "",
      productPrice: 0,
      vipPrice: 0,
      totalInventory: 0,
      productImgs: [],
      imgDetails:[]
    };
  },
  methods: {
    /**
     * 添加商品
     */
    addProducts() {
      this.checkFormData();
      console.log("productType: " + this.selectProductModel);
      var productObj = {};
      productObj.productDes = this.productDes;
      productObj.productImgs = this.productImgs;
      productObj.imgDetails = this.imgDetails;
      productObj.productName = this.productName;
      productObj.productType = this.selectProductModel;
      productObj.productPrice = this.productPrice;
      productObj.vipPrice = this.vipPrice;
      productObj.productImgs = this.productImgs;
      productObj.callbackSkuTableData = this.callbackSkuTableData;
      productObj.currentSkuDataObj = this.currentSkuDataObj;
      productObj.totalInventory = this.totalInventory;
      addProductApi(productObj).then(content => {
        this.obj = content
      }).catch(err => {
        console.log(err)
      })
    },
    /**
     * 添加商品图片
     */
    changeUploadsFile(imgs) {
      this.productImgs = [];
      for (var i = 0; i < imgs.length; i++) {
        var imgsname = imgs[i].name;
        this.productImgs.push(imgsname);
      }
      console.log("this.productImgs: " + JSON.stringify(this.productImgs));
    },
    /**
     * 添加商品详情图片
     */
    changeUploadsFileDetail(imgs) {
      this.imgDetails = [];
      for (var i = 0; i < imgs.length; i++) {
        var imgsname = imgs[i].name;
        this.imgDetails.push(imgsname);
      }
      console.log("this.imgDetails: " + JSON.stringify(this.imgDetails));
    },
    /**
     * 校验表单数据，提交数据
     */
    checkFormData() {

      if (this.productName == '') {
        this.$Message.error('请填写商品名称！');
        this.$refs["productName"].focus();
      }
      console.log("this.productPrice: " + this.productPrice)
      if (this.productPrice == null || this.productPrice == '' || isNaN(this.productPrice)) {
        this.$Message.error('请正确的商品价格！');
        this.$refs["productPrice"].focus();
      }
      if (isNaN(this.vipPrice)) {
        this.$Message.error('请正确的商品优惠价！');
        this.$refs["vipPrice"].focus();
      }
      if (this.totalInventory == 0 || isNaN(this.totalInventory)) {
        this.$Message.error('请正确的商品总库存！');
        this.$refs["totalInventory"].focus();
      }
      if (this.productImgs.length == 0) {
        this.$Message.error('请上传至少一张商品图片！');
        return;
      }
      if (this.productDes == "") {
        this.$Message.error('请添加产品简单描述！');
        this.$refs["productDes"].focus();
        return;
      }


      if (this.hasSkus == '有' && !this.sureSkuTableDataFlag) {
        this.$Modal.error({
          title: "系统提示",
          content: "请明确各规格库存，价格，确认无误后，请点击确认！"
        });
        return;
      }


    },
    /**
     * 改变有无规格状态
     */
    changeHasSkuStatus() {
      console.log("this.hasSkus:" + this.hasSkus);
      if (this.hasSkus == '无') {
        this.skuNameArr = [];
        this.skuTableTitleValueArr = [];
        this.skuTableData = [];
        this.currentSkuDataObj = [];
        this.callbackSkuTableData = [];
        this.sureSkuTableDataFlag = false;
      }
    },

    /**
     * sku table表格回调，获取表格动态值
     *
     */
    getSkuTableData(tabledata) {
      this.sureSkuTableDataFlag = true;
      this.callbackSkuTableData = tabledata;
      console.log(
        "this.callbackSkuTableData" + JSON.stringify(this.callbackSkuTableData)
      );
    },
    /**
     * 点击编辑sku table表格时回调
     *
     */
    editSkuTableData() {
      this.sureSkuTableDataFlag = false;
    },
    /**
     * 点击添加规格
     */
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
    /**
     * 修改添加规格弹出框状态
     */
    changeAddskuModal() {
      this.showAddSkuModel = false;
    },
    /**
     * 获取到规格值
     */
    getSkuType(skuTypeName, skuValueArr) {
      this.randomColor = this.$tools.changeRandomColor();
      console.log("this.randomColor: " + this.randomColor);
      this.skuNameArr.push({
        name: skuTypeName,
        randomColor: this.randomColor
      });
      this.assemblecurrentSkuDataObj(skuTypeName, skuValueArr);
      this.assembleTableColums(this.currentSkuDataObj);
      this.assembleTableData(skuValueArr);
      this.showSkuTableModal = true;
    },
    /**
     * 组装当前规格值
     */
    assemblecurrentSkuDataObj(skuName, skuValueArr) {
      this.currentSkuDataObj.push({
        k: skuName,
        v: skuValueArr
      });
    },
    /**
     * 组装表格列数据
     */
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
    /**
     * 删除规格后触发
     */
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
    /**
     * 组装表格数据
     */
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