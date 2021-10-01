<template>
  <div style="background: white">
    <b-container fluid class="dah-item-box py-3">
      <b-row>
        <b-col lg="6" class="my-1">
          <b-form-group
            label="排序"
            label-cols-sm="2"
            label-size="sm"
            label-for="sortBySelect"
            class="mb-0"
          >
            <b-input-group size="sm">
              <b-form-select
                v-model="sortBy"
                id="sortBySelect"
                :options="sortOptions"
                class="w-75"
              >
                <template v-slot:first>
                  <option value>-- none --</option>
                </template>
              </b-form-select>
              <b-form-select
                v-model="sortDesc"
                size="sm"
                :disabled="!sortBy"
                class="w-25"
              >
                <option :value="false">小到大</option>
                <option :value="true">大到小</option>
              </b-form-select>
            </b-input-group>
          </b-form-group>
        </b-col>

        <b-col lg="6" class="my-1">
          <b-form-group
            label="過濾"
            label-cols-sm="2"
            label-size="sm"
            label-for="filterInput"
            class="mb-0"
          >
            <b-input-group size="sm">
              <b-form-input
                v-model="filter"
                type="search"
                id="filterInput"
                placeholder="請輸入關鍵字"
              ></b-form-input>
              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''"
                  >Clear</b-button
                >
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>

        <b-col lg="12" class="my-1">
          <div class="block">
            <div class="demonstration">報表下載</div>
            <!-- <el-date-picker
              v-model="date"
              type="daterange"
              range-separator="至"
              start-placeholder="開始日期"
              end-placeholder="結束日期"
              value-format="yyyy/MM/dd"
            >
            </el-date-picker> -->
            <el-date-picker
              v-model="date[0]"
              type="date"
              placeholder="開始日期"
              value-format="yyyy/MM/dd"
              class="my-2"
            >
            </el-date-picker>
            <span class="mx-2">至</span>
            <el-date-picker
              v-model="date[1]"
              type="date"
              placeholder="結束日期"
              value-format="yyyy/MM/dd"
              class="my-2 mr-2"
            >
            </el-date-picker>
            <b-button @click="download">下載</b-button>
            <div class="demonstration">每日訂單報表</div>
            <b-button @click="DLAllOrders">下載</b-button>
          </div>
        </b-col>

        <b-col lg="12" class="my-1">
          <b-form-group label="狀態" v-slot="{ ariaDescribedby }">
            <b-form-radio-group
              id="radio-group-1"
              v-model="filterKey"
              :options="options"
              :aria-describedby="ariaDescribedby"
              button-variant="outline-primary"
              name="radio-options"
              buttons
            ></b-form-radio-group>
          </b-form-group>
          <b-form-group v-slot="{ ariaDescribedby }">
            <b-form-radio-group
              id="radio-group-1"
              v-model="filterKey"
              :options="options2"
              :aria-describedby="ariaDescribedby"
              button-variant="outline-primary"
              name="radio-options"
              buttons
            ></b-form-radio-group>
          </b-form-group>
        </b-col>
      </b-row>
      <b-table
        show-empty
        small
        stacked="md"
        :items="filterForm"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        @filtered="onFiltered"
        empty-text="暫無資料"
      >
        <template v-slot:cell(buyDate)="row">
          {{ returnCreat(row.item.buyDate) }}
        </template>

        <template v-slot:cell(totalPrice)="row">
          ${{ $addcomma(row.item.totalPrice) }}
        </template>

        <template v-slot:cell(status)="row">
          <span>{{ $Ods(row.item.status) }}</span>
        </template>

        <template v-slot:cell(actions)="row">
          <b-button
            size="sm"
            @click="view(row.item, row.index, $event.target)"
            class="mr-1 my-1"
            variant="info"
            >Details</b-button
          >
          <b-button
            size="sm"
            @click="ShipGoods(row.item, row.index, $event.target)"
            class="mr-1 my-1"
            variant="primary"
            :disabled="row.item.shipValid ? false : true"
            >出貨</b-button
          >
          <b-button
            size="sm"
            @click="CompleteOrder(row.item, row.index, $event.target)"
            :disabled="row.item.status == '10' ? false : true"
            class="mr-1 my-1"
            variant="success"
            >完成訂單</b-button
          >
          <b-button
            size="sm"
            @click="Repost(row.item, row.index, $event.target)"
            class="mr-1 my-1"
            variant="success"
            :disabled="row.item.status == 'XX' ? false : true"
            >補寄</b-button
          >
          <b-button
            size="sm"
            @click="Returned(row.item, row.index, $event.target)"
            :disabled="row.item.status == 'XX' ? false : true"
            class="mr-1 my-1"
            variant="success"
            >已退貨</b-button
          >
          <b-button
            size="sm"
            @click="Refunded(row.item, row.index, $event.target)"
            :disabled="
              row.item.status == 'RT' || row.item.status == 'XX' ? false : true
            "
            class="mr-1 my-1"
            variant="success"
            >已退款</b-button
          >
          <b-button
            size="sm"
            @click="cancel(row.item, row.index, $event.target)"
            :disabled="row.item.status == '02' ? false : true"
            class="mr-1 my-1"
            variant="danger"
            >取消訂單</b-button
          >
          <!-- <b-button
            size="sm"
            @click="view(row.item, row.index, $event.target)"
            class="btn-danger mr-1"
            >作廢訂單</b-button
          > -->
          <!-- <b-button
            size="sm"
            @click="details(row.item, row.index, $event.target)"
            >{{ row.detailsShowing ? "Hide" : "Show" }} Details</b-button
          > -->
        </template>
      </b-table>
      <b-row>
        <b-col sm="5" md="6" class="my-1">
          <b-form-group
            label="Per page"
            label-cols-sm="6"
            label-cols-md="4"
            label-cols-lg="3"
            label-align-sm="right"
            label-size="sm"
            label-for="perPageSelect"
            class="mb-0"
          >
            <b-form-select
              v-model="perPage"
              id="perPageSelect"
              size="sm"
              :options="pageOptions"
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col sm="7" md="6" class="my-1">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="fill"
            size="sm"
            class="my-0"
          ></b-pagination>
        </b-col>
      </b-row>
    </b-container>

    <b-modal
      class="add-modal"
      id="modal-prevent-closing"
      ref="modal"
      title="訂單明細"
      @show="resetModal"
      @hidden="resetModal"
    >
      <h4>收件人資訊</h4>
      <div class="row" v-if="modalData.receive">
        <!-- <div class="col-md-12">
          <label for="">購買日期 :</label>
          <span> {{ $DateFormate(modalData.buyDate) }}</span>
        </div> -->
        <div class="col-md-12">
          <label for="">收件人姓名 :</label>
          <span> {{ modalData.receive.name }}</span>
        </div>
        <div class="col-md-12">
          <label for="">收件人電話 :</label>
          <span> {{ modalData.receive.phone }}</span>
        </div>
        <div class="col-md-12">
          <label for="">Email :</label>
          <span> {{ modalData.buyerEmail }}</span>
        </div>
        <div class="col-md-12">
          <label for="">收件地址 :</label>
          <span>
            {{ modalData.receive.cityName }}-{{
              modalData.receive.address
            }}</span
          >
        </div>
        <div class="col-md-12">
          <label for="">其他需求 :</label>
          <span> {{ modalData.receive.memo }}</span>
        </div>
        <div class="col-md-12">
          <label for="">訂單編號 :</label>
          <span> {{ modalData.orderNo }}</span>
        </div>
        <div class="col-md-12" v-if="modalData.mngMemo">
          <strong class="text-danger"> <label for="">退貨原因 :</label></strong>
          <span class="text-danger"> {{ modalData.mngMemo }}</span>
        </div>
      </div>
      <h4>購買商品</h4>
      <div class="row">
        <table class="table mx-2">
          <thead v-if="modalData.orderProducts">
            <tr>
              <th>產品名稱</th>
              <th>單價</th>
              <th>數量</th>
              <th>小計</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in modalData.orderProducts" :key="item.productId">
              <td>{{ item.productName }}</td>
              <td>${{ $addcomma(item.productPrice) }}</td>
              <td>{{ item.quantity }}</td>
              <td>${{ item.subTotal }}</td>
            </tr>
            <tr v-if="modalData.couponCode">
              <td class="text-right" colspan="3">折扣代碼</td>
              <td>{{ modalData.couponCode.trim() }}</td>
            </tr>
            <tr v-if="modalData.discount">
              <td class="text-right" colspan="3">折扣金額</td>
              <td>${{ modalData.discount }}</td>
            </tr>
            <tr>
              <td class="text-right" colspan="3">運費</td>
              <td>${{ modalData.fare }}</td>
            </tr>
            <tr>
              <td class="text-right" colspan="3">總計</td>
              <td>${{ $addcomma(modalData.totalPrice) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h4>付款結果</h4>
      <div class="row">
        <table class="table mx-2" v-if="modalData.payment">
          <thead>
            <tr>
              <th>金流交易碼</th>
              <th>付款種類</th>
              <th>是否付款</th>
              <th>付款金額</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ modalData.payment.tradeNo }}</td>
              <td class="item-text" v-if="modalData.payment.type == 'Credit'">
                信用卡付款
              </td>
              <td
                class="item-text"
                v-else-if="modalData.payment.type == 'Cash'"
              >
                貨到付款
              </td>
              <td
                class="item-text"
                v-else-if="modalData.payment.type.indexOf('WebATM') !== -1"
              >
                網路ATM
              </td>
              <td
                class="item-text"
                v-else-if="modalData.payment.type.indexOf('ATM') !== -1"
              >
                自動櫃員機
              </td>
              <td>
                {{
                  modalData.payment.result == true &&
                  modalData.payment.type == 'Cash'
                    ? '已付款'
                    : modalData.payment.result == false &&
                      modalData.payment.type == 'Cash'
                    ? '未付款'
                    : modalData.payment.result == false &&
                      modalData.payment.type !== 'Cash'
                    ? '付款失敗'
                    : '付款成功'
                }}
              </td>
              <td>${{ $addcomma(modalData.totalPrice) }}</td>
              <td>
                <b-button
                  size="sm"
                  @click="paid(modalData)"
                  class="mr-1"
                  variant="danger"
                  :disabled="
                    modalData.payment.type == 'Cash' &&
                    !modalData.payment.result
                      ? false
                      : true
                  "
                  >已付款</b-button
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-modal>
    <!-- 補寄Modal -->
    <b-modal
      class="add-modal"
      id="repost"
      ref="repost"
      title="商品補寄"
      @ok="handleOk"
    >
      <div class="row">
        <table class="table mx-2">
          <thead>
            <tr>
              <th>產品名稱</th>
              <th>補寄數量</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in repost.orderProducts" :key="item.productId">
              <td class="text-left">{{ item.productName }}</td>
              <td>
                <el-input-number
                  v-model="item.repostCount"
                  :min="0"
                  :max="item.quantity"
                ></el-input-number>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-modal>
  </div>
