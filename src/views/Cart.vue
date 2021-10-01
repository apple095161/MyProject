<template>
  <div>
    <!-- <Newheader @UpadteHeaderCart="getCart"></Newheader> -->
    <div class="bodys" v-if="data.length > 0">
      <Step :index="index"></Step>
      <div class="cart-outlide">
        <div class="container-fluid">
          <div class="container">
            <div class="cart">
              <!-- <div class="step-menu">
              <span class="step-item">確認購物車明細</span>
              <span class="step-item">付款</span>
              <span class="step-item">完成訂單</span>
            </div> -->
              <div class="cart-product-box">
                <div class="bg-box">
                  <div class="cart-title">
                    <div class="row cart-title-layout">
                      <div class="col-3"></div>
                      <div class="col-7">
                        <div class="row">
                          <div class="col-6">品名</div>
                          <div class="col-6">
                            <div class="row">
                              <div class="col-9">數量</div>
                              <div class="col-3">小計</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-2"></div>
                    </div>
                  </div>
                  <div class="mobile-cart-title"></div>
                  <div class="cart-body" v-for="item in data" :key="item.key">
                    <div class="row align-items-center">
                      <div class="col-2">
                        <img
                          :src="item.productPhoto"
                          alt=""
                          width="100%"
                          height="100%"
                        />
                      </div>
                      <div class="col-8">
                        <div class="row align-items-center">
                          <div class="col-md-6 col-sm-12">
                            {{ item.productName }}
                          </div>
                          <div class="col-md-6 col-sm-12 count">
                            <div class="row align-items-center">
                              <div class="col-sm-9 number-style">
                                <button @click="times(item)">
                                  <i class="fas fa-caret-left"></i>
                                </button>
                                <input
                                  type="text"
                                  v-model="item.quantity"
                                  @change="changeqty(item)"
                                />
                                <button @click="plus(item)">
                                  <i class="fas fa-caret-right"></i>
                                </button>
                              </div>
                              <div class="col-sm-3">${{ item.subTotal }}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-2 remove">
                        <i
                          class="fas fa-times-circle"
                          @click="removeItem(item)"
                        ></i>
                      </div>
                    </div>
                  </div>
                  <!-- <div class="spec-code">
                  <div>折扣碼</div>
                  <input type="text" @click="specBtn = true" />
                  <div class="btnctrol" v-if="specBtn">
                    <button>取消</button>
                    <button>套用</button>
                  </div>
                </div> -->
                </div>
                <div class="shipping-type-box">
                  <div class="bg-box">
                    <div class="col-md-12 ship-item">
                      <div class="row align-items-center discont-box">
                        <el-input
                          v-model="discontCode"
                          placeholder=""
                          class="col-md-8 col-6 my-2 pl-0"
                          @change="changeDiscontCode"
                        >
                          ${{ OriginData.couponCode }}
                        </el-input>
                        <button
                          class="col-md-4 col-6 my-2 discont-btn"
                          @click="setCoupon"
                        >
                          套用優惠碼
                        </button>
                      </div>
                    </div>
                    <div class="col-md-12 ship-item">
                      <div class="row align-items-center">
                        <div class="col-9 px-0">商品金額總計</div>
                        <div class="col-3 px-0 ship-price">
                          ${{ OriginData.totalSubTotal }}
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12 ship-item">
                      <div class="row align-items-center">
                        <div class="col-9 px-0">折扣金額</div>
                        <div class="col-3 px-0 ship-price">
                          ${{ OriginData.discount }}
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12 ship-item">
                      <div class="row align-items-center">
                        <div class="col-9 px-0">運費</div>
                        <div class="col-3 px-0 ship-price">
                          ${{ OriginData.totalFare }}
                        </div>
                      </div>
                    </div>
                    <!-- <div
                      class="col-md-12 ship-item"
                      v-for="item in newShip"
                      :key="item.key"
                    >
                      <div class="row align-items-center">
                        <div class="col-9 px-0">
                          <b-form-group>
                            <b-form-radio
                              v-model="selected"
                              name="shipping-radios"
                              :value="item"
                              seleted
                              >{{ item.label }}</b-form-radio
                            >
                          </b-form-group>
                        </div>
                        <div class="col-3 px-0 ship-price">
                          ${{ item.price }}
                        </div>
                      </div>
                    </div> -->
                  </div>
                </div>
                <div class="bottom-ctrl">
                  <div class="row align-items-center px-0">
                    <div class="col-9">
                      <div class="ctrl-title">
                        <span class="title">應付金額</span>
                      </div>
                    </div>
                    <div class="col-3 pay-price">
                      <strong>${{ OriginData.amount }}</strong>
                    </div>
                  </div>
                </div>
                <div class="checkout-box">
                  <div class="row align-items-center px-0">
                    <div class="col-6"></div>
                    <div class="col-6" style="text-align: end">
                      <button class="next-btn" @click="checkCart">
                        付款去
                      </button>
                    </div>
                  </div>
                </div>
                <!-- <div class="fixed-price">
                <div class="row align-items-center">
                  <div class="col-md-6"></div>
                  <div class="col-md-6">
                    <div class="row align-items-center">
                      <div class="col-6 ctrol-p">
                        <div class="payamount">
                          <span class="title">應付金額</span>
                          <strong>${{ price() }}</strong>
                        </div>
                        <div class="discount">總計${{ price() }}，折抵:-0$</div>
                      </div>
                      <div class="col-6 ctrol-g">
                        <button class="next-btn" @click="checkCart">
                          付款去
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div> -->
              </div>
              <!-- <div class="shipping-type-box">
              <div class="bg-box">
                <div
                  class="col-md-12 ship-item"
                  v-for="item in newShip"
                  :key="item.key"
                >
                  <div class="row align-items-center">
                    <div class="col-9">
                      <b-form-group>
                        <b-form-radio
                          v-model="selected"
                          name="shipping-radios"
                          :value="item"
                          seleted
                          >{{ item.label }}</b-form-radio
                        >
                      </b-form-group>
                    </div>
                    <div class="col-3 ship-price">${{ item.price }}</div>
                  </div>
                </div>
              </div>
            </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bodys" v-else>
      <div class="container text-center empty-cart">
        <h3>購物車尚無商品</h3>
        <button class="empty-btn" @click="nowGo">立刻購物去</button>
      </div>
    </div>
    <!-- <Newfooter></Newfooter> -->
  </div>
