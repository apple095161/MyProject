<template>
  <div>
    <div class="burger-menu" :class="{ show: active }">
      <div class="burger-item fr-layout"></div>
      <div class="burger-item">
        <span class="burger-item-title" @click="toggleClass">商品總覽</span>
        <ul
          class="burger-sub-menu"
          :class="{ menuShow: menu1Show }"
          v-for="item in menu"
          :key="item.categoryName"
        >
          <li class="burger-sub-item">
            <div class="burger-sub-item-title" @click="MouseDown($event)">
              {{ item.categoryName }}
            </div>
            <ul class="burger-children-menu">
              <li
                class="burger-children-item"
                v-for="menu in item.productList"
                :key="menu.pdrefid"
              >
                <router-link
                  :to="{ name: 'commodity', params: { id: menu.pdrefid } }"
                  >{{ menu.pdname }}</router-link
                >
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="burger-item">
        <span>
          <router-link
            class="menu-link"
            :to="{
              name: 'note',
              params: {
                key: 1,
              },
              query: {
                type: '付款方式',
              },
            }"
            >購物須知</router-link
          >
        </span>
      </div>
      <div class="burger-item">
        <span>
          <router-link
            class="menu-link"
            :to="{
              name: 'AboutBox',
            }"
            >關於紙箱</router-link
          >
        </span>
      </div>
      <div class="burger-item">
        <span>
          <router-link
            class="menu-link"
            :to="{
              name: 'orderSearch',
            }"
            >訂單查詢</router-link
          >
        </span>
      </div>
      <div class="burger-item" v-if="isLogin">
        <span v-if="roles == '0'">
          <a class="menu-link" @click.prevent="go('dashboard')">後台管理</a>
        </span>
        <span v-else>
          <a class="menu-link" @click.prevent="go('member')">會員中心</a>
        </span>
      </div>
      <div class="burger-item" v-else>
        <span>
          <a class="menu-link" @click.prevent="go('login')">登入 / 註冊</a>
        </span>
      </div>
      <div class="burger-item" v-if="isLogin">
        <span>
          <a class="menu-link" @click.prevent="logout">登出</a>
        </span>
      </div>
    </div>
    <header
      class="header"
      :class="{ active: active, scroll: scroll, isScroll: isScroll }"
    >
      <div class="logo" :class="{ show: logoshow }" @click="go('home')">
        <h1>速購家搬家紙箱、耗材專賣。</h1>
        <img
          src="../assets/images/shopLOGO.svg"
          alt="速購家|搬家用紙箱"
          title="速購家|搬家用紙箱"
          style="cursor: pointer"
        />
        <label class="logo-description">搬家耗材專賣店</label>
      </div>
      <div class="top-menu">
        <ul class="top-manu-list">
          <li class="top-menu-item">
            <a href="" @click.prevent>商品總覽</a>
            <ul class="sub-menu">
              <li
                class="sub-item"
                v-for="item in menu"
                :key="item.categoryName"
              >
                <div class="sub-item-title" @click="MouseDown($event)">
                  {{ item.categoryName }}
                  <i class="fas fa-angle-right small-angle"></i>
                </div>
                <ul class="children-menu">
                  <li
                    class="children-item"
                    v-for="menu in item.productList"
                    :key="menu.pdrefid"
                  >
                    <router-link
                      :to="{
                        name: 'commodity',
                        params: {
                          id: menu.pdrefid,
                        },
                      }"
                    >
                      {{ menu.pdname }}</router-link
                    >
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li class="top-menu-item">
            <router-link :to="{ name: 'shoppingnotes' }">購物需知</router-link>
          </li>
          <li class="top-menu-item item-style">
            <a href="" @click.prevent>關於紙箱</a>
            <ul class="sub-menu">
              <li class="sub-item" v-for="item in menu2" :key="item.label">
                <router-link :to="{ name: `${item.route}` }">{{
                  item.label
                }}</router-link>
              </li>
            </ul>
          </li>
          <li class="top-menu-item">
            <router-link :to="{ name: 'orderSearch' }">訂單查詢</router-link>
          </li>
        </ul>
      </div>
      <div class="top-member">
        <button
          class="login"
          @click="login('dashboard')"
          v-if="isLogin && roles == '0'"
        >
          後台管理
        </button>
        <button
          class="login"
          @click="login(isLogin)"
          v-if="isLogin && roles !== '0'"
        >
          會員中心
        </button>
        <button class="login" @click="go('login')" v-if="!isLogin">
          登入 / 註冊
        </button>
        <button class="login ml-2" @click="logout" v-if="isLogin">登出</button>
        <div class="header-cart">
          <a href="" @click.prevent class="cart-btn"
            ><i class="fas fa-shopping-cart icon-cart"></i
          ></a>
          <ul class="header-cart-menu">
            <li
              class="header-cart-item"
              v-for="item in TopCart"
              :key="item.productId"
              v-show="TopCart.length > 0"
            >
              <div class="row align-items-center mx-0">
                <div class="col-1 text-center px-0">
                  <i
                    class="far fa-times-circle"
                    style="font-size: 14px"
                    @click="removeItem(item)"
                  ></i>
                </div>
                <div class="col-3 text-center px-0">
                  <img
                    :src="item.productPhoto"
                    width="80"
                    height="80"
                    :alt="item.productName"
                  />
                </div>
                <div class="col-8">
                  <div class="item-name">
                    {{ item.productName }}
                  </div>
                  <div class="item-qty">{{ item.quantity }}件</div>
                  <div class="item-price">${{ item.subTotal }}</div>
                </div>
              </div>
            </li>
            <div class="cart-total" v-show="TopCart.length > 0">
              小記 : ${{ returnPrice() }}
            </div>
            <div class="cart-btn-box" v-show="TopCart.length > 0">
              <button class="cart-checkout" @click="goCart">結帳</button>
            </div>
            <div class="header-cart-manu-empty" v-show="TopCart.length == 0">
              <div class="empty-text">購物車暫無商品</div>
            </div>
          </ul>
        </div>
        <div class="burger" :class="{ active: active }">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import $ from 'jquery';
