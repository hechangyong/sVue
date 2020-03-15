<template>
  <div>
    <div class="banner">
      <div class="user1-name-box flex flex-center auto">
        <img :src="userDetail.headImgUrl" alt />
        <p>
             {{userDetail.nickName}} 
          <span style="color:#faff00; margin-right: 10px;">{{userDetail.level}}</span>
          <van-icon @click="showVipDes" name="question-o" />
          
        </p>
      </div>

      <div class="property auto">
        <div class="property_item">
          <div class="item_top">总收益</div>
           <div class="item_bottom">
            <span style="color: rgb(255, 93, 93);">{{totalIncome}}</span>
          </div>
        </div>
        <div class="property_line"></div>
        <div class="property_item">
          <div class="item_top">
            可提现收益
            <span @click="showView" class="u-icon-qa"></span>
          </div>
          <div class="item_center">{{canWithDrawIncome}}</div>
        </div>
      </div>
    </div>
    <van-field v-model="agentCode" readonly center clearable label="我的推荐码">
      <van-button
        slot="button"
        v-clipboard:copy="agentCode"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"
        size="small"
        type="primary"
      >复制</van-button>
    </van-field>
    <van-tabs v-model="activeName">
      <van-tab name="a" title="收益记录">
        <van-steps direction="vertical" :active="0">
          <!-- <vanStep></vanStep> -->
          <van-step v-for="(item, $index) in allRecodeList" :key="$index">
            <h3>{{item.recordText}}</h3>
            <p>{{item.time}}</p>
          </van-step>
        </van-steps>
        <is-empty v-if="allRecodeList.length == 0" altdes="收益记录">
          <span>您还没有收益记录哦！</span>
        </is-empty>
      </van-tab>
      <van-tab name="c" title="提现记录">
        <van-steps direction="vertical" :active="0">
          <!-- <vanStep></vanStep> -->
          <van-step v-for="(item, $index) in exchangeRecordList" :key="$index">
            <h3>{{item.recordText}}</h3>
            <p>{{item.time}}</p>
          </van-step>
        </van-steps>
        <is-empty v-if="exchangeRecordList.length == 0" altdes="未付款">
          <span>您还没有提现记录！</span>
        </is-empty>
      </van-tab>
    </van-tabs>
    <van-dialog
      v-model="show"
      title="提现说明" 
    >
    &nbsp;&nbsp;&nbsp;&nbsp; 公众号可提现收益 = 总收益 - 在途收益 
    <br>
    &nbsp;&nbsp;&nbsp;&nbsp; 公众号收益不支持自动提现。需人工添加管理员微信，提交提现申请后，由管理员审核，审核通过后，会以微信红包的方式发放至您的微信。</van-dialog>
    <van-dialog v-model="showVip" title="vip权益说明" show-cancel-button>
      <img
        src="../../../assets/images/agent/v1.png"
        style="width: 100%; height: 100%;"
      />
      <!-- <img src="../../../assets/images/agent/agent_explain.png" /> -->
    </van-dialog>
  </div>
</template>

<script src="./agent.js"></script>

 