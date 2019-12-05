<template>
  <div>
    <div class="am-padding bgWhite">
      <div class="card am-text-sm">
        <div class="card-shopname" id="shopname"></div>
        <div class="card-userinfo">
          <img @click="showBigImage" class="card-qr" alt :src="qcCodeImg" />
          <div class="card-info">
            <div class="div-member-id">
              <span id="memberID"></span>
            </div>
            <div class="div-member-name">
              <span>用户名：{{cardInfo.username}}</span>
              <span id="memberName"></span>
            </div>
            <div class="div-member-type">
              <span>类型: {{cardInfo.cardtype | parseType}}</span>
              <span id="memberType"></span>
            </div>
          </div>
        </div>
        <div class="am-text-xs am-padding-top-sm">
          <div class="div-expiration-date">
            <span>办卡日期：{{cardInfo.itime | formatdate}}</span>
            <span id="expirationDate"></span>
          </div>
          <div class="div-expiration-date">
            <span>{{text_total}}</span>
            <span id="leftTimes" class="am-margin-right-sm">{{text_residue}}</span>
          </div>

          <div class="div-prompt-msg" style="display: none;">
            <span>提示信息：</span>
            <span id="promptMsg"></span>
          </div>
        </div>
      </div>
    </div>
    <van-cell-group>
      <van-cell :title="swingOrShowTitle" title-class="classtitle" center value="洗澡游泳选择器">
        <van-switch :value="checked" @click="onClick" @change="onChange" />
      </van-cell>
    </van-cell-group>
    <is-empty v-if="!hasSwimmingData" altdes="hahahahahah">
      <span>宝宝还没有游泳记录哦！</span>
    </is-empty>

    <div v-if="hasSwimmingData">
      <van-row class="rows" justify="center">
        <van-col span="8"></van-col>
        <van-col span="8" class="colcenter">宝宝游泳记录</van-col>
        <van-col span="8"></van-col>
      </van-row>

      <van-steps direction="vertical" :active="0">
        <!-- <vanStep></vanStep> -->
        <van-step v-for="(item, $index) in record_list" :key="$index">
          <h3>{{item.typeText}} </h3>
          <p>{{item.time}}</p>
        </van-step>
      </van-steps>
    </div>

    <div class="card-fullshow" v-if="showbig==1">
      <div class="Shade-Mask"></div>
      <img class="card-big" @click="smallimg" alt :src="qcCodeImg" />
    </div>
  </div>
</template>



<script src="./js_swimming.js"></script>
<style scoped src="./swimming_css.css"></style>