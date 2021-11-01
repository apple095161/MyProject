<template>
  <div id="app">
    <div v-if="$route.meta.headerShow">
      <Header :cartList="cart" :isLogin="isLogin"></Header>
      <!-- <vue-page-transition name="fade-in-down"> </vue-page-transition> -->
      <div class="main">
        <router-view :itemChange="itemChange"></router-view>
      </div>
      <Footer></Footer>
    </div>
    <div v-else>
      <!-- <vue-page-transition name="fade-in-down">
        
      </vue-page-transition> -->
      <router-view :itemChange="itemChange" :isLogin="isLogin" />
    </div>

    <a
      class="scroll-top"
      :class="{ show: topShow }"
      @click.prevent="scrollToTop"
    >
      <i class="fas fa-angle-right"></i>
    </a>
  </div>
</template>
<script>
import Header from './components/NewHeader';
import Footer from './components/Footer';
// import Loading from "vue-loading-overlay";
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';
import $ from 'jquery';
export default {
  components: {
    Header,
    Footer,
    // Loading,
  },
  data() {
    return {
      dismissSecs: 3,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      topShow: false,
      cartList: [],
      isLogin: false,
      itemChange: false,
      RouterChangerInnerWidth: null,
    };
  },
  watch: {
    $route(to, from) {
      if (to.query.utm_medium && to.query.utm_source) {
        let date = new Date();
        let addDay = date.setDate(date.getDate() + 5);
        document.cookie = `WebSource=${to.query.utm_source}; expires=${new Date(
          addDay,
        )};path=/;`;
      }

      this.RouterChangerInnerWidth = window.innerWidth;
      if (to.meta.LoginVerification && localStorage.Jwt) {
        let base64Url = localStorage.Jwt.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let userString = decodeURIComponent(escape(window.atob(base64)));
        let urserData = JSON.parse(userString);
        if (urserData.roles == '0') {
          let exp = urserData.exp;
          let now = Math.floor(new Date() / 1000);
          if (now > exp) {
            localStorage.removeItem('Jwt');
            localStorage.removeItem('User');
            this.$router.push({
              name: 'login',
            });
          } else {
          }
        } else if (urserData.roles !== '0') {
          if (to.name == 'dashboard') {
            this.$router.push({
              name: 'login',
            });
          }
        } else {
          this.$router.push({
            name: 'login',
          });
        }
      }
      if (localStorage.Jwt) {
        let base64Url = localStorage.Jwt.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let userString = decodeURIComponent(escape(window.atob(base64)));
        let urserData = JSON.parse(userString);
        let exp = urserData.exp;
        let now = Math.floor(new Date() / 1000);
        if (now > exp) {
          localStorage.removeItem('Jwt');
          localStorage.removeItem('User');
          return;
        }
      }
      if (from.path == '/') {
        // this.$store.dispatch('updateCart');
        if (localStorage.Jwt) {
          let base64Url = localStorage.Jwt.split('.')[1];
          let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          let userString = decodeURIComponent(escape(window.atob(base64)));
          let urserData = JSON.parse(userString);
          this.isLogin = true;
          this.$store.dispatch('updateRoles', urserData.roles);
        } else {
          this.isLogin = false;
        }
      } else {
        if (localStorage.Jwt) {
          let base64Url = localStorage.Jwt.split('.')[1];
          let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          let userString = decodeURIComponent(escape(window.atob(base64)));
          let urserData = JSON.parse(userString);
          this.isLogin = true;
          this.$store.dispatch('updateRoles', urserData.roles);
        } else {
          this.isLogin = false;
        }
        this.$store.dispatch('updateCart');
      }
    },
  },
  computed: {
    cart() {
      if (this.$store.state.cartList.length > 0) {
        this.itemChange = true;
      } else {
        this.itemChange = false;
      }
      return this.$store.state.cartList;
    },
  },
  created() {
    if (localStorage.User) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
    if (localStorage.cartId) {
      this.$store.dispatch('updateCart');
    }
  },
  mounted() {
    const vm = this;
    addEventListener('scroll', function (e) {
      vm.$nextTick(() => {
        if (document.documentElement.scrollTop > 150) {
          vm.topShow = true;
        } else {
          vm.topShow = false;
        }
      });
    });
    window.addEventListener('beforeunload', (e) => vm.removeUrlandCart());
  },
  methods: {
    removeUrlandCart() {
      localStorage.removeItem('order');
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
    scrollToTop() {
      $('html, body').animate({ scrollTop: 0 }, 500);
    },
  },
};
</script>
<style lang="scss">
.scroll-top {
  position: fixed;
  right: 35px;
  bottom: 100px;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 50px;
  background: rgba(0, 0, 0, 0.4);
  text-decoration: none;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
  cursor: pointer;
  i {
    font-size: 30px;
    color: white;
    transform: rotate(-90deg);
    cursor: pointer;
  }
  &:hover {
    text-decoration: none !important;
    background: rgba(0, 0, 0, 0.5);
  }
  &.show {
    visibility: visible;
    opacity: 1;
    transition: all 0.3s;
  }
}
</style>
