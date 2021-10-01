<template>
  <div>
    <!-- <Newheader :cartLst="cartList" :isLogin="isLogin"></Newheader> -->
    <div style="padding-top: 120px">
      <div class="container">
        <div class="row detail-item-box" v-if="item.emproduct">
          <div class="col-md-5">
            <div class="img-box">
              <img :src="item.emproduct.pdphoto" :alt="item.emproduct.pdname" />
              <ul class="Preview-img-menu mb-0">
                <li
                  class="Preview-img-item"
                  v-for="photo in item.emproduct.empdphotos"
                  :key="photo.pdprefid"
                  @click="changeImg(photo.pdpphoto)"
                  v-b-modal.modal-show
                >
                  <img :src="photo.pdpphoto" alt="" />
                </li>
              </ul>
            </div>
          </div>
          <div class="col-md-7 detail-box">
            <div class="title">
              <h2>
                {{ item.emproduct.pdname }}
              </h2>
            </div>
            <!-- <div class="product-type" v-show="item.emproduct.code">
              <div class="row align-items-center">
                <div class="col-2">商品編號</div>
                <div class="col-10">
                  <span class="text" @click="goType(pctype.pccode)">
                    {{ pctype.pcname }}
                  </span>
                </div>
              </div>
            </div> -->
            <h3 class="description">
              {{ item.emproduct.pdshort }}
            </h3>
            <div class="ctrl-area-outlide">
              <div class="ctrl-area-inside">
                <div class="product-price">
                  <div class="row align-items-center">
                    <div class="col-3 sell-title">售價</div>
                    <div class="col-6 right text-center">
                      <span class="price mr-1"
                        >${{ item.emproduct.pdprice }}
                      </span>
                    </div>
                    <div class="col-3 sold px-0">
                      <span class="">已售{{ item.orderCount }}</span>
                    </div>
                  </div>
                </div>
                <div class="number">
                  <div class="row align-items-center">
                    <div class="col-3 sell-title">數量</div>
                    <div class="col-6 right text-center">
                      <div class="number-style">
                        <button @click="times">
                          <i class="fas fa-caret-left"></i>
                        </button>
                        <input
                          type="text"
                          v-model="form.count"
                          id="product-qty"
                        />
                        <button @click="plus">
                          <i class="fas fa-caret-right"></i>
                        </button>
                      </div>
                    </div>
                    <div class="col-3 stock px-0">
                      還剩{{ item.stockCount }}件
                    </div>
                  </div>
                </div>
                <div class="buy-control">
                  <div class="row">
                    <div class="col-6">
                      <button class="btn-style" @click="nowaddTocart">
                        立即購買
                      </button>
                    </div>
                    <div class="col-6">
                      <button class="btn-style" @click="addTocart">
                        加入購物車
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div class="origin-price">
            <div class="row align-items-center">
              <div class="col-2">原價</div>
              <div class="col-10 price">${{ item.ogrP }}</div>
            </div>
          </div> -->
            <!-- <div class="discount-price">
              <div class="row align-items-center">
                <div class="col-2">售價</div>
                <div class="col-10 right">
                  <span class="price mr-1">${{ item.emproduct.pdprice }} </span>
                  <span class="sold">/ 已售{{ item.orderCount }}</span>
                </div>
              </div>
            </div> -->
            <!-- <div class="stock">
            <div class="row align-items-center">
              <div class="col-2">庫存</div>
              <div class="col-10 right">
                <span class="btn-item">現貨</span>
                <span class="btn-item">預購</span>
              </div>
            </div>
          </div> -->
            <!-- <div class="item-size" v-show="item.emproduct.size">
              <div class="row align-items-center">
                <div class="col-2">尺寸</div>
                <div class="col-10 right">
                  <span
                    class="btn-item"
                    @click="size(1)"
                    :class="{ active: form.size == 1 }"
                    >大</span
                  >
                  <span
                    class="btn-item"
                    @click="size(2)"
                    :class="{ active: form.size == 2 }"
                    >小</span
                  >
                </div>
              </div>
            </div> -->
            <!-- <div class="number">
              <div class="row">
                <div class="col-2">數量</div>
                <div class="col-10 right">
                  <div class="number-style">
                    <button @click="times">-</button>
                    <input type="text" v-model="form.count" />
                    <button @click="plus">+</button>
                  </div>
                  <div class="stock ml-2">還剩{{ item.stockCount }}件</div>
                  <div class="buy-control">
                    <button class="btn-style" @click="nowaddTocart">
                      立即購買
                    </button>
                    <button class="btn-style" @click="addTocart">
                      加入購物車
                    </button>
                  </div>
                </div>
              </div>
            </div> -->
            <!--
          <div class="promotion">
            <div class="row align-items-center">
              <div class="col-2">促銷活動</div>
              <div class="col-10 right">
                <span class="special-code">
                  <span class="type">
                    <span>折扣碼</span>
                  </span>
                  <span class="special-title">萊爾富</span>
                </span>
                <span class="normal-code">滿400折$40</span>
              </div>
            </div>
          </div> -->
            <div class="pay-type">
              <div class="row align-items-center">
                <div class="col-12 right">信用卡/網路ATM/ATM/貨到付款</div>
              </div>
            </div>
            <!-- <div class="pay-type">
              <div class="row align-items-center">
                <div class="col-2">付款方式</div>
                <div class="col-10 right">
                  <ul class="d-flex">
                    <li class="pay-item">
                      <i class="far">
                        <img
                          src="../assets/images/creditcart.jpg"
                          width="25"
                          height="25"
                          alt="信用卡付款"
                        />
                      </i>
                      <div class="tip">信用卡付款</div>
                    </li>
                    <li class="pay-item">
                      <i class="fas">
                        <img
                          src="../assets/images/webatm.jpg"
                          width="25"
                          height="25"
                          alt="網路ATM"
                        />
                      </i>
                      <div class="tip">網路ATM</div>
                    </li>
                    <li class="pay-item">
                      <i class="fas">
                        <img
                          src="../assets/images/atm.png"
                          width="25"
                          height="25"
                          alt="自動櫃員機"
                        />
                      </i>
                      <div class="tip">自動櫃員機</div>
                    </li>
                    <li class="pay-item" style="font-size: 19px">
                      <i class="fas fa-shipping-fast"></i>
                      <div class="tip">貨到付款</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div> -->

            <div class="shipping">
              <div class="row">
                <div class="col-12 right">
                  <div class="shipping-item">
                    宅配/貨運 — 運費${{ item.basicFare }}起
                    <!-- <a class="ml-1" @click.prevent="showShip">詳細運費規則</a> -->
                  </div>
                </div>
              </div>
            </div>
            <div class="shipping-description">
              <div class="row">
                <div class="col-12 right">
                  <div class="shipping-description-title">運費說明:</div>
                  <div class="shipping-description-text">
                    {{ item.fareDesc }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container shop-content-box" v-if="item.emproduct">
        <button
          class="product-btn"
          @click="changeDetail('product')"
          :class="{ active: show == 'product' }"
        >
          商品資訊
        </button>
        <!-- <button
          class="product-btn"
          @click="changeDetail('qa')"
          :class="{ active: show == 'qa' }"
        >
          問與答
        </button> -->
        <div class="product-detail" v-show="show == 'product'">
          <div class="d-flex">
            <div class="product-detail-box" v-html="item.emproduct.pddesc">
              <!-- <img :src="item.pdphoto" alt="" width="800" height="800" /> -->
            </div>
          </div>
        </div>
        <div class="product-qa" v-show="show == 'qa'">
          <div class="container">112332</div>
        </div>
      </div>
    </div>
    <b-modal
      class="model"
      centered
      id="modal-show"
      size="lg"
      :hide-footer="true"
    >
      <div class="my-4 modal-img">
        <img :src="modalImg" alt="" width="100%" />
      </div>
      <div class="modal-small-img" v-if="item.emproduct">
        <ul class="footer-menu">
          <!-- <li
            v-for="img in item"
            :key="img.url"
            class="footer-item"
            @click="changeModalImg(img.url)"
          >
            <img :src="img.url" alt="" />
          </li> -->

          <li
            class="footer-item"
            v-for="photo in item.emproduct.empdphotos"
            :key="photo.pdprefid"
            @click="changeModalImg(photo.pdpphoto)"
          >
            <img :src="photo.pdpphoto" alt="" />
          </li>
        </ul>
      </div>
      <template v-slot:modal-footer> </template>
    </b-modal>
    <!-- 運費規則 -->
    <b-modal id="shipRules" centered title="運費規則">
      <table class="table">
        <thead>
          <tr>
            <th>紙箱總數量</th>
            <th>運費</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in shipRule" :key="item.price">
            <td>{{ item.title }}</td>
            <!-- <td v-if="!item.priceShow">NT${{ item.price }}</td>
            <td v-else>{{ item.price }}</td> -->
            <td>NT${{ item.price }}</td>
          </tr>
          <!-- <tr>
            <td colspan="2" class="text-danger" style="font-weight: bold">
              購物滿$2000享免運費折扣
            </td>
          </tr> -->
        </tbody>
      </table>
      <template #modal-footer>
        <b-button
          variant="primary"
          size="sm"
          class="float-right"
          @click="closeSipMd"
        >
          關閉
        </b-button>
      </template>
    </b-modal>
    <!-- <Newfooter :widthShow="widthShow"></Newfooter> -->
  </div>
</template>
<script>
import Newheader from '../components/NewHeader';
import Newfooter from '../components/Footer';
export default {
  name: 'commodity',
  components: { Newheader, Newfooter },
  metaInfo() {
    return {
      title: this.title,
    };
  },
  props: {
    itemChange: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      show: 'product',
      showImg: '',
      modalImg: '',
      id: this.$route.params.id || '',
      form: {
        count: 1,
        size: null,
      },
      pctype: '',
      item: {},
      cartData: [],
      cartList: [],
      isLogin: false,
      widthShow: false,
      title: '搬家紙箱專賣店 | 速購家',
      shipRule: [
        {
          title: '10個以內',
          price: 120,
        },
        {
          title: '11~20個',
          price: 240,
        },
        {
          title: '21~30個',
          price: 340,
        },
        {
          title: '31~40個',
          price: 440,
        },
        {
          title: '41~50個',
          price: 540,
        },
        {
          title: '51~60個',
          price: 640,
        },
        // {
        //   title: '~',
        //   price: '~',
        //   priceShow: true,
        // },
      ],
    };
  },

  watch: {
    'item.emproduct.pccode': {
      handler(key) {
        const url = '/api/v1/CategoryApi';
        this.$http.get(url).then((response) => {
          response.data.data.forEach((item) => {
            if (item.pccode === key) {
              this.pctype = item;
            }
          });
        });
      },
    },
    'form.count': {
      handler(num) {
        if (num.toString() == '0') {
          this.form.count = 1;
        } else if (num.toString().indexOf('-') !== -1) {
          this.form.count = 1;
        } else if (num == '') {
          this.form.count = 1;
        }
      },
    },
    $route() {
      this.getDetail();
      this.form.count = 1;
    },
  },
  created() {
    // this.getDetail();
    // this.getCart();
  },
  mounted() {
    this.getDetail();
    this.getCart();
    const vm = this;
    if (window.innerWidth <= 767) {
      vm.widthShow = true;
    } else {
      vm.widthShow = false;
    }
    window.onresize = () => {
      if (window.innerWidth <= 767) {
        vm.widthShow = true;
      } else {
        vm.widthShow = false;
      }
    };
  },
  methods: {
    getDetail() {
      let url = `/api/v1/ProductApi/View/${this.$route.params.id}`;
      this.$http.get(url).then((response) => {
        this.item = response.data.data;
        this.title = response.data.data.emproduct.pdname;
      });
    },
    goType(key) {
      this.$router.push({
        name: 'shopList',
        query: {
          type: key,
        },
      });
    },
    // getType() {
    //   let type = "";
    //   let url = "/api/v1/CategoryApi";
    //   this.$http.get(url).then((response) => {
    //     response.data.data.forEach((item) => {
    //       if (item.pccode == this.item.pccode) {
    //         type = `#${item.pcname}`;
    //       }
    //     });
    //   });
    //   return type;
    // },
    // buynow() {
    //   let exp = JSON.parse(localStorage.User).exp;
    //   let date = Math.floor(Date.now() / 1000);
    //   if (date > exp) {
    //   } else {
    //     this.nowaddTocart();
    //   }
    // },
    // buynow() {
    //   if (localStorage.cartId) {
    //     this.postItem();
    //   } else {
    //     let url = "/api/v1/CartApi";
    //     let form = new FormData();
    //     form.append("CartID", "");
    //     this.$http.post(url, form).then((response) => {
    //       localStorage.setItem("cartId", response.data.data.cartID);
    //       setTimeout(() => {
    //         this.nowaddTocart();
    //       }, 100);
    //     });
    //   }
    // },
    //立即加入購物車
    nowaddTocart() {
      if (localStorage.cartId) {
        this.postItem('now');
      } else {
        const url = '/api/v1/CartApi';
        const form = new FormData();
        form.append('CartID', '');
        this.$http.post(url, form).then((response) => {
          this.$store.dispatch('updateCart');
          localStorage.setItem('cartId', response.data.data.cartID);
          setTimeout(() => {
            this.postItem('now');
          }, 100);
        });
      }
    },
    changeImg(url) {
      this.showImg = url;
      this.modalImg = url;
    },
    changeModalImg(url) {
      this.modalImg = url;
    },
    changeDetail(name) {
      this.show = name;
    },
    times() {
      if (this.form.count == 1 || this.form.count == '1') {
        return;
      } else {
        this.form.count = parseInt(this.form.count) - 1;
      }
    },
    plus() {
      this.form.count = parseInt(this.form.count) + 1;
    },
    size(key) {
      this.form.size = key;
    },
    addTocart() {
      if (localStorage.cartId) {
        this.postItem();
      } else {
        const url = '/api/v1/CartApi';
        let form = new FormData();
        form.append('CartID', '');
        this.$http.post(url, form).then((response) => {
          localStorage.setItem('cartId', response.data.data.cartID);
          setTimeout(() => {
            this.postItem();
          }, 100);
        });
      }
    },

    postItem(key) {
      const vm = this;
      const url = '/api/v1/CartApi/AddProduct';
      let form = new FormData();
      form.append('CartID', localStorage.getItem('cartId'));
      form.append('ProductId', this.$route.params.id);
      form.append('Quantity', this.form.count);
      this.$http.post(url, form).then((response) => {
        if (response.data.isSuccess) {
          this.$store.dispatch('updateCart');
          if (key === 'now') {
            this.getCart();
            this.$router.push({
              name: 'cart',
            });
          } else {
            this.$message({
              showClose: true,
              message: '已加入購物車',
              type: 'success',
            });
            // this.getCart();
          }
        } else {
          this.$swal({
            icon: 'error',
            title: `${response.data.message}`,
          });
        }
      });
    },
    // addTocart() {
    //   if (localStorage.cartItem) {
    //     this.cartData = JSON.parse(localStorage.cartItem);
    //     let data = {
    //       ...this.item,
    //       size: this.form.size,
    //       count: this.form.count,
    //     };
    //     this.cartData.push(data);
    //     localStorage.setItem("cartItem", JSON.stringify(this.cartData));
    //   } else {
    //     this.cartData.push({
    //       ...this.item,
    //       size: this.form.size,
    //       count: this.form.count,
    //     });
    //     localStorage.setItem("cartItem", JSON.stringify(this.cartData));
    //   }
    //   this.getCart();
    // },
    getCart() {
      if (localStorage.cartId) {
        const url = `/api/v1/CartApi`;
        const form = new FormData();
        form.append('CartID', localStorage.getItem('cartId'));

        this.$http.post(url, form).then((response) => {
          this.cartList = response.data.data.purchaseList;
        });
      }
      if (localStorage.User) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    },
    showShip() {
      this.$bvModal.show('shipRules');
    },
    closeSipMd() {
      this.$bvModal.hide('shipRules');
    },
  },
};
</script>
<style lang="scss" scoped>
.pt-160 {
  padding-top: 160px;
}
.detail-item-box {
  background: white;
  margin-top: 50px;
  margin-bottom: 30px;
  .img-box {
    // margin: 15px;
    img {
      border: 2px solid #a88754;
    }

    .Preview-img-menu {
      display: flex;
      margin-top: 15px;
      .Preview-img-item {
        margin-right: 15px;
        cursor: zoom-in;
        // border: 2px solid #a88754;
        img {
          height: 80px;
          width: 80px;
        }
      }
    }
    img {
      width: 100%;
      height: auto;
    }
  }
  .detail-box {
    .title {
      color: #a88754;
      font-weight: bold;
      margin-top: -20px;
      h2 {
        font-size: 20px;
      }
    }
    .origin-price {
      margin: 15px 0px;
      align-items: center;
      .price {
        text-decoration: line-through;
      }
    }
    .description {
      margin: 15px 0px;
      font-size: 18px;
      color: #a88754;
      opacity: 0.65;
    }
    .ctrl-area-outlide {
      background: #a88754;
      .ctrl-area-inside {
        padding: 25px;
        .product-price {
          margin: 15px 0px;
          align-items: center;
          color: #ffffff;
          .sold {
            font-size: 18px;
          }
          .right {
            font-size: 18px;
            .price {
              display: inline-block;
              font-size: 24px;
            }

            .saleout {
              margin-left: 5px;
              color: #979ba7;
            }
          }
          .sell-title {
            font-size: 18px;
          }
        }
        .product-type {
          .text {
            display: inline-block;
            cursor: pointer;
            color: skyblue;
            font-size: 18px;
          }
        }
        .stock {
          font-size: 18px;
          font-weight: normal;
          .right {
            .btn-item {
              display: inline-block;
              line-height: 20px;
              padding: 7px;
              text-align: center;
              border: 2px solid #e0e4e9;
              border-radius: 2px;
              margin-right: 15px;
              position: relative;
              cursor: pointer;
              &:hover {
                background: #e0e4e9;
              }
            }
          }
        }
        .item-size {
          margin: 15px 0px;
          .right {
            .btn-item {
              display: inline-block;
              line-height: 20px;
              padding: 7px;
              text-align: center;
              border: 2px solid #e0e4e9;
              border-radius: 2px;
              margin-right: 15px;
              position: relative;
              cursor: pointer;
              box-sizing: border-box;
              &:hover {
                background: #e0e4e9;
              }
              &.active {
                border: 2px solid skyblue;
              }
            }
          }
        }
        .number {
          margin: 15px 0px;
          color: #ffffff;
          .right {
            .number-style {
              display: inline-block;
              button {
                color: #ffffff;
                // border: 2px solid #bca888;
                background: #a88754;
                padding: 5px 10px;
                outline: none;
                border: none;
                i {
                  font-size: 18px;
                }
              }
              input {
                width: 80px;
                // border: 2px solid #bca888;
                border-left: none;
                border-right: none;
                padding: 5px 10px;
                background: #a88754;
                color: #ffffff;
                text-align: center;
                outline: none;
                border: none;
              }
            }
            .stock {
              display: inline-block;
              color: #3cb878;
            }
          }
          .sell-title {
            font-size: 18px;
          }
        }
        .buy-control {
          .btn-style {
            display: block;
            line-height: 40px;
            outline: none;
            border: none;
            letter-spacing: 2px;
            background: #ffffff;
            color: #a88754;
            width: 100%;
            // &:first-child {
            //   border: 2px solid #979ba7;
            //   background: antiquewhite;
            //   &:hover {
            //     background: darken(antiquewhite, 15%);
            //   }
            // }
            // &:nth-child(2) {
            //   border: 2px solid steelblue;
            //   background: #3cb878;
            //   &:hover {
            //     background: lighten(#3cb878, 15%);
            //   }
            // }
          }
        }
      }
    }

    .promotion {
      margin: 15px 0px;
      .special-code {
        margin-right: 5px;
        .type {
          display: inline-block;
          border: 1px solid #bca888;
          color: #bca888;
          span {
            margin: 5px;
          }
        }
        .special-title {
          display: inline-block;
          background: #e0e4e9;
          padding: 1px 5px;
        }
      }
      .normal-code {
        display: inline-block;
        background: #e0e4e9;
        padding: 1px 5px;
      }
    }
    .pay-type {
      padding: 15px 0px;
      border-bottom: 2px solid #a88754;
      text-align: center;
      letter-spacing: 4px;
      color: #a88754;
      font-size: 18px;
      // .right {
      //   display: flex;
      //   align-items: center;
      //   ul {
      //     margin-bottom: 0;
      //   }
      //   .pay-item {
      //     position: relative;
      //     display: inline-block;
      //     margin-right: 15px;

      //     i {
      //       font-size: 20px;
      //     }
      //     .tip {
      //       display: inline-block;
      //       position: absolute;
      //       white-space: nowrap;
      //       text-align: center;
      //       font-size: 14px;
      //       background: #e0e4e9;
      //       padding: 5px 10px;
      //       transform: translateX(-50%);
      //       left: 40%;
      //       top: -136%;
      //       display: none;
      //       &::after {
      //         content: '';
      //         position: absolute;
      //         top: 100%;
      //         left: 50%;
      //         margin-left: -5px;
      //         border-width: 5px;
      //         border-style: solid;
      //         border-color: #e0e4e9 transparent transparent transparent;
      //       }
      //     }
      //     // .icon {
      //     //   position: relative;
      //     //   display: inline-block;
      //     //   font-size: 24px;

      //     // }

      //     &:hover {
      //       .tip {
      //         display: block;
      //       }
      //     }
      //   }
      // }
    }
    .shipping {
      text-align: center;
      margin: 15px 0px;
      color: #a88754;
      letter-spacing: 5px;
      font-size: 18px;
      .right {
        .shipping-item {
          margin-bottom: 5px;
          a {
            cursor: pointer;
            text-decoration: none;
          }
        }
      }
    }
    .shipping-description {
      color: #a88754;
      .shipping-description-title {
        font-size: 20px;
        color: red;
        font-weight: bold;
      }
      .shipping-description-text {
        font-size: 18px;
        color: #a88754;
      }
    }
  }
}
// .content-box {
//   background: #eee;
//   .product-btn {
//     display: inline-block;
//     width: 100%;
//     text-align: center;
//     background: white;
//     line-height: 40px;
//     border: none;
//     outline: none;
//     font-size: 20px;
//     &.active {
//       background: palegoldenrod;
//     }
//   }
//   .product-detail {
//     margin: 30px;
//   }
//   .product-qa {
//     margin: 30px;
//   }
// }
.shop-content-box {
  border: 2xp solid #a88754;
  color: #ffffff;
  margin-bottom: 30px;

  .product-btn {
    display: inline-block;
    width: 100%;
    text-align: center;
    background: #a88754;
    line-height: 40px;
    border: none;
    outline: none;
    font-size: 20px;
    color: #ffffff;
    letter-spacing: 10px;
  }

  .product-detail {
    padding: 30px;
    display: flex;
    justify-content: center;
    border: 2px solid #a88754;

    ol {
      list-style: decimal;
    }

    ul {
      list-style: disc;
    }
  }

  .product-qa {
    margin: 30px;
  }
}

