<template>
  <div>
    <!-- <Newheader @UpadteHeaderCart="getCart"></Newheader> -->
    <div class="bodys pt-120" v-if="Cartdata.length > 0">
      <Step :index="index"></Step>
      <div class="container-fluid">
        <div class="container">
          <div class="cart">
            <!-- <div class="step-menu">
              <span class="step-item">確認購物車明細</span>
              <span class="step-item">付款</span>
              <span class="step-item">完成訂單</span>
            </div> -->
            <div class="show-cart">
              <span class="show-title"
                ><span class="mr-1" v-if="Cartdata.length > 0">購物車明細</span>
                ({{ Cartdata.length }})
                <span class="show-detail">
                  <button
                    class="btn-style"
                    v-b-toggle.collapse-1
                    v-show="!showDetail"
                    @click="changeStatus(true)"
                  >
                    <i class="fas fa-chevron-down"></i>
                  </button>
                  <button
                    class="btn-style"
                    v-b-toggle.collapse-1
                    v-show="showDetail"
                    @click="changeStatus(false)"
                  >
                    <i class="fas fa-chevron-down"></i>
                  </button>
                </span>
              </span>
            </div>
            <b-collapse id="collapse-1" class="collapse-layout mb-2">
              <b-card>
                <div class="cart-product-box">
                  <div class="bg-box">
                    <div class="cart-title">
                      <div class="row">
                        <div class="col-2"></div>
                        <div class="col-10">
                          <div class="row">
                            <div class="col-6">品名</div>
                            <div class="col-6">
                              <div class="row">
                                <div class="col-7">數量</div>
                                <div class="col-5">小計</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- <div class="col-2"></div> -->
                      </div>
                    </div>
                    <div
                      class="cart-body"
                      v-for="item in Cartdata"
                      :key="item.key"
                    >
                      <div class="row align-items-center">
                        <div class="col-md-2" style="text-aligm: center">
                          <img
                            :src="item.productPhoto"
                            width="100"
                            height="100"
                            alt=""
                          />
                        </div>
                        <div class="col-md-10">
                          <div class="row align-items-center">
                            <div class="col-md-6 col-sm-12">
                              {{ item.productName }}
                            </div>
                            <div class="col-md-6 col-sm-12 count">
                              <div class="row align-items-center">
                                <div class="col-7">{{ item.quantity }}件</div>
                                <div class="col-5">${{ item.subTotal }}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- <div class="col-2 remove">
                          <i class="fas fa-times-circle"></i>
                        </div> -->
                      </div>
                    </div>
                    <div class="cart-sub-body"></div>
                    <div class="total-price">
                      <div class="org-price">
                        <span class="price-title">購物金額總計</span>
                        <span class="num"
                          >${{ OriginCartData.totalSubTotal }}</span
                        >
                      </div>
                      <div
                        class="org-price discont"
                        v-if="OriginCartData.couponCode !== null"
                      >
                        <span class="price-title">優惠碼</span>
                        <span class="num">{{
                          OriginCartData.couponCode.trim()
                        }}</span>
                      </div>
                      <div class="org-price discont">
                        <span class="price-title">折扣金額</span>
                        <span class="num">${{ OriginCartData.discount }}</span>
                      </div>
                      <div class="ship-box">
                        <span class="ship-title">運費</span>
                        <span class="num">${{ OriginCartData.totalFare }}</span>
                      </div>
                    </div>
                    <div class="final-price">
                      <span class="price-title">應付金額</span>
                      <span class="num">${{ OriginCartData.amount }}</span>
                    </div>
                  </div>
                </div>
              </b-card>
            </b-collapse>

            <div class="shipping-type-box">
              <div class="bg-box">
                <div class="col-md-12 ship-title">付款方式</div>
                <div
                  class="ship-item"
                  v-for="item in paymentType"
                  :key="item.key"
                >
                  <b-form-group>
                    <b-form-radio
                      v-model="form.paymentType"
                      name="shipping-radios"
                      :value="item.key"
                      style="display: inline-block"
                      class="mr-2"
                      >{{ item.label }}</b-form-radio
                    >
                  </b-form-group>
                </div>

                <div class="pl-3 py-1">
                  <img
                    src="../assets/images/ecpay_logo.svg"
                    alt="綠界科技"
                    style="max-width: 100px"
                  />
                </div>
                <div
                  class="px-3 pt-1 pb-1 text-danger"
                  style="display: inline-block; font-weight: bold"
                >
                  每筆交易都經過先進加密技術處理
                </div>
                <div class="px-3 pb-3 text-danger" style="font-weight: bold">
                  結帳時頁面將會自動引導至有安全認證的第三方支付平台
                  (綠界科技Ecpay)進行付款。
                </div>
              </div>
            </div>

            <div class="user-detail-box">
              <div class="bg-box">
                <div class="col-md-12 type-title">收件人資料</div>
                <el-form
                  class="mx-3 pb-5"
                  :model="form"
                  ref="ListFrom"
                  :rules="rules"
                >
                  <el-form-item prop="name" class="mb-2">
                    <label style="display: block; color: #a88754">姓名</label>
                    <el-input
                      v-model="form.name"
                      placeholder="請輸入姓名"
                      auto-complete="new-password"
                    ></el-input>
                  </el-form-item>
                  <el-form-item prop="email" class="mb-2">
                    <label style="display: block; color: #a88754"
                      >電子郵件
                      <strong class="text-danger"
                        >（範例:example@xxxxx.com）</strong
                      >
                    </label>
                    <!-- <div class="text-danger" style="">
                      （電子郵件範例:example@xxxxx.com）
                    </div> -->
                    <el-input
                      v-model="form.email"
                      type="email"
                      placeholder="請輸入電子郵件"
                      auto-complete="new-password"
                    ></el-input>
                  </el-form-item>

                  <div class="row mb-2">
                    <div class="col-4">
                      <el-form-item prop="country">
                        <label style="display: block; color: #a88754"
                          >縣市</label
                        >
                        <el-select
                          v-model="form.country"
                          placeholder="請選擇縣市"
                        >
                          <el-option
                            v-for="item in countrys"
                            :key="item.name"
                            :label="item.name"
                            :value="item.id"
                          >
                          </el-option>
                          <div slot="empty" class="empty-style">無資料</div>
                        </el-select>
                      </el-form-item>
                    </div>
                    <div class="col-4">
                      <el-form-item prop="area">
                        <label style="display: block; color: #a88754"
                          >區域</label
                        >
                        <el-select v-model="form.area" placeholder="請選擇區域">
                          <el-option
                            v-for="item in areas"
                            :key="item.id"
                            :label="item.city"
                            :value="`${item.city} ${item.id}`"
                          >
                          </el-option>
                          <div slot="empty" class="empty-style">
                            請先選擇縣市
                          </div>
                        </el-select>
                      </el-form-item>
                    </div>
                    <div class="col-4">
                      <el-form-item>
                        <label style="display: block; color: #a88754"
                          >郵遞區號</label
                        >
                        <el-input
                          v-model="form.zipcode"
                          placeholder="郵遞區號"
                          :disabled="true"
                        ></el-input>
                      </el-form-item>
                    </div>
                    <div class="col-12 mt-2">
                      <el-form-item prop="address">
                        <label style="display: block; color: #a88754"
                          >地址</label
                        >
                        <input
                          type="text"
                          ref="address"
                          v-model="form.address"
                          placeholder="地址"
                          id="input-search"
                          autocomplete="off"
                        />
                      </el-form-item>
                    </div>
                  </div>

                  <el-form-item prop="phone" class="mb-2">
                    <label style="display: block; color: #a88754"
                      >聯絡電話</label
                    >
                    <el-input
                      v-model="form.phone"
                      placeholder="請輸入連絡電話"
                      maxlength="12"
                      auto-complete="new-password"
                    ></el-input>
                  </el-form-item>

                  <el-form-item>
                    <label style="display: block; color: #a88754"
                      >備註
                      <strong class="text-danger"
                        >（若欲開立三聯式發票請於備註填寫公司抬頭與統編）</strong
                      ></label
                    >
                    <el-input type="textarea" :rows="2" v-model="form.memo">
                    </el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="fixed-price">
            <div class="container">
              <div class="row align-items-center">
                <div class="col-md-6"></div>
                <div class="col-md-6">
                  <div class="row align-items-center">
                    <div class="col-6 col-md-12 ctrol-p">
                      <div class="payamount">
                        <span class="title">應付金額</span>
                        <strong>${{ OriginCartData.amount }}</strong>
                      </div>
                      <!-- <div class="discount">總計${{ price() }}，折抵:-0$</div> -->
                    </div>
                    <div class="col-6 col-md-12 ctrol-g">
                      <button class="next-btn" @click="submitForm('ListFrom')">
                        結帳
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bodys pt-120" v-else>
      <div class="container text-center empty-cart">
        <h3>購物車尚無商品</h3>
        <button class="empty-btn" @click="nowGo">立刻購物去</button>
      </div>
    </div>
    <!-- <Newfooter></Newfooter> -->
  </div>
