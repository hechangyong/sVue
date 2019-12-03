<template>
  <div>
    <div v-if="nobind==1">
      <van-cell-group>
        <van-field
          class="van-cell-reload"
          :value="userinfo.phone"
          label="手机号"
          input-align="right"
          left-icon="phone-o"
          disabled
        />
      </van-cell-group>
      <van-button v-on:click="changeBind(1)" class="buttonclass" round type="info">修改手机号码</van-button>
    </div>
    <div v-else-if="nobind==2">
      <van-cell-group>
        <van-field
          class="van-cell-reload"
          label="新手机号"
          @focus="new_phone_focus"
          :error-message="error_phone_message"
          @blur="on_newphone_blur"
          @input="input_newPhone"
          left-icon="phone-o"
          placeholder="手机号码"
        />
        <van-field
          center
          label="图形验证码"
          @input="input_img_captcha"
          left-icon="photo-o"
          placeholder="图形验证码"
        >
          <van-button @click="imgUrls" slot="button" size="small" color="#1989fa" plain>
            <img class="imageStyle" :src="captchaImg" />
          </van-button>
        </van-field>
        <van-field
          center
          :value="aaaa"
          @input="onInput"
          label="短信验证码"
          left-icon="comment-circle-o"
          placeholder="短信验证码"
        >
          <van-button @click="getSmsCode" slot="button" size="small" color="#1989fa" plain>发送验证码</van-button>
        </van-field>
      </van-cell-group>
      <van-button
        class="buttonclass-next"
        @click="sendSmsCode_new"
        round
        type="info"
      >{{changePhoneText}}</van-button>
    </div>
  </div>
</template>

<script src="./changephone.js"></script> 
<style scoped>
.imageStyle {
  height: 28px;
  width: 60px;
}
.Verification {
  width: 160px;
  height: 40px;
  background: #ccc;
  float: left;
  margin-left: 20px;
}
.buttonclass {
  margin-top: 50px;
  width: 90%;
  margin-left: 20px;
  /* width: -webkit-fill-available; */
  border-radius: 700px;
  font-size: 14px;
  background-color: rgb(250, 85, 85);
  border: 1px solid #fb3636;
}
.buttonclass-next {
  /* border: solid 1px #e0eefc;
    background-color: #cad8e6;*/
  margin-top: 50px;
  width: 90%;
  margin-left: 20px;
  border-radius: 700px;
  font-size: 14px;
  background-color: rgb(250, 85, 85);
  border: 1px solid #fb3636;
}
.van-cell-reload {
  line-height: 34px;
  font-size: 14px;
}
.fontclass {
  text-align: right;
}
</style>