<template>
    <div class='item flex-between' :class='type'>
        <div class="label flex-center">
            {{label}}
        </div>
        <div v-if='!value||value.length==0' class='value active'>
            {{placeholder}}
        </div>
        <div v-else-if='Array.isArray(value)' class='family flex' v-show='value.length>0'>
            <p v-for='(item,index) in value' :key="index">
                {{item}}
            </p>
        </div>
        <div class='value active over-text' v-else-if='type=="mobile"'>
            {{value|hidePhone}}
        </div>
        <div class='value active over-text noauth' :class='{auth:value=="已认证"}' v-else-if='type=="name"'>
            {{value}}
        </div>
        <div class='value active over-text' v-else>
            {{value}}
        </div>
    </div>
</template>

<style scoped>
.item {
    line-height: 0.64rem;
    padding: 0.453333rem 5%;
}
.item:last-of-type {
    border: none;
}
.label {
    padding-left: 0.8rem;
    min-width: 30%;
}
.name > .label {
    background: url(../../../../assets/image/renzheng_icon.png) no-repeat left center;
    background-size: 0.433333rem;
}
.mobile > .label {
    background: url(../../../../assets/image/phone_icon.png) no-repeat left center;
    background-size: 0.433333rem;
}
.people > .label {
    background: url(../../../../assets/image/people_icon.png) no-repeat left center;
    background-size: 0.433333rem;
}
.email > .label {
    background: url(../../../../assets/image/email_icon.png) no-repeat left center;
    background-size: 0.433333rem;
}
.address > .label {
    background: url(../../../../assets/image/address_icon.png) no-repeat left center;
    background-size: 0.433333rem;
}
.zhiye > .label {
    background: url(../../../../assets/image/zhiye_icon.png) no-repeat left center;
    background-size: 0.433333rem;
}

.item > .value {
    padding-right: 0.426667rem;
    background: url(../../../../assets/image/arrow1.png) no-repeat right center;
    background-size: 0.213333rem;
    color: #ff5d5d;
    width: 66%;
    text-align: right;
}
.item > .value.active {
    color: #999999;
}
.item > .value.noauth {
    width: 1.973333rem;
    height: 0.853333rem;
    background: rgba(255, 93, 93, 1);
    border-radius: 0.533333rem;
    line-height: 0.853333rem;
    color: #fff;
    text-align: center;
    padding: 0;
}
.item > .value.auth {
    background: rgba(255, 236, 236, 1);
    border-radius: 0.32rem;
    border: 1px solid rgba(255, 93, 93, 1);
    width: 1.653333rem;
    height: 0.64rem;
    line-height: 0.64rem;
    color: rgba(255, 93, 93, 1);
    text-align: center;
    padding: 0;
}
.family > p {
    font-size: 0.32rem;
    color: #4a4a4a;
    background: #f4f4f4;
    border-radius: 0.426667rem;
    height: 0.666667rem;
    line-height: 0.666667rem;
    width: 1.333333rem;
    text-align: center;
    margin-left: 0.133333rem;
}
.family {
    padding-right: 0.426667rem;
    background: url(../../../../assets/image/arrow1.png) no-repeat right center;
    background-size: 0.213333rem;
}
</style>
