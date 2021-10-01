<template>
  <div v-if="$route.meta.keepAlive">
    <ShopHeader
      :cartLst="cartList"
      :isLogin="isLogin"
      :topList="topList"
      @changeType="changeType"
    ></ShopHeader>
    <main class="product-list" style="padding-top: 130px">
      <div class="side-bar">
        <section class="activity-area">
          <!-- <div class="activity-title">Special活動</div> -->
          <ul class="item-menu">
            <li
              class="item-list"
              v-for="item in menuList"
              :key="item.pccode"
              @click.prevent="filterList(item.pccode, $event)"
            >
              <a href="" class="link"
                >{{ item.pcname }} <i class="fas fa-angle-right small-angle"></i
              ></a>
              <ul class="item-sub-menu" style="display: none">
                <li class="item-sub-list">
                  <router-link to="">測試項目1</router-link>
                </li>
                <li class="item-sub-list">
                  <router-link to="">測試項目2</router-link>
                </li>
              </ul>
            </li>
          </ul>
        </section>

        <!-- <section class="main-bar">
          <ul>
            <li>上衣</li>
            <li>新品上市</li>
            <li>衣物箱</li>
          </ul>
        </section> -->
      </div>
      <div class="main-product">
        <div class="product-menu-outter">
          <div class="product-menu">
            <div class="row">
              <div
                class="col-md-6 col-lg-4 col-xl-3"
                v-for="item in menu"
                :key="item.key"
              >
                <div class="product-item">
                  <div class="img-box" @click="goDetail(item)">
                    <div class="box">
                      <div class="ribbon ribbon-top-left">
                        <!-- <span>{{ filterType(item.pccode) }}</span> -->
                        <span>特價品</span>
                      </div>
                    </div>
                    <img :src="item.pdphoto" alt="" class="product-img" />
                  </div>
                  <!-- <div class="ribbon">熱門</div> -->
                  <!-- <div :style="`background-image:url('${item.pdphoto}')`"></div> -->
                  <div class="item-body">
                    <div class="title">{{ item.pdname }}</div>
                    <div class="size">{{ item.pdsize }}</div>
                    <div class="price-box">
                      <!-- <div class="origin-price">{{ item.ogrP }}</div> -->
                      <div class="price">${{ item.pdprice }}</div>
                      <!-- <div class="addTocart">
                        <button class="add-btn">加入購物車</button>
                      </div> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- <div class="clear-fix"></div>
    <ShopFooter></ShopFooter> -->
  </div>
  <router-view v-else></router-view>
