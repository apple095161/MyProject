<template>
  <div>
    <div class="outside">
      <div class="container pt-120">
        <div class="bg-box" v-if="data">
          <div class="search-page-title">訂單資訊</div>
          <div class="inbox">
            <div class="row">
              <div class="col-md-12 detail-item">
                <div class="row">
                  <div class="col-md-6">訂單編號</div>
                  <div class="col-md-6">{{ data.orderNo }}</div>
                </div>
              </div>
              <div class="col-md-12 detail-item">
                <div class="row">
                  <div class="col-md-6">購買人</div>
                  <div class="col-md-6">{{ data.receive.name }}</div>
                </div>
              </div>
              <div class="col-md-12 detail-item">
                <div class="row">
                  <div class="col-md-6">電話</div>
                  <div class="col-md-6">{{ data.receive.phone }}</div>
                </div>
              </div>
              <div class="col-md-12 detail-item">
                <div class="row">
                  <div class="col-md-6">地址</div>
                  <div class="col-md-6">
                    {{ data.receive.cityName + data.receive.address }}
                  </div>
                </div>
              </div>
              <div class="col-md-12 detail-item">
                <div class="row">
                  <div class="col-md-6">付款方式</div>
                  <div class="col-md-6">
                    {{
                      data.payment.type == 'Credit'
                        ? '信用卡付款'
                        : data.payment.type == 'Cash'
                        ? '貨到付款'
                        : data.payment.type.indexOf('WebATM') !== -1
                        ? '網路ATM'
                        : data.payment.type.indexOf('ATM') !== -1
                        ? '自動櫃員機'
                        : ''
                    }}
                  </div>
                </div>
              </div>
              <div class="col-md-12 detail-item">
                <div class="row">
                  <div class="col-md-6">付款金額</div>
                  <div class="col-md-6">NT${{ data.totalPrice }}</div>
                </div>
              </div>
              <div class="col-md-12 detail-item">
                <div class="row">
                  <div class="col-md-6">付款結果</div>
                  <div class="col-md-6">
                    {{ data.payment.result == false ? '未付款' : '付款成功' }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="search-page-product-title">
            購買商品
            <i class="fas fa-chevron-down" v-b-toggle.collapse-1></i>
          </div>
          <b-collapse
            id="collapse-1"
            class="collapse-layout mb-2"
            style="margin:15px;0px"
          >
            <b-table striped hover :items="items" :fields="fields"></b-table>
          </b-collapse>
        </div>
        <div class="bg-box" v-else>
          <div class="search-page-title">訂單資訊</div>
          查無訂單資訊
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Newheader from '../components/NewHeader';
import Newfooter from '../components/Footer';
export default {
  name: 'OrderSearchResult',
  components: { Newheader, Newfooter },
  data() {
    return {
      data: {},
      fields: [
        { key: 'productName', label: '商品名稱' },
        { key: 'quantity', label: '數量' },
        { key: 'productPrice', label: '商品價格' },
      ],
      items: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      let url = '/api/v1/OrderApi/OrderSearch';
      let form = new FormData();
      const getCookie = document.cookie.split(';');
      let CSRFTOKEN = '';
      getCookie.forEach((item, index, arr) => {
        if (item.indexOf('csrf-secure') !== -1) {
          CSRFTOKEN = item.split('csrf-secure=')[1];
        }
      });
      form.append('OrderNo', this.$route.query.orderNumber);
      form.append('phone', this.$route.query.phone);
      this.$http
        .post(url, form, {
          headers: {
            // RequestVerificationToken: "14a1347f412b39f",
            'X-CSRF-TOKEN': CSRFTOKEN,
          },
        })
        .then((response) => {
          this.data = response.data.data;
          this.items = response.data.data.orderProducts.map((item) => {
            return {
              productName: item.productName,
              quantity: item.quantity,
              productPrice: item.productPrice,
            };
          });
        });
    },
    deleteOrder(item) {
      const vm = this;
      vm.$swal({
        title: `您確定要取消訂單編號${item.orderNo}的訂單嗎？`,
        icon: 'warning',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: `確認取消`,
        denyButtonText: `再考慮看看`,
      }).then((result) => {
        if (result.isConfirmed) {
          let url = `/api/v1/OrderApi/${item.orderID}`;
          vm.$http
            .delete(url, {
              headers: {
                Authorization: `Bearer ${localStorage.Jwt}`,
              },
            })
            .then((response) => {
              if (response.data.isSuccess) {
                this.tableData = [];
                this.getList();
                vm.$swal({
                  icon: 'success',
                  title: '訂單已取消',
                });
              } else {
                vm.$swal({
                  icon: 'error',
                  title: `${response.data.message}`,
                });
              }
            });
        } else if (result.isDenied) {
          vm.$swal({
            icon: 'info',
            title: '已取消申請',
          });
        }
      });
    },
    returngoods(item) {
      const vm = this;
      vm.$swal({
        title: '請輸入退貨原因',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off',
        },
        showCancelButton: true,
        confirmButtonText: '送出',
        cancelButtonText: '取消',
        showLoaderOnConfirm: true,
        allowOutsideClick: false,
        preConfirm: (key) => {
          if (key) {
            return key;
          } else {
            vm.$swal.showValidationMessage(`請輸入退貨原因`);
          }
        },
      }).then((result) => {
        if (result.isConfirmed) {
          let url = '/api/v1/OrderApi/ReturnGoods';
          let form = new FormData();
          form.append('OrderID', item.orderID);
          form.append('Message', result.value);
          vm.$http
            .post(url, form, {
              headers: {
                Authorization: `Bearer ${localStorage.Jwt}`,
              },
            })
            .then((response) => {
              if (response.data.isSuccess) {
                vm.tableData = [];
                vm.getList();
                vm.$swal({
                  icon: 'success',
                  title: `申請完成！！！！`,
                });
              } else {
                vm.$swal({
                  icon: 'error',
                  title: `${response.data.message}`,
                });
              }
            });
        }
      });
    },
    isDisabled(row) {
      let DateNow = Math.floor(new Date()) / 1000;
      let buyDate = new Date(this.$DateFormate(row.buyDate));
      buyDate.setDate(buyDate.getDate() + 7);
      let tranfer = Math.floor(buyDate) / 1000;

      if (
        (row.status == '00' && tranfer > DateNow == true) ||
        (row.status == '01' && tranfer > DateNow == true) ||
        (row.status == '02' && tranfer > DateNow == true)
      ) {
        return false;
      } else {
        return true;
      }
    },
    tableHeaderColor() {
      return 'background-color: #EDE1D5;color: #black';
    },
  },
};
</script>
<style lang="scss" scoped>
.outside {
  padding: 60px;
  .bg-box {
    margin: 0 auto;
    max-width: 800px;
    .search-page-title {
      font-size: 18px;
      letter-spacing: 3px;
      text-align: center;
      padding: 30px;
      background: #a88754;
      color: #ffffff;
      font-weight: 700;
    }
    .search-page-product-title {
      position: relative;
      font-size: 18px;
      letter-spacing: 3px;
      text-align: center;
      padding: 30px;
      background: #a88754;
      color: #ffffff;
      font-weight: 700;
      i {
        cursor: pointer;
        position: absolute;
        right: 2%;
      }
    }
    .inbox {
      border: 2px solid #a88754;
      padding: 50px;

      .detail-item {
        padding: 15px;
        border-bottom: 2px solid #a88754;
        font-size: 20px;
        color: #a88754;
      }
    }
    .item-button {
      width: 100%;
      padding: 10px 0px;
      margin-top: 30px;
      font-size: 20px;
      background-image: linear-gradient(
        176deg,
        #a88754 50%,
        rgb(190, 162, 129) 51%
      );
      color: #fff;
      outline: none;
      border: none;
      font-weight: 700;
      letter-spacing: 5px;
    }
  }
}
@media (max-width: 767px) {
  .outside {
    padding: 60px 15px;
  }
}

// .search-box {
//   border: 2px solid #a88754;
//   .search-page-title {
//     background: #a88754;
//   }
// }
</style>
