<template>
  <div>
    <!-- <Newheader></Newheader> -->
    <div class="container member-box">
      <el-tabs type="border-card" style="margin: 30px 0px">
        <el-tab-pane label="訂單管理">
          <el-table :data="newList" style="width: 100%" ref="table">
            <el-table-column type="expand">
              <template slot-scope="props">
                <div
                  class="text-danger pb-2"
                  style="font-size: 20px"
                  v-if="props.row.mngMemo"
                >
                  退貨原因:{{ props.row.mngMemo }}
                </div>
                <h3 class="my-2">商品資訊</h3>
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>商品名稱</th>
                      <th>數量</th>
                      <th>小計</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="item in props.row.orderProducts"
                      :key="item.productId"
                    >
                      <td>{{ item.productName }}</td>
                      <td>{{ item.quantity }}</td>
                      <td>${{ $addcomma(item.subTotal) }}</td>
                    </tr>
                    <tr>
                      <td colspan="2">折扣金額</td>
                      <td>${{ props.row.discount }}</td>
                    </tr>
                    <tr>
                      <td colspan="2">運費</td>
                      <td>${{ props.row.fare }}</td>
                    </tr>
                    <tr>
                      <td colspan="2">總計</td>
                      <td>${{ $addcomma(props.row.totalPrice) }}</td>
                    </tr>
                  </tbody>
                </table>
                <h3 class="my-2">購買資訊</h3>
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>購買人</th>
                      <th>手機號碼</th>
                      <th>寄送地址</th>
                      <th>付款日期</th>
                      <th>付款結果</th>
                      <th>付款方式</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{{ props.row.receive.name }}</td>
                      <td>{{ props.row.receive.phone }}</td>
                      <td>
                        {{ props.row.receive.cityName }} -
                        {{ props.row.receive.address }}
                      </td>
                      <td>{{ $FormatDate(props.row.payment.payDate) }}</td>
                      <td
                        :class="{
                          'text-success': props.row.payment.result,
                          'text-danger': !props.row.payment.result,
                        }"
                      >
                        {{
                          props.row.payment.result == true &&
                          props.row.payment.type == 'Cash'
                            ? '已付款'
                            : props.row.payment.result == false &&
                              props.row.payment.type == 'Cash'
                            ? '未付款'
                            : props.row.payment.result == false &&
                              props.row.payment.type !== 'Cash'
                            ? '付款失敗'
                            : '付款成功'
                        }}
                      </td>
                      <td>
                        <div
                          class="item-text"
                          v-if="props.row.payment.type == 'Credit'"
                        >
                          信用卡付款
                        </div>
                        <div
                          class="item-text"
                          v-else-if="props.row.payment.type == 'Cash'"
                        >
                          貨到付款
                        </div>
                        <div
                          class="item-text"
                          v-else-if="
                            props.row.payment.type.indexOf('WebATM') !== -1
                          "
                        >
                          網路ATM
                        </div>
                        <div
                          class="item-text"
                          v-else-if="
                            props.row.payment.type.indexOf('ATM') !== -1
                          "
                        >
                          自動櫃員機
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </template>
            </el-table-column>
            <el-table-column label="購買日期" prop="buyDate">
              <template slot-scope="scope">
                <span>{{ $FormatDate(scope.row.buyDate) }}</span>
              </template>
            </el-table-column>
            <el-table-column label="訂單編號" prop="orderNo">
              <template slot-scope="scope">
                <span>{{ scope.row.orderNo }}</span>
              </template>
            </el-table-column>
            <el-table-column label="訂單狀態" prop="status">
              <template slot-scope="scope">
                <span
                  :class="{
                    'text-success':
                      scope.row.status !== '03' || scope.row.status !== 'XX',
                    'text-danger':
                      scope.row.status == '03' || scope.row.status == 'XX',
                  }"
                  >{{ $Ods(scope.row.status) }}</span
                >
              </template>
            </el-table-column>
            <el-table-column label="訂單金額" prop="totalPrice">
              <template slot-scope="scope">
                <span> ${{ $addcomma(scope.row.totalPrice) }}</span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="220">
              <template slot-scope="scope" style="line-height: none">
                <!-- <el-button
                  @click="toogleExpand(scope.row, scope.$index)"
                  type="text"
                >
                  訂單資訊</el-button
                > -->
                <el-button
                  @click="deleteOrder(scope.row)"
                  type="primary"
                  size="mini"
                  plain
                  :disabled="
                    scope.row.status == '00' ||
                    scope.row.status == '01' ||
                    scope.row.status == '02'
                      ? false
                      : true
                  "
                  >取消訂單</el-button
                >
                <el-button
                  @click="returngoods(scope.row)"
                  type="danger"
                  size="mini"
                  plain
                  :disabled="
                    scope.row.status == '11' && scope.row.returnValid
                      ? false
                      : true
                  "
                  >我要退貨</el-button
                >
              </template>
            </el-table-column>
            <div slot="empty">
              <i class="el-icon-warning-outline"></i>暫無資料
            </div>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="會員資料修改" class="tb-style">
          <h4>會員資料</h4>
          <div class="memberDetail-item">
            <el-input
              placeholder="電子郵件"
              v-model="User.email"
              auto-complete="off"
              autocomplete="off"
            >
              <template slot="prepend">電子郵件</template>
            </el-input>
          </div>
          <div class="memberDetail-item">
            <el-input
              placeholder="中文姓名"
              v-model="User.usName"
              auto-complete="off"
              autocomplete="off"
            >
              <template slot="prepend">使用者名稱</template>
            </el-input>
          </div>
          <div class="memberDetail-item">
            <el-input
              placeholder="手機號碼"
              v-model="User.usCellPhone"
              auto-complete="off"
              autocomplete="off"
              :maxlength="12"
            >
              <template slot="prepend">手機號碼</template>
            </el-input>
          </div>
          <div class="memberDetail-item">
            <el-input
              placeholder="Line ID"
              v-model="User.usLineId"
              auto-complete="off"
              autocomplete="off"
            >
              <template slot="prepend">Line ID</template>
            </el-input>
          </div>
          <div class="memberDetail-item">
            <el-input
              placeholder="目前密碼"
              v-model="User.oldPswd"
              show-password
              auto-complete="new-password"
              autocomplete="off"
            >
              <template slot="prepend">目前密碼</template>
            </el-input>
          </div>
          <div class="memberDetail-item">
            <el-input
              placeholder="新密碼"
              v-model="User.newPswd"
              show-password
              auto-complete="new-password"
              autocomplete="off"
            >
              <template slot="prepend">新密碼</template>
            </el-input>
          </div>
          <div class="memberDetail-item">
            <el-input
              placeholder="確認新密碼"
              v-model="User.confNewPswd"
              show-password
              auto-complete="new-password"
              autocomplete="off"
            >
              <template slot="prepend">確認新密碼</template>
            </el-input>
          </div>
          <div class="my-2">
            <strong class="text-danger">*如無更改密碼欄位請留空</strong>
          </div>
          <el-button type="primary" @click="submit">送出修改</el-button>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- Modal -->
    <div>
      <b-modal id="modal" title="購買商品" ok-only>
        <div class="row">
          <table class="table mx-2">
            <thead>
              <tr>
                <th>商品名稱</th>
                <th>數量</th>
                <th>價格</th>
                <th>總計</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in viewData" :key="item.productId">
                <td>{{ item.productName }}</td>
                <td>{{ item.quantity }}</td>
                <td>${{ $addcomma(item.productPrice) }}</td>
                <td>${{ $addcomma(item.productPrice * item.quantity) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <template #modal-footer="{ cancel }">
          <b-button size="sm" variant="primary" @click="cancel()">
            關閉
          </b-button>
        </template>
      </b-modal>
    </div>
  </div>
</template>
<script>
import Newheader from '../components/NewHeader';
import Newfooter from '../components/Footer';
export default {
  components: { Newheader, Newfooter },
  name: 'member',
  data() {
    return {
      User: {
        email: '',
        usName: '',
        usCellPhone: null,
        usLineId: '',
        oldPswd: '',
        newPswd: '',
        confNewPswd: '',
      },
      isLogin: false,
      cartList: [],
      tableData: [],
      viewData: [],
      expandsData: [],
      testArray: [],
    };
  },
  created() {
    if (!localStorage.User) {
    } else {
      let exp = JSON.parse(localStorage.User).exp;
      let now = Math.floor(new Date() / 1000);
      if (now < exp) {
        this.getCart();
        this.getList();
        this.getUserInfo();
      }
    }
  },
  watch: {
    'User.usCellPhone': {
      handler(newValue, oldValue) {
        let regex = /^[0-9\s]*$/;
        if (regex.test(newValue.replace(/-/g, '')) == true) {
          if (newValue.length >= 13) {
            this.User.usCellPhone = oldValue;
          } else if (newValue > oldValue) {
            if (newValue.length === 5 || newValue.length === 9) {
              var pre = newValue.substring(0, newValue.length - 1);
              var last = newValue.substr(newValue.length - 1, 1);
              this.User.usCellPhone = pre + '-' + last;
            } else {
              this.User.usCellPhone = newValue;
            }
          } else {
            if (newValue.length === 9 || newValue.length === 4) {
              this.User.usCellPhone = this.User.usCellPhone.trim();
            } else {
              this.User.usCellPhone = newValue;
            }
          }
        } else {
          this.User.usCellPhone = oldValue;
        }

        // if (isNaN(parseInt(newValue))) {
        //   if (newValue.length == 0) {
        //     this.User.usCellPhone = null;
        //   } else {
        //     this.User.usCellPhone = oldValue;
        //   }
        // } else {

        // }
      },
    },
  },
  computed: {
    newList() {
      return this.tableData.sort((a, b) => {
        return a.orderID - b.orderID;
      });
    },
  },
  methods: {
    getRowClass(row, rowIndex) {
      // return 'row-expand-cover';
    },
    toogleExpand(row, index) {
      let $table = this.$refs.table;
      let url = `/api/v1/OrderApi/GetOrderNo/${row.orderNo}`;
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
          this.tableData[index] = Object.assign(
            {},
            this.tableData[index],
            response.data.data,
          );
          $table.toggleRowExpansion(row);
        });
    },
    getList() {
      let url = '/api/v1/OrderApi/User';
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
          let array = [];
          response.data.data.map((item) => {
            let url = `/api/v1/OrderApi/FullOrder/${item.orderID}`;
            this.$http
              .get(url, {
                headers: {
                  Authorization: `Bearer ${localStorage.Jwt}`,
                },
              })
              .then((response) => {
                array.push({
                  ...item,
                  ...Object.assign({}, response.data.data),
                });
                this.tableData.push({
                  ...item,
                  ...Object.assign({}, response.data.data),
                });
              });
          });

          // this.detail();
        });
    },
    detail() {
      this.tableData.map((item, index) => {
        let url = `/api/v1/OrderApi/FullOrder/${item.orderID}`;
        this.$http
          .get(url, {
            headers: {
              Authorization: `Bearer ${localStorage.Jwt}`,
            },
          })
          .then((response) => {
            this.tableData[index] = Object.assign(
              {},
              this.tableData[index],
              response.data.data,
            );
          });
      });
    },
    getCart() {
      if (localStorage.cartId) {
        const url = `/api/v1/CartApi`;
        const form = new FormData();
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
    getUserInfo() {
      let url = '/api/v1/Account/UserInfo';
      this.$http
        .get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.Jwt}`,
          },
        })
        .then((response) => {
          this.User = Object.assign({}, this.User, response.data.data);
        });
    },
    submit() {
      let url = '/api/v1/Account/Edit';
      let form = new FormData();
      Object.keys(this.User).forEach((item) => {
        form.append(`${item}`, this.User[item] || '');
      });
      this.$http
        .put(url, form, {
          headers: {
            Authorization: `Bearer ${localStorage.Jwt}`,
          },
        })
        .then((response) => {
          this.$message({
            message: '修改成功',
            type: 'success',
          });
          this.getUserInfo();
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
<style lang="scss">
.el-table {
  .row-expand-cover {
    .cell {
      .el-table__expand-icon {
        display: none;
      }
    }
  }
}
.text-line {
  text-decoration: line-through;
}
.member-box {
  padding-top: 210px;
  padding-bottom: 130px;
}

// .memberDetail-item {
//   input {
//     max-width: 250px;
//   }
//   .el-input-group__prepend {
//     width: 100px;
//   }
// }
.tb-style {
  .memberDetail-item {
    padding: 10px 0px;
    max-width: 450px;
    .el-input {
      input {
        width: 100%;
        padding: 5px 5px;
      }
      .el-input-group__prepend {
        min-width: 120px;
      }
    }
  }
}
// .tb-style {
//   // display: flex;
//   // flex-direction: column;
//   // align-items: center;
//   padding: 10px 15px;
//   .memberDetail-item {
//     padding: 10px 0px;
//     label {
//       font-size: 18px;
//     }
//     input {
//       display: block;
//       max-width: 220px;
//       width: 100%;
//       padding: 5px 5px;
//       border: 2px solid #78bef8;
//       outline: none;
//     }
//   }
// }
@media (max-width: 1921px) {
  .member-box-mt {
    margin-top: 122px;
  }
}
@media (max-width: 1919px) {
  .member-box-mt {
    margin-top: 78px;
  }
}
@media (max-width: 991px) {
  .member-box-mt {
    max-width: 991px;
  }
}
</style>
