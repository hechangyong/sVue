<template>
  <div>
    <div v-if="nobind==3"></div>
    <div v-if="nobind==1">
      <is-empty v-if="isEmpty" altdes="a">
        <span>您还没有添加地址哦！快去添加吧</span>
      </is-empty>
      <van-button @click="onAdd" class="buttonclass" round type="info">添加地址</van-button>
    </div>
    <div v-else-if="nobind==2">
      <van-address-list v-model="chosenAddressId" :list="addressList" @add="onAdd" @edit="onEdit" />
    </div>
  </div>
</template>
<script>
import { AddressList, Toast } from "vant";
import IsEmpty from "@/view/is-empty/";
export default {
  data() {
    return {
      nobind: 3,
      isEmpty: false,
      chosenAddressId: "1",
      addressList: [
        {
          id: "",
          name: "",
          tel: "",
          address: "",
          areacode: ""
        }
      ]
    };
  },
  mounted() {
    Toast.loading({
      message: "加载中...",
      forbidClick: true,
      loadingType: "spinner"
    });
    this.initAddress();
  },
  methods: {
    initAddress() {
      this.$axios
        .post(`/baby/u/getUserAddress`)
        .then(res => {
          console.log("res.data.code: " + res.data.code);
          if (res.data.code === "0000") {
            var useraddress = res.data.attachment;
            var addressList = [];

            if (useraddress.length <= 0) {
              Toast.clear();
              this.nobind = 1;
              this.isEmpty = true;
              
            } else {
              for (var i = 0; i < useraddress.length; i++) {
                var obj = {};
                obj.id = useraddress[i].id;
                obj.name = useraddress[i].name;
                obj.tel = useraddress[i].mobile;
                obj.address = useraddress[i].addressdetail;
                obj.areacode = useraddress[i].areacode;
                console.log("obj: " + JSON.stringify(obj));
                addressList.push(obj);
              }
              this.addressList = addressList;
              Toast.clear();
              this.nobind = 2;
            }
          } else {
            this.isEmpty = true;
            this.nobind = 1;
            console.log("获取用户地址信息失败：" + res.data.code);
          }
        })
        .catch(err => {
          this.isEmpty = true;
          console.log("获取用户地址信息失败");
        });
    },
    onAdd() {
      this.$router.push({
        name: "editAddress",
        params: {
          name: "",
          tel: "",
          addressDetail: ""
        }
      });
    },

    onEdit(item, index) {
      console.log("areaCode: " + JSON.stringify(item));
      this.$router.push({
        name: "editAddress",
        params: {
          id: item.id,
          name: item.name,
          tel: item.tel,
          addressDetail: item.address,
          areacode: item.areacode
        }
      });
    }
  },
  components: {
    [AddressList.name]: AddressList,
    [Toast.name]: Toast,
    [IsEmpty.name]: IsEmpty
  }
};
</script>
<style scoped>
.buttonclass {
  margin-top: 50px;
  width: 90%;
  margin-left: 20px;
  /* width: -webkit-fill-available; */
  border-radius: 700px;
  font-size: 14px;
  background-color: rgb(250, 85, 85);
  border: 1px solid #fb3636;
}
</style>