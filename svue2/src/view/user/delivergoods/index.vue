<template>
  <div>
    <van-tabs v-model="activeName">
      <van-tab name="c" title="待送货">
        <template v-for="orderinfo in  unPayOrderList">
          <div class="rcorners2" :key="orderinfo.id">
            <van-panel :title="orderinfo.title" icon="shop-o" :status="orderinfo.status">
              <template v-for="subOrderInfo in orderinfo.subOrders">
                <van-card
                  :key="subOrderInfo.id"
                  :num="subOrderInfo.num"
                  :price="subOrderInfo.price"
                  :desc="subOrderInfo.desc"
                  :title="subOrderInfo.title"
                  :thumb="subOrderInfo.thumb"
                >
                  <div slot="bottom">
                    <div></div>
                    <van-button disabled size="mini">{{subOrderInfo.skuValue}}</van-button>
                    <van-button disabled size="mini">订单时间：{{subOrderInfo.date}}</van-button>
                  </div>
                </van-card>
              </template>
              <div style="font-size: 20px;">
                <span style="font-size:12px;margin-left:40%">共{{orderinfo.subOrders.length}}件商品，合计：￥</span>
                <span style="color:red;font-size:16px;">{{orderinfo.subOrders | getTotalFee}}</span>
              </div>
              <van-collapse v-model="activeNames">
                <van-collapse-item
                  title="送货地址"
                  :name="orderinfo.id"
                  :value="orderinfo.addressInfo.name"
                  icon="location-o"
                >{{orderinfo.addressInfo | assembleAddressInfo }}</van-collapse-item>
              </van-collapse>
              <div slot="footer" class="van-panel__footer_reload_new">
                <van-button
                  size="mini"
                  @click="receipt(orderinfo.id)"
                  style="margin-left: 10px;"
                  round
                  type="default"
                >确认收款</van-button>
              </div>
            </van-panel>
          </div>
        </template>
        <is-empty v-if="unPayOrderList.length == 0" altdes="待送货">
          <span>没有需要送货的订单！</span>
        </is-empty>
      </van-tab>
      <van-tab name="b" title="已完成">
        <template v-for="orderinfo in  payDoneOrderList">
          <div class="rcorners2" :key="orderinfo.id">
            <van-panel :title="orderinfo.title" icon="shop-o" :status="orderinfo.status">
              <template v-for="subOrderInfo in orderinfo.subOrders">
                <van-card
                  :key="subOrderInfo.id"
                  :num="subOrderInfo.num"
                  :price="subOrderInfo.price"
                  :desc="subOrderInfo.desc"
                  :title="subOrderInfo.title"
                  :thumb="subOrderInfo.thumb"
                >
                  <div slot="bottom">
                    <div></div>
                    <van-button disabled size="mini">{{subOrderInfo.skuValue}}</van-button>
                    <van-button disabled size="mini">订单时间：{{subOrderInfo.date}}</van-button>
                  </div>
                </van-card>
              </template>
              <div style="font-size: 20px;">
                <span
                  style="font-size:12px;margin-left:40%"
                >共 {{orderinfo.subOrders.length}} 件商品，合计：￥</span>
                <span style="color:red;font-size:16px;">{{orderinfo.subOrders | getTotalFee}}</span>
              </div>
              <van-collapse v-model="activeNames">
                <van-collapse-item
                  title="送货地址"
                  :name="orderinfo.id"
                  :value="orderinfo.addressInfo.name"
                  icon="location-o"
                >{{orderinfo.addressInfo | assembleAddressInfo }}</van-collapse-item>
              </van-collapse>
              <div slot="footer" class="van-panel__footer_reload_new">
                <van-button
                  size="mini"
                  @click="receipt(orderinfo.id)"
                  style="margin-left: 10px;"
                  round
                  disabled
                  type="default"
                >确认收款</van-button>
              </div>
            </van-panel>
          </div>
        </template>
        <is-empty v-if="payDoneOrderList.length == 0" altdes="已完成">
          <span>您还没有已完成的订单！</span>
        </is-empty>
      </van-tab>
    </van-tabs>
    <van-dialog @confirm="receiptAmount" v-model="popupShow" title="确认收款" show-cancel-button>
      <van-field v-model="number" type="number" label="实收金额" />
      <van-cell-group>
        <van-field
          v-model="message"
          rows="2"
          autosize
          label="备注"
          type="textarea"
          maxlength="50"
          placeholder="请输入备注"
          show-word-limit
        />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script src="./delivergoods.js"></script>

<style lang="less" scoped>
.van-hairline--top-bottom::after,
.van-hairline-unset--top-bottom::after {
  border-width: 0px 0;
}
.van-panel__footer_reload_new {
  // padding-bottom: 10px;
  // padding-top: 10px;
  font-size: 0px;
  padding-left: 75%;
}
.van-button--mini {
  display: inline-block;
  min-width: 56px;
  height: 22px;
  font-size: 10px;
  line-height: 20px;
}
.ss {
  text-align: center;
  border: 2px solid #a1a1a1;
  padding: 10px 40px;
  background: #dddddd;
  width: 350px;
  border-radius: 25px;
  -moz-border-radius: 25px; /* 老的 Firefox */
}
.rcorners2 {
  border-radius: 25px;
  border: 0px solid #c4c7bd;
  padding: 20px;
  /* width: 200px; */
  background-color: white;
  margin-top: 10px;
}
</style>




