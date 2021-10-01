<template>
  <div v-if="$route.meta.keepAlive">
    <!-- <Header></Header> -->
    <main class="product-list" style="padding-top: 130px">
      <div class="side-bar">
        <section class="activity-area">
          <ul class="item-menu">
            <li
              class="item-list"
              v-for="(item, index) in menuList"
              :key="item.pccode"
              :class="{ 'menu-show': item.isclick == true }"
            >
              <a
                href=""
                class="link"
                @click.prevent="item.isclick = !item.isclick"
                :class="{ 'menu-show': item.isclick == true }"
                >{{ item.pcname }}
                <i
                  class="fas fa-angle-right small-angle"
                  v-show="index > 0"
                ></i>
              </a>
              <ul class="item-sub-menu" v-show="index > 0">
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
                    <h2 class="title">{{ item.pdname }}</h2>
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
  </div>
  <router-view v-else></router-view>
</template>

<script>
import Header from '../components/NewHeader.vue';
import $ from 'jquery';
import { createNamespacedHelpers } from 'vuex';
export default {
  name: 'shopitemlist',
  components: { Header },
  data() {
    return {
      activeName: '',
      menu: [],
      cartList: [],
      menuList: [
        {
          pcname: '全部商品',
          pccode: 'All',
        },
      ],
      isLogin: false,
      topList: false,
    };
  },
  created() {
    this.getList();
    this.getItem();
  },
  mounted() {
    // setTimeout(() => {
    //   $(document).ready(function() {
    //     $('.side-bar .activity-area .item-menu .item-list .link').click(
    //       function() {
    //         if ($(this).hasClass('menu-show')) {
    //           $(this).removeClass('menu-show');
    //           // $(this)
    //           //   .find('.link')
    //           //   .removeClass('menu-show');
    //           $(this)
    //             .find('.item-sub-menu')
    //             .slideUp();
    //         } else {
    //           $(this)
    //             .find('.item-sub-menu')
    //             .slideDown();
    //           $(this).addClass('menu-show');
    //           // $(this)
    //           //   .find('.link')
    //           //   .addClass('menu-show');
    //           $(this)
    //             .find('.item-sub-menu')
    //             .slideDown();
    //         }
    //       },
    //     );
    //   });
    // }, 500);
  },
  methods: {
    getItem() {
      const url = '/api/v1/CategoryApi';
      this.$http.get(url).then((response) => {
        response.data.data.map((item) => {
          this.menuList.push({
            isclick: false,
            ...item,
          });
        });
      });
    },
    getList() {
      let url = `/api/v1/ProductApi/All`;
      this.$http.get(url).then((response) => {
        // menu = response.data.data;
        response.data.data.map((item) => {
          this.menu.push({
            ...item,
          });
        });
      });
    },
    goDetail(item) {
      this.$router.push({
        name: 'commodity',
        params: {
          id: item.pdrefid,
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.product-list {
  display: flex;
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
        font-family: 'Trajan Pro', 'Playfair Display', 'Microsoft JhengHei',
          'Hiragino Sans GB', 'PingFang TC';
        font-size: 20px;
        color: #a49178;
        padding: 10px 0px;
      }
      .item-menu {
        border: 1px solid #e2e2e2;
        background: white;
        .item-list {
          border-bottom: 1px solid #e2e2e2;
          margin: 10px;
          // height: auto;
          overflow: hidden;
          // transition: all 0.5s;
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
            height: 0px;
            .item-sub-list {
              padding: 10px;
              a {
                text-decoration: none;
              }
            }
          }
          &.menu-show {
            .item-sub-menu {
              height: auto;
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
    // .el-collapse {
    //   .el-collapse-item {
    //     .el-collapse-item__header {
    //       font-size: 18px;
    //     }
    //   }
    // }
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
