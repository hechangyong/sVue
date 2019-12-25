import { DropdownMenu, DropdownItem, Toast, Card, Button, Sku } from "vant";
import IsEmpty from "@/view/is-empty/";
import vcard from "./component/vcard"
export default {
    data() {
        return {
            hasProducts: true,
            show: false,
            goodsId: 1, 
            activeKey: 0,
            value1: 0,
            value2: "a",
            option1: [
                { text: "全部商品", value: 0 },
                { text: "纸尿片", value: 1 },
                { text: "奶粉", value: 2 },
                { text: "奶壶", value: 3 },
                { text: "宝妈用品", value: 4 },
                { text: "宝宝玩具", value: 5 },
                { text: "宝宝衣物", value: 6 },
                { text: "宝宝辅食", value: 7 },
                { text: "更多", value: 8 }
            ],
            option2: [
                { text: "默认排序", value: "a" },
                { text: "价格排序", value: "b" },
                { text: "销量排序", value: "c" }
            ],
            cardList: []
        };
    },
    mounted() {
        this.init();
        this.getProducts();
    },
    methods: {
        init() {
            var obj = this.$route.params;
            if (obj != undefined && JSON.stringify(obj) != "{}") {
                this.value1 = obj.id;
            } else {
                this.value1 = 0;
            }
        },
        dorpdownchange(value) {
            this.getProducts();
        },
        getProducts() {

            var obj = {};
            obj.page = 1;
            obj.pageSize = 1000;
            if (this.value1 != 0) {
                obj.productTypeId = this.value1;
            }
            this.$axios.post(`/baby/p/getProducts`, obj)
                .then(res => {
                    if (res.data.code == "0000") {
                        this.cardList = [];
                        var tableDataTemp = res.data.attachment.result;
                        for (var i = 0; i < tableDataTemp.length; i++) {
                            var obj = {};
                            var skuType = 0;
                            if (tableDataTemp[i].skuid != "") {
                                skuType = 1;
                            }
                            obj.name = tableDataTemp[i].name;
                            obj.productType = tableDataTemp[i].categoryid;
                            obj.productPrice = tableDataTemp[i].price;
                            obj.vipPrice = tableDataTemp[i].promotionprice;
                            obj.totalInventory = tableDataTemp[i].totalnumber;
                            obj.residueInventory = tableDataTemp[i].residuenumber;
                            obj.skuType = skuType;
                            obj.productStatus = tableDataTemp[i].status;
                            obj.createTime = tableDataTemp[i].itime;
                            obj.productdes = tableDataTemp[i].description;
                            obj.id = tableDataTemp[i].id;
                            obj.imgUrl =  tableDataTemp[i].imgs;
                            this.cardList.push(obj);
                        }
                    } else {
                        console.log(res);
                    }
                })
                .catch(err => {
                    Toast("修改用户手机号码失败！请稍后在试！")
                });
        }

    },
    components: {
        [DropdownMenu.name]: DropdownMenu,
        [DropdownItem.name]: DropdownItem,
        [Button.name]: Button,
        [Sku.name]: Sku,
        [Card.name]: Card,
        [Toast.name]: Toast,
        IsEmpty,
        vcard
    }
};