<template>
  <div>
    <div class="banner">
      <div class="user-name-box flex flex-center auto">
        <img :src="userDetail.headImgUrl" alt />
        <p>{{userDetail.nickName}}</p>
      </div>
    </div>
    <!-- <img class="user-poster" src="https://img.yzcdn.cn/public_files/2017/10/23/8690bb321356070e0b8c4404d087f8fd.png"> -->
    <!--<img class="user-poster" src="../../images/user/home_bg.png">-->

    <van-row class="user-links">
      <van-col @click="toOrderList" span="8">
        <van-icon name="pending-payment" />购物清单
      </van-col>
      <van-col @click="toSwimming" span="8">
        <van-icon name="records" />我的游泳卡
      </van-col>
      <van-col span="8">
        <van-icon name="tosend" @click="toshopIntegral" />我的积分
      </van-col>
    </van-row>

    <van-cell-group class="user-group">
      <van-cell
        icon="phone-o"
        title="我的手机"
        @click="tochangeMobile"
        :value="userDetail.mobile"
        is-link
      />
    </van-cell-group>

    <van-cell-group class="user-top-group">
      <van-cell
        icon="home-o"
        title="我的地址"
        to="/addressList"
        :value="userDetail.address | cutOutAddress"
        is-link
      />
    </van-cell-group>

    <van-cell-group class="user-top-group">
      <van-cell icon="coupon-o" title="我的卡劵" @click="toCardList" is-link />
    </van-cell-group>


    <van-cell-group v-if="userDetail.status == '1'" class="user-top-group">
      <van-cell icon="todo-list-o" title="送货订单" @click="todelivergoods" is-link />
      <van-cell icon="star-o" title="客户开卡" @click="toOpencard" is-link />
    </van-cell-group>

    <van-cell-group class="user-top-group">
      <van-cell icon="coupon-o" title="关于店铺" @click="toStoreInfo" is-link />
    </van-cell-group>
    
    <van-tabbar :safe-area-inset-bottom="safeareabottom" v-model="active">
      <van-tabbar-item  name="products" to="/products" icon="home-o">商品首页</van-tabbar-item>
      <van-tabbar-item name="cart" to="/cart" icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item   name="user" icon="user-o" to="/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script src="./userindex.js"></script>

 