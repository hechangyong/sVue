<template>
    <van-coupon-list
      :coupons="coupons"
      :disabled-coupons="disabledCoupons"
      :enabled-title="enabledtitle"
      :disabled-title="disTitle"
      :show-close-button="closeMore"
      :show-exchange-bar="closeMore"
      @change="onChange"
      @exchange="onExchange"
    />
</template>

<script>
import { CouponCell, CouponList,Popup  } from 'vant';
const coupon = {
  available: 1,
  condition: "无使用门槛\n最多优惠12元",
  reason: "reason",
  value: 150,
  name: "优惠券名称",
  startAt: 1489104000,
  endAt: 1514592000,
  valueDesc: "1.5",
  unitDesc: "元"
};

export default {
  data() {
    return {
      enabledtitle:"未结束的订单",
      disTitle:"已完成订单",
      showList: true,
      closeMore:false,
      chosenCoupon: -1,
      disabledCoupons: [coupon],
      coupons: [
                    {
                        id: 1,//优惠券id
                        discount: 0,//折扣券 折值 整数 为0不显示折
                        denominations: 50000,//优惠券金额 单位分
                        // originCondition: 1, //满减规则金额 单位分 为0显示无门槛
                        condition:"订单原始价",
                        value: 12,//折扣券优惠金额，单位分
                        name: '尿不湿（10提）',//优惠券名称
                        description: '描述信息',//描述信息
                        reason: '',	//不可用原因，优惠券不可用时展示
                        startAt: 1489104000,//卡有效开始时间 (时间戳, 单位秒)
                        endAt: 1514592000//卡失效日期 (时间戳, 单位秒)
                    },{
                        id: 2,//优惠券id
                        discount: 1,//折扣券 折值 整数 为0不显示折
                        denominations: 43300,//优惠券金额 单位分
                        // originCondition: 1, //满减规则金额 单位分 为0显示无门槛
                        condition:"订单原始价\n10元",
                        value: 12,//折扣券优惠金额，单位分
                        name: '奶粉（10灌）',//优惠券名称
                        description: '描述信息',//描述信息
                        reason: '',	//不可用原因，优惠券不可用时展示
                        startAt: 1489104000,//卡有效开始时间 (时间戳, 单位秒)
                        endAt: 1514592000//卡失效日期 (时间戳, 单位秒)
                    }
                ] 
    };
  },

  methods: {
    onChange(index) {
      this.showList = true;
      this.chosenCoupon = index;
    },
    onExchange(code) {
      this.coupons.push(coupon);
    }
  },
  components:{
      [CouponCell.name]: CouponCell,
      [CouponList.name]: CouponList,
      [Popup.name]:Popup 
   }
};
</script>  
 