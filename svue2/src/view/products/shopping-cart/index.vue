<template>
  <div>
    <van-cell v-if="editAddress" title="添加收货地址" @click="showList = true" :center="true" is-link>
      <van-icon slot="icon" name="add-square" class="user-defined-icon" />
    </van-cell>

		<!-- <van-cell icon="dingwei" isLink title="张三  13512124547" label="浙江省 杭州市 西湖区 创新创业园dasdasdasdasdasdas" /> -->

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

    <van-checkbox-group class="card-goods" :id="goodsId" v-model="checkedGoods" ref="checkboxGroup">
      <van-checkbox class="card-goods__item" v-for="item in goods" :key="item.id" :name="item.id">
        <van-card
          :title="item.title"
          :desc="item.desc"
          :num="item.num"
          :price="formatPrice(item.price)"
          :thumb="item.thumb"
          @click="toggle()"
        />
      </van-checkbox>
    </van-checkbox-group>

    <van-submit-bar
      :price="totalPrice"
      :safe-area-inset-bottom="safeareabottom"
      :disabled="!checkedGoods.length"
      button-text="提交订单"
      tip="你的收货地址不支持同城送, 我们已为你推荐快递"
      tip-icon="info-o"
      @submit="onSubmit"
    >
      <van-checkbox v-model="checked" @click="checkAll">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script src="./importcontact.js">
</script>
 

<style lang="less">
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
