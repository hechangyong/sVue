import { Collapse, CollapseItem } from "vant";
import { Cell, CellGroup } from "vant";
import { Tab, Tabs } from "vant";
import { Panel } from "vant";
import { Card, Tag, Button } from "vant";
import IsEmpty from "@/view/is-empty/";
export default {
  data() {
    return {
      activeNames: ["1"],
      isEmpty: false,
      activeName: "a",
      date: "2019-11-29",
      allOrderList: [
        {
            id:1,
            title:"金摇篮母婴店",
            status:"已完成",
            subOrders:[
                {
                    id:1,
                    num:2,
                    price:300,
                    desc:"飞鹤始建于1962年，从丹顶鹤故乡黑龙江齐齐哈尔起步，是中国最早的奶粉企业之一。50余年来，飞鹤一直专注于针对中国人体质研制奶粉，对中国宝宝体质特点及需求展开大量研究。",
                    title:"飞鹤奶粉【0-6月】",
                    thumb:"http://babyroom.hecy.top/hecy/upload/image/compress/2019-12-27/compress_fb73d68bb2d341ca935108f421f4b302-mmexport1563181205700.jpg",
                    date:"2019-10-10"
                },
                {
                    id:2,
                    num:2,
                    price:400,
                    desc:"飞鹤始建于1962年，从丹顶鹤故乡黑龙江齐齐哈尔起步，是中国最早的奶粉企业之一。50余年来，飞鹤一直专注于针对中国人体质研制奶粉，对中国宝宝体质特点及需求展开大量研究。",
                    title:"飞鹤奶粉【0-6月】",
                    thumb:"http://babyroom.hecy.top/hecy/upload/image/compress/2019-12-27/compress_fb73d68bb2d341ca935108f421f4b302-mmexport1563181205700.jpg",
                    date:"2019-10-10"
                },
                {
                    id:3,
                    num:4,
                    price:1000,
                    desc:"飞鹤始建于1962年，从丹顶鹤故乡黑龙江齐齐哈尔起步，是中国最早的奶粉企业之一。50余年来，飞鹤一直专注于针对中国人体质研制奶粉，对中国宝宝体质特点及需求展开大量研究。",
                    title:"飞鹤奶粉【0-6月】",
                    thumb:"http://babyroom.hecy.top/hecy/upload/image/compress/2019-12-27/compress_fb73d68bb2d341ca935108f421f4b302-mmexport1563181205700.jpg",
                    date:"2019-10-10"
                }
            ]
        },
        {
            id:2,
            title:"金摇篮母婴店",
            status:"已取消",
            subOrders:[
                {
                    id:1,
                    num:2,
                    price:300,
                    desc:"飞鹤始建于1962年，从丹顶鹤故乡黑龙江齐齐哈尔起步，是中国最早的奶粉企业之一。50余年来，飞鹤一直专注于针对中国人体质研制奶粉，对中国宝宝体质特点及需求展开大量研究。",
                    title:"飞鹤奶粉【0-6月】",
                    thumb:"http://babyroom.hecy.top/hecy/upload/image/compress/2019-12-27/compress_fb73d68bb2d341ca935108f421f4b302-mmexport1563181205700.jpg",
                    date:"2019-10-10"
                },
                {
                    id:2,
                    num:2,
                    price:400,
                    desc:"飞鹤始建于1962年，从丹顶鹤故乡黑龙江齐齐哈尔起步，是中国最早的奶粉企业之一。50余年来，飞鹤一直专注于针对中国人体质研制奶粉，对中国宝宝体质特点及需求展开大量研究。",
                    title:"飞鹤奶粉【0-6月】",
                    thumb:"http://babyroom.hecy.top/hecy/upload/image/compress/2019-12-27/compress_fb73d68bb2d341ca935108f421f4b302-mmexport1563181205700.jpg",
                    date:"2019-10-10"
                } 
            ]
        }
      ],
      payDoneOrderList: [],
      unfinishedOrderList: []
    };
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Card.name]: Card,
    [Panel.name]: Panel,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Tag.name]: Tag,
    [Button.name]: Button,
    [IsEmpty.name]: IsEmpty
  }
};