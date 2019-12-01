<template>
  <div>
      <div v-if='nobind==1'>
      </div>
      <div v-else-if='nobind==2'>
        <van-address-list v-model="chosenAddressId" :list="addressList" @add="onAdd" @edit="onEdit" />
      </div>
      
    
  </div>
</template>
<script>
import { AddressList, Toast } from "vant";
export default {
  data() {
    return {
      nobind:1,
      chosenAddressId: "1",
      addressList: [{
            id:"",
            name:"",
            tel	:"",
            address:"",
            areacode:""
      }]
    };
  },
  mounted() {
    Toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner'
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
            this.nobind = 2
          } else {
            console.log("获取用户地址信息失败：" + res.data.code);
          }
        })
        .catch(err => {
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
          areacode:item.areacode
        }
      });
    }
  },
  components: {
    [AddressList.name]: AddressList,
    [Toast.name]: Toast
  }
};
</script>