</template>
<script>
import ShopHeader from './ShopHeader';
import ShopFooter from './Footer';
import $ from 'jquery';
import { ComboBox } from '@progress/kendo-vue-dropdowns';
export default {
  components: { ShopHeader, ShopFooter },
  name: 'shopmenulist',
  data() {
    return {
      type: this.$route.query.type,
      menu: [],
      cartList: [],
      menuList: [],
      isLogin: false,
      topList: false,
    };
  },
  watch: {
    // $route(to, from) {
    //   if (from.name === 'commodity') {
    //     this.getCart();
    //     // this.getType();
    //     this.getList();
    //   } else if (from.name === 'cart') {
    //     this.getList();
    //   } else if (from.name === 'shopList') {
    //     this.getList();
    //   }
    // },
    '$route.query': {
      handler(type) {
        if (this.$route.name == 'shopList') {
          let url = `/api/v1/ProductApi/${type.type}`;
          this.$http.get(url).then((response) => {
            this.menu = response.data.data;
          });
        }
      },
    },
  },
  created() {
    this.getCart();
    this.getType();
    this.getList();
  },
  mounted() {
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
  methods: {
    goDetail(item) {
      this.$router.push({
        name: 'commodity',
        params: {
          id: item.pdrefid,
        },
      });
    },
    changeType(key) {
      if (this.$route.name === 'shopList') {
        this.$router.push({
          name: 'ShopPage',
        });
        this.$router.push({
          name: 'shopList',
          query: {
            type: key,
          },
        });
      }
    },
    getList() {
      // let url = "/api/v1/ProductApi/All";
      let url = `/api/v1/ProductApi/${this.$route.query.type}`;
      this.$http.get(url).then((response) => {
        this.menu = response.data.data;
      });
    },
    getType() {
      let array = [
        {
          pcname: '全部商品',
          pccode: 'All',
        },
      ];
      const url = '/api/v1/CategoryApi';
      this.$http.get(url).then((response) => {
        response.data.data.map((item) => {
          array.push({
            ...item,
          });
        });
      });
      this.menuList = array;
    },
    getCart() {
      if (localStorage.cartId) {
        const url = `/api/v1/CartApi`;
        let form = new FormData();
        form.append('CartID', localStorage.getItem('cartId'));
        this.$http.post(url, form).then((response) => {
          this.cartList = response.data.data.purchaseList;
          this.data = response.data.data.purchaseList;
        });
      }
      if (localStorage.User) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    },
    filterType(key) {
      let title = '';
      this.menuList.forEach((item) => {
        if (item.pccode == key) {
          title = item.pcname;
        }
      });
      return title;
    },
    filterList(type, event) {
      $(document).ready(function () {
        $('.side-bar .item-menu .item-list .item-sub-menu').slideUp();
        $('.side-bar .item-menu .item-list .link').removeClass('menu-show');
        // $('.side-bar .item-menu .item-list .item-sub-menu').removeClass(
        //   'sub-menu',
        // );

        if (event.path.length == 13) {
          if ($(this).find(event.path[2].children[1]).hasClass('sub-menu')) {
            $(this).find(event.path[2].children[1]).removeClass('sub-menu');
            $(this).find(event.path[2].children[1]).slideUp();
          } else {
            $('.side-bar .item-menu .item-list .item-sub-menu').removeClass(
              'sub-menu',
            );
            $(this).find(event.path[1]).addClass('menu-show');
            $(this).find(event.path[2].children[1]).addClass('sub-menu');
            $(this).find(event.path[2].children[1]).slideDown(500);
          }
        } else {
          if ($(this).find(event.path[1].children[1]).hasClass('sub-menu')) {
            $(this).find(event.path[1].children[1]).removeClass('sub-menu');
            $(this).find(event.path[1].children[1]).slideUp();
          } else {
            $('.side-bar .item-menu .item-list .item-sub-menu').removeClass(
              'sub-menu',
            );
            $(this).find(event.path[0]).addClass('menu-show');
            $(this).find(event.path[1].children[1]).addClass('sub-menu');
            $(this).find(event.path[1].children[1]).slideDown(500);
          }
        }

        // if ($(this).find(event.path[1].children[1]).hasClass('sub-menu')) {
        //   $(this).find(event.path[1].children[1]).removeClass('sub-menu');
        // } else {
        //   $(this).find(event.path[1].children[1]).addClass('sub-menu');
        //   $(this).find(event.path[1].children[1]).slideDown(500);
        // }
      });
      this.$router.push({
        name: 'shopList',
        query: {
          type: type.trim(),
        },
      });
      // this.$route.query.type = type;
    },
  },
};
</script>
<style lang="scss" scoped>
.product-list {
  background: #fafafa;
  padding-top: 1.5rem;
  margin-top: 30px;

  .side-bar {
    width: 220px;
    float: left;
    background: #fafafa;
    padding-bottom: 60px;
    .activity-area {
      padding-left: 2rem;
      margin-bottom: 1.2rem;

      .activity-title {
        font-size: 20px;
        color: #a49178;
        padding: 10px 0px;
      }
      .item-menu {
        border: 1px solid #e2e2e2;
        .item-list {
          border-bottom: 1px solid #e2e2e2;
          margin: 10px;
          &:last-child {
            border-bottom: none;
          }
          .link {
            text-decoration: none !important;
            position: relative;
            display: block;
            padding: 10px;
            font-size: 18px;
            .small-angle {
              float: right;
              transform: rotate(90deg);
              transition: transform 0.4s;
            }
            &.menu-show {
              .small-angle {
                transform: rotate(270deg);
                transition: transform 0.4s;
              }
            }
            // &::after {
            //   position: absolute;
            //   left: 0;
            //   bottom: -5px;
            //   content: '';
            //   width: 0%;
            //   height: 2px;
            //   background: saddlebrown;
            //   transition: all 0.3s;
            // }
            // &:hover::after {
            //   width: 100%;
            //   transition: all 0.3s;
            // }
            // &:hover {
            //   color: #a49178;
            // }
          }
          .item-sub-menu {
            margin: 5px 15px;
            .item-sub-list {
              padding: 10px;
              a {
                text-decoration: none;
              }
            }
          }
        }
      }
    }
    .main-bar {
      padding-left: 2rem;
      ul {
        li {
          padding: 5px 0px;
        }
      }
    }
  }
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
}

@media (max-width: 991px) {
  .product-list {
    .side-bar {
      width: 180px;
    }
    .main-product {
      width: calc(100% - 180px);
    }
  }
}
@media (max-width: 767px) {
  .product-list {
    .side-bar {
      display: none;
    }
    .main-product {
      width: 100%;
      float: none;
    }
  }
}
</style>