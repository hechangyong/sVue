
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
    Panel
} from "vant";

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
        [Stepper.name]: Stepper ,
        [CellGroup.name]: CellGroup,
        [Icon.name]: Icon,
        [Panel.name]: Panel
    },
    data() {
        return {
            // tipdes:"你的收货地址不支持同城送, 我们已为你推荐快递",
            tipdes:"下单后我们会尽快与您联系，为您送货，请保持预留手机畅通哦。",

            editAddress: true,
            hasAddress: false,

            goodsId: 1,
            currentAddress: {
                name: "",
                tel: "",
                addressDetail: ""
            },
            chosenContactId: null,
            editingContact: {},
            showList: false,
            showEdit: false,
            isEdit: false,
            chosenAddressId: 1,

            addressList: [
                {
                    id: 1,
                    name: "张三",
                    tel: "13000000000",
                    address: "安徽省合肥市肥东县文艺名都小区40#2902",
                    areacode: "340122"
                },
                {
                    id: 2,
                    name: "张三",
                    tel: "13000000000",
                    address: "合肥市好好哦啊山东阿萨德",
                    areacode: "340122"
                }
            ],
            safeareabottom: true,
            active: 0,
            checked: 1,
            checkedGoods: ["1", "2", "3"],
            goods: [
                {
                    id: "1",
                    title: "进口香蕉",
                    desc: "约250g，2根",
                    price: 200,
                    num: 1,
                    thumb:
                        "https://img.yzcdn.cn/public_files/2017/10/24/2f9a36046449dafb8608e99990b3c205.jpeg"
                },
                {
                    id: "2",
                    title: "陕西蜜梨",
                    desc: "约600g",
                    price: 690,
                    num: 1,
                    thumb:
                        "https://img.yzcdn.cn/public_files/2017/10/24/f6aabd6ac5521195e01e8e89ee9fc63f.jpeg"
                },
                {
                    id: "3",
                    title: "美国伽力果",
                    desc: "约680g/3个",
                    price: 2680,
                    num: 1,
                    thumb:
                        "https://img.yzcdn.cn/public_files/2017/10/24/320454216bbe9e25c7651e1fa51b31fd.jpeg"
                }
            ]
        };
    },

    computed: {
        submitBarText() {
            const count = this.checkedGoods.length;
            return "结算" + (count ? `(${count})` : "");
        },

        totalPrice() {
            return this.goods.reduce(
                (total, item) =>
                    total + (this.checkedGoods.indexOf(item.id) !== -1 ? item.price : 0),
                0
            );
        },
        cardType() {
            return this.chosenContactId !== null ? "edit" : "add";
        }
    },

    methods: {
        toggle() {
            console.log("this.checkedGoods.length: " + this.checkedGoods.length);
            console.log("this.goods.length: " + this.goods.length);
            if (this.checkedGoods.length == (this.goods.length - 1)) {
                this.checked = 1;
                this.goodsId = 1;
            } else {
                this.checked = 0;
                this.goodsId = 0;
            }
        },
        touchinUk(index) {
            console.log(index)
            clearInterval(this.Loop); //再次清空定时器，防止重复注册定时器
            this.Loop = setTimeout(function() {
                this.$dialog.confirm({
                    message: '是否删除'
                }).then(() => {
                    console.log("删除")
                    this.arr.splice(index, 1);
                }).catch(() => {
                    // on cancel
                    console.log("不删")
                });
        
        
            }.bind(this), 1000);
        },
        cleartime(index) {
            // 这个方法主要是用来将每次手指移出之后将计时器清零
            clearInterval(this.Loop);
        }, 
        checkAll() {
            if (this.goodsId == 0) {
                this.$refs.checkboxGroup.toggleAll(true);
                this.goodsId = 1;
            } else {
                this.$refs.checkboxGroup.toggleAll();
                this.goodsId = 0;
            }
        },
        formatPrice(price) {
            return (price / 100).toFixed(2);
        },

        onSubmit() {
            Toast("点击结算");
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
                name: item.name+"  " + item.tel,
                tel: item.tel,
                addressDetail: item.address
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

