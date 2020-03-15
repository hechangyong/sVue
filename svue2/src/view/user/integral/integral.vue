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
            折现金额
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

    <van-row>
      <van-col span="3">
        <van-button type="primary" round @click="signIn" size="large">签到</van-button>
      </van-col>
      <van-col span="21">
        <van-steps :active="activeSignIn1"  >
          <van-step>
            <van-icon
              v-if="activeSignIn >= 1"
              slot="inactive-icon"
              :name="weekSignRecord.week_day_1 ? 'success':'cross'"
              :color="weekSignRecord.week_day_1 ? '#38f':'#ff0000'"
              style="line-height: inherit;"
            />周一
          </van-step>
          <van-step>
            <van-icon
              v-if="activeSignIn >= 2"
              slot="inactive-icon"
              :name="weekSignRecord.week_day_2 ? 'success':'cross'"
              :color="weekSignRecord.week_day_2 ? '#38f':'#ff0000'"
              style="line-height: inherit;"
            />周二
          </van-step>
          <van-step>
            <van-icon
              v-if="activeSignIn >= 3"
              slot="inactive-icon"
              :name="weekSignRecord.week_day_3 ? 'success':'cross'"
              :color="weekSignRecord.week_day_3 ? '#38f':'#ff0000'"
              style="line-height: inherit;"
            />周三
          </van-step>
          <van-step>
            <van-icon
              v-if="activeSignIn >= 4"
              slot="inactive-icon"
              :name="weekSignRecord.week_day_4 ? 'success':'cross'"
              :color="weekSignRecord.week_day_4 ? '#38f':'#ff0000'"
              style="line-height: inherit;"
            />周四
          </van-step>
          <van-step>
            <van-icon
              v-if="activeSignIn >= 5"
              slot="inactive-icon"
              :name="weekSignRecord.week_day_5 ? 'success':'cross'"
              :color="weekSignRecord.week_day_5 ? '#38f':'#ff0000'"
              style="line-height: inherit;"
            />周五
          </van-step>
          <van-step>
            <van-icon
              v-if="activeSignIn >= 6"
              slot="inactive-icon"
              :name="weekSignRecord.week_day_6 ? 'success':'cross'"
              :color="weekSignRecord.week_day_6 ? '#38f':'#ff0000'"
              style="line-height: inherit;"
            />
            
            周六
          </van-step>
          <van-step>
            <van-icon
              v-if="activeSignIn >= 7"
              slot="inactive-icon"
              :name="weekSignRecord.week_day_7 ? 'success':'cross'"
              :color="weekSignRecord.week_day_7 ? '#38f':'#ff0000'"
              style="line-height: inherit;"
            />
               
            周日
          </van-step>
        </van-steps>
      </van-col>
    </van-row>

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
      &nbsp;&nbsp;&nbsp;&nbsp; 1、芝麻宝贝公众号上每100个积分可折现1元。
      折扣的钱可用于原价购买芝麻宝贝公众号上指定商品。积分折换的金额不享有店铺优惠价格。
      <br />&nbsp;&nbsp;&nbsp;&nbsp; 2、芝麻宝贝公众号上积分折现环节现不支持线上直接操作，需
      后台添加管理员微信，提交折现申请。管理员审核通过后，后台直接做相关折现操作。
      <br />&nbsp;&nbsp;&nbsp;&nbsp; 3、积分兑换方案最终解释权归芝麻宝贝所有。
      <br />
    </van-dialog>
  </div>
</template>

<script src="./integral.js"></script>

 