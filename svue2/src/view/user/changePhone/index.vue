<template>
    <div>
        <div  v-if='nobind==1'>
            <van-cell-group>
            <van-field class="van-cell-reload"
                value="手机号码"
                label="手机号"
                left-icon="phone-o"
                disabled
            />
            </van-cell-group>   
            <van-button v-on:click="changeBind(1)" class="buttonclass" round type="info">修改手机号码</van-button>
        </div>
        <div  v-else-if='nobind==2'>
            <van-cell-group>
                <van-field class="van-cell-reload"
                    label="新手机号"
                    left-icon="phone-o"
                    placeholder="手机号码"
                /> 
                 
                <van-field
                    center
                    clearable
                    label="图形验证码"
                    left-icon="photo-o"
                    placeholder="请输入图形验证码"
                >
                    <van-button  @click="imgUrls" slot="button" size="big"  color="#1989fa" plain>
                            <img class="imageStyle" :src="captchaImg" />
                    </van-button>
                
                </van-field>
                <van-field
                    center
                    clearable
                    label="短信验证码"
                    left-icon="comment-circle-o"
                    placeholder="请输入短信验证码"
                >
                    <van-button  @click="clickVerification" slot="button" size="big"   color="#1989fa" plain>发送验证码</van-button>
                </van-field>
            </van-cell-group>   
            <van-button class="buttonclass-next" round type="info">修改手机号码</van-button>
        </div>
         
    </div>
</template>

<script src="./changephone.js"></script> 
<style scoped>
.imageStyle {
    height: 42px;
    width: 80px;
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
    border-radius : 700px;
    font-size: 14px;
    background-color:rgb(250, 85, 85);
    border: 1px solid #fb3636;
}
.buttonclass-next {
    /* border: solid 1px #e0eefc;
    background-color: #cad8e6;*/
    margin-top: 50px;
    width: 90%;
    margin-left: 20px;
    border-radius : 700px;
    font-size: 14px;
    background-color:rgb(250, 85, 85);
    border: 1px solid #fb3636;
}
.van-cell-reload {
    line-height:34px;
    font-size: 14px;
}
</style>