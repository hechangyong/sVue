<template>
  <div>
    <van-coupon-list
      :coupons="coupons"
      :chosen-coupon="chosenCoupon"
      :disabled-coupons="disabledCoupons"
      @change="onChange"
      @exchange="onExchange"
      :show-exchange-bar="false"
      :show-close-button="false"
      :exchange-button-disabled="true"
    />
  </div>
</template>
<script>
import { CouponCell, CouponList, Popup } from "vant";
const coupon = {
  available: 1,
  condition: "",
  reason: "",
  value: 150,
  name: "优惠券",
  startAt: 1489104000,
  endAt: 1514592000,
  valueDesc: "1.5",
  unitDesc: "元"
};
export default {
  data() {
    return {
      showList: true,
      chosenCoupon: -1,
      coupons: [],
      disabledCoupons: []
    };
  },

  methods: {
    onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
    },
    onExchange(code) {
      this.coupons.push(coupon);
    }
  },
  components: {
    [CouponCell.name]: CouponCell,
    [Popup.name]: Popup,
    [CouponList.name]: CouponList
  }
};
</script>