.modal {
  .modal-dialog {
    .modal-content {
      .modal-body {
        .modal-img {
          text-align: center;

          img {
            max-width: 650px;
            height: 450px;
          }
        }

        .modal-small-img {
          .footer-menu {
            display: flex;

            img {
              width: 100px;
              height: 100px;
              margin-right: 15px;
            }
          }
        }
      }
    }
  }
}
::v-deep .shop-content-box {
  .product-detail {
    .product-detail-box {
      p {
        color: black !important;
        img {
          max-width: 100%;
        }
      }
    }
  }
}
@media (max-width: 767px) {
  .detail-item-box {
    .img-box {
      .Preview-img-menu {
        justify-content: center;
      }
    }
    .detail-box {
      .title {
        margin: 10px 0px;
        padding: 0px 10px;
        text-align: center;
        h2 {
          margin-bottom: 0;
        }
      }
    }
    .description {
      padding: 0px 15px;
    }
  }
}
@media (max-width: 480px) {
  .detail-item-box {
    .detail-box {
      .ctrl-area-outlide {
        .ctrl-area-inside {
          .product-price {
            .sell-title {
              font-size: 16px;
            }
            .right {
              font-size: 16px;
            }
            .sold {
              font-size: 16px;
            }
          }
          .number {
            .sell-title {
              font-size: 16px;
            }
            .stock {
              font-size: 16px;
            }
          }
        }
      }
    }
  }
}
@media (max-width: 380px) {
  #product-qty {
    width: 50px;
  }
}
</style>