</template>
<script>
import twzipcode from 'twzipcode-data';
export default {
  components: {},
  data() {
    return {
      country: [],
      htmlText: '',
      date: [],
      selected: null,
      filterKey: '02',
      options: [
        { text: ' 全部訂單', value: 'all' },
        { text: ' 訂單建立', value: '00' },
        { text: '送貨資料建立', value: '01' },
        { text: '訂單成立', value: '02' },
        { text: '訂單取消', value: '03' },
        { text: '退貨補寄', value: '04' },
      ],
      options2: [
        { text: '已出貨', value: '10' },
        { text: '完成訂單', value: '11' },
        { text: '退貨', value: 'XX' },
        { text: ' 已退貨', value: 'RT' },
        { text: '已退款', value: 'RF' },
      ],
      nameState: '',
      form: {
        pccode: null,
        psccode: null,
        context: '',
      },

      items: [],
      fields: [
        {
          key: 'orderNo',
          label: '訂單編號',
          sortable: true,
          sortDirection: 'orderID',

          // class: "text-center",
        },
        {
          key: 'buyDate',
          label: '購買日期',
          sortable: true,
          sortDirection: 'buyDate',
        },
        {
          key: 'buyerName',
          label: '購買人',
          sortable: true,
          sortDirection: 'buyerName',
          // class: "text-center",
        },
        {
          key: 'buyerPhone',
          label: '聯絡人電話',
          sortable: true,
          sortDirection: 'buyerPhone',
          // class: "text-center",
        },
        {
          key: 'totalPrice',
          label: '總價',
          sortable: true,
          sortDirection: 'totalPrice',
          // class: "text-center",
        },
        {
          key: 'status',
          label: '訂單狀態',
          sortable: true,
          sortDirection: 'status',
          thStyle: {
            width: '100px',
          },
          // class: "text-center",
        },
        {
          key: 'actions',
          label: '操作',
          thStyle: {
            width: '220px',
          },
        },
      ],
      mode: '',
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 15, 20, 25],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      infoModal: {
        id: 'info-modal',
        title: '',
        content: '',
      },
      modalData: {},
      repost: {},
    };
  },
  watch: {
    filterForm: {
      handler() {
        this.totalRows = this.filterForm.length;
      },
      deep: true,
    },
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
    filterForm() {
      if (this.filterKey == 'all') {
        return this.items;
      } else {
        return this.items.filter((item) => {
          return item.status == this.filterKey;
        });
      }
    },
  },
  created() {
    this.getData();
  },
  filter: {
    newDate(key) {
      if (key) {
        let begin = key.split('T');
        let end = key.split('T')[1].split('.')[0];
        return `${begin[0]} ${end}`;
      }
    },
  },
  mounted() {
    let data = twzipcode();
    // 所有縣市
    this.country = data.zipcodes;
  },
  methods: {
    download() {
      let url = '/api/v1/OrderApi/Export';
      let form = new FormData();
      form.append('startDate', this.date[0]);
      form.append('endDate', this.date[1]);
      this.$http
        .post(url, form, {
          responseType: 'arraybuffer',
          dataType: 'binary',
          headers: {
            Authorization: `Bearer ${localStorage.Jwt}`,
          },
        })
        .then((response) => {
          let blob = new Blob([response.data], {
            type: 'application/octet-stream',
          });
          let link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = `訂單報表.xlsx`;
          // link.setAttribute('href', blob);
          // link.setAttribute('download', '123321.xlsx');
          link.click();
          // var reader = new FileReader(blob);
          // reader.onload = function () {
          //   var b64 = reader.result.replace(/^data:.+;base64,/, '');
          //   vm.send(b64);
          // };
        });
    },
    DLAllOrders() {
      let url = '/api/v1/OrderApi/ExportAllOrders';
      this.$http
        .post(url, null, {
          responseType: 'arraybuffer',
          dataType: 'binary',
          headers: {
            Authorization: `Bearer ${localStorage.Jwt}`,
          },
        })
        .then((response) => {
          let blob = new Blob([response.data], {
            type: 'application/octet-stream',
          });
          let link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = `每日訂單報表.xlsx`;
          // link.setAttribute('href', blob);
          // link.setAttribute('download', '123321.xlsx');
          link.click();
          // var reader = new FileReader(blob);
          // reader.onload = function () {
          //   var b64 = reader.result.replace(/^data:.+;base64,/, '');
          //   vm.send(b64);
          // };
        });
    },
    getData() {
      let url = '/api/v1/OrderApi/List';
      this.$http
        .get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.Jwt}`,
          },
        })
        .then((response) => {
          this.items = response.data.data;
          this.totalRows = response.data.data.length;
        })
        .catch((error) => {
          this.$store.dispatch('updateLoadgin', true);
        });
    },
    returnCreat(data) {
      if (data) {
        let begin = data.split('T');
        let end = data.split('T')[1].split('.')[0];
        return `${begin[0]} ${end}`;
      }
    },
    returnString(key) {
      let string = '';
      if (key) {
        this.country.forEach((item) => {
          if (item.id == key) {
            string = `${item.county}-${item.city}`;
          }
        });
      }
      return string;
    },
    modalShow() {
      this.$router.push({
        name: 'addproduct',
      });
      // this.mode = "add";
      // this.form = {};
      // this.itemshow = true;
      // setTimeout(() => {
      //   this.$bvModal.show("modal-prevent-closing");
      // }, 100);
    },
    ShipGoods(item) {
      let url = '/api/v1/OrderApi/ShipGoods';
      let form = new FormData();
      form.append('OrderID', item.orderID);
      this.$http
        .post(url, form, {
          headers: {
            Authorization: `Bearer ${localStorage.Jwt}`,
          },
        })
        .then((response) => {
          if (response.data.isSuccess) {
            this.getData();
            this.$message({
              message: '已出貨',
              type: 'success',
            });
          } else {
            this.$swal({
              icon: 'error',
              title: `${response.data.Message}`,
            });
          }
        });
    },
    CompleteOrder(item) {
      let url = '/api/v1/OrderApi/CompleteOrder';
      let form = new FormData();
      form.append('OrderID', item.orderID);
      this.$http
        .post(url, form, {
          headers: {
            Authorization: `Bearer ${localStorage.Jwt}`,
          },
        })
        .then((response) => {
          if (response.data.isSuccess) {
            this.getData();
            this.$message({
              message: '已完成',
              type: 'success',
            });
          } else {
            this.$swal({
              icon: 'error',
              title: `${response.data.Message}`,
            });
          }
        });
    },
    Repost(item) {
      let url = `/api/v1/OrderApi/FullOrder/${item.orderID}`;
      this.$http
        .get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.Jwt}`,
          },
        })
        .then((response) => {
          this.repost = Object.assign({}, this.repost, response.data.data);
          this.$bvModal.show('repost');
        });
    },
    view(item) {
      this.modalData = item;
      let url = `/api/v1/OrderApi/FullOrder/${item.orderID}`;
      this.$http
        .get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.Jwt}`,
          },
        })
        .then((response) => {
          this.modalData = Object.assign(
            {},
            this.modalData,
            response.data.data,
          );
          this.$bvModal.show('modal-prevent-closing');
        });
      // this.form = item;
      // this.mode = "edit";
      // this.$bvModal.show("modal-prevent-closing");

      // this.infoModal.title = `Row index: ${index}`;
      // this.infoModal.content = JSON.stringify(item, null, 2);
      // this.$root.$emit("bv::show::modal", this.infoModal.id, button);
      // this.$router.push({
      //   name: "editItem",
      //   params: {
      //     id: item.pdrefid,
      //   },
      // });
    },
    Returned(item) {
      //已退貨
      let url = '/api/v1/OrderApi/CompleteReturn';
      let form = new FormData();
      form.append('OrderID', item.orderID);
      this.$http
        .post(url, form, {
          headers: {
            Authorization: `Bearer ${localStorage.Jwt}`,
          },
        })
        .then((response) => {
          if (response.data.isSuccess) {
            this.getData();
            this.$message({
              message: '已退貨',
              type: 'success',
            });
          } else {
            this.$swal({
              icon: 'error',
              title: `${response.data.Message}`,
            });
          }
        });
    },
    Refunded(item) {
      //已退款
      let url = '/api/v1/OrderApi/CompleteRefund';
      let form = new FormData();
      form.append('OrderID', item.orderID);
      this.$http
        .post(url, form, {
          headers: {
            Authorization: `Bearer ${localStorage.Jwt}`,
          },
        })
        .then((response) => {
          if (response.data.isSuccess) {
            this.getData();
            this.$message({
              message: '已退款',
              type: 'success',
            });
          } else {
            this.$swal({
              icon: 'error',
              title: `${response.data.Message}`,
            });
          }
        });
    },
    paid() {
      let url = '/api/v1/OrderApi/PaidOrder';
      let form = new FormData();
      form.append('OrderID', this.modalData.orderID);
      this.$http
        .post(url, form, {
          headers: {
            Authorization: `Bearer ${localStorage.Jwt}`,
          },
        })
        .then((response) => {
          if (response.data.isSuccess) {
            this.$message({
              message: '狀態已更改',
              type: 'success',
            });
          } else {
            this.$message({
              message: `${response.data.Message}`,
              type: 'error',
            });
          }
        });
    },
    cancel(item) {
      //取消訂單
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
                vm.getData();
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
    resetInfoModal() {
      this.infoModal.title = '';
      this.infoModal.content = '';
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    //add-madal
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },
    resetModal() {
      this.name = '';
      this.nameState = null;
    },
    handleOk(bvModalEvt) {
      let url = '/api/v1/OrderApi/RepostGoods';
      let form = new FormData();
      form.append('OrderID', this.repost.orderID);
      form.append('repostGoods', JSON.stringify(this.repost.orderProducts));
      this.$http
        .post(url, form, {
          headers: {
            Authorization: `Bearer ${localStorage.Jwt}`,
          },
        })
        .then((response) => {
          if (response.data.isSuccess) {
            this.getData();
            this.$message({
              message: '補寄成功',
              type: 'success',
            });
          } else {
            this.$message({
              message: `${response.data.Message}`,
              type: 'error',
            });
          }
        });

      //取消modal的關閉行為
      // bvModalEvt.preventDefault();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      // if (!this.checkFormValidity()) {
      //   return;
      // }
      let action = '';
      if (this.mode == 'add') {
        action = 'post';
      } else {
        action = 'put';
      }

      let url = '/api/v1/ProductApi';
      let getCookie = document.cookie.split(';');
      let CSRFTOKEN = '';
      getCookie.forEach((item, index, arr) => {
        if (item.indexOf('csrf-secure') !== -1) {
          CSRFTOKEN = item.split('csrf-secure=')[1];
        }
      });
      let data = {
        ...this.form,
      };
      this.$http[action](url, data, {
        headers: {
          // RequestVerificationToken: "14a1347f412b39f",
          'X-CSRF-TOKEN': CSRFTOKEN,
        },
      }).then((response) => {
        this.$message({
          message: '新增成功',
          type: 'success',
        });
        this.getData();
      });

      // this.$nextTick(() => {
      //   this.$bvModal.hide("modal-prevent-closing");
      // });
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .md-body-content {
  .dah-item-box {
    .table {
      thead {
        tr {
          th {
            div {
              font-size: 15px;
            }
          }
        }
      }
    }
  }
}
</style>
