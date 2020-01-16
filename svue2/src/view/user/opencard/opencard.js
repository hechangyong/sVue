import { Search, Picker, Panel, ActionSheet, List, Toast } from "vant";
import { Stepper } from "vant";
import { Image } from "vant";
import './opencard.less';
export default {
    data() {
        return {
            value: "",
            show: false,
            list: [],
            loading: false,
            finished: false,
            keyword: "", //v-model绑定的输入框的value
            now: -1,
            userinfo: {},
            hasUserInfo: false,
            searchIndex: 0,
            amountCardType: false,
            numberCardType: true,
            myData: [], //用来接收ajax得到的数据
            actions: [
                { name: "次卡" },
                { name: "充值卡" }
                // { name: '选项', subname: '描述信息' }
            ],
            cardType: "次卡",
            cardInfo: {
                totalNumber: 0,
                residueNumber: 0,
                giveNumber: 0,
                totalFee: 0,
                residueFee: 0,
                giveFee: 0
            }
        };
    },
    methods: {
        initcardInfo() {
            this.cardInfo = {
                totalNumber: 0,
                residueNumber: 0,
                giveNumber: 0,
                totalFee: 0,
                residueFee: 0,
                giveFee: 0
            };
        },
        openCard() {
            if (JSON.stringify(this.userinfo) == '{}') {
                Toast("请选择需要充值的用户！");
                return;
            }
            if (this.cardInfo.totalFee == 0) {
                Toast("请填写需要充值的金额！");
                return;
            }
            var obj = {};
            obj.cardInfo = this.cardInfo;
            obj.cardType = this.cardType;
            obj.userid = this.userinfo.id;
            obj.userName = this.userinfo.name;
            this.$axios
                .post(`/baby/u/opencard`, obj)
                .then(res => {
                    if (res.data.code === "0000") {
                        Toast("开卡成功！");
                        this.initcardInfo();
                        this.hasUserInfo = false;
                        this.userinfo = {};
                    } else {
                        console.log("获取商户信息失败：" + res.data.code);
                    }
                })
                .catch(err => {
                    console.log("获取用户信息失败");
                });
        },
        onSearch() {
            this.myData = [];
            var obj = {};
            obj.name = this.value;
            this.$axios
                .post(`/baby/u/getStoreUsers`, obj)
                .then(res => {
                    console.log("res: " + res.data.code);
                    if (res.data.code === "0000") {
                        var user = res.data.attachment;
                        for (var i = 0; i < user.length; i++) {
                            this.myData.push({
                                id: user[i].id,
                                name: user[i].name,
                                nickname: user[i].nickname,
                                phone: user[i].phone,
                                headimgurl: user[i].headimgurl
                            });
                        }
                    } else {
                        console.log("获取商户信息失败：" + res.data.code);
                    }
                })
                .catch(err => {
                    console.log("获取用户信息失败");
                });



            this.finished = true;
        },
        showPopup() {
            this.show = true;
        },
        onSelect(item) {
            this.show = false;
            this.cardType = item.name;
            if (this.cardType == "次卡") {
                this.amountCardType = false;
                this.numberCardType = true;
            } else {
                this.amountCardType = true;
                this.numberCardType = false;
            }
        },
        onChange(picker, value, index) {
            Toast(`当前值：${value}, 当前索引：${index}`);
        },
        // &event是实参，表示event对象
        get: function (ev) {
            // 如果按得键是上或者下，就不进行ajax
            if (ev.keyCode == 38 || ev.keyCode == 40) {
                return;
            }
        },
        selectDown: function () {
            this.now++;
            //到达最后一个时，再按下就回到第一个
            if (this.now == this.myData.length) {
                this.now = 0;
            }
            this.keyword = this.myData[this.now];
        },
        selectUp: function () {
            this.now--;
            //同上
            if (this.now == -1) {
                this.now = this.myData.length - 1;
            }
            this.keyword = this.myData[this.now];
        },
        search: function () {
            //打开对应的搜索界面
            window.open(this.logoData[this.searchIndex].searchSrc + this.keyword);
        },
        selectHover: function (index) {
            this.now = index;
        },
        selectClick: function (index) {
            this.userinfo = {};
            this.keyword = this.myData[index];
            //   this.search();
            this.userinfo = this.myData[index];
            this.hasUserInfo = true;
            this.myData = [];
        },
        clearInput: function () {
            this.keyword = "";
        },
        getIndex: function (index) {
            this.searchIndex = index;
        },

        onLoad() {
            //   // 异步更新数据
            //   setTimeout(() => {
            //     for (let i = 0; i < 10; i++) {
            //       this.list.push(this.list.length + 1);
            //     }
            //     // 加载状态结束
            //     this.loading = false;
            //     // 数据全部加载完成
            //     if (this.list.length >= 10) {
            //       this.finished = true;
            //     }
            //   }, 500);
        }
    },
    components: {
        [Search.name]: Search,
        [ActionSheet.name]: ActionSheet,
        [Panel.name]: Panel,
        [Toast.name]: Toast,
        [List.name]: List,
        [Image.name]: Image,
        [Stepper.name]: Stepper,
        [Picker.name]: Picker
    }
};