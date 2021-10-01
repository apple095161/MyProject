<template>
  <div>
    <!-- <div class="burger-menu" :class="{ show: active }">
      <div class="burger-item">
        <span>美好生活</span>
        <ul>
          <li>
            <a @click.prevent="go('combination')">極簡人生</a>
          </li>
          <li>
            <a @click.prevent="go('combination2')">完美倉儲</a>
          </li>
          <li>
            <a @click.prevent="go('combination3')">衣櫥穿搭</a>
          </li>
        </ul>
      </div>
      <div class="burger-item">
        <span>
          <router-link :to="{ name: 'serviceitem' }" class="menu-link"
            >服務商品</router-link
          ></span
        >
        <ul>
          <li>
            <a @click.prevent="go('ServiceStep1')">收納整理</a>
          </li>
          <li>
            <a @click.prevent="go('adjustment')">空間改造</a>
          </li>
          <li>
            <a @click.prevent="go('IgPrice')">輕鬆移居</a>
          </li>
        </ul>
      </div>
      <div class="burger-item">
        <span>
          <a class="menu-link" @click.prevent="go('ShopPage')">電子商城</a>
        </span>
      </div>
      <div class="burger-item">
        <span>
          <a class="menu-link" @click.prevent="go('faq')">知識百科</a></span
        >
      </div>
      <div class="burger-item">
        <span>
          <a class="menu-link" @click.prevent="go('login')">會員專區</a>
        </span>
      </div>
    </div> -->
    <header class="header">
      <div class="shop-igprice-top" :class="{ active: scroll }">
        <div class="container nav">
          <div class="shop-igprice-logo">
            <h1>
              <router-link to="/">
                <img src="../assets/images/logo.jpg" alt />
              </router-link>
            </h1>
          </div>
          <div class="topMenu">
            <ul class="manu-list">
              <li class="menu-item">
                <div class="menu-title">商品總攬</div>
                <ul class="sub-menu">
                  <div class="sub-item">
                    <div class="sub-item-title">
                      優惠專區
                    </div>
                  </div>
                  <div class="sub-item">
                    <div class="sub-item-title">
                      搬家專用紙箱
                      <i class="fas fa-angle-right small-angle"></i>
                    </div>
                    <ul class="sub-children-menu">
                      <li class="sub-children-item">綜合箱</li>
                      <li class="sub-children-item">重物箱</li>
                    </ul>
                  </div>
                  <div class="sub-item">
                    <div class="sub-item-title">
                      分類A
                    </div>
                  </div>
                  <div class="sub-item">
                    <div class="sub-item-title">
                      分類B
                    </div>
                  </div>
                </ul>
              </li>
              <li class="menu-item">
                <div class="sub-item-title">
                  購物清單
                </div>
                <ul class="sub-menu">
                  <div class="sub-item">7</div>
                  <div class="sub-item">8</div>
                  <div class="sub-item">9</div>
                </ul>
              </li>
              <li class="menu-item">
                <div class="sub-item-title">
                  購物須知
                </div>
                <ul class="sub-menu">
                  <div class="sub-item">11</div>
                  <div class="sub-item">12</div>
                  <div class="sub-item">13</div>
                </ul>
              </li>
              <li class="menu-item">
                <div class="sub-item-title">
                  聯絡我們
                </div>
                <ul class="sub-menu">
                  <div class="sub-item">
                    LINE
                  </div>
                  <div class="sub-item">Facebook</div>
                  <div class="sub-item">搬家線上試算</div>
                </ul>
              </li>
              <!-- <li class="menu-item"><a href="#">聯絡我們</a></li> -->
            </ul>
          </div>
          <div class="header-login">
            <button class="header-login-btn">登入 / 註冊</button>
            <div class="header-cart">
              <div class="header-cart-box">
                購物車/NT$3
                <img
                  class="header-cart-img"
                  src="../assets/images/shopping-cart.png"
                  alt=""
                />
                <div class="header-cart-badge">1</div>
              </div>
              <div class="header-cart-manu">
                <div class="header-cart-manu-box" v-if="menu.length > 0">
                  <div
                    class="header-cart-item"
                    v-for="item in menu"
                    :key="item.imgUrl"
                  >
                    <div class="row row-set">
                      <div class="col-md-3">
                        <img :src="item.imgUrl" alt="" width="50" height="50" />
                      </div>
                      <div class="col-md-7">
                        <div class="item-name">{{ item.name }}</div>
                        <div class="item-price">$9850</div>
                      </div>
                      <div class="col-md-2 item-delete">
                        <i class="far fa-times-circle"></i>
                      </div>
                    </div>
                  </div>
                  <div class="header-cart-item cart-pirce text-center">
                    小記:<strong>$960</strong>
                  </div>
                  <button class="btn-primary header-cart-btn">
                    查看購物車
                  </button>
                  <button class="btn-primary header-cart-btn">結帳</button>
                </div>
                <div class="empty-text" v-else>購物車暫無商品</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mobile-top" :class="{ active: active, scroll: scroll }">
        <div class="shop-igprice-logo">
          <a href="/">
            <img src="../assets/images/logo.jpg" alt />
          </a>
        </div>
        <div class="burger" @click="toggleActive" :class="{ active: active }">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Header',
  data() {
    return {
      menu: [{}, {}],
      menuList: [],
      scroll: false,
      active: false,
    };
  },
  methods: {
    toggleActive() {},
  },
};
</script>
<style lang="scss" scoped>
</style>
