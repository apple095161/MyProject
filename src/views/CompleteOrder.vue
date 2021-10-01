<template>
  <div>
    <!-- <Newheader></Newheader> -->
    <div class="bodys pt-120">
      <Step :index="index"></Step>
      <div class="container-fluid">
        <div class="container">
          <div class="order">
            <div class="order-detail-box">
              <div class="box-title">已訂購完成，以下為您的訂單資訊</div>
              <div class="bg-box">
                <div class="order-body">
                  <div class="info-detail">
                    <ul class="info-menu">
                      <li class="info-item">
                        <div class="row">
                          <div class="col-md-4">
                            <div class="item-title">訂單編號</div>
                          </div>
                          <div class="col-md-8">
                            <div class="item-text">
                              {{ detail.orderNo }}
                            </div>
                          </div>
                        </div>
                      </li>

                      <li class="info-item" v-if="detail.receive">
                        <div class="row">
                          <div class="col-md-4">
                            <div class="item-title">購買人</div>
                          </div>
                          <div class="col-md-8">
                            <div class="item-text">
                              {{ detail.receive.name }}
                            </div>
                          </div>
                        </div>
                      </li>
                      <li class="info-item">
                        <div class="row">
                          <div class="col-md-4">
                            <div class="item-title">付款金額</div>
                          </div>
                          <div class="col-md-8">
                            <div class="item-text">
                              ${{ detail.totalPrice }}
                            </div>
                          </div>
                        </div>
                      </li>
                      <li class="info-item" v-if="detail.payment">
                        <div class="row">
                          <div class="col-md-4">
                            <div class="item-title">付款方式</div>
                          </div>
                          <div class="col-md-8" v-if="detail.payment.type">
                            <!-- <div class="item-text">
                              {{
                                detail.payment.type == 'Credit'
                                  ? '信用卡付款'
                                  : detail.payment.type == 'Cash'
                                  ? '貨到付款'
                                  : detail.payment.type.indexOf('WebATM') !== -1
                                  ? '網路ATM'
                                  : detail.payment.type.indexOf('ATM') !== -1
                                  ? '自動櫃員機'
                                  : ''
                              }}
                            </div> -->
                            <div
                              class="item-text"
                              v-if="detail.payment.type == 'Credit'"
                            >
                              信用卡付款
                            </div>
                            <div
                              class="item-text"
                              v-else-if="detail.payment.type == 'Cash'"
                            >
                              貨到付款
                            </div>
                            <div
                              class="item-text"
                              v-else-if="
                                detail.payment.type.indexOf('WebATM') !== -1
                              "
                            >
                              網路ATM
                            </div>
                            <div
                              class="item-text"
                              v-else-if="
                                detail.payment.type.indexOf('ATM') !== -1
                              "
                            >
                              自動櫃員機
                            </div>
                          </div>
                        </div>
                      </li>
                      <li
                        class="info-item"
                        v-if="detail.payment.type !== 'Cash'"
                      >
                        <div class="row">
                          <div class="col-md-4">
                            <div class="item-title">金流交易碼</div>
                          </div>
                          <div class="col-md-8">
                            <div
                              class="item-text"
                              style="color: #3b4d53; font-weight: 700"
                            >
                              {{ detail.payment.tradeNo }}
                            </div>
                          </div>
                        </div>
                      </li>
                      <li
                        class="info-item"
                        v-if="detail.payment.type !== 'Cash'"
                      >
                        <div class="row">
                          <div class="col-md-4">
                            <div class="item-title">付款結果</div>
                          </div>
                          <div class="col-md-8">
                            <div
                              class="item-text"
                              :class="{
                                'text-danger': !detail.payment.result,
                                'text-success': detail.payment.result,
                              }"
                              style="font-weight: 700"
                            >
                              {{
                                detail.payment.result == false
                                  ? '未付款'
                                  : '付款成功'
                              }}
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="fixed-price">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-md-6"></div>
            <div class="col-md-6">
              <div class="row align-items-center">
                <div class="col-6">
                  <div class="payamount">
                    <span class="title mx-2">應付金額</span>
                    <strong>${{ price() }}</strong>
                  </div>
                  <div class="discount">總計${{ price() }}，折抵:-0$</div>
                </div>
                <div class="col-6 text-right">
                  <button class="next-btn" @click="keepShop">繼續購物</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> -->
    </div>
    <!-- <Newfooter></Newfooter> -->
  </div>
