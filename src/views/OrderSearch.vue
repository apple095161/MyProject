<template>
  <div>
    <div v-if="$route.meta.keepAlive">
      <div class="outside">
        <div class="container pt-120">
          <div class="bg-box">
            <div class="search-page-title">訂單查詢</div>
            <div class="inbox">
              <label for="" class="item-label my-3 mx-2">訂單編號</label>
              <input type="text" class="item-input" v-model="orderNumber" />
              <label for="" class="item-label my-3 mx-2">收件人手機號碼</label>
              <input type="text" class="item-input" v-model="phone" />
              <button class="item-button" @click="search">查詢</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view v-else></router-view>
  </div>
</template>
<script>
import Newheader from '../components/NewHeader';
import Newfooter from '../components/Footer';
export default {
  name: 'OrderSearch',
  components: { Newheader, Newfooter },
  data() {
    return {
      orderNumber: '',
      phone: '',
    };
  },
  watch: {
    $route() {
      this.orderNumber = '';
      this.phone = '';
    },
    phone: {
      handler(newValue, oldValue) {
        if (newValue.length > 12) {
          this.phone = oldValue;
        } else if (newValue > oldValue) {
          if (newValue.length === 5 || newValue.length === 9) {
            var pre = newValue.substring(0, newValue.length - 1);
            var last = newValue.substr(newValue.length - 1, 1);
            this.phone = pre + '-' + last;
          } else {
            this.phone = newValue;
          }
        } else {
          if (newValue.length === 9 || newValue.length === 4) {
            this.phone = this.phone.trim();
          } else {
            this.phone = newValue;
          }
        }
      },
    },
  },
  methods: {
    search() {
      try {
        this.checkInput();
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: `${error}`,
        });
        return;
      }
      let url = '/api/v1/OrderApi/CheckOrder';
      let form = new FormData();
      const getCookie = document.cookie.split(';');
      let CSRFTOKEN = '';
      getCookie.forEach((item, index, arr) => {
        if (item.indexOf('csrf-secure') !== -1) {
          CSRFTOKEN = item.split('csrf-secure=')[1];
        }
      });
      form.append('OrderNo', this.orderNumber);
      form.append('PhoneNo', this.phone);
      this.$http
        .post(url, form, {
          headers: {
            // RequestVerificationToken: "14a1347f412b39f",
            'X-CSRF-TOKEN': CSRFTOKEN,
          },
        })
        .then((response) => {
          if (response.data.isSuccess) {
            this.$router.push({
              name: 'orderSearchResult',
              query: {
                orderNumber: this.orderNumber,
                phone: this.phone,
              },
            });
          } else {
            this.$swal({
              icon: 'error',
              title: `查無訂單資訊`,
            });
          }
        });
    },
    checkInput() {
      if (!this.orderNumber) {
        throw Error('請輸入訂單編號');
      }
      if (!this.phone) {
        throw new Error('請輸入手機號碼');
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.outside {
  padding: 60px;
  .bg-box {
    margin: 0 auto;
    max-width: 450px;
    .search-page-title {
      font-size: 20px;
      letter-spacing: 3px;
      text-align: center;
      padding: 30px;
      background: #a88754;
      color: #ffffff;
    }
    .inbox {
      border: 2px solid #a88754;
      padding: 50px;
      .item-label {
        display: block;
        color: #a88754;
        font-size: 18px;
      }
      .item-input {
        width: 100%;
        border: 2px solid #a88754;
        padding: 5px 0px;
        font-size: 18px;
      }
    }
    .item-button {
      width: 100%;
      padding: 10px 0px;
      margin-top: 30px;
      font-size: 18px;
      background-image: linear-gradient(180deg, #a88754 50%, #b89368 51%);
      color: #fff;
      outline: none;
      border: none;
      letter-spacing: 5px;
    }
  }
}
@media (max-width: 767px) {
  .outside {
    padding: 60px 15px;
  }
}
</style>
