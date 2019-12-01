<template>
  <div> 
    <van-cell v-if="editAddress" title="添加收货地址" @click="showList = true" :center="true" is-link>
      <van-icon slot="icon" name="add-square" class="user-defined-icon" />
    </van-cell>
 

    <van-cell
      :title="currentAddress.name"
      v-if="hasAddress"
      icon="location-o"
      :value="currentAddress.tel"
      size="large"
      @click="showList = true"
      is-link
    >
      <template slot="label">
        <span class="span_lable">{{currentAddress.addressDetail}}</span>
      </template>
    </van-cell>

    <van-divider class="van-contact-card-divP" />
    <!-- <van-contact-card
      :type="cardType"
      :name="currentContact.name"
      :tel="currentContact.tel"
      @click="showList = true"
    />-->

    <!-- 联系人列表 -->
    <van-popup v-model="showList" :style="{ height: '100%' }" position="bottom">
      <van-address-list
        v-model="chosenAddressId"
        :list="addressList"
        @add="onAdd"
        @edit="onEdit"
        @select="onSelect"
      />
    </van-popup>

    <!-- 联系人编辑 -->
    <van-popup v-model="showEdit" position="bottom">
      <van-contact-edit
        :contact-info="editingContact"
        :is-edit="isEdit"
        @save="onSave"
        @delete="onDelete"
      />
    </van-popup>

    <van-checkbox-group class="card-goods" v-model="checkedGoods">
      <van-checkbox class="card-goods__item" v-for="item in goods" :key="item.id" :name="item.id">
        <van-card
          :title="item.title"
          :desc="item.desc"
          :num="item.num"
          :price="formatPrice(item.price)"
          :thumb="item.thumb"
        />
      </van-checkbox>
    </van-checkbox-group>

    <van-submit-bar
      :price="totalPrice"
      :safe-area-inset-bottom="safeareabottom"
      :disabled="!checkedGoods.length"
      button-text="提交订单"
      tip="你的收货地址不支持同城送, 我们已为你推荐快递"
      tip-icon="info-o"
      @submit="onSubmit"
    >
      <van-checkbox v-model="checked">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import {
  Checkbox,
  CheckboxGroup,
  Card,
  SubmitBar,
  Toast,
  Tabbar,
  TabbarItem,
  ContactCard,
  ContactList,
  ContactEdit,
  Popup,
  AddressList,
  Cell,
  CellGroup,
  Divider,
  Icon,
  Panel 
} from "vant";

