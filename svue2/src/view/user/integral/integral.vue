<template>
  <div>
    <div class="banner">
      <div class="user1-name-box flex flex-center auto">
        <img :src="userDetail.headImgUrl" alt />
        <p>{{userDetail.nickName}}</p>
      </div>
      <div class="property auto">
        <div class="property_item">
          <div class="item_top">总积分</div>
          <!-- <div  c class="item_center">10000</div> -->
          <div class="item_bottom">
            <span style="color: rgb(255, 93, 93);">{{totalIntegral}}</span>
          </div>
        </div>
        <div class="property_line"></div>
        <div class="property_item">
          <div class="item_top">
            剩余积分
            <span @click="showView" class="u-icon-qa"></span>
          </div>
          <div class="item_center">{{surplusIntegral}}</div>
          <!-- <div   class="item_bottom">
            上月收益
            <span   style="color: rgb(255, 93, 93);">- -</span>
            元
          </div>-->
        </div>
      </div>
    </div>

    <van-tabs v-model="activeName">
      <van-tab name="a" title="积分记录">
        <van-steps direction="vertical" :active="0">
          <!-- <vanStep></vanStep> -->
          <van-step v-for="(item, $index) in allIntegralList" :key="$index">
            <h3>{{item.recordText}}</h3>
            <p>{{item.time}}</p>
          </van-step>
        </van-steps>
        <is-empty v-if="allIntegralList.length == 0" altdes="积分记录">
          <span>积分记录为空！</span>
        </is-empty>
      </van-tab>
      <van-tab name="c" title="兑换记录">
        <van-steps direction="vertical" :active="0">
          <!-- <vanStep></vanStep> -->
          <van-step v-for="(item, $index) in exchangeRecordList" :key="$index">
            <h3>{{item.recordText}}</h3>
            <p>{{item.time}}</p>
          </van-step>
        </van-steps>
        <is-empty v-if="exchangeRecordList.length == 0" altdes="未付款">
          <span>您还没有兑换过您的积分哦！</span>
        </is-empty>
      </van-tab>
    </van-tabs>
    <van-dialog v-model="show" title="积分兑换说明" show-cancel-button>
      &nbsp;&nbsp;&nbsp;&nbsp; 1、积分可用于兑换公众号上指定商品
      <br>
      &nbsp;&nbsp;&nbsp;&nbsp; 2、最终解释权归芝麻宝贝
       <br>
      &nbsp;&nbsp;&nbsp;&nbsp; 3、最终解释权归芝麻宝贝
       <br>
      &nbsp;&nbsp;&nbsp;&nbsp; 4、最终解释权归芝麻宝贝
       <br>
      &nbsp;&nbsp;&nbsp;&nbsp; 5、最终解释权归芝麻宝贝
     </van-dialog>
  </div>
</template>

<script src="./integral.js"></script>

 