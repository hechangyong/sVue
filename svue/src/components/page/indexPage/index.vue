<template>
    <div id="page" class="page" ref='page'>
        <div class="view" >
            <div  class='banner'>
                <div class="user-name-box flex flex-center auto">
                  <img src="../../../assets/image/query_icon.png" alt="">
                  <!--<img :src="userDetail.headImgUrl" alt="">-->
                    <!--<img :src="userDetail.headImgUrl" alt="">-->
                    <!--<p>{{userDetail.nickName}}</p>-->
                  <p>何长勇</p>
                </div>
                <div class="inquire-link flex-between auto">
                    <div class='link-item'  @click="toProduct('query')">
                        <img src="../../../assets/image/query_icon.png" alt="">
                        <p>购物清单</p>
                    </div>
                    <div class='link-item'  @click="switchTo('cardList')">
                        <img src="../../../assets/image/card_icon.png" alt="">
                        <p>卡 券</p>
                    </div>
                </div>
            </div>
            <div class="content">
                 <item label="绑定手机" type='mobile'  placeholder="未绑定"  :value='userDetail.bindMobile==1?userDetail.mobile:""' @click.native="switchTo('changephone', {mobile: userDetail.mobile,bindMobile:userDetail.bindMobile})"></item>
            </div>
            <div class="content" >
                 <item label="我的地址" type='address' placeholder="常住地址" :value='userDetail&&addressDetail'   @click.native="jumpTo('changeinfo','address')"></item>
             </div>
         </div>
    </div>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>
