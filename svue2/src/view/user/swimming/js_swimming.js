import { Step, Steps, Row, Col, Switch, Dialog, Toast } from "vant";
import IsEmpty from "@/view/is-empty/";
let tools_
export default {
    name: "item",
    data() {
        return {
            qcCodeImg: "../../../assets/images/user/qcode.png",
            hasSwimmingData: false,
            swingOrShowTitle: "游泳",
            checked: false,
            showbig: 2,
            text_total: "",
            text_residue: "",
            html_record_step: "",
            record_list: [],
            shower_qc_image: "",
            swimming_qc_image: "",
            cardInfo: {
                userid: 0,
                username: "",
                cardno: "",
                cardname: "",
                cardtype: "",
                totalnumber: 0,
                residuenumber: 0,
                totalfee: 0,
                residuefee: 0,
                status: "",
                expiretime: "",
                itime: new Date(),
                countNumber: 0
            }
        };
    },
    created() {
        tools_ = this.$tools;
        this.cardInfo.userid = this.$route.params.id;
        this.initUserQcCode();
        this.initUserCardInfo();
        this.initBabySwimmingRecord();
    },
    mounted() {
        Toast.loading({
            message: "加载中...",
            forbidClick: true,
            loadingType: "spinner"
        });
    },
    methods: {
        initBabySwimmingRecord() {
            this.$axios
                .post(
                    `/baby/u/getbabySwimmingRecord`
                )
                .then(res => {
                    if (res.data.code == "0000") {
                        Toast.clear();
                        var recordList = res.data.attachment;
                        if (recordList != null && recordList.length > 0) {
                            this.hasSwimmingData = true;

                            for (var j = 0; j < recordList.length; j++) {
                                var obj = {};
                                var type = recordList[j].type;
                                var typeText = "";
                                if (type == 1) {
                                    typeText = "【洗澡】 此次消费 " + recordList[j].spend + "元";
                                } else {
                                    typeText = "【游泳】 此次消费 " + recordList[j].spend + "元";
                                }
                                obj.typeText = typeText;
                                obj.time = tools_.formatDate(recordList[j].itime);
                                this.record_list.push(obj);
                            }
                            console.log("this.record_list  : " + this.record_list);
                        }
                        console.log("初始化用户卡信息 : " + JSON.stringify(this.cardInfo));

                    } else {
                        console.log(res);
                    }
                })
                .catch(err => { });
        },
        initUserCardInfo() {
            console.log("初始化用户卡信息");
            this.$axios
                .post(
                    `/baby/u/getbabySwimminginfo`
                )
                .then(res => {
                    if (res.data.code == "0000") {
                        var obj = res.data.attachment;
                        this.cardInfo = obj;
                        this.text_total = "总金额: " + this.cardInfo.totalfee + " 元";
                        if (this.cardInfo.cardtype != undefined && this.cardInfo.cardtype != null) {
                            switch (this.cardInfo.cardtype) {
                                case "1":
                                    this.text_residue = "剩余金额: " + this.cardInfo.residuefee + " 元";
                                    break;
                                case "0":
                                    this.text_residue = "剩余次数: " + this.cardInfo.residuenumber + " 次";
                                    break;
                                default:
                                    this.text_total = "总金额:  0 元";
                                    this.text_residue = "剩余金额: 0 元";

                            }
                        }

                    } else {
                        console.log(res);
                    }
                })
                .catch(err => { });
        },
        initUserQcCode() {
            console.log("获取用户二维码");
            var sceneStr = this.cardInfo.userid + "_"
            if (this.checked) {
                sceneStr = sceneStr + "_1"
            } else {
                sceneStr = sceneStr + "_2"
            }

            this.$axios
                .get(
                    `http://babyroom.hecy.top/wechat/qrcode/babyroom/create-qrcode?sceneStr=` + sceneStr + `&expireSeconds=10000`
                )
                .then(res => {
                    console.log(JSON.stringify(res));
                    if (res.data.returnCode == "200") {
                        this.qcCodeImg = res.data.value;

                    } else {
                    }
                })
                .catch(err => { });
        },
        showBigImage() {
            this.showbig = 1;
        },
        smallimg() {
            this.showbig = 2;
        },
        onChange(checked) {
            if (checked) {
                this.swingOrShowTitle = "洗澡";
                this.initUserQcCode();
            } else {
                this.swingOrShowTitle = "游泳";
                this.initUserQcCode();
            }
        },
        onClick() {
            if (this.checked) {
                this.checked = false;
            } else {
                this.checked = true;
            }
        }
    },
    filters: {
        parseType(cardtype) {
            // 0-次卡 1-充值卡
            if (cardtype != undefined) {
                switch (cardtype) {
                    case "1":
                        return "充值卡";
                    case "0":
                        return "次卡";
                    default:
                        return "未知类型卡";
                }
            }
        },
        formatdate(date) {
            return tools_.formatDate(date, "YY-MM-DD")
        }
    },
    components: {
        [Step.name]: Step,
        [Dialog.name]: Dialog,
        [Row.name]: Row,
        [Col.name]: Col,
        [Switch.name]: Switch,
        [IsEmpty.name]: IsEmpty,
        [Toast.name]: Toast,
        [Steps.name]: Steps
    }
};