</template>
<script>
import Newheader from '../components/NewHeader';
import Newfooter from '../components/Footer';
import twzipcode from 'twzipcode-data';
import Step from '../components/ShopStepComponent';
import $ from 'jquery';
export default {
  components: { Step, Newheader, Newfooter },
  name: 'payment',
  data() {
    return {
      index: 2,
      showDetail: false,
      specBtn: false,
      selected: false,
      zipcode: [],
      data: [],
      ArrayItem: [],
      paymentType: [
        {
          label: '貨到付款',
          key: 'Cash',
          ezpay: false,
        },
        {
          label: '信用卡付款',
          key: 'Credit',
          ezpay: true,
        },
        {
          label: '網路ATM',
          key: 'WebATM',
          ezpay: true,
        },
        {
          label: '自動櫃員機',
          key: 'ATM',
          ezpay: true,
        },
      ],
      form: {
        name: '',
        email: '',
        phone: '',
        country: '',
        area: '',
        address: '',
        paymentType: 'Credit',
      },
      widthShow: false,
      countrys: [],
      areas: [],
      show: true,
      cartList: [],
      ship: [],

      isLogin: false,
      map: null,
      autocomplete: null, // google map Autocomplete method
      site: null, // place API要綁定的搜尋框
      place: null, // 存place確定後回傳的資料
      rules: {
        name: [{ required: true, message: '請輸入姓名', trigger: 'blur' }],
        email: [{ required: true, message: '請填寫電子郵件', trigger: 'blur' }],
        country: [{ required: true, message: '請選擇縣市', trigger: 'blur' }],
        area: [{ required: true, message: '請選擇區域', trigger: 'blur' }],
        address: [{ required: true, message: '請輸入地址', trigger: 'blur' }],
        phone: [{ required: true, message: '請輸入連絡電話', trigger: 'blur' }],
      },
    };
  },

  created() {
    this.$store.dispatch('updateCart');
  },
  mounted() {
    const vm = this;
    // 所有縣市
    this.getData();
    // this.initMap();
    // this.siteAuto();

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
  watch: {
    'form.country': {
      handler(key) {
        this.form.area = '';
        this.form.zipcode = '';
        this.areas = this.zipcode.filter((item) => {
          if (key == item.county) {
            return item;
          }
        });
      },
    },
    'form.area': {
      handler(key) {
        this.form.zipcode = key.split(' ')[1];
      },
    },
    'form.phone': {
      handler(newValue, oldValue) {
        let regex = /^[0-9\-]*$/;
        if (regex.test(newValue) === true) {
          if (newValue > oldValue) {
            if (newValue.length === 5 || newValue.length === 9) {
              var pre = newValue.substring(0, newValue.length - 1);
              var last = newValue.substr(newValue.length - 1, 1);
              this.form.phone = pre + '-' + last;
            } else {
              this.form.phone = newValue;
            }
          } else {
            if (newValue.length === 9 || newValue.length === 4) {
              this.form.phone = this.form.phone.trim();
            } else {
              this.form.phone = newValue;
            }
          }
        } else {
          this.form.phone = oldValue;
        }
      },
    },
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
        this.$http.post(url, form).then((response) => {
          this.ArrayItem = response.data.data.purchaseList;
          this.data = response.data.data;
          this.getLength();
        });
      } else {
      }
      if (localStorage.User) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    },
    getData() {
      let data = twzipcode();
      this.zipcode = data.zipcodes;
      this.countrys = data.counties.filter((item) => {
        if (
          item.name !== '連江縣' &&
          item.name !== '金門縣' &&
          item.name !== '澎湖縣'
        ) {
          return item;
        } else {
          return false;
        }
      });
    },
    getLength() {
      this.length = this.ArrayItem.length;
    },
    test() {
      this.specBtn = true;
    },
    returnLength() {
      return this.data;
    },
    changeStatus(status) {
      this.showDetail = status;
    },
    sendUser(value) {
      let url = `/api/v1/OrderApi/${value.orderId}/Receive`;
      let key = '';
      let from = '';

      if (localStorage.Jwt) {
        key = localStorage.Jwt;
      } else {
        key = '';
      }

      if (localStorage.FromUrl) {
        from = localStorage.getItem('FromUrl');
      }
      let data = {
        name: this.form.name,
        email: this.form.email,
        postal: this.form.zipcode,
        cityName: this.form.country,
        address: this.form.address,
        phone: this.form.phone,
        memo: this.form.memo,
        source: from,
      };
      this.$http
        .post(url, data, {
          headers: {
            Authorization: `Bearer ${key}`,
          },
        })
        .then((response) => {
          if (response.data.isSuccess) {
            // localStorage.removeItem('FromUrl');
            this.paymentStatus(JSON.parse(localStorage.order));
          } else {
            this.$swal({
              icon: 'error',
              title: `${response.data.message}`,
            });
          }
        });
    },
    paymentStatus(value) {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      let url = `/api/v1/OrderApi/${value.orderId}/Payment`;
      let key = '';
      if (localStorage.Jwt) {
        key = localStorage.Jwt;
      } else {
        key = '';
      }
      let data = {
        type: this.form.paymentType,
      };
      this.$http
        .post(url, data, {
          headers: {
            Authorization: `Bearer ${key}`,
          },
        })
        .then((response) => {
          if (this.form.paymentType !== 'Cash') {
            this.sendPayment(value.orderId);
          } else {
            localStorage.removeItem('shopItem');
            localStorage.removeItem('cartId');
            this.$router.push({
              name: 'order',
              params: {
                id: value.orderNo,
              },
            });
            loading.close();
          }
        })
        .catch((error) => {
          loading.close();
          this.$swal({
            icon: 'error',
            title: `${error}`,
          });
        });
    },
    sendPayment(id) {
      let url = `/Pay/${id}`;
      this.$http.get(url).then((response) => {
        localStorage.removeItem('shopItem');
        localStorage.removeItem('cartId');
        localStorage.removeItem('order');
        // let url = response.data.data.serviceURL;
        // let form = `<form method="post" action="${data.data.serviceURL}"></form>`;
        // response.data.data.valuePairs.forEach((item) => {
        //   form.append(
        //     `<input type="hidden" name="${item.key}" value="${item.value}">`
        //   );
        // });
        var form = $(
          "<form method='post' action='" +
            response.data.data.serviceURL +
            "'></form>",
        );
        for (var i in response.data.data.valuePairs) {
          var o = response.data.data.valuePairs[i];
          $('<input>')
            .prop({ name: o.key, type: 'hidden' })
            .val(o.value)
            .appendTo(form);
        }
        form.appendTo('body');
        form.submit();
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          try {
            this.checkForm();
          } catch (error) {
            this.$swal({
              icon: 'error',
              title: `${error}`,
              text: `（電子郵件範例:example@xxxxx.com)`,
            });
            return;
          }
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
                }
              });
            } else {
              this.next();
            }
          } else {
            this.next();
            // this.$swal({
            //   icon: 'warning',
            //   title: '尚未登入!!',
            //   text: '請先登入後繼續付款',
            //   showCancelButton: true,
            //   confirmButtonText: `登入`,
            //   cancelButtonText: `返回`,
            // }).then((result) => {
            //   if (result.isConfirmed) {
            //     this.$router.push({ name: 'login' });
            //     return;
            //   }
            // });
          }
        } else {
          this.$swal({
            icon: 'error',
            title: '請填寫必填欄位',
          });
          return false;
        }
      });
    },
    checkForm() {
      if (
        this.form.email.indexOf('@') == -1 ||
        !this.validEmail(this.form.email)
      ) {
        throw Error('無效的電子郵件');
      }
    },
    validEmail: function (email) {
      var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    next() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      let url = '/api/v1/CartApi/toOrder';
      let form = new FormData();
      let key = '';
      if (localStorage.Jwt) {
        key = localStorage.Jwt;
      } else {
        key = '';
      }
      form.append('CartID', localStorage.getItem('cartId'));
      this.$http
        .post(url, form, {
          headers: {
            // "X-CSRF-TOKEN": CSRFTOKEN,
            Authorization: `Bearer ${key}`,
          },
        })
        .then((response) => {
          if (response.data.isSuccess) {
            localStorage.setItem('order', JSON.stringify(response.data.data));
            setTimeout(() => {
              this.sendUser(response.data.data);
            }, 1);
          } else {
            loading.close();
            this.$swal({
              icon: 'error',
              text: `${response.data.message}`,
              allowOutsideClick: false,
              confirmButtonText: '返回購物車',
            }).then((result) => {
              if (result.isConfirmed) {
                this.$router.push({
                  name: 'cart',
                });
              }
            });
          }
        })
        .catch((error) => {
          loading.close();
          this.$swal({
            icon: 'error',
            text: `${error}`,
          });
        });
      // let url = "/api/v1/CartApi/toOrder";
      // let form = new FormData();
      // form.append("CartID", localStorage.getItem("cartId"));
      // this.$http
      //   .post(url, form, {
      //     headers: {
      //       // "X-CSRF-TOKEN": CSRFTOKEN,
      //       Authorization: `Bearer ${localStorage.Jwt}`,
      //     },
      //   })
      //   .then((response) => {

      //   });
      // this.$router.push({
      //   name: "order",
      // });
    },
    // init google map
    // initMap() {
    //   let location = {
    //     lat: 25.0374865,
    //     lng: 121.5647688,
    //   };

    //   this.map = new google.maps.Map(document.getElementById('map'), {
    //     center: location,
    //     zoom: 16,
    //   });
    // },
    // siteAuto() {
    //   let options = {
    //     componentRestrictions: { country: 'tw' }, // 限制在台灣範圍
    //   };
    //   this.autocomplete = new google.maps.places.Autocomplete(
    //     this.$refs.address,
    //     options,
    //   );

    //   this.autocomplete.addListener('place_changed', (e) => {
    //     this.place = this.autocomplete.getPlace(); // 地點資料存進place
    //     this.form.address = this.place.formatted_address.split('台灣')[1];
    //   });
    // },
    close() {
      this.specBtn = false;
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
::v-deep .el-input__inner {
  &:focus {
    border-color: #007bff;
  }
  &.input.invalid {
    border-color: #f56c6c;
  }
  &::placeholder {
    color: #a88754;
  }
}

.bodys {
  // background: #f1f1f4 !important;
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
.el-form-item {
  margin-bottom: 0;
}
.el-select {
  width: 100%;
}
label {
  margin-bottom: 0;
}
.empty-style {
  text-align: center;
  padding: 10px 10px;
}
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
    margin: 30px 0px;
    .bg-box {
      padding: 0px 30px;
      .cart-title {
        margin-bottom: 15px;
        color: #a88754;
      }
      .cart-body {
        border-top: 2px solid #a88754;
        padding: 10px 0px;
        color: #a88754;
        font-size: 18px;
        .count {
        }
      }
      .cart-sub-body {
        border-top: 2px solid #a88754;
      }
      .remove {
        text-align: end;
        font-size: 24px;
      }

      .total-price {
        font-size: 18px;
        padding-top: 10px;
        padding-bottom: 10px;
        border-bottom: 2px solid #a88754;
        color: #a88754;
        .org-price {
          padding: 10px 0px;
          .price-title {
            display: inline-block;
            width: 70%;
          }
          .num {
            display: inline-block;
            width: 30%;
            text-align: end;
          }
        }
        .ship-box {
          padding: 5px 0px;
          .ship-title {
            display: inline-block;
            width: 70%;
          }
          .num {
            display: inline-block;
            width: 30%;
            text-align: end;
          }
        }
      }
      .final-price {
        padding: 15px 0px;
        color: #a88754;
        font-size: 18px;
        .price-title {
          display: inline-block;
          width: 70%;
        }
        .num {
          display: inline-block;
          width: 30%;
          text-align: end;
          font-size: 20px;
        }
      }
    }
  }
  .shipping-type-box {
    background: white;
    margin: 30px 0px;
    .bg-box {
      border: 2px solid #a88754;
      text-align: center;
      .ship-title {
        padding-top: 15px;
        padding-bottom: 15px;
        font-size: 20px;
        text-align: center;
        color: #fff;
        background: #a88754;
      }
      .ship-item {
        padding-top: 15px;
        padding-bottom: 15px;
        font-size: 18px;
        color: #a88754;
      }
      .ship-price {
        text-align: end;
        color: #b9bdc5;
      }
    }
  }
  .user-detail-box {
    background: white;
    margin: 15px 0px;
    .bg-box {
      border: 2px solid #a88754;
      .type-title {
        font-size: 20px;
        padding-top: 15px;
        padding-bottom: 15px;
        background: #a88754;
        color: #fff;
        text-align: center;
      }
      label {
        font-size: 18px;
      }
    }
  }
  .show-cart {
    background: #a88754;
    padding: 15px;
    .show-title {
      position: relative;
      display: inline-block;
      text-align: center;
      letter-spacing: 5px;
      font-size: 20px;
      width: 100%;
      color: #fff;
      .show-detail {
        position: absolute;
        right: 0;
        .btn-style {
          color: #fff;
          background: #a88754;
          border: none;
          outline: none;
          span {
            display: inline-block;
          }
          &:nth-child(2) {
            i {
              transform: rotate(180deg);
            }
          }
        }
      }
    }
  }
}
.collapse-layout {
  border: 2px solid #a88754;
}
.fixed-price {
  width: 100%;
  background: white;
  padding: 15px 0px;
  margin: 15px 0px;
  border: 2px solid #a88754;
  .payamount {
    .title {
      margin-right: 5px;
      font-size: 18px;
      color: #a88754;
    }
    strong {
      color: #a88754;
      font-weight: 700;
      font-size: 18px;
    }
  }
  .discount {
    font-size: 15px;
    color: #979ba7;
  }
  // .next-btn {
  //   display: inline-block;
  //   outline: none;
  //   border: none;
  //   background: #fcda19;
  //   padding: 6px 25px;
  //   border-radius: 20px;
  // }
  .ctrol-p {
    padding-top: 10px;
    padding-bottom: 10px;
    text-align: right;
  }
  .ctrol-g {
    text-align: right;
    .next-btn {
      width: 100%;
      font-size: 18px;
      max-width: 130px;
      padding: 10px 0px;
      border: none;
      background: #a88754;
      color: #fff;
      border-radius: 6px;
      outline: none;
    }
  }
}

.form-group {
  margin-bottom: 0 !important;
}
.el-form-item {
  #input-search {
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #a88754;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition-property: border-color;
    transition-duration: 0.2s;
    transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
    transition-delay: 0s;
    width: 100%;
    &:focus {
      border-color: #007bff;
    }
    &::placeholder {
      color: #a88754;
    }
  }
  &.is-error {
    #input-search {
      border-color: #f56c6c;
    }
  }
}
@media (max-width: 991px) {
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
    .bg-box {
      padding: 0px 15px;
    }
    .cart-title {
      display: none;
    }
  }
  .fixed-price {
    padding: 15px;
    .ctrol-p {
      text-align: left;
      padding-left: 0;
    }
    .ctrol-g {
      text-align: right;
      padding-right: 0;
    }
  }
}
// @media (max-width: 450px) {
//   .cart {
//     .show-cart {
//       .show-title {
//         width: 60%;
//       }
//       .show-detail {
//         width: 40%;
//       }
//     }
//   }
// }
</style>
