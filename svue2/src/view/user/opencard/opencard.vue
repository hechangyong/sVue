<template>
  <div>
    <van-search v-model="value" placeholder="请输入用户昵称" show-action shape="round" @search="onSearch">
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>
    <div class="search-select">
      <!-- transition-group也是vue2.0中的新特性,tag='ul'表示用ul包裹v-for出来的li -->
      <transition-group name="itemfade" tag="ul" mode="out-in" v-cloak>
        <li
          v-for="(value,index) in myData"
          :class="{selectback:index==now}"
          class="search-select-option search-select-list"
          @mouseover="selectHover(index)"
          @click="selectClick(index)"
          :key="value.id"
        >{{value.name}}</li>
      </transition-group>
    </div>

    <div class="rcorners2_new" v-if="hasUserInfo">
      <van-cell title="头像">
        <van-icon slot="right-icon" :name="userinfo.headimgurl" style="line-height: inherit;" />
      </van-cell>
      <van-cell title="昵称" :value="userinfo.nickname" />
      <van-cell title="用户姓名" :value="userinfo.name" />
      <van-cell title="手机号码" :value="userinfo.phone" />
    </div>

    <van-cell is-link title="卡类型" @click="showPopup" :value="cardType"></van-cell>

    <van-cell-group v-if="numberCardType">
      <van-cell title="充值金额">
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="default">
          <van-stepper v-model="cardInfo.totalFee" min="0" />
        </template>
      </van-cell>
      <van-cell title="赠送金额">
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="default">
          <van-stepper v-model="cardInfo.giveFee" min="0" />
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group v-if="amountCardType">
      <van-cell title="充值金额">
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="default">
          <van-stepper v-model="cardInfo.totalFee" min="0" />
        </template>
      </van-cell>
      <van-cell title="兑换次数">
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="default">
          <van-stepper v-model="cardInfo.totalNumber" min="0" />
        </template>
      </van-cell>
      <van-cell title="赠送次数">
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="default">
          <van-stepper v-model="cardInfo.giveNumber" min="0" />
        </template>
      </van-cell>
    </van-cell-group>
    <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
  </div>
</template>

