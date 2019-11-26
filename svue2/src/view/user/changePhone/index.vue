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
                    <van-button  @click="showPopup" slot="button" size="big"   color="#1989fa" plain>发送验证码</van-button>
                </van-field>
            </van-cell-group>   
            <van-button class="buttonclass-next" round type="info">下一步</van-button>
        </div>
         
    </div>
</template>

<script>
 import { Field,Button,Cell,CellGroup,Popup,Icon  } from 'vant';
 import axios from 'axios'

 export default {
    data(){
        return {
            nobind : 1,
            show: false,
            captchaCode:"",
            captchaImg:"",
            value:1,
            VerificationImg:"",//图形验证码链接
            ruleForm:{
                code: true
            }
        }
    },  
    mounted() {
        this.imgUrls(0.1)
    },
    methods : {
        changeBind: function(bindId) {
            console.log("bindId: "+ bindId)
            if(bindId == 1){
                this.nobind = 2
            }
        },
        //获取验证码
        clickVerification(){
            var num = Math.random();
            this.imgUrls(num)
        },
        imgUrls(num){
            console.log("获取图形验证码")
            axios.get(`http://www.51diu.xyz/back/auth/getImgCaptcha?`+num)
                .then(res => {
                    console.log(res)
                    if (res.data.code === "0000") {
                        this.captchaImg =
                            "data:image/jpeg;base64," + res.data.attachment;
                    } else {
                        console.log("获取验证码失败-----");
                    }
                })
                .catch(err => {
                    console.log("获取验证码失败");
                });
            
        },
        showPopup() {
            this.show = true;
        },
        sendSmsCode: (function() {
            var lock = false;

            return function() {
                if (lock) {
                    return;
                }

                if (!this.captchaCode) {
                    this.$message.toast("请输入图形验证码");
                    return;
                }

                this.$http
                    .get(
                        `/cms/api/authCode/sms/send/${this.mobile}/${
                            this.captchaCode
                        }` 
                    )
                    .then(res => {
                        lock = false;
                        if (res.data.code == "0") {
                            this.createCaptcha();
                             this.captchaCode='';
                            this.$emit("sendSmsSuccess"); 
                        } else {
                            console.log(res);
                            this.$message.toast(res.data.errorMsg);
                            this.captchaCode = "";
                            this.createCaptcha();
                        }
                    })
                    .catch(err => {
                        lock = false;
                        this.$emit("input", false);
                        this.$message.toast("网络异常");
                    });
            };
        })(),
        isPhoneNo(tel) {
            var pattern = /^1[23456789]\d{9}$/;
            return pattern.test(tel);
        }
    }, 
    components: {
        [Field.name]: Field,
        [Icon.name]: Icon,
        [Popup.name]: Popup,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
        [Button.name]:Button        
    }

}
</script>
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
}
.buttonclass-next {
    border: solid 1px #e0eefc;
    background-color: #cad8e6;
    margin-top: 50px;
    width: 90%;
    margin-left: 20px;
    border-radius : 700px;
    font-size: 14px;
}
.van-cell-reload {
    line-height:34px;
    font-size: 14px;
}
</style>