</template>
<script>
import Newheader from '../components/NewHeader';
import Newfooter from '../components/Footer';
import Step from '../components/ShopStepComponent';
export default {
  components: { Step, Newheader, Newfooter },
  name: 'completeOrder',
  data() {
    return {
      index: 3,
      id: this.$route.params.id,
      specBtn: false,
      selected: false,
      data: [],
      detail: {},
      isLogin: false,
      widthShow: true,
    };
  },
  computed: {},
  created() {
    if (localStorage.shopItem) {
      this.data = JSON.parse(localStorage.shopItem);
    }
  },
  mounted() {
    this.getCart();
    this.getData();
    // const vm = this;
    // if (window.innerWidth <= 767) {
    //   vm.widthShow = true;
    // } else {
    //   vm.widthShow = false;
    // }
    // window.onresize = () => {
    //   if (window.innerWidth <= 767) {
    //     vm.widthShow = true;
    //   } else {
    //     vm.widthShow = false;
    //   }
    // };
  },
  methods: {
    getData() {
      let url = `/api/v1/OrderApi/GetOrderNo/${this.id}`;
      let key = '';
      if (localStorage.Jwt) {
        key = localStorage.Jwt;
      } else {
        key = '';
      }
      this.$http
        .get(url, {
          headers: {
            Authorization: `Bearer ${key}`,
          },
        })
        .then((response) => {
          this.detail = response.data.data;
        });
    },
    getCart() {
      if (localStorage.User) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    },
    test() {
      this.specBtn = true;
    },
    returnPrice() {
      let price = null;
      this.data.items.forEach((item) => {
        price += item.count * item.price;
      });
      return price;
    },
    returnPayPrice() {
      let price = null;
      this.data.items.forEach((item) => {
        price += item.count * item.price;
      });
      return price + this.data.ship.price;
    },
    returnship() {
      return this.data.ship.price;
    },
    price() {
      let totalPrice = null;
      this.data.items.forEach((item) => {
        totalPrice += item.count * item.price;
      });
      return totalPrice + this.data.ship.price;
    },
    returnLength() {
      return this.data.items.length;
    },
    keepShop() {
      this.$router.push({
        name: 'ShopPage',
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.bodys {
  // background: #f1f1f4 !important;
  padding-bottom: 30px;
}
.order {
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
  .order-detail-box {
    margin: 30px 0px;
    .box-title {
      background: #a88754;
      padding: 15px;
      text-align: center;
      font-size: 20px;
      color: #ffffff;
    }
    .bg-box {
      padding: 30px 30px;
      border: 2px solid #a88754;
      .order-body {
        padding: 10px 0px;
        font-size: 18px;
        .info-detail {
          .info-menu {
            padding: 15px 0px;
            .info-item {
              padding: 15px;
              margin: 0px 15px;
              border-bottom: 2px solid #a88754;
              color: #a88754;
              .item-title {
              }
              .item-text {
                text-align: end;
              }
            }
          }
        }
      }
    }
  }
  .order-item {
    .cart-product-box {
      background: white;
      margin: 30px 0px;
      .bg-box {
        padding: 30px 30px;
        .cart-title {
          border-bottom: 2px solid khaki;
          margin-bottom: 15px;
        }
        .cart-body {
          padding: 10px 0px;
          border-bottom: 2px solid #e0e4e9;
          .count {
            button {
              border: 2px solid #e0e4e9;
              background: white;
              padding: 5px 10px;
              outline: none;
            }
            input {
              max-width: 80px;
              border: 2px solid #e0e4e9;
              background: white;
              padding: 5px 10px;
              outline: none;
              border-right: none;
              border-left: none;
              text-align: center;
            }
          }
        }

        .total-price {
          font-size: 18px;
          border-top: 2px solid #f1f1f5;
          .org-price {
            padding: 5px 0px;
            .price-title {
              display: inline-block;
              width: 80%;
              text-align: end;
            }
            .num {
              display: inline-block;
              width: 20%;
              text-align: end;
            }
          }
          .ship-box {
            padding: 5px 0px;
            font-size: 18px;
            .ship-title {
              display: inline-block;
              width: 80%;
              text-align: end;
            }
            .num {
              display: inline-block;
              width: 20%;
              text-align: end;
              font-size: 20px;
              color: red;
            }
          }

          .final-price {
            padding: 5px 0px;
            font-size: 18px;
            .price-title {
              display: inline-block;
              width: 80%;
              text-align: end;
            }
            .num {
              display: inline-block;
              width: 20%;
              text-align: end;
              font-size: 20px;
              color: red;
            }
          }
        }
      }
    }
  }
}
.fixed-price {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: white;
  z-index: 50;
  padding: 12px 0px;
  .payamount {
    .title {
      font-weight: 700;
      font-size: 18px;
    }
    strong {
      color: red;
      font-size: 18px;
    }
  }
  .discount {
    font-size: 15px;
    color: #979ba7;
  }
  .next-btn {
    display: inline-block;
    outline: none;
    border: none;
    background: #fcda19;
    padding: 6px 35px;
    border-radius: 20px;
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
  }
  .cart-product-box {
    .cart-title {
      display: none;
    }
  }
  .order {
    .order-detail-box {
      margin: 30px 0px;
      .box-title {
        background: #a88754;
        padding: 15px;
        text-align: center;
        font-size: 20px;
        color: #ffffff;
        font-weight: 700;
      }
      .bg-box {
        .order-body {
          .info-detail {
            .info-menu {
              .info-item {
                .item-text {
                  text-align: left;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
