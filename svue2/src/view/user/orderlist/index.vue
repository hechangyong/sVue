<template>
  <div>
    <van-tabs v-model="activeName">
      <van-tab name="a" title="全部">
        <template v-for="orderinfo in  allOrderList">
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
                    <van-button disabled size="mini">订单时间：{{subOrderInfo.date}}</van-button>
                  </div>
                </van-card>
              </template>
              <div style="font-size: 20px;">
                <span style="font-size:12px;margin-left:40%">共3件商品，合计：￥</span>
                <span style="color:red;font-size:16px;">3000.00</span>
              </div>
              <div slot="footer" class="van-panel__footer_reload">
                <van-button size="mini" round>取消订单</van-button>
                <van-button size="mini" style="margin-left: 10px;" round type="danger">删除订单</van-button>
              </div>
            </van-panel>
          </div>
        </template>
        <is-empty v-if="allOrderList.length == 0" altdes="全部">
          <span>您还没有购物哦！</span>
        </is-empty>
      </van-tab>
      <van-tab name="b" title="已付款">
        <div class="rcorners2">
          <van-panel title="金摇篮母婴店" icon="shop-o" status="已付款">
            <div>
              <van-card
                num="2"
                price="2.00"
                desc="描述信息"
                title="商品标题"
                thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
              >
                <div slot="bottom">
                  <div></div>
                  <van-button disabled size="mini">订单时间：{{date}}</van-button>
                </div>
              </van-card>
              <van-card
                num="2"
                price="2.00"
                desc="描述信息"
                title="商品标题"
                thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
              >
                <div slot="bottom">
                  <div></div>
                  <van-button disabled size="mini">订单时间：{{date}}</van-button>
                </div>
              </van-card>
            </div>
            <div>
              <van-card
                num="2"
                price="2.00"
                desc="描述信息"
                title="商品标题"
                thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
              >
                <div slot="bottom">
                  <div></div>
                  <van-button disabled size="mini">订单时间：{{date}}</van-button>
                </div>
              </van-card>
              <van-card
                num="2"
                price="2.00"
                desc="描述信息"
                title="商品标题"
                thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
              >
                <div slot="bottom">
                  <div></div>
                  <van-button disabled size="mini">订单时间：{{date}}</van-button>
                </div>
              </van-card>
            </div>
            <div slot="footer" class="van-panel__footer_reload">
              <van-button size="mini" round>取消订单</van-button>
              <van-button size="mini" style="margin-left: 10px;" round type="danger">删除订单</van-button>
            </div>
          </van-panel>
        </div>
      </van-tab>
      <van-tab name="c" title="已取消">
        <div class="rcorners2">
          <van-panel title="标题" icon="shop-o" status="未完成">
            <div>
              <van-card
                num="2"
                price="2.00"
                desc="描述信息"
                title="商品标题"
                thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
              >
                <div slot="bottom">
                  <div></div>
                  <van-button disabled size="mini">订单时间：{{date}}</van-button>
                </div>
              </van-card>
            </div>
            <div slot="footer" class="van-panel__footer_reload">
              <van-button size="mini" round>取消订单</van-button>
              <van-button size="mini" style="margin-left: 10px;" round type="danger">删除订单</van-button>
            </div>
          </van-panel>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script src="./orderlist.js"></script>

<style lang="less" scoped>
.van-panel__footer_reload {
  // padding-bottom: 10px;
  // padding-top: 10px;
  font-size: 0px;
  padding-left: 55%;
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




