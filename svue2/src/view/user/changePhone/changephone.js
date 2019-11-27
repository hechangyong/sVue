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
            axios.get(`http://www.51diu.xyz/back/auth/getImgCaptcha`)
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