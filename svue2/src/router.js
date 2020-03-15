/* eslint-disable */
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  {
    path: '*',
    redirect: '/products'
  },
  {
    name: 'user',
    component: () => import('./view/user'),
    meta: {
      title: '会员中心'
    }
  }, {
    name: 'swimming',
    component: () => import('./view/user/swimming'),
    meta: {
      title: '游泳中心'
    }
  },
  {
    name: 'cardlist',
    component: () => import('./view/user/cardlist'),
    meta: {
      title: '卡券列表'
    }
  },
  {
    name: 'opencard',
    component: () => import('./view/user/opencard/opencard.vue'),
    meta: {
      title: '用户开卡'
    }
  },
  {
    name: 'userCharts',
    component: () => import('./view/user/charts/userCharts.vue'),
    meta: {
      title: '用户数据概览'
    }
  },
  {
    name: 'orderList',
    component: () => import('./view/user/orderlist'),
    meta: {
      title: '订单列表'
    }
  },
  {
    name: 'delivergoods',
    component: () => import('./view/user/delivergoods'),
    meta: {
      title: '送货列表'
    }
  },
  {
    name: 'changeMobile',
    component: () => import('./view/user/changePhone'),
    meta: {
      title: '修改手机号码'
    }
  }, {
    name: 'editAddress',
    component: () => import('./view/user/editAddress'),
    meta: {
      title: '编辑地址'
    }
  },
  {
    name: 'addressList',
    component: () => import('./view/user/addressList'),
    meta: {
      title: '地址列表'
    }
  },
  {
    name: 'cart',
    component: () => import('./view/products/shopping-cart'),
    meta: {
      title: '购物车'
    }
  },
  {
    name: 'goods',
    component: () => import('./view/goods'),
    meta: {
      title: '商品详情',
      // keepAlive: true // 需要被缓存
    }
  },
  {
    name: 'products',
    component: () => import('./view/products'),
    meta: {
      title: '商品首页'
    }
  },
  {
    name: 'integral',
    component: () => import('./view/user/integral/integral.vue'),
    meta: {
      title: '积分中心'
    }
  },
  {
    name: 'storeInfo',
    component: () => import('./view/user/storeInfo'),
    meta: {
      title: '关于店铺'
    }
  },
  {
    name: 'successPay',
    component: () => import('./view/products/successPay/successPay.vue'),
    meta: {
      title: '成功下单'
    }
  },
  {
    name: 'category',
    component: () => import('./view/products/category'),
    meta: {
      title: '商品分类'
    }
  },
  {
    name: 'beagent',
    component: () => import('./view/user/agentpage/beagent/beagent.vue'),
    meta: {
      title: '成为代理人'
    }
  },
  {
    name: 'agentVip',
    component: () => import('./view/user/agentpage/agentVipexplain/agentVip.vue'),
    meta: {
      title: '代理人权益说明'
    }
  },
  {
    name: 'agentPage',
    component: () => import('./view/user/agentpage/agentPage.vue'),
    meta: {
      title: '我的代理'
    }
  }
];

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '');
});

const router = new Router({
  // mode: 'history',
  routes
});

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  next();
});

export {
  router
};
