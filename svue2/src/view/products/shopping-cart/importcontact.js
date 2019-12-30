
/* eslint-disable */
import {
    Checkbox,
    CheckboxGroup,
    Card,
    SubmitBar,
    Toast,
    Tabbar,
    TabbarItem,
    ContactCard,
    ContactList,
    ContactEdit,
    Popup,
    AddressList,
    Cell,
    CellGroup,
    Divider,
    Icon,
    Stepper,
    SwipeCell,
    Panel
} from "vant";
import IsEmpty from "@/view/is-empty/";
export default {
    components: {
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
        [Panel.name]: Panel,
        IsEmpty
    },
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
            active: 0,
            checked: 1,
            checkedGoods: [],
            goods: [
                // {
                //     id: "1",
                //     title: "进口香蕉",
                //     desc: "约250g，2根",
                //     price: 200,
                //     num: 1,
                //     thumb:
                //         "https://img.yzcdn.cn/public_files/2017/10/24/2f9a36046449dafb8608e99990b3c205.jpeg"
                // } 
            ]
        };
    },
    mounted() {
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

            console.log("goodsId:" + goodsId);
            console.log("checkedGoods:" + JSON.stringify(this.checkedGoods));
            console.log("checkedGoods:" + JSON.stringify(this.goods));

        },
        deleteCart(item) {
            console.log("item:" + JSON.stringify(item));
            this.goods.splice(item, 1);
        },
        /**
         * 格式化价格
         * @param {价格} price 
         */
        formatPrice(price) {
            return (price / 100).toFixed(2);
        },

        onSubmit() {
            if (JSON.stringify(this.currentAddress) == '{}') {
                Toast("请选择收货地址！");
                return;
            }
            var finallObj = {};
            var finallGoods = [];
            console.log("checkedGoods:" + JSON.stringify(this.checkedGoods));
            console.log("checkedGoods:" + JSON.stringify(this.goods));
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
            this.placeOrder(finallObj);

        },
        getGoods() {
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
        placeOrder(obj) {
            Toast.loading({
                duration: 0, // 持续展示 toast
                forbidClick: true,
            });
            this.$axios
                .post(`/baby/o/placeOrder`, obj)
                .then(res => {
                    console.log("res.data.code: " + res.data.code);
                    if (res.data.code === "0000") {
                        Toast.clear();
                        this.$router.push({
                            name: "successPay",
                            params: {
                                name: obj.userAddressVo.userName,
                                tel: obj.userAddressVo.tel,
                                addressDetail: obj.userAddressVo.addressDetail,
                                payedInfoPrice: this.totalPrice
                            }
                        });
                    } else {
                        Toast.clear(); 
                        Toast(res.data.message);
                    }
                })
                .catch(err => {
                    Toast("下单失败，请联系管理员！");
                });
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
    }
}

