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
            smsTxt: "发送验证码",
            b_disabled: false,
            lock: false,
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
        onsmsInput(value) {
            console.log("onInput: " + value)
            this.captchaCode = value;
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
        changeUserPhone() {
            console.log("this.captchImgCode: " + this.captchImgCode)
            var isphone = this.isPhoneNo(this.newPhone);
            if (!isphone) {
                this.error_phone_message = '请输入正确的手机号码！';
            }
            if (this.captchImgCode == '' || this.captchImgCode == undefined) {
                Toast("请输入图形验证码 " + this.captchImgCode);
                return;
            }
            console.log("修改用户手机号码")
            this.$axios
                .post(`/babyroom/auth/changeUserPhone/${this.newPhone}/${this.captchaCode}`)
                .then(res => {
                    if (res.data.code == "0000") {
                        this.imgUrls(0.111);
                         
                    } else {
                        console.log(res);
                        // Toast("用户手机号码修改失败！")
                        this.imgUrls(0.111);
                    }
                })
                .catch(err => {
                    Toast("短信发送失败！请稍后在试！")
                    // lock = false;
                    // this.$emit("input", false);
                    // this.$message.toast("网络异常");
                });
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
            if (this.lock) return;
            this.b_disabled = true;
            console.log("this.captchImgCode: " + this.captchImgCode)
            var isphone = this.isPhoneNo(this.newPhone);
            if (!isphone) {
                this.error_phone_message = '请输入正确的手机号码！';
            }
            if (this.captchImgCode == '' || this.captchImgCode == undefined) {
                Toast("请输入图形验证码 " + this.captchImgCode);
                return;
            }
            this.countDown();
            this.$axios
                .get(`/babyroom/auth/sendCaptcha/${this.newPhone}/${this.captchImgCode}`)
                .then(res => {
                    if (res.data.code == "0000") {
                        this.imgUrls(0.111);
                        Toast("短信发送成功！请注意查收！")

                    } else {
                        console.log(res);

                        Toast("短信发送失败！请稍后在试！")
                        this.imgUrls(0.111);

                    }
                })
                .catch(err => {
                    Toast("短信发送失败！请稍后在试！")
                    // lock = false;
                    // this.$emit("input", false);
                    // this.$message.toast("网络异常");
                });
        },
        countDown: function (_callback) {

            var t = 60,
                _this = this;
            var run = function () {
                _this.currentValue = _this.value;
                _this.smsTxt = `重新获取${t}s`;

                if (t >= 0) {
                    _this.b_disabled = true;
                    t--;
                    setTimeout(() => {
                        run();
                    }, 1000);
                } else {
                    _this.lock = false;
                    _this.b_disabled = false;
                    _callback && _callback();
                    _this.smsTxt = "发送验证码";
                }
            };

            _this.lock = true;
            run();
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