export default {
  components: {
    [Card.name]: Card,
    [Checkbox.name]: Checkbox,
    [SubmitBar.name]: SubmitBar,
    [CheckboxGroup.name]: CheckboxGroup,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [ContactCard.name]: ContactCard,
    [ContactList.name]: ContactList,
    [Popup.name]: Popup,
    [ContactEdit.name]: ContactEdit,
    [AddressList.name]: AddressList,
    [Cell.name]: Cell,
    [Divider.name]: Divider,
    [CellGroup.name]: CellGroup,
    [Icon.name]: Icon,
    [Panel.name]: Panel 
  },

  data() {
    return {
      editAddress: true,
      hasAddress: false,
      currentAddress: {
        name: "",
        tel: "",
        addressDetail: ""
      },
      chosenContactId: null,
      editingContact: {},
      showList: false,
      showEdit: false,
      isEdit: false,
      chosenAddressId: 1,

      addressList: [
        {
          id: 1,
          name: "张三",
          tel: "13000000000",
          address: "安徽省合肥市肥东县文艺名都小区40#2902",
          areacode: "340122"
        },
        {
          id: 2,
          name: "张三",
          tel: "13000000000",
          address: "合肥市好好哦啊山东阿萨德",
          areacode: "340122"
        }
      ],
      currentContact: {
        name: "张三",
        tel: "13000000000",
        id: 0
      },
      list: [
        {
          name: "张三",
          tel: "13000000000",
          id: 0
        },
        {
          name: "李四",
          tel: "13000000000",
          id: 2
        },
        {
          name: "王二麻",
          tel: "13000000000",
          id: 1
        }
      ],
      safeareabottom: true,
      active: 0,
      checked: 1,
      checkedGoods: ["1", "2", "3"],
      goods: [
        {
          id: "1",
          title: "进口香蕉",
          desc: "约250g，2根",
          price: 200,
          num: 1,
          thumb:
            "https://img.yzcdn.cn/public_files/2017/10/24/2f9a36046449dafb8608e99990b3c205.jpeg"
        },
        {
          id: "2",
          title: "陕西蜜梨",
          desc: "约600g",
          price: 690,
          num: 1,
          thumb:
            "https://img.yzcdn.cn/public_files/2017/10/24/f6aabd6ac5521195e01e8e89ee9fc63f.jpeg"
        },
        {
          id: "3",
          title: "美国伽力果",
          desc: "约680g/3个",
          price: 2680,
          num: 1,
          thumb:
            "https://img.yzcdn.cn/public_files/2017/10/24/320454216bbe9e25c7651e1fa51b31fd.jpeg"
        }
      ]
    };
  },

  computed: {
    submitBarText() {
      const count = this.checkedGoods.length;
      return "结算" + (count ? `(${count})` : "");
    },

    totalPrice() {
      return this.goods.reduce(
        (total, item) =>
          total + (this.checkedGoods.indexOf(item.id) !== -1 ? item.price : 0),
        0
      );
    },
    cardType() {
      return this.chosenContactId !== null ? "edit" : "add";
    }
  },

  methods: {
    formatPrice(price) {
      return (price / 100).toFixed(2);
    },

    onSubmit() {
      Toast("点击结算");
    },

    onAdd() {
      this.$router.push({
        name: "editAddress",
        params: {
          name: "",
          tel: "",
          addressDetail: "",
          frompage: "shoppingcart"
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
          areacode: item.areacode,
          frompage: "shoppingcart"
        }
      });
    },
    // // 添加联系人
    // onAdd() {
    //   this.editingContact = { id: this.list.length };
    //   this.isEdit = false;
    //   this.showEdit = true;
    // },

    // // 编辑联系人
    // onEdit(item) {
    //   this.isEdit = true;
    //   this.showEdit = true;
    //   this.editingContact = item;
    // },

    // 选中联系人
    onSelect(item, index) {
      console.log("onSelect: " + JSON.stringify(item));
      // this.list.push({
      //   name: item.name + "(" + item.address + ")",
      //   tel: item.tel,
      //   id: item.id
      // });
      this.currentAddress = {
        name: item.name,
        tel: item.tel,
        addressDetail: item.address
      };
      this.editAddress = false;
      this.hasAddress = true;

      this.chosenContactId = item.id;
      this.showList = false;
    },

    // 保存联系人
    onSave(info) {
      this.showEdit = false;
      this.showList = false;

      if (this.isEdit) {
        this.list = this.list.map(item => (item.id === info.id ? info : item));
      } else {
        this.list.push(info);
      }
      this.chosenContactId = info.id;
    },

    // 删除联系人
    onDelete(info) {
      this.showEdit = false;
      this.list = this.list.filter(item => item.id !== info.id);
      if (this.chosenContactId === info.id) {
        this.chosenContactId = null;
      }
    }
  }
};
</script>

<style lang="less">
.span_lable{
    font-size: 12px;
}
.user-defined-icon {
  margin-right: 5px;
  font-size: 40px;
  color: #1989fa;
}
.van-cell__title,
.van-cell__value {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  margin-left: 5px;
}
.van-contact-card-divP {
  //   position: absolute;

  margin: 0px 0;
  content: "";
  right: 0;
  bottom: 0;
  left: 0;
  height: 2px;
  background: -webkit-repeating-linear-gradient(
    135deg,
    #ff6c6c 0,
    #ff6c6c 20%,
    transparent 0,
    transparent 25%,
    #1989fa 0,
    #1989fa 45%,
    transparent 0,
    transparent 50%
  );
  background: repeating-linear-gradient(
    -45deg,
    #ff6c6c 0,
    #ff6c6c 20%,
    transparent 0,
    transparent 25%,
    #1989fa 0,
    #1989fa 45%,
    transparent 0,
    transparent 50%
  );
  background-size: 80px;
}

.card-goods {
  padding: 10px 0;
  background-color: #fff;

  &__item {
    position: relative;
    background-color: #fafafa;

    .van-checkbox__label {
      width: 100%;
      height: auto; // temp
      padding: 0 10px 0 15px;
      box-sizing: border-box;
    }

    .van-checkbox__icon {
      top: 50%;
      left: 10px;
      z-index: 1;
      position: absolute;
      margin-top: -10px;
    }

    .van-card__price {
      color: #f44;
    }
  }
}
</style>