<script>
import { Search, Picker, Panel, ActionSheet, List, Toast } from "vant";
import { Stepper } from "vant";
import { Image } from "vant";
export default {
  data() {
    return {
      value: "",
      show: false,
      list: [],
      loading: false,
      finished: false,
      keyword: "", //v-model绑定的输入框的value
      now: -1,
      userinfo: {},
      hasUserInfo: false,
      searchIndex: 0,
      amountCardType: false,
      numberCardType: true,
      myData: [], //用来接收ajax得到的数据
      actions: [
        { name: "次卡" },
        { name: "充值卡" }
        // { name: '选项', subname: '描述信息' }
      ],
      cardType: "",
      cardInfo: {
        totalNumber: 0,
        residueNumber: 0,
        giveNumber: 0,
        totalFee: 0,
        residueFee: 0,
        giveFee: 0
      }
    };
  },
  methods: {
    onSearch() {
      this.myData = [];
      var obj = {};
      obj.name = this.value;
      this.$axios
        .post(`/baby/u/getStoreUsers`, obj)
        .then(res => {
          console.log("res: " + res.data.code);
          if (res.data.code === "0000") {
            var user = res.data.attachment;
            for (var i = 0; i < user.length; i++) {
              this.myData.push({
                id: user[i].id,
                name: user[i].name,
                nickname: user[i].nickname,
                phone: user[i].phone,
                headimgurl: user[i].headimgurl
              });
            }
          } else {
            console.log("获取商户信息失败：" + res.data.code);
          }
        })
        .catch(err => {
          console.log("获取用户信息失败");
        });

    

      this.finished = true;
    },
    showPopup() {
      this.show = true;
    },
    onSelect(item) {
      this.show = false;
      this.cardType = item.name;
      if (this.cardType == "次卡") {
        this.amountCardType = false;
        this.numberCardType = true;
      } else {
        this.amountCardType = true;
        this.numberCardType = false;
      }
    },
    onChange(picker, value, index) {
      Toast(`当前值：${value}, 当前索引：${index}`);
    },
    // &event是实参，表示event对象
    get: function(ev) {
      // 如果按得键是上或者下，就不进行ajax
      if (ev.keyCode == 38 || ev.keyCode == 40) {
        return;
      }
    },
    selectDown: function() {
      this.now++;
      //到达最后一个时，再按下就回到第一个
      if (this.now == this.myData.length) {
        this.now = 0;
      }
      this.keyword = this.myData[this.now];
    },
    selectUp: function() {
      this.now--;
      //同上
      if (this.now == -1) {
        this.now = this.myData.length - 1;
      }
      this.keyword = this.myData[this.now];
    },
    search: function() {
      //打开对应的搜索界面
      window.open(this.logoData[this.searchIndex].searchSrc + this.keyword);
    },
    selectHover: function(index) {
      this.now = index;
    },
    selectClick: function(index) {
      this.userinfo = {};
      this.keyword = this.myData[index];
      //   this.search();
      this.userinfo = this.myData[index];
      this.hasUserInfo = true;
      this.myData = [];
    },
    clearInput: function() {
      this.keyword = "";
    },
    getIndex: function(index) {
      this.searchIndex = index;
    },
    onLoad() {
      //   // 异步更新数据
      //   setTimeout(() => {
      //     for (let i = 0; i < 10; i++) {
      //       this.list.push(this.list.length + 1);
      //     }
      //     // 加载状态结束
      //     this.loading = false;
      //     // 数据全部加载完成
      //     if (this.list.length >= 10) {
      //       this.finished = true;
      //     }
      //   }, 500);
    }
  },
  components: {
    [Search.name]: Search,
    [ActionSheet.name]: ActionSheet,
    [Panel.name]: Panel,
    [Toast.name]: Toast,
    [List.name]: List,
    [Image.name]: Image,
    [Stepper.name]: Stepper,
    [Picker.name]: Picker
  }
};
</script>

<style scoped>
.van-icon__image {
  width: 60px;
  height: 50px;
}
.rcorners2_new {
  border-radius: 20px;
  border: 0px solid #c4c7bd;
  padding: 20px;
  /* width: 200px; */
  background-color: white;
  margin: 5px;
}
.search-input {
  height: 45px;
  width: 600px;
  margin: 0 auto;
  margin-top: 10px;
  position: relative;
}
.search-input input {
  border: 1px solid #e4e4e4;
  box-sizing: border-box;
  width: 500px;
  height: 45px;
  font-size: 18px;
  float: left;
  padding-left: 10px;
  padding-right: 10px;
  overflow: hidden;
}
.search-btn {
  height: 45px;
  width: 100px;
  border: 1px solid mediumseagreen;
  background-color: mediumseagreen;
  color: white;
  font-size: 16px;
  font-weight: bold;
  float: left;
}
.search-btn {
  cursor: pointer;
}
.search-select {
  position: absolute;
  top: 45px;
  width: 100%;
  box-sizing: border-box;
  z-index: 999;
}
.search-select li {
  border: 1px solid #d4d4d4;
  border-top: none;
  border-bottom: none;
  background-color: #fff;
  font-size: 16px;
  width: 100%;
}
.search-select-option {
  box-sizing: border-box;
  padding: 7px 10px;
}
.selectback {
  background-color: #eee !important;
  cursor: pointer;
}
input::-ms-clear {
  display: none;
}
.search-reset {
  width: 21px;
  height: 21px;
  position: absolute;
  display: block;
  line-height: 21px;
  text-align: center;
  cursor: pointer;
  font-size: 20px;
  right: 110px;
  top: 12px;
}
.search-select-list {
  transition: all 0.5s;
}
.itemfade-enter,
.itemfade-leave-active {
  opacity: 0;
}
.itemfade-leave-active {
  position: absolute;
}
.selectback {
  background-color: #eee !important;
  cursor: pointer;
}
.search-select ul {
  margin: 0;
  text-align: left;
}
</style>