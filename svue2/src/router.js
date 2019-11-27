import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  {
    path: '*',
    redirect: '/goods'
  },
  {
    name: 'user',
    component: () => import('./view/user'),
    meta: {
      title: '会员中心'
    }
  },
  {
    name: 'changeMobile',
    component: () => import('./view/user/changePhone'),
    meta: {
      title: '修改手机号码'
    }
  },{
    name: 'editAddress',
    component: () => import('./view/user/editAddress'),
    meta: {
      title: '地址列表'
    }
  },
  {
    name: 'addressList',
    component: () => import('./view/user/addressList'),
    meta: {
      title: '编辑地址'
    }
  },
  {
    name: 'cart',
    component: () => import('./view/cart'),
    meta: {
      title: '购物车'
    }
  },
  {
    name: 'goods',
    component: () => import('./view/goods'),
    meta: {
      title: '商品详情'
    }
  },
  {
    name: 'products',
    component: () => import('./view/products'),
    meta: {
      title: '商品首页'
    }
  } 
];

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '');
});

const router = new Router({ routes });

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
