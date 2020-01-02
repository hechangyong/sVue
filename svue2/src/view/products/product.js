import "./products_css_style.less";
import IsEmpty from "@/view/is-empty/";
import { Image, Tabbar, TabbarItem } from "vant";
import { Swipe, SwipeItem, Grid, GridItem } from "vant";
export default {
    data() {
        return {
            safeareabottom: true,
            hasRecommendGoods: true,
            border: false,
            active: 0,
            goods: {
                title: "金摇篮产品导航",
                title2: "金摇篮特色产品区",
                thumb: [
                    "http://babyroom.hecy.top/img/1.jpg",
                    "http://babyroom.hecy.top/img/2.jpg",
                    "http://babyroom.hecy.top/img/3.jpg",
                    "http://babyroom.hecy.top/img/4.jpg"
                ],
                btnList: [
                    {
                        id: 1,
                        text: "纸尿片",
                        icon:
                            "http://babyroom.hecy.top/img_external/products/icon_b_diaper.png",
                        to: "/category"
                    },
                    {
                        id: 2,
                        text: "奶粉",
                        icon:
                            "http://babyroom.hecy.top/img_external/products/icon_b_milk.png",
                        to: "/category"
                    },
                    {
                        id: 3,
                        text: "奶壶",
                        icon:
                            "http://babyroom.hecy.top/img_external/products/icon_b_milkpot.png",
                        to: "/category"
                    },
                    {
                        id: 4,
                        text: "宝妈用品",
                        icon:
                            "http://babyroom.hecy.top/img_external/products/icon_b_pmother.png",
                        to: "/category"
                    },
                    {
                        id: 5,
                        text: "宝宝玩具",
                        icon:
                            "http://babyroom.hecy.top/img_external/products/icon_b_gifs.png",
                        to: "/category"
                    },
                    {
                        id: 6,
                        text: "宝宝衣物",
                        icon:
                            "http://babyroom.hecy.top/img_external/products/icon_b_clothes.png",
                        to: "/category"
                    },
                    {
                        id: 7,
                        text: "宝宝辅食",
                        icon:
                            "http://babyroom.hecy.top/img_external/products/icon_p_foods.png",
                        to: "/category"
                    },
                    {
                        id: 8,
                        text: "更多",
                        icon:
                            "http://babyroom.hecy.top/img_external/products/icon_b_more.png",
                        to: "/category"
                    }
                ]
            },
            recommendGoodList: []
        };
    },
    mounted() {
        this.initRecommendGoodsData();
    },
    methods: {
        initRecommendGoodsData() {
            this.$axios
                .post(`/baby/p/getRecommendGoods`)
                .then(res => {
                    if (res.data.code === "0000") {
                        var recommendData = res.data.attachment.result;
                        for (var i = 0; i < recommendData.length; i++) {
                            var temp = {};
                            temp.id = recommendData[i].id;
                            temp.img = recommendData[i].imgs;
                            temp.name = recommendData[i].name;
                            temp.promotionprice = recommendData[i].promotionprice;
                            temp.price = recommendData[i].price;
                            temp.units = recommendData[i].units;
                            this.recommendGoodList.push(temp);
                        }
                    }
                })
                .catch(err => {
                    console.log("获取商户推荐产品失败！");
                });
        },
        toGoods(pid) {
            this.$router.push({
                name: "goods",
                params: {
                    pid: pid
                }
            });
        },
        formatPrice(price,units) {
            return "¥" + price+"/"+units;
        },
        toCategory(item) {
            this.$router.push({
                name: "category",
                params: {
                    id: item.id
                }
            });
        },
        sorry() {
            Toast("暂无后续逻辑~");
        }
    },
    components: {
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem,
        [Grid.name]: Grid,
        [GridItem.name]: GridItem,
        [Image.name]: Image,
        [IsEmpty.name]: IsEmpty,
        [Tabbar.name]: Tabbar,
        [TabbarItem.name]: TabbarItem
    }
};