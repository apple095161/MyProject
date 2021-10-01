import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  // base:'/',
  routes: [
    {
      path: '*',
      redirect: '/',
    },
    {
      path: '/404',
      name: '404',
      component: () => import('./views/404.vue'),
    },
    { // calander
      path: '/calander',
      name: 'calander',
      meta: {
        title: 'calander',
        href: 'calander',
        headerShow: true,
        footerShow: false,
      },
      component: () => import('./views/calander.vue'),
    },
    {
      path: '/',
      name: 'home',
      meta: {
        title: '首頁',
        href: '#',
        headerShow: true,
        footerShow: false,
      },
      component: resolve => require([('./views/Home.vue')], resolve),
    },
    { // 驗證頁面
      path: '/verify',
      name: 'verify',
      meta: {
        title: '驗證',
        headerShow: true,
        footerShow: false,
        keepAlive: true,
      },
      component: resolve => require([('./views/Verity.vue')], resolve),
      // component: () => import('./components/Verity.vue'),
      children: [
        { // 註冊驗證
          path: 'register',
          name: 'register',
          meta: {
            title: '註冊驗證',
            href: '#',
            headerShow: true,
            footerShow: true,
          },
          component: resolve => require([('./views/Register.vue')], resolve),
          // component: () => import('./components/Register.vue'),
        },
        { // 註冊驗證
          path: 'resets',
          name: 'resets',
          meta: {
            title: '重設密碼',
            href: '#',
            headerShow: true,
            footerShow: true,
          },
          component: resolve => require([('./views/Resets.vue')], resolve),
          // component: () => import('./components/Resets.vue'),
        },
        { // 密碼重置
          path: 'forgetPassword',
          name: 'forgetPassword',
          meta: {
            title: '重設密碼',
            href: '#',
            headerShow: true,
            footerShow: true,
          },
          component: resolve => require([('./views/ForgetPassword.vue')], resolve),
          // component: () => import('./components/ForgetPassword.vue'),
        },
      ]
    },
    //訂單查詢
    {
      path: '/OrderSearch',
      name: 'orderSearch',
      meta: {
        title: '訪客查詢訂單',
        href: 'OrderSearch',
        headerShow: true,
        footerShow: false,
        keepAlive: true
      },
      component: () => import('./views/OrderSearch.vue'),
      children: [
        {
          path: '/orderSearchResult',
          name: 'orderSearchResult',
          meta: {
            title: '查詢訂單結果',
            href: 'orderSearchResult',
            headerShow: true,
            footerShow: false,
            keepAlive: false
          },
          component: () => import('./views/OrderSearchResult.vue'),
        }

      ]
    },
    { // 關於紙箱
      path: '/buycarton',
      name: 'AboutBox',
      meta: {
        title: '關於紙箱',
        href: '#',
        headerShow: true,
        footerShow: true,
      },
      component: resolve => require([('./views/AboutBox.vue')], resolve),
    },
    { // 關於紙箱
      path: '/corrugatedboxe',
      name: 'AboutBox2',
      meta: {
        title: '關於紙箱',
        href: '#',
        headerShow: true,
        footerShow: true,
      },
      component: resolve => require([('./views/AboutBox2.vue')], resolve),
    },
    { // 關於紙箱
      path: '/packmovingcarton',
      name: 'AboutBox3',
      meta: {
        title: '關於紙箱',
        href: '#',
        headerShow: true,
        footerShow: true,
      },
      component: resolve => require([('./views/AboutBox3.vue')], resolve),
    },
    { // 隱私權
      path: '/PrivacyPolicy',
      name: 'PrivacyPolicy',
      meta: {
        title: '服務條款',
        href: '#',
        headerShow: true,
        footerShow: true,
      },
      component: resolve => require([('./views/PrivacyPolicy.vue')], resolve),
      // component: () => import('./components/PrivacyPolicy.vue'),
    },
    { // 服務條款
      path: '/ServicePolicy',
      name: 'ServicePolicy',
      meta: {
        title: '隱私權',
        href: '#',
        headerShow: true,
        footerShow: true,
      },
      component: resolve => require([('./views/ServicePolicy.vue')], resolve),
      // component: () => import('./components/ServicePolicy.vue'),
    },
    { // Cookie使用規範
      path: '/CookiePolicy',
      name: 'cookie',
      meta: {
        title: 'cookie',
        href: '#',
        headerShow: true,
        footerShow: true,
      },
      component: resolve => require([('./views/Cookie.vue')], resolve),
      // component: () => import('./components/Cookie.vue'),
    },
    // { //服務項目
    //   path: '/ServiceItem',
    //   name: 'serviceitem',
    //   meta: {
    //     title: '服務項目',
    //     href: '#',
    //     headerShow: true,
    //     footerShow: true,
    //   },
    //   component: () => import('./components/ServiceItem.vue'),
    // },
    {
      path: '/MasterIgPrice',
      name: 'dashboard',
      meta: {
        headerShow: false,
        footerShow: false,
        title: '後台主頁',
        requireAuth: true,
        LoginVerification: true
      },
      component: resolve => require([('./views/Dashborad.vue')], resolve),
      // component: () => import('./components/Dashborad.vue'),
      children: [
        {
          path: 'user',
          name: 'user',
          meta: {
            headerShow: false,
            footerShow: false,
            title: '使用者管理',
            requireAuth: true,
          },
          component: resolve => require([('./views/User.vue')], resolve),
          // component: () => import('./components/User.vue'),
        },
        {
          path: 'OrderList',
          name: 'dashboardOrder',
          meta: {
            headerShow: false,
            footerShow: false,
            title: '訂單管理',
            requireAuth: true,
          },
          component: resolve => require([('./views/DashboardOrder.vue')], resolve),
          // component: () => import('./components/DashboardOrder.vue'),
        },
        {
          path: 'DailyOrder',
          name: 'DailyOrder',
          meta: {
            headerShow: false,
            footerShow: false,
            title: '每日訂單',
            requireAuth: true,
          },
          component: resolve => require([('./views/DailyOrder.vue')], resolve),
        },
        {
          path: 'produtList',
          name: 'produtList',
          meta: {
            headerShow: false,
            footerShow: false,
            keepFormAlive: true,
            title: '商品管理',
            requireAuth: true,
          },
          component: resolve => require([('./views/DashboardProduct.vue')], resolve),
          // component: () => import('./components/DashboardProduct.vue'),
          children: [
            { // 編輯商品
              path: ':id',
              name: 'editItem',
              meta: {
                headerShow: false,
                footerShow: false,
                requireAuth: true,
              },
              component: resolve => require([('./views/EditProductItem.vue')], resolve),
              // component: () => import('./components/EditProductItem.vue'),
            },
          ],
        },
        {
          path: 'productstock',
          name: 'productstock',
          meta: {
            headerShow: false,
            footerShow: false,
            keepFormAlive: true,
            title: '庫存管理',
            requireAuth: true,
          },
          component: resolve => require([('./views/DashboardProductStock.vue')], resolve),
          // component: () => import('./components/DashboardProductStock.vue'),
          children: [
            { // 庫存管理
              path: ':id',
              name: 'editStock',
              meta: {
                headerShow: false,
                footerShow: false,
                requireAuth: true,
              },
              component: resolve => require([('./views/EditProductStock.vue')], resolve),
              // component: () => import('./components/EditProductStock.vue'),
            },
          ],
        },
        {
          path: 'purchasemanagement',
          name: 'purchasemanagement',
          meta: {
            headerShow: false,
            footerShow: false,
            keepFormAlive: true,
            title: '進貨管理',
            requireAuth: true,
          },
          component: resolve => require([('./views/DashboardPurchaseManagement.vue')], resolve),
          // component: () => import('./components/DashboardPurchaseManagement.vue'),
          children: [
            { // 進貨管理
              path: ':id',
              name: 'editpurchasemanagement',
              meta: {
                headerShow: false,
                footerShow: false,
                requireAuth: true,
              },
              component: resolve => require([('./views/EditPurchaseManagement')], resolve),
              // component: () => import('./components/EditPurchaseManagement.vue'),
            },
          ],
        },
        {
          path: 'dashboardreport',
          name: 'dashboardreport',
          meta: {
            headerShow: false,
            footerShow: false,
            keepFormAlive: true,
            title: '分析報表',
            requireAuth: true,
          },
          component: () => import('./views/report.vue'),
          children: [
            // { // 分析報表
            //   path: ':id',
            //   name: 'editpurchasemanagement',
            //   meta: {
            //     headerShow: false,
            //     footerShow: false,
            //     requireAuth: true,
            //   },
            //   component: () => import('./components/EditPurchaseManagement.vue'),
            // },
          ],
        },
        {
          path: 'addproduct',
          name: 'addproduct',
          meta: {
            headerShow: false,
            footerShow: false,
            requireAuth: true,
          },
          component: () => import('./views/DashboardProductAdd.vue'),
        },
        {
          path: 'addType',
          name: 'addType',
          meta: {
            headerShow: false,
            footerShow: false,
            title: '新增主類別',
            requireAuth: true,
          },
          component: () => import('./views/DashboradAddItemType.vue'),
        },
        {
          path: 'faqset',
          name: 'faqset',
          meta: {
            headerShow: false,
            footerShow: false,
            title: 'FAQ',
            keepAlive: true,
            requireAuth: true,
          },
          component: () => import('./views/DashboradFaq.vue'),
          children: [
            {
              path: ':id',
              name: 'faqEdit',
              meta: {
                headerShow: false,
                footerShow: false,
                title: '',
                requireAuth: true,
              },
              component: () => import('./views/DashboradFaqEdit.vue'),
            },
            {
              path: 'addLabel',
              name: 'AddLabel',
              meta: {
                headerShow: false,
                footerShow: false,
                title: '新增問答類別',
                requireAuth: true,
              },
              component: () => import('./views/DashboradFaqAddLabel.vue'),
            },
          ],
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登入',
        href: 'login',
        headerShow: true,
        footerShow: false,
      },
      component: resolve => require([('./views/NewShopLogin.vue')], resolve),
      // component: () => import('./components/NewShopLogin.vue'),
    },
    {
      path: '/shoppingnotes',
      name: 'shoppingnotes',
      meta: {
        title: '購物須知',
        href: 'shoppingnotes',
        headerShow: true,
        footerShow: true,
      },
      component: resolve => require([('./views/ShoppingNotes.vue')], resolve),
      // component: () => import('./components/ShoppingNotes.vue'),
      children: [
        {
          path: ':key',
          name: 'note',
          meta: {
            title: '購物須知-每項',
            href: 'note',
            headerShow: true,
            footerShow: true,
          },
          component: () => import('./views/ShoppingNotesChidren.vue'),
        }
      ]
    },
    {
      path: '/shophome',
      name: 'ShopPage',
      meta: {
        title: '商城',
        href: 'Shop',
        headerShow: false,
        footerShow: false,
        keepAlive: true,
      },
      component: () => import('./components/ShopHome.vue'),
      children: [
        { // 購物車
          path: '/cart',
          name: 'cart',
          meta: {
            title: '購物車',
            href: 'cart',
            headerShow: true,
            footerShow: false,
          },
          component: () => import('./views/Cart.vue'),
        },
        { // 付款資訊
          path: '/payment',
          name: 'payment',
          meta: {
            title: '付款資訊',
            href: 'payment',
            headerShow: true,
            footerShow: false,
          },
          component: () => import('./views/Payment.vue'),
        },
        { // 完成訂單-訂單資訊
          path: '/order/:id',
          name: 'order',
          meta: {
            title: '完成訂單資訊',
            href: 'order',
            headerShow: true,
            footerShow: false,
          },
          component: () => import('./views/CompleteOrder.vue'),
        },
        {
          path: '/UserLogin',
          name: 'shoplogin',
          meta: {
            title: '商城登入',
            href: 'shoplogin',
            headerShow: false,
            footerShow: false,
          },
          component: () => import('./views/ShopLogin-V2.vue'),
        },
        {
          path: '/member',
          name: 'member',
          meta: {
            title: '會員專區',
            href: 'member',
            headerShow: true,
            footerShow: false,
            LoginVerification: true
          },
          component: () => import('./views/Member.vue'),
        },
      ],
    },

    { // 商品購買頁
      path: '/List/:id',
      name: 'commodity',
      meta: {
        title: '商品詳細',
        href: 'commodity',
        headerShow: true,
        footerShow: false,
      },
      component: () => import('./views/ShopItem.vue'),
    },


    // {
    //   path: '/List',
    //   name: 'shopList',
    //   meta: {
    //     title: '所有商品',
    //     href: 'shopList',
    //     headerShow: true,
    //     footerShow: false,
    //     keepAlive: true,
    //   },
    //   component: () => import('./views/ShopMenuList.vue'),
    //   children: [
    //     { // 商品購買頁
    //       path: ':id',
    //       name: 'commodity',
    //       meta: {
    //         title: '商品詳細',
    //         href: 'commodity',
    //         headerShow: true,
    //         footerShow: false,
    //       },
    //       component: () => import('./views/ShopItem.vue'),
    //     },
    //   ],
    // },
  ],
});
