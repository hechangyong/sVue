<template>
  <div>
    <van-address-edit
      :area-list="areaList"
      show-set-default
      :address-info="addressInfo"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @change-default="changeDefult"
      @change-area="changeArea"
    />
  </div>
</template>
<script>
import { AddressEdit, Toast, Area } from "vant";
import areaList from "./area.js";
import "@vant/touch-emulator";
export default {
  data() {
    return {
      frompage: "",
      areaList,
      addressInfo: {
        id: "1",
        name: "何长勇",
        tel: "13000000000",
        province: "安徽省",
        city: "合肥市",
        county: "肥东县",
        areaCode: "340122",
        addressDetail: ""
      },
      isdefault: 0
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    changeDefult(value) {
      if (value) {
        this.isdefault = 1;
      } else {
        this.isdefault = 0;
      }
    },
    init() {
      var obj = this.$route.params;
      if (obj != undefined) {
        this.addressInfo.name = obj.name;
        this.addressInfo.id = obj.id;
        this.addressInfo.tel = obj.tel;
        this.addressInfo.addressDetail = obj.addressDetail;
        this.addressInfo.areaCode = obj.areacode;
        this.areaList.frompage = this.frompage;
      }
    },
    onSave(content) {
      Toast("save" + content.name);
      var data = {};
      data.addressdetail = content.addressDetail;
      data.areacode = content.areaCode;
      data.mobile = content.tel;
      data.city = content.city;
      data.county = content.county;
      data.id = content.id;
      data.name = content.name;
      data.isdefault = this.isdefault;
      data.province = content.province;

      this.$axios
        .post(`/baby/u/addOrUpdateUserAddress`, data)
        .then(res => {
          console.log("res.data.code: " + res.data.code);
          if (res.data.code === "0000") {
            if (this.frompage != undefined && this.frompage == "shoppingcart") {
              this.$router.push({
                name: "cart",
                params: {}
              });
            } else {
              this.$router.push({
                name: "addressList",
                params: {}
              });
            }
          } else {
            this.$router.push({
                name: "cart",
                params: {}
              });
            console.log("获取用户地址信息失败：" + res.data.code);
          }
        })
        .catch(err => {
          this.$router.push({
                name: "cart",
                params: {}
              });
          console.log("获取用户地址信息失败");
        });
    },
    changeArea(values) {
      if (values[2].name != "肥东县") {
        Toast("你所填写地区只能给您邮寄过去哦！包邮哦！");
      }
    }
  },
  components: {
    [AddressEdit.name]: AddressEdit,
    [Area.name]: Area
  }
};
</script>