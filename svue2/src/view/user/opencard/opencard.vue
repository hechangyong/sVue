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

    <van-cell-group v-if="amountCardType">
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
    <van-cell-group v-if="numberCardType">
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


     <van-button
        class="buttonclass-next-opencard"
        @click="openCard()"
        round
        type="info"
      >开卡</van-button>
  </div>
</template>

<script src="./opencard.js"></script>
 