
/* eslint-disable */
import { Tag, CellGroup, Divider, Icon, Stepper, Panel } from 'vant';
import { Dialog, Card, SubmitBar, Toast, SwipeCell, Tabbar } from 'vant';
import { Checkbox, Popup, Cell, AddressList, CheckboxGroup } from "vant";
import { TabbarItem, ContactCard, ContactList, ContactEdit } from "vant";
import IsEmpty from "@/view/is-empty/";
let tools_
export default {
    data() {
        return {
            // tipdes:"你的收货地址不支持同城送, 我们已为你推荐快递",
            tipdes: "下单后我们会尽快与您联系，为您送货，请保持预留手机畅通哦。",
            editAddress: true,
            hasAddress: false,
            goodsId: 1,
            currentAddress: {},
            chosenContactId: null,
            editingContact: {},
            showList: false,
            showEdit: false,
            isEdit: false,
            chosenAddressId: 0,
            addressList: [],
            safeareabottom: true,
            showConfirmButton: false,
            popupShow: false,
            active: 0,
            checked: 1,
            checkedGoods: [],
            goods: [],
            hint: '',
            submitOrderInfo: {}

        };
    },
    mounted() {
        tools_ = this.$tools;
        this.getGoods();
        this.initAddress();
    },
    computed: {
        //     submitBarText() {
        //         const count = this.checkedGoods.length;
        //         return "结算" + (count ? `(${count})` : "");
        //     },

        totalPrice() {
            console.log("totalPrice:" + JSON.stringify(this.checkedGoods));
            console.log("totalPrice:" + JSON.stringify(this.goods));

            return this.goods.reduce(
                (total, item) =>
                    total + (this.checkedGoods.indexOf(item.id) !== -1 ? item.price * item.num : 0),
                0
            );
        },
        cardType() {
            return this.chosenContactId !== null ? "edit" : "add";
        }
    },

    methods: {
        toggle(goodsId) {

        },
        deleteCart(item) {
            console.log(" deleteCart item:" + item.id);
            this.$axios
                .post(`/baby/o/deleteCart/` + item.id)
                .then(res => {
                    if (res.data.code === "0000") {
                        Toast("清空购物车成功！");
                        this.getGoods();
                    }
                })
                .catch(err => {
                    console.log("清除购物车失败！");
                });
        },
        /**
         * 格式化价格
         * @param {价格} price 
         */
        formatPrice(price) {
            return (price / 100).toFixed(2);
        },
        /**
         * 选择货到付款
         */
        notPaySubmit() {
            this.submitOrder(false);
        },
        /**
         * 选择微信付款方式下单
         */
        wxpayOrders() {
            this.submitOrder(true);
        },
        submitOrder(iswxPayFlag) {
            var finallObj = {};
            this.submitOrderInfo = {};
            var finallGoods = [];
            for (var i = 0; i < this.checkedGoods.length; i++) {
                for (var j = 0; j < this.goods.length; j++) {
                    if (this.goods[j].id == this.checkedGoods[i]) {
                        finallGoods.push(this.goods[j]);
                    }
                }
            }
            finallObj.goods = finallGoods;
            finallObj.userAddressVo = this.currentAddress;
            console.log("finallObj:" + JSON.stringify(finallObj));
            this.submitOrderInfo = finallObj;
            this.placeOrder(finallObj, iswxPayFlag);
        },
        onSubmit() {
            if (JSON.stringify(this.currentAddress) == '{}') {
                Toast("请选择收货地址！");
                return;
            }
            this.popupShow = true;

        },
        getGoods() {
            this.goods = [];
            this.$axios
                .post(`/baby/o/getShoppingCartList`)
                .then(res => {
                    console.log("res.data.code: " + JSON.stringify(res));
                    if (res.data.code === "0000") {
                        var shopList = res.data.attachment;
                        this.goods = shopList;
                    }
                })
                .catch(err => {
                    console.log("获取用户购物车列表失败！");
                });
        },
        placeOrder(obj, iswxPayFlag) {
            Toast.loading({
                duration: 0, // 持续展示 toast
                forbidClick: true,
            });
            this.$axios
                .post(`/baby/o/placeOrder`, obj)
                .then(res => {
                    console.log("res.data.code: " + res.data.attachment);
                    if (res.data.code === "0000") {
                        Toast.clear();
                        if (iswxPayFlag) {
                            var orderId = res.data.attachment;
                            this.payMoney(orderId);
                        } else {
                            this.toPayResultPage(false, res.data.attachment);
                            // this.$router.push({
                            //     name: "successPay",
                            //     params: {
                            //         name: obj.userAddressVo.userName,
                            //         tel: obj.userAddressVo.tel,
                            //         addressDetail: obj.userAddressVo.addressDetail,
                            //         payedInfoPrice: this.totalPrice,
                            //         iswxPayFlag: false
                            //     }
                            // });
                        }

                    } else {
                        Toast.clear();
                        Toast(res.data.message);
                    }
                })
                .catch(err => {
                    Toast("下单失败，请联系管理员！");
                });
        },
        // 预支付
        payMoney(code) {
            let vm = this
            try {
                return new Promise((resolve, reject) => {
                    let openId = tools_.parseUrl('oid');
                    this.$axios.get('/wechat/pay/zmbaby/pre/' + code + '?openId=' + openId).then(res => {
                        console.log('pre:', res);
                        if (res.status === 200) {
                            if (res.data.status === 200) {
                                this.requestWechatPay(res.data.entity, code);
                            }
                            else {
                                this.set_hint_txt('调取支付失败,请重新支付', 3);
                                // this.showPrice();
                                console.log("预支付成功，支付失败！");
                                this.toPayResultPage(true, code,false);
                            }
                        }
                        else {
                            this.set_hint_txt('调取支付失败,请重新支付', 3);
                            // this.showPrice();
                            console.log("预支付失败，支付失败！");
                            this.toPayResultPage(true, code,false);

                        }
                    });
                }).catch(err => {
                    console.log("-------------------------");
                    this.toPayResultPage(true, code,false);
                });
            }
            catch (err) {
                reject(err);
                this.set_hint_txt('调取支付失败,请重新支付', 3);
                // this.showPrice();
                this.toPayResultPage(true, orderId, false );

            }
        },
        // 支付
        requestWechatPay(opt, orderId) {
            let vm = this
            return new Promise((resolve, reject) => {
                if (WeixinJSBridge) {
                    WeixinJSBridge.invoke(
                        'getBrandWCPayRequest', {
                        "appId": opt.appid, //公众号名称，由商户传入     
                        "timeStamp": opt.timeStamp, //时间戳，自1970年以来的秒数     
                        "nonceStr": opt.nonce_str, //随机串     
                        "package": opt.packageStr,
                        "signType": "MD5", //微信签名方式：     
                        "paySign": opt.sign //微信签名 
                    },
                        (res) => {
                            console.log('invoke:', res)
                            if (res.err_msg == "get_brand_wcpay_request:ok") {
                                // 使用以上方式判断前端返回,微信团队郑重提示：
                                //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                                resolve();
                                // this.$router.push('/paysuccess')
                                this.toPayResultPage(true, orderId,true,'');
                            } else {
                                reject('payfail')
                                this.set_hint_txt('调取支付失败,请重新支付', 3)
                                // this.showPrice()
                                this.toPayResultPage(true, orderId, false);
                            }
                        });
                } else {
                    reject('请在微信端支付');
                    this.set_hint_txt('调取支付失败,请重新支付', 3)
                    this.toPayResultPage(true, orderId,false);
                    // this.showPrice()
                }
            })
        },
        /**
         * 跳转下单成功页面
         * @param {是否走了微信支付} iswxPayFlag 
         * @param {订单id} oid 
         * @param {微信支付状态} payStatus 
         * @param {失败信息} err_msg 
         */
        toPayResultPage(iswxPayFlag, oid, payStatus) {
            this.popupShow = false;
            this.$router.push({
                name: "successPay",
                params: {
                    oid: oid,
                    payStatus: payStatus,
                    iswxPayFlag: iswxPayFlag
                }
            });
        },
        set_hint_txt(val, time) {
            this.popupShow = false;
            const toast = Toast.loading({
                duration: 0, // 持续展示 toast
                forbidClick: true,
                message: val
            });

            let second = time;
            const timer = setInterval(() => {
                second--;
                if (second) {
                    toast.message = val;
                } else {
                    clearInterval(timer);
                    // 手动清除 Toast
                    Toast.clear();
                }
            }, 1000);
        },
        initAddress() {
            this.$axios
                .post(`/baby/u/getUserAddress`)
                .then(res => {
                    console.log("res.data.code: " + res.data.code);
                    if (res.data.code === "0000") {
                        var useraddress = res.data.attachment;
                        var taddressList = [];
                        for (var i = 0; i < useraddress.length; i++) {
                            var obj = {};
                            obj.id = useraddress[i].id;
                            obj.name = useraddress[i].name;
                            obj.tel = useraddress[i].mobile;
                            obj.address = useraddress[i].addressdetail;
                            obj.areacode = useraddress[i].areacode;
                            console.log("obj: " + JSON.stringify(obj));
                            taddressList.push(obj);
                        }
                        this.addressList = taddressList;
                    }
                })
                .catch(err => {
                    console.log("获取用户地址信息失败");
                });
        },
        /**
         * 添加联系人地址
         */
        onAdd() {
            this.$router.push({
                name: "editAddress",
                params: {
                    name: "",
                    tel: "",
                    addressDetail: "",
                    frompage: "shoppingcart"
                }
            });
        },

        onEdit(item, index) {
            console.log("areaCode: " + JSON.stringify(item));
            this.$router.push({
                name: "editAddress",
                params: {
                    id: item.id,
                    name: item.name,
                    tel: item.tel,
                    addressDetail: item.address,
                    areacode: item.areacode,
                    frompage: "shoppingcart"
                }
            });
        },
        // 选中联系人
        onSelect(item, index) {
            console.log("onSelect: " + JSON.stringify(item));

            this.currentAddress = {
                id: item.id,
                name: item.name + "  " + item.tel,
                tel: item.tel,
                addressDetail: item.address,
                userName: item.name
            };
            this.editAddress = false;
            this.hasAddress = true;

            this.chosenContactId = item.id;
            this.showList = false;
        },

        // 保存联系人
        onSave(info) {
            this.showEdit = false;
            this.showList = false;

            if (this.isEdit) {
                this.list = this.list.map(item => (item.id === info.id ? info : item));
            } else {
                this.list.push(info);
            }
            this.chosenContactId = info.id;
        },

        // 删除联系人
        onDelete(info) {
            this.showEdit = false;
            this.list = this.list.filter(item => item.id !== info.id);
            if (this.chosenContactId === info.id) {
                this.chosenContactId = null;
            }
        }

    }, components: {
        [Tag.name]: Tag,
        [Card.name]: Card,
        [Checkbox.name]: Checkbox,
        [SubmitBar.name]: SubmitBar,
        [CheckboxGroup.name]: CheckboxGroup,
        [Tabbar.name]: Tabbar,
        [TabbarItem.name]: TabbarItem,
        [ContactCard.name]: ContactCard,
        [ContactList.name]: ContactList,
        [Popup.name]: Popup,
        [ContactEdit.name]: ContactEdit,
        [AddressList.name]: AddressList,
        [Cell.name]: Cell,
        [Divider.name]: Divider,
        [Stepper.name]: Stepper,
        [SwipeCell.name]: SwipeCell,
        [CellGroup.name]: CellGroup,
        [Icon.name]: Icon,
        [Dialog.Component.name]: Dialog.Component,
        [Panel.name]: Panel,
        IsEmpty
    }
}

