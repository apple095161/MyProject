import Vue from 'vue';
import Vuex from 'vuex';
import BootstrapVue from 'bootstrap-vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueMeta from 'vue-meta';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import store from './store';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import addcomma from './filters/addcomma';
import DateFormate from './filters/DateFormat';
import DateFormateNotTime from './filters/DateFormatNotTime';
import VueAnalytics from 'vue-analytics';
import VueGtm from '@gtm-support/vue2-gtm';
// import VuePageTransition from 'vue-page-transition';
// import VueAzureUploader from 'vue-azure-blob-upload'
// Vue.use(VueAzureUploader);
// Vue.use(VuePageTransition)
import '@progress/kendo-theme-default/dist/all.css';
import { DropDownList } from '@progress/kendo-vue-dropdowns';
Vue.component('dropdownlist', DropDownList);
import '@progress/kendo-ui';
import '@progress/kendo-theme-default/dist/all.css';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import '@splidejs/splide/dist/css/themes/splide-sea-green.min.css';
import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css';
// import { Editor } from '@progress/kendo-editor-vue-wrapper';
// import { EditorTool } from '@progress/kendo-editor-vue-wrapper';
import { EditorInstaller } from '@progress/kendo-editor-vue-wrapper';
Vue.use(EditorInstaller);
import './assets/scss/all.scss'; // bootstrapvue
Vue.use(VueMeta);
// 全域金額加逗號
Vue.prototype.$addcomma = addcomma;
// 全域日期轉換包含時間
Vue.prototype.$DateFormate = DateFormate;
//全域日期轉換包含時間不包含時間
Vue.prototype.$DateFormatNotTime = DateFormateNotTime;

Vue.use(BootstrapVue);
// Vue.use(VueAxios, axios);
Vue.use(Vuex);
Vue.use(ElementUI);
Vue.prototype.$http = axios;
Vue.prototype.$bus = new Vue();


Vue.use(VueSweetalert2);
Vue.use(VueAnalytics, {
  id: 'UA-205371007-1',
  router,
  autoTracking: {
    pageviewOnLoad: false
  }
})


Vue.use(VueGtm, {
  id: 'GTM-P3GCKDR', // Your GTM single container ID, array of container ids ['GTM-xxxxxx', 'GTM-yyyyyy'] or array of objects [{id: 'GTM-xxxxxx', queryParams: { gtm_auth: 'abc123', gtm_preview: 'env-4', gtm_cookies_win: 'x'}}, {id: 'GTM-yyyyyy', queryParams: {gtm_auth: 'abc234', gtm_preview: 'env-5', gtm_cookies_win: 'x'}}], // Your GTM single container ID or array of container ids ['GTM-xxxxxx', 'GTM-yyyyyy']
  defer: false, // Script can be set to `defer` to speed up page load at the cost of less accurate results (in case visitor leaves before script is loaded, which is unlikely but possible). Defaults to false, so the script is loaded `async` by default
  compatibility: false, // Will add `async` and `defer` to the script tag to not block requests for old browsers that do not support `async`
  nonce: '2726c7f26c', // Will add `nonce` to the script tag
  enabled: true, // defaults to true. Plugin can be disabled by setting this to false for Ex: enabled: !!GDPR_Cookie (optional)
  debug: false, // Whether or not display console logs debugs (optional)
  loadScript: true, // Whether or not to load the GTM Script (Helpful if you are including GTM manually, but need the dataLayer functionality in your components) (optional)
  vueRouter: router, // Pass the router instance to automatically sync with router (optional)
  ignoredViews: ['home'], // Don't trigger events for specified router names (optional)
  trackOnNextTick: false // Whether or not call trackView in Vue.nextTick
});

// options 可以作額外設定

// 全域axios
import {
  AxiosMixin, errorHandler,
} from './assets/config/axiosConfig';
Vue.mixin(AxiosMixin);
Vue.mixin(errorHandler);

// 全域日期轉換(T跟.)
Vue.prototype.$FormatDate = function (data: string) {
  if (data) {
    let begin = data.split("T");
    let end = data.split("T")[1].split(".")[0];
    return `${begin[0]} ${end}`;
  } else {
    return ""
  }
}
Vue.prototype.$removeComma = (data: string) => {
  // if (data) {
  //   const newStr = data.toString()
  //     .replace(/,/g, '');
  //   return newStr;
  // } else {
  //   return '';
  // }
};
// var Xtoken = localStorage.getItem('User') ? JSON.parse(localStorage.User).jti : '';
// axios.defaults.headers.post['token'] = Xtoken;
// axios.defaults.headers.get['token'] = Xtoken;
Vue.prototype.$Ods = function (data: string) {
  const Odss: any = {
    "00": '訂單建立',
    "01": '送貨資料建立',
    '02': '訂單成立',
    '03': '訂單取消',
    '04': '退貨-補寄',
    '10': '已出貨',
    '11': '完成訂單',
    'XX': '退貨/退款',
    'RT': '已退貨',
    'RF': '已退款'
  }
  return Odss[data]
}

Vue.prototype.$addDays = function (key: number) {
  let date = new Date();
  date.setDate(date.getDate() + key)
  return date
};




Vue.config.productionTip = false;

new Vue({
  router,
  store,
  mounted () {
    document.dispatchEvent(new Event('render-event'));
  },
  render: (h) => h(App),
  // mounted() {
  //   document.dispatchEvent(new Event('render-event'));
  // },
}).$mount('#app');
// router.beforeEach((to, from, next) => {
//   if (to.meta.requireAuth) {
//     if (localStorage.User) {
//       const XTokenExp = JSON.parse(localStorage.User).exp;
//       const date = Math.floor(Date.now() / 1000);
//       if (JSON.parse(localStorage.User).roles !== '0') {
//         router.push({
//           name: 'home',
//         });
//       } else {
//         next();
//       }
//     } else {
//       router.push({
//         name: 'login',
//       });
//     }
//   } else {
//     next();
//   }

// }),
// function hasQueryParams (route: any) {
//   return Object.keys(route.query).length
// }
// router.beforeEach((to, from, next) => {
//   if (!hasQueryParams(to) && hasQueryParams(from)) {
//     next({ name: to.name || '', query: from.query, params: { id: to.params.id || '' } });
//   } else {
//     next()
//   }
// })
router.afterEach((to, from) => {
  window.scrollTo(0, 0);
});
