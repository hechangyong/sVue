import { Popup, Icon, Toast } from 'vant';

export default {
    data() {
        return {
            userinfo: {
                id: 0,
                phone: ""
            },
            changePhoneText: "修改手机号码",
            nobind: 1,
            aaaa: "",
            newPhone: "",
            captchaCode: "",
            error_phone_message: "",
            captchImgCode: "",
            captchaImg: "",
            value: 1,
            VerificationImg: "",//图形验证码链接
            ruleForm: {
                code: true
            }
        }
    },
    mounted() {
        this.imgUrls(0.1);
        this.init();
    },
    methods: {
        init() {
            var obj = this.$route.params;
            console.log("changephone: " + JSON.stringify(obj))
            if (obj != undefined) {
                this.userinfo.id = obj.id;
                this.userinfo.phone = obj.phone;
            }
            if (this.userinfo.phone == undefined) {
                this.nobind = 2;
                this.changePhoneText = "添加手机号码"
            }
        },
        new_phone_focus() {
            this.error_phone_message = '';
            this.newPhone = ""
        },
        on_newphone_blur() {
            var isphone = this.isPhoneNo(this.newPhone);
            console.log("this.newPhone: " + this.newPhone)
            if (!isphone && this.newPhone != '' && this.newPhone != undefined) {
                this.error_phone_message = '请输入正确的手机号码！';
            };
        },
        input_newPhone(value) {
            this.newPhone = value;
        },
        input_img_captcha(value) {
            this.captchImgCode = value;
        },
        onInput(value) {
            console.log("onInput: " + value)
            this.aaaa = value;
        },
        changeBind: function (bindId) {
            console.log("bindId: " + bindId)
            if (bindId == 1) {
                this.nobind = 2
            }
        },
        //获取验证码
        clickVerification() {
            var num = Math.random();
            this.imgUrls(num)
        },
        imgUrls(num) {
            console.log("获取图形验证码")
            this.$axios.get(`/babyroom/auth/getImgCaptcha`)
                .then(res => {
                    console.log(res)
                    if (res.data.code === "0000") {
                        this.captchaImg =
                            "data:image/jpeg;base64," + res.data.attachment;
                    } else {
                        console.log("获取验证码失败");
                    }
                })
                .catch(err => {
                    console.log("获取验证码失败");
                });

        },
        getSmsCode() {
            console.log("this.captchImgCode: " + this.captchImgCode)
             var isphone = this.isPhoneNo(this.newPhone);
            if (!isphone) {
                this.error_phone_message = '请输入正确的手机号码！';
            }
            if (this.captchImgCode == '' || this.captchImgCode == undefined) {
                Toast("请输入图形验证码 "+ this.captchImgCode);
                return;
            }
            this.$axios
            .get( `/babyroom/auth/sendCaptcha/${this.newPhone}/${this.captchImgCode}`)
            .then(res => {
                if (res.data.code == "0000") {
                    this.imgUrls(0.111);
                    Toast("短信发送成功！请注意查收！")
                } else {
                    console.log(res);
                    this.$message.toast(res.data.errorMsg);
                    this.captchImgCode = "";
                    this.imgUrls(0.111);
                }
            })
            .catch(err => {
                // lock = false;
                this.$emit("input", false);
                this.$message.toast("网络异常");
            });
        },
        sendSmsCode_new(event) {
            
            
        },
        isPhoneNo(tel) {
            var pattern = /^1[23456789]\d{9}$/;
            return pattern.test(tel);
        }
    },
    components: {
        [Icon.name]: Icon,
        [Toast.name]: Toast,
        [Popup.name]: Popup
    }

}