</template>
<script>
import Step from '../components/ShopStepComponent';
import Newheader from '../components/NewHeader';
import Newfooter from '../components/Footer';
export default {
  name: 'cart',
  components: { Step, Newheader, Newfooter },
  data() {
    return {
      index: 1,
      specBtn: false,
      selected: {
        label: '宅配/貨運',
        key: 3,
        price: 100,
      },
      shipping: [
        {
          label: '宅配/貨運',
          key: 3,
          price: 100,
        },
      ],
      data: [],
      OriginData: {},
      cartList: [],
      isLogin: false,
      widthShow: false,
      discontCode: '',
    };
  },
  watch: {
    // Cartdata() {
    //   this.getCart();
    // },
    // itemChange() {
    //   this.getCart();
    // },
  },
  created() {
    // this.$store.dispatch('updateLoadgin');
    this.getCart();
    // this.$store.dispatch('updateCart');
  },
  mounted() {
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
  computed: {
    OriginCartData() {
      return this.$store.state.OriginData;
    },
    Cartdata() {
      return this.$store.state.cartList;
    },
  },
  methods: {
    getCart() {
      if (localStorage.cartId) {
        let url = `/api/v1/CartApi`;
        let form = new FormData();
        form.append('CartID', localStorage.getItem('cartId'));
        // form.append('CouponCode', this.discontCode || '');
        this.$http.post(url, form).then((response) => {
          this.cartList = response.data.data.purchaseList;
          this.OriginData = response.data.data;
          this.data = response.data.data.purchaseList;
          if (response.data.data.couponCode !== null) {
            this.discontCode = response.data.data.couponCode.trim();
          } else {
            this.discontCode = '';
          }
        });
      } else {
      }
      if (localStorage.User) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    },
    setCoupon() {
      if (localStorage.cartId) {
        const getCookie = document.cookie.split(';');
        let CSRFTOKEN = '';
        getCookie.forEach((item) => {
          if (item.indexOf('csrf-secure') !== -1) {
            CSRFTOKEN = item.split('csrf-secure=')[1];
          }
        });
        let url = '/api/v1/CouponApi/SetCoupon';
        let form = new FormData();
        form.append('CartID', localStorage.getItem('cartId'));
        form.append('CouponCode', this.discontCode || '');
        this.$http
          .post(url, form, {
            headers: {
              'X-CSRF-TOKEN': CSRFTOKEN,
            },
          })
          .then((response) => {
            if (response.data.isSuccess) {
              this.getCart();
              this.$store.dispatch('updateCart');
            } else {
              this.getCart();
              this.$store.dispatch('updateCart');
              this.$swal({
                icon: 'error',
                title: `${response.data.message}`,
              });
            }
          });
      } else {
      }
    },
    times(item) {
      let url = '/api/v1/CartApi';
      let form = new FormData();
      item.quantity = parseInt(item.quantity);
      if (item.quantity <= 1) {
        item.quantity = 1;
        return;
      }
      // else {
      //   item.quantity -= 1;
      // }
      form.append('CartID', localStorage.getItem('cartId'));
      form.append('ProductId', item.productId);
      form.append('Quantity', item.quantity - 1);

      this.$http.put(url, form).then((response) => {
        if (response.data.isSuccess) {
          this.getCart();
          this.$store.dispatch('updateCart');
        } else {
          this.getCart();
          this.$store.dispatch('updateCart');
          this.$swal({
            icon: 'error',
            title: `${response.data.message}`,
          });
        }
      });
    },
    plus(item) {
      let url = '/api/v1/CartApi';
      let form = new FormData();
      item.quantity = parseInt(item.quantity);
      // item.quantity += 1;
      form.append('CartID', localStorage.getItem('cartId'));
      form.append('ProductId', item.productId);
      form.append('Quantity', item.quantity + 1);

      this.$http.put(url, form).then((response) => {
        if (response.data.isSuccess) {
          this.getCart();
          this.$store.dispatch('updateCart');
        } else {
          this.getCart();
          this.$store.dispatch('updateCart');
          this.$swal({
            icon: 'error',
            title: `${response.data.message}`,
          });
        }
      });
    },
    changeqty(item) {
      item.quantity = parseInt(item.quantity);
      // if (item.quantity < 1) {
      //   item.quantity = 1;
      // }
      let url = '/api/v1/CartApi';
      let form = new FormData();
      form.append('CartID', localStorage.getItem('cartId'));
      form.append('ProductId', item.productId);
      form.append('Quantity', item.quantity);

      this.$http
        .put(url, form)
        .then((response) => {
          if (response.data.isSuccess) {
            this.getCart();
            this.$store.dispatch('updateCart');
          } else {
            this.getCart();
            this.$store.dispatch('updateCart');
            this.$swal({
              icon: 'error',
              title: `${response.data.message}`,
            });
          }
        })
        .catch((error) => {
          if (error.response.data.status == 400) {
            this.getCart();
            this.$store.dispatch('updateCart');
            this.$swal({
              icon: 'warning',
              title: `已達購買數量上限，如須購買更多數量請與速購家聯絡！`,
            });
          }
        });
    },
    price() {
      let totalPrice = null;
      let shippingPrice = this.selected.price || 0;
      this.data.forEach((item) => {
        totalPrice += item.productPrice * item.quantity;
      });
      // if (totalPrice >= 2000) {
      //   return totalPrice;
      // } else {
      //   return totalPrice + shippingPrice;
      // }
      return totalPrice + shippingPrice;
    },
    close() {
      this.specBtn = false;
    },
    removeItem(item) {
      // this.data.splice(index, 1);
      // localStorage.setItem("cartItem", JSON.stringify(this.data));
      let url = `/api/v1/CartApi/${localStorage.getItem('cartId')}/${
        item.productId
      }`;
      // let form = new FormData();
      // form.append("CartID", localStorage.getItem("cartId"));
      // form.append("ProductId", item.productId);
      this.$http.delete(url).then((response) => {
        this.getCart();
        this.$store.dispatch('updateCart');
      });
    },
    next() {
      if (localStorage.User) {
        let exp = JSON.parse(localStorage.User).exp;
        let now = Math.floor(new Date() / 1000);
        if (now > exp) {
          this.$swal({
            icon: 'warning',
            title: '登入時效過期，請重新登入!!',
            showCancelButton: true,
            confirmButtonText: `登入`,
            cancelButtonText: `返回`,
          }).then((result) => {
            if (result.isConfirmed) {
              this.$router.push({ name: 'login' });
              return;
            } else if (result.isDenied) {
              return;
            }
          });
        } else {
          let data = {
            items: this.data,
            ship: this.selected,
          };
          localStorage.setItem('shopItem', JSON.stringify(data));
          this.$router.push({
            name: 'payment',
          });
        }
      } else {
        let data = {
          items: this.data,
          ship: this.selected,
        };
        localStorage.setItem('shopItem', JSON.stringify(data));
        this.$router.push({
          name: 'payment',
        });
      }
      // if (!localStorage.User) {
      //   this.$swal({
      //     icon: 'warning',
      //     title: '尚未登入!!',
      //     text: '請先登入後繼續付款',
      //     showCancelButton: true,
      //     confirmButtonText: `登入`,
      //     cancelButtonText: `返回`,
      //   }).then((result) => {
      //     if (result.isConfirmed) {
      //       this.$router.push({ name: 'login' });
      //       return;
      //     } else if (result.isDenied) {
      //       return;
      //     }
      //   });
      // } else {
      //   let exp = JSON.parse(localStorage.User).exp;
      //   let now = Math.floor(new Date() / 1000);
      //   if (now > exp) {
      //     this.$swal({
      //       icon: 'warning',
      //       title: '登入時效過期，請重新登入!!',
      //       showCancelButton: true,
      //       confirmButtonText: `登入`,
      //       cancelButtonText: `返回`,
      //     }).then((result) => {
      //       if (result.isConfirmed) {
      //         this.$router.push({ name: 'login' });
      //         return;
      //       } else if (result.isDenied) {
      //         return;
      //       }
      //     });
      //   } else {
      //     let data = {
      //       items: this.data,
      //       ship: this.selected,
      //     };
      //     localStorage.setItem('shopItem', JSON.stringify(data));
      //     this.$router.push({
      //       name: 'payment',
      //     });
      //   }
      // }
    },
    checkCart() {
      let url = '/api/v1/CartApi/CartChecker';
      let form = new FormData();
      form.append('CartID', localStorage.getItem('cartId'));
      this.$http.post(url, form).then((response) => {
        if (response.data.isSuccess) {
          this.next();
        } else {
          this.$swal({
            icon: 'error',
            text: `${response.data.message}`,
          });
        }
      });
    },
    changeDiscontCode() {
      if (this.discontCode == '') {
        this.setCoupon();
        setTimeout(() => {
          this.getCart();
        }, 200);
      }
    },
    nowGo() {
      this.$router.push({
        name: 'home',
        // query: {
        //   type: 'ALL',
        // },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.bodys {
  // background: #f1f1f4 !important;
  padding-top: 120px;
  // padding: 30px 0px;
  .empty-cart {
    padding: 195px 0px;
    h3 {
      color: #a88754;
      font-weight: bold;
    }
  }
  .empty-btn {
    outline: none;
    border: none;
    background: #bca888;
    color: white;
    padding: 5px 15px;
  }
}
::v-deep .cart-outlide {
  padding: 15px 0px 30px 15px;
  .cart {
    .step-menu {
      display: flex;
      padding: 15px 60px;
      justify-content: center;
      .step-item {
        display: block;
        width: 100%;
        text-align: center;
        background: skyblue;
        margin: 15px;
        line-height: 60px;
        border-radius: 30px;
      }
    }
    .cart-product-box {
      background: white;
      // margin: 30px 0px;
      .bg-box {
        // padding: 30px 30px;
        .cart-title {
          background: #a88754;
          padding: 20px 15px;
          color: #fff;
          letter-spacing: 1px;
        }
        .mobile-cart-title {
          display: none;
          background: #a88754;
          padding: 20px 15px;
        }
        .cart-body {
          margin: 0px 15px;
          padding: 15px 0px;
          border-bottom: 2px solid #a88754;
          color: #a88754;
          font-size: 18px;
          .row {
            font-size: 18px;
            .count {
              .number-style {
                display: inline-block;
                button {
                  color: #a88754;
                  // border: 2px solid #bca888;
                  background: transparent;
                  padding: 5px 10px;
                  outline: none;
                  border: none;
                  i {
                    font-size: 18px;
                  }
                }
                input {
                  width: 60px;
                  // border: 2px solid #bca888;
                  border-left: none;
                  border-right: none;
                  padding: 5px 10px;
                  color: #a88754;
                  // font-weight: 700;
                  text-align: center;
                  outline: none;
                  border: none;
                }
              }
              // button {
              //   border: 2px solid #a88754;
              //   background: white;
              //   color: #a88754;
              //   padding: 5px 8px;
              //   outline: none;
              // }
              // input {
              //   max-width: 60px;
              //   border: 2px solid #a88754;
              //   background: white;
              //   color: #a88754;
              //   font-weight: 700;
              //   padding: 5px 5px;
              //   outline: none;
              //   border-right: none;
              //   border-left: none;
              //   text-align: center;
              // }
            }
          }
        }
        .remove {
          text-align: center;
          i {
            font-size: 24px;
            cursor: pointer;
          }
        }
        .spec-code {
          div {
            color: #979ba7;
          }
          input {
            display: inline-block;
            font-size: 18px;
            width: 100%;
            padding: 5px;
            box-sizing: border-box;
            border: 2px solid #e0e4e9;
            border-radius: 4px;
            text-transform: uppercase;
          }
          .btnctrol {
            text-align: end;
            margin: 15px 0px;
            button {
              display: inline-block;
              outline: none;
              border: none;
              padding: 5px 50px;
              margin: 0px 10px;
              border-radius: 20px;
              &:first-child {
                background: white;
                border: 2px solid #e0e4e9;
                // font-weight: 700;
              }
              &:nth-child(2) {
                background: #3abfba;
                color: white;
                margin-right: 0;
                font-weight: 700;
              }
            }
          }
        }
      }
      .shipping-type-box {
        margin: 0px 15px;
        background: white;
        border-bottom: 2px solid #a88754;
        color: #a88754;
        .bg-box {
          padding: 10px 0px;
          .ship-item {
            padding-top: 10px;
            padding-bottom: 10px;
            font-size: 18px;
            .discont-box {
              .el-input {
                .el-input__suffix {
                  right: 20px;
                }
              }
            }
          }
          .ship-price {
            text-align: end;
          }
          .discont-btn {
            background: #a88754;
            color: #ffffff;
            border: none;
            outline: none;
            padding: 8px;
            border-radius: 10px;
          }
        }
      }
      .bottom-ctrl {
        margin: 0px 15px;
        padding-top: 15px;
        padding-bottom: 15px;
        border-bottom: 2px solid #a88754;
        font-size: 18px;
        font-weight: bold;
        .ctrl-title {
          color: #a88754;
        }
        .pay-price {
          text-align: end;
          color: #a88754;
        }
      }
      .checkout-box {
        margin: 0px 15px;
        padding-top: 15px;
        padding-bottom: 15px;
        .next-btn {
          width: 100%;
          max-width: 130px;
          padding: 10px 0px;
          font-size: 18px;
          border: none;
          background: #a88754;
          color: #fff;
          border-radius: 6px;
          outline: none;
        }
      }
    }
    // .shipping-type-box {
    //   background: white;
    //   .bg-box {
    //     .ship-item {
    //       padding-top: 15px;
    //       padding-bottom: 15px;
    //       font-size: 18px;
    //     }
    //     .ship-price {
    //       text-align: end;
    //       color: #b9bdc5;
    //     }
    //   }
    // }
  }
}

// .fixed-price {
//   width: 100%;
//   background: white;
//   padding: 15px 15px;
//   margin: 15px 0px;
//   .payamount {
//     .title {
//       font-weight: 700;
//       font-size: 18px;
//     }
//     strong {
//       color: red;
//       font-size: 18px;
//     }
//   }
//   .discount {
//     font-size: 15px;
//     color: #979ba7;
//   }
//   .next-btn {
//     display: inline-block;
//     outline: none;
//     border: none;
//     background: #fcda19;
//     padding: 6px 25px;
//     border-radius: 20px;
//   }
//   .ctrol-p {
//     text-align: right;
//   }
// }

.form-group {
  margin-bottom: 0 !important;
}
@media (max-width: 991px) {
  .bodys {
    .cart {
      .cart-product-box {
        .cart-body {
          .count {
            input {
              max-width: 60px;
            }
          }
        }
      }
    }
  }
}
@media (max-width: 767px) {
  .bodys {
    .cart {
      .step-menu {
        padding: 15px 0px;
        .step-item {
          font-size: 14px;
        }
      }
    }
    .empty-cart {
      // padding-top: 50px;
    }
  }
  .cart-product-box {
    .bg-box {
      .cart-title {
        display: none;
      }
      .mobile-cart-title {
        display: block !important;
      }
      .cart-body {
        .remove {
          margin-top: 26px;
        }
      }
    }
  }
  .fixed-price {
    .ctrol-p {
      text-align: left;
    }
    .ctrol-g {
      text-align: right;
    }
  }
}
</style>