export default {
  name: 'Header',
  props: {
    cartList: {
      type: Array,
      default() {
        return [];
      },
    },
    isLogin: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      menu: [],
      menuList: [],
      cartArray: [],
      menu2: [
        {
          label: '為什麼要買搬家紙箱',
          route: 'AboutBox',
        },
        {
          label: '瓦楞紙箱介紹',
          route: 'AboutBox2',
        },
        {
          label: '搬家紙箱怎麼裝',
          route: 'AboutBox3',
        },
      ],
      data: {},
      scroll: false,
      active: false,
      logoshow: false,
      isScroll: false,
      methods: {},
      menu1Show: false,
      menu2Show: false,
      // roles: localStorage.User ? JSON.parse(localStorage.User).roles : '',
    };
  },
  created() {
    // this.getTopMenu();

    if (localStorage.User) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
    if (localStorage.cartId) {
      this.$store.dispatch('updateCart');
    }
    // this.$nextTick(() => {
    //   setTimeout(() => {
    //     $('.burger').click(function (e) {
    //       vm.active = !vm.active;
    //     });
    //     $('.top-menu .top-manu-list .top-menu-item .sub-menu .sub-item').click(
    //       function () {
    //         $(this).toggleClass('show');
    //       },
    //     );
    //     $(
    //       '.burger-menu .burger-item .burger-sub-item .burger-sub-item-title',
    //     ).click(function () {
    //       $(this).next().toggleClass('menu2Show');
    //     });
    //   }, 500);
    // });
  },

  mounted() {
    const vm = this;
    this.$nextTick(() => {
      setTimeout(() => {
        $('.burger').click(function (e) {
          vm.active = !vm.active;
        });
        // $('.top-menu .top-manu-list .top-menu-item .sub-menu .sub-item').click(
        //   function () {
        //     $(this).toggleClass('show');
        //   },
        // );
        // $(
        //   '.burger-menu .burger-item .burger-sub-item .burger-sub-item-title',
        // ).click(function () {
        //   $(this).next().toggleClass('menu2Show');
        // });
      }, 300);
    });
    window.addEventListener('scroll', function (e) {
      let scroll = window.scrollY;
      if (scroll > 50) {
        vm.logoshow = true;
        vm.isScroll = true;
      } else if (scroll == 0) {
        vm.isScroll = false;
      }
    });
    this.getTopMenu();
    // $('.burger-item-title').click(function (e) {
    //   $(this).toggleClass('menu-show');
    // });
    // $('.burger-item span').click(function (e) {
    //   if ($(this).parent(0).hasClass('sub-menu')) {
    //     $(this).parent(0).removeClass('sub-menu');
    //     $(this).parent(0).find('ul').slideUp(500);
    //   } else {
    //     $('.burger-item').removeClass('sub-menu');
    //     $('.burger-item').find('ul').slideUp(500);
    //     $(this).parent(0).addClass('sub-menu');
    //     $(this).parent().find('ul').slideDown(500);
    //   }
    // });
  },
  watch: {
    $route() {
      // $('.burger-menu').removeClass('show');
      // $('.header .mobile-top').removeClass('active');
      // $('.header .mobile-top .burger').removeClass('active');
      this.active = false;
      $('.burger-menu .burger-item').removeClass('sub-menu');
      $('.burger-item ul').slideUp();
    },
  },
  computed: {
    roles() {
      return this.$store.state.roles;
    },
    TopCart() {
      return this.$store.state.cartList;
    },
  },

  methods: {
    MouseDown(event) {
      // let el = document.querySelectorAll(
      //   '.top-menu .top-manu-list .top-menu-item .sub-menu .sub-item .sub-item-title',
      // );
      // let el2 = document.querySelectorAll(
      //   '.top-menu .top-manu-list .top-menu-item .sub-menu .sub-item .children-menu',
      // );
      // el.forEach((item) => {
      //   item.classList.remove('show');
      // });
      // el2.forEach((item) => {
      //   item.classList.remove('show');
      // });
      event.target.classList.toggle('show');
      event.target.nextElementSibling.classList.toggle('show');

      // event.path[1].children[1].classList.toggle('show');
    },
    toggleClass() {
      this.menu1Show = !this.menu1Show;
    },
    toggleClass2() {
      this.menu2Show = !this.menu2Show;
    },
    getTopMenu() {
      let url = '/api/v1/ProductApi/CateProduct';
      this.$http.get(url).then((response) => {
        this.menu = response.data.data;
      });
    },
    // getTopMenu() {
    //   let url = `/api/v1/ProductApi/Popular`;
    //   this.$http.get(url).then((response) => {
    //     this.menu = response.data.data.map((item) => {
    //       return {
    //         pdname: item.pdname,
    //         pdphoto: item.pdphoto,
    //         pdrefid: item.pdrefid,
    //         pdsize: item.pdsize,
    //         pdprice: item.pdprice,
    //       };
    //     });
    //   });
    // },
    returnPrice() {
      let totalPrice = null;
      this.TopCart.forEach((item) => {
        totalPrice += item.subTotal;
      });
      return totalPrice;
    },
    removeItem(item) {
      let url = `/api/v1/CartApi/${localStorage.getItem('cartId')}/${
        item.productId
      }`;
      this.$http.delete(url).then((response) => {
        this.$store.dispatch('updateCart');
        this.$emit('UpadteHeaderCart');
      });
    },
    getCart() {
      if (localStorage.cartId) {
        let url = `/api/v1/CartApi`;
        let form = new FormData();
        form.append('CartID', localStorage.getItem('cartId'));
        this.$http.post(url, form).then((response) => {
          this.data = response.data.data;
          this.cartArray = response.data.data.purchaseList;
        });
      } else {
      }
      // this.$emit('upDateCart');
    },
    // go(nameKey, itemKey = null) {
    //   console.log('123');
    //   if (nameKey && itemKey !== null) {
    //     this.$router.push({
    //       name: nameKey,
    //       params: {
    //         id: itemKey,
    //       },
    //     });
    //   } else if (nameKey == 'home' && !itemKey) {
    //     if (this.$route.name == 'home') {
    //       return;
    //     } else {
    //       this.$router.push({
    //         name: nameKey,
    //       });
    //     }
    //   } else {
    //     this.$router.push({
    //       name: nameKey,
    //     });
    //   }
    // },
    login(state) {
      if (state == 'dashboard') {
        this.$router.push({
          name: 'dashboard',
        });
      } else if (state == true) {
        this.$router.push({
          name: 'member',
        });
      } else {
        this.$router.push({
          name: 'login',
        });
      }
    },
    logout() {
      localStorage.removeItem('User');
      localStorage.removeItem('Jwt');
      this.$router.push({
        name: 'home',
      });
      location.reload();
    },
    toggleActive() {
      this.active = !this.active;
    },
    go(nameKey) {
      if (nameKey == 'home') {
        if (this.$route.name == 'home') {
          return;
        } else {
          this.$router.push({
            name: nameKey,
          });
        }
      } else {
        this.$router.push({
          name: nameKey,
        });
      }
    },
    goPage(item) {
      this.$router.push({
        name: 'commodity',
        params: {
          id: item.pdrefid,
        },
      });
    },
    goCart() {
      this.$router.push({
        name: 'cart',
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.main-product {
  position: relative;
  width: calc(100% - 220px);
  float: right;
  background: #fafafa;
  padding-bottom: 60px;
  .product-menu-outter {
    margin: 0px 30px;
    .product-item {
      position: relative;
      background-color: #fff;
      border-radius: 0.4rem;
      // overflow: hidden;
      box-shadow: 0 3rem 6rem rgba(0, 0, 0, 0.1);
      cursor: pointer;
      transition: 0.2s;
      margin-bottom: 30px;
      // box-sizing: border-box;
      // margin-bottom: 15px;
      // box-shadow: 0px 0px 2px 0px black;
      .box {
        position: absolute;
      }
      .img-box {
        overflow: hidden;
        .box {
          max-width: 600px;
          width: 90%;
          background: #fff;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
        }

        /* common */
        .ribbon {
          width: 150px;
          height: 150px;
          overflow: hidden;
          position: absolute;
        }
        .ribbon::before,
        .ribbon::after {
          position: absolute;
          z-index: -1;
          content: '';
          display: block;
          border: 5px solid red;
        }
        .ribbon span {
          position: absolute;
          display: block;
          width: 225px;
          padding: 15px 0;
          background-color: red;
          box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
          color: #fff;
          font: 700 18px/1 'Lato', sans-serif;
          text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
          text-transform: uppercase;
          text-align: center;
        }

        /* top left*/
        .ribbon-top-left {
          top: -10px;
          left: -10px;
          z-index: 50;
        }
        .ribbon-top-left::before,
        .ribbon-top-left::after {
          border-top-color: transparent;
          border-left-color: transparent;
        }
        .ribbon-top-left::before {
          top: 0;
          right: 0;
        }
        .ribbon-top-left::after {
          bottom: 0;
          left: 0;
        }
        .ribbon-top-left span {
          right: -25px;
          top: 30px;
          transform: rotate(-45deg);
        }

        /* top right*/
        .ribbon-top-right {
          top: -10px;
          right: -10px;
        }
        .ribbon-top-right::before,
        .ribbon-top-right::after {
          border-top-color: transparent;
          border-right-color: transparent;
        }
        .ribbon-top-right::before {
          top: 0;
          left: 0;
        }
        .ribbon-top-right::after {
          bottom: 0;
          right: 0;
        }
        .ribbon-top-right span {
          left: -25px;
          top: 30px;
          transform: rotate(45deg);
        }

        /* bottom left*/
        .ribbon-bottom-left {
          bottom: -10px;
          left: -10px;
        }
        .ribbon-bottom-left::before,
        .ribbon-bottom-left::after {
          border-bottom-color: transparent;
          border-left-color: transparent;
        }
        .ribbon-bottom-left::before {
          bottom: 0;
          right: 0;
        }
        .ribbon-bottom-left::after {
          top: 0;
          left: 0;
        }
        .ribbon-bottom-left span {
          right: -25px;
          bottom: 30px;
          transform: rotate(225deg);
        }

        /* bottom right*/
        .ribbon-bottom-right {
          bottom: -10px;
          right: -10px;
        }
        .ribbon-bottom-right::before,
        .ribbon-bottom-right::after {
          border-bottom-color: transparent;
          border-right-color: transparent;
        }
        .ribbon-bottom-right::before {
          bottom: 0;
          left: 0;
        }
        .ribbon-bottom-right::after {
          top: 0;
          right: 0;
        }
        .ribbon-bottom-right span {
          left: -25px;
          bottom: 30px;
          transform: rotate(-225deg);
        }
        .product-img {
          width: 100%;
          height: 100%;
          cursor: pointer;
          transform: scale(1);
          transition: transform 0.6s;
        }
      }

      .item-body {
        width: 100%;
        text-align: center;
        padding: 15px;
        border-top: 1px solid #cecece;
        .price-box {
          padding-top: 15px;
          .origin-price {
            display: inline-block;
            margin-right: 5px;
            color: #999;
            text-decoration: line-through;
          }
          .price {
            display: inline-block;
            color: red;
            font-weight: 700;
          }
          // .addTocart {
          //   .add-btn {
          //     outline: none;
          //     border: none;
          //     background: #999;
          //     color: white;
          //     font-weight: bold;
          //     padding: 5px 30px;
          //     border-radius: 15px;
          //   }
          // }
        }
      }
      &:hover {
        .img-box {
          .product-img {
            transform: scale(1.1);
            transition: 0.6s;
          }
        }
      }
    }
  }
}
</style>
