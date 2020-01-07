<template>
  <div>
    <van-cell v-if="editAddress" title="添加收货地址" @click="showList = true" :center="true" is-link>
      <van-icon slot="icon" name="add-square" class="user-defined-icon" />
    </van-cell>

    <van-cell
      :title="currentAddress.name"
      v-if="hasAddress"
      icon="location-o"
      size="large"
      @click="showList = true"
      is-link
    >
      <template slot="label">
        <span class="span_lable">{{currentAddress.addressDetail}}</span>
      </template>
    </van-cell>

    <van-divider class="van-contact-card-divP" />

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

    <div>
      <template v-for="item in goods">
        <div :key="item.id">
          <van-checkbox-group
            class="card-goods"
            :id="goodsId"
            v-model="checkedGoods"
            ref="checkboxGroup"
          >
            <van-swipe-cell>
              <van-checkbox class="card-goods__item" :name="item.id">
                <van-card
                  :title="item.title"
                  :desc="item.desc"
                  :num="item.num"
                  :price="formatPrice(item.price)"
                  :thumb="item.thumb"
                >
                  <div slot="tags">
                    <template v-for="skuvalue in item.skuInfos">
                      <van-tag
                        mark
                        type="primary"
                        style=" margin-right: 5px;"
                        :key="skuvalue"
                      >{{skuvalue}}</van-tag>
                    </template>
                  </div>
                  <div slot="num">
                    <van-stepper v-model="item.num" @click.native.stop min="1" />
                  </div>
                </van-card>
              </van-checkbox>
              <template slot="right">
                <van-button
                  square
                  type="danger"
                  class="batton_v"
                  @click="deleteCart(item)"
                  text="删除"
                />
              </template>
            </van-swipe-cell>
          </van-checkbox-group>
        </div>
      </template>
      <div class="hiClass"></div>
      <van-submit-bar
        :price="totalPrice"
        :safe-area-inset-bottom="safeareabottom"
        :disabled="!checkedGoods.length"
        button-text="提交订单"
        :tip="tipdes"
        tip-icon="info-o"
        @submit="onSubmit"
      ></van-submit-bar> 
      <van-dialog v-model="popupShow" title="选择支付方式" :show-confirm-button="showConfirmButton" show-cancel-button>
        <van-button type="info" @click="notPaySubmit" block>货到付款</van-button>
        <van-button type="primary"  @click="wxpayOrders" block>立即付款</van-button>
      </van-dialog>
    </div>
    <is-empty v-if="goods.length == 0" altdes>
      <span>空空如也,啥也没有~~~~~！快去选购吧！</span>
    </is-empty>
  </div>
</template>

<script src="./importcontact.js">
</script>
 

<style lang="less">
.van-button--block {
  display: block;
  width: 90%;
  margin: 20px;
}
.batton_v {
  border-radius: 0;
  position: relative;
  // top: 12px;
  height: 100%;
}
.hiClass {
  height: 100px;
}
.span_lable {
  font-size: 12px;
}
.user-defined-icon {
  margin-right: 5px;
  font-size: 40px;
  color: #1989fa;
}
.van-contact-card-divP {
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
