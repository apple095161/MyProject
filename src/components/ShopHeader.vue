<template>
  <div>
    <div class="mobile-ctrl-list">
      <a @click.prevent="go('ShopPage')">
        <i class="fas fa-home mr-2"></i>
        回商城
      </a>
      <a @click.prevent="go('member')"
        ><i class="far fa-user-circle mr-2"></i>會員中心</a
      >
      <a @click.prevent="go('shoplogin')" v-if="!isLogin">
        <i class="fas fa-home mr-2"></i>
        登入
      </a>
      <a @click.prevent="logout" v-if="isLogin"
        ><i class="fas fa-sign-out-alt mr-2"></i>登出</a
      >
      <a @click.prevent="go('cart')"
        ><i class="fas fa-shopping-cart ml-2"></i
      ></a>
    </div>
    <div class="cart-burger-menu" :class="{ show: burger }">
      <div class="burger-item" v-for="item in menuList" :key="item.pccode">
        <a @click.prevent="filterType(item.pccode)" style="cursor: pointer">
          {{ item.pcname }}</a
        >
        <!-- <span>{{ item.pcname }}</span> -->
        <!-- <ul>
          <li>
            <router-link to="/about">測試跳轉</router-link>
          </li>
        </ul> -->
      </div>
    </div>
    <div class="shop-header" :class="{ show: burger }">
      <div class="shop-nav-menu-account">
        <div class="shop-igprice-logo mg-show mr-auto">
          <h1>
            <router-link to="/"> </router-link>
          </h1>
          <router-link class="logo-text" to="/shophome">美好商城</router-link>
        </div>
        <div
          class="cart-burger-icon"
          @click="burger = !burger"
          :class="{ active: burger }"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="shop-igprice-logo sm-show">
          <h1>
            <router-link to="/"> </router-link>
          </h1>
        </div>
        <ul class="shop-nav-menu-account-menu">
          <li class="shop-nav-menu-account-item" v-if="!isLogin">
            <router-link class="shop-login" :to="{ name: 'shoplogin' }"
              ><i class="fas fa-sign-in-alt">登入</i></router-link
            >
          </li>
          <li class="shop-nav-menu-account-item" v-if="name">
            <router-link class="shop-accout" :to="{ name: 'member' }">
              <i class="far fa-user-circle">會員中心</i>
            </router-link>
          </li>
          <li class="shop-nav-menu-account-item" v-if="isLogin">
            <a href="" class="shop-login" @click.prevent="logout">
              <i class="fas fa-sign-out-alt">登出</i>
            </a>
          </li>
          <li class="shop-nav-menu-account-item cart-badge header-cart">
            <a @click.prevent>
              <i class="fas fa-shopping-cart"></i>
              <div class="badge-num">{{ returnLength() }}</div>
            </a>

            <div class="cart-menu-box" v-if="cartLst.length > 0">
              <ul class="cart-menu">
                <li class="cart-items" v-for="item in cartLst" :key="item.key">
                  <div class="row align-items-center">
                    <div class="col-3"></div>
                    <div class="col-7">
                      <div>{{ item.productName }}</div>
                      <div>數量:{{ item.quantity }}</div>
                    </div>
                    <div class="col-2" style="text-align: end">
                      ${{ item.productPrice * item.quantity }}
                    </div>
                  </div>
                </li>
              </ul>
              <div class="cart-btn-box">
                <button class="cart-btn" @click="gopay">結帳去</button>
              </div>
            </div>
            <div class="cart-menu-box" v-else style="width: 350px">
              <div style="font-size:30px;text-align:center;marging:15px;0px;">
                購物車無商品
              </div>
              <div class="cart-btn-box">
                <button class="cart-btn" @click="goList">購物去</button>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <ul class="shop-nav-menu" v-if="topList">
        <div class="shop-logo">
          <!-- <img src="../assets/LOGOA.jpg" alt /> -->
        </div>
        <li v-for="item in menuList" :key="item.pccode">
          <router-link
            :to="{ name: 'shopList', query: { type: item.pccode } }"
            >{{ item.pcname }}</router-link
          >
        </li>
        <!-- <li>
          <router-link :to="{ name: 'shopList' }">打包</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'shopList' }">裝箱</router-link>
        </li> -->
        <!-- <div class="cart">
          <div class="cart-icon">
            <div class="cart-img">
              <img
                src="https://cdn.onlinewebfonts.com/svg/img_378655.png"
                alt
              />
            </div>
            <div class="cart-badge">1</div>
          </div>
        </div> -->
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    cartLst: {
      type: Array,
      default() {
        return [];
      },
    },
    // menuList: {
    //   type: Array,
    //   default() {
    //     return [];
    //   },
    // },
    isLogin: {
      type: Boolean,
      default() {
        return false;
      },
    },
    topList: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      burger: false,
      name: '',
      menuList: [],
    };
  },
  watch: {},
  created() {
    if (localStorage.User) {
      this.name = JSON.parse(localStorage.User).family_name;
    }
    this.getType();
  },
  methods: {
    returnLength() {
      return this.cartLst.length || 0;
    },
    getType() {
      let array = [
        {
          pcname: '全部商品',
          pccode: 'All',
        },
      ];
      const url = '/api/v1/CategoryApi';
      this.$http.get(url).then(response => {
        response.data.data.map(item => {
          array.push({
            ...item,
          });
        });
      });
      this.menuList = array;
    },
    logout() {
      localStorage.removeItem('User');
      localStorage.removeItem('Jwt');
      setTimeout(() => {
        if (this.$route.name === 'ShopPage') {
          this.$router.go(0);
        } else {
          this.$router.push({
            name: 'ShopPage',
          });
        }
      }, 100);
    },
    gopay() {
      this.$router.push({
        name: 'cart',
      });
    },
    goList() {
      this.$router.push({
        name: 'shopList',
        query: {
          type: 'ALL',
        },
      });
    },
    filterType(key) {
      if (this.$route.name !== 'shopList') {
        this.$router.push({
          name: 'shopList',
          query: {
            type: key,
          },
        });
      } else {
        this.$emit('changeType', key);
      }
    },
    go(name) {
      if (name == 'member') {
        if (!localStorage.User) {
          this.$router.push({
            name: 'shoplogin',
          });
        } else {
          this.$router.push({
            name: `${name}`,
          });
        }
      } else {
        this.$router.push({
          name: `${name}`,
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
</style>