<template>
  <div style="background: white" v-if="$route.meta.keepFormAlive">
    <b-container fluid class="dah-item-box py-3">
      <b-row v-if="!itemshow">
        <b-col lg="6" class="my-1">
          <b-form-group
            label="排序"
            label-cols-sm="3"
            label-align-sm="right"
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
            label-cols-sm="3"
            label-align-sm="right"
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

        <!-- <b-col lg="6" class="my-1">
          <b-form-group
            label="Filter On"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            description="Leave all unchecked to filter on all data"
            class="mb-0"
          >
            <b-form-checkbox-group v-model="filterOn" class="mt-1">
              <b-form-checkbox value="name">Name</b-form-checkbox>
              <b-form-checkbox value="age">Age</b-form-checkbox>
              <b-form-checkbox value="isActive">Active</b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>
        </b-col> -->
      </b-row>
      <b-table
        show-empty
        small
        stacked="md"
        :items="items"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :filterIncludedFields="filterOn"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        @filtered="onFiltered"
        v-if="!itemshow"
      >
        <template v-slot:cell(crstmp)="row">
          {{ $FormatDate(row.item.crstmp) }}
        </template>
        <template v-slot:cell(mdstmp)="row">
          {{ $FormatDate(row.item.mdstmp) }}
        </template>
        <template v-slot:cell(actions)="row">
          <b-button
            size="sm"
            @click="edititem(row.item, row.index, $event.target, '')"
            class="mr-1"
            >修改進貨</b-button
          >
          <!-- <b-button
            size="sm"
            @click="remove(row.item, row.index, $event.target)"
            class="mr-1"
            >刪除</b-button
          > -->
          <!-- <b-button size="sm" @click="details(row)">商品描述</b-button> -->
        </template>
      </b-table>
      <b-row v-if="!itemshow">
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
      <form ref="form" v-if="itemshow">
        <b-form-group
          :state="nameState"
          :label="item.label"
          :label-for="item.key"
          :invalid-feedback="item.label"
          v-for="item in addTypeList"
          :key="item.key"
        >
          <b-form-input
            :id="item.key"
            v-model="form[item.key]"
            :state="nameState"
            required
            v-if="
              !item.isChecked && !item.isDate && !item.isSelect && !item.editor
            "
          ></b-form-input>
          <select
            class="custom-select"
            v-else-if="item.isSelect"
            v-model="form[item.key]"
          >
            <option selected disabled>請選擇</option>
            <option
              v-for="select in item.options"
              :key="select.key"
              :value="select.key"
            >
              {{ select.label }}
            </option>
          </select>
          <b-form-checkbox
            :id="item.key"
            v-model="form[item.key]"
            :name="item.key"
            :value="item.selected"
            :unchecked-value="false"
            v-else-if="item.isChecked"
          >
            {{ item.lable }}
          </b-form-checkbox>
          <b-form-datepicker
            :id="item.key"
            v-model="form[item.key]"
            v-else-if="item.isDate"
          ></b-form-datepicker>
          <editor
            :resizable-content="true"
            :resizable-toolbar="true"
            :value="form[item.key]"
            rows="10"
            cols="30"
            v-model="form[item.key]"
            v-else-if="item.editor"
          >
          </editor>
        </b-form-group>
        <button class="btn btn-primary" @click="handleSubmit">新增</button>
        <button class="btn btn-danger" @click="itemshow = false">取消</button>
      </form>
    </b-container>
    <!-- 
    <b-modal
      class="add-modal"
      size="xl"
      id="modal-prevent-closing"
      ref="modal"
      title="Submit Your Name"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          :state="nameState"
          :label="item.label"
          :label-for="item.key"
          :invalid-feedback="item.label"
          v-for="item in addTypeList"
          :key="item.key"
        >
          <b-form-input
            :id="item.key"
            v-model="form[item.key]"
            :state="nameState"
            required
            v-if="
              !item.isChecked && !item.isDate && !item.isSelect && !item.editor
            "
          ></b-form-input>
          <select
            class="custom-select"
            v-else-if="item.isSelect"
            v-model="form[item.key]"
          >
            <option selected disabled>請選擇</option>
            <option
              v-for="select in item.options"
              :key="select.key"
              :value="select.key"
            >
              {{ select.label }}
            </option>
          </select>
          <b-form-checkbox
            :id="item.key"
            v-model="form[item.key]"
            :name="item.key"
            :value="item.selected"
            :unchecked-value="false"
            v-else-if="item.isChecked"
          >
            {{ item.lable }}
          </b-form-checkbox>
          <b-form-datepicker
            :id="item.key"
            v-model="form[item.key]"
            v-else-if="item.isDate"
          ></b-form-datepicker>
        </b-form-group>
      </form>
    </b-modal> -->
  </div>
  <router-view v-else></router-view>
</template>
<script>
import { Editor, EditorTool } from '@progress/kendo-editor-vue-wrapper';
export default {
  name: 'DashboardPurchaseManagement',
  components: {
    editor: Editor,
    'editor-tool': EditorTool,
  },
  data() {
    return {
      htmlText: '',
      selected: null,
      itemshow: false,
      nameState: '',
      form: {
        pccode: null,
        psccode: null,
        context: '',
      },

      items: [],
      fields: [
        {
          key: 'pdvrefid',
          label: '庫存編號',
          sortable: true,
          sortDirection: 'pdvrefid',
        },
        {
          key: 'pdvpdref',
          label: '商品編號',
          sortable: true,
          sortDirection: 'pdvpdref',
          // class: "text-center",
        },
        {
          key: 'pdvordercnt',
          label: '下單數量',
          sortable: true,
          sortDirection: 'pdvordercnt',
          // class: "text-center",
        },
        {
          key: 'pdvrepostcnt',
          label: '補寄數量',
          sortable: true,
          sortDirection: 'pdvrepostcnt',
          // class: "text-center",
        },
        {
          key: 'pdvreturncnt',
          label: '退貨數量',
          sortable: true,
          sortDirection: 'pdvreturncnt',
          // class: "text-center",
        },
        {
          key: 'pdvpurcsecnt',
          label: '進貨數量',
          sortable: true,
          sortDirection: 'pdvpurcsecnt',
          // class: "text-center",
        },
        {
          key: 'pdvalertcnt',
          label: '警戒數量',
          sortable: true,
          sortDirection: 'pdvalertcnt',
          // class: "text-center",
        },
        {
          key: 'pdvreservecnt',
          label: '庫存數量',
          sortable: true,
          sortDirection: 'pdvreservecnt',
          // class: "text-center",
        },
        {
          key: 'pdvavailable',
          label: '庫存是否可用',
          sortable: true,
          sortDirection: 'pdvavailable',
          // class: "text-center",
        },
        {
          key: 'crstmp',
          label: '建立日期',
          sortable: true,
          sortDirection: 'crstmp',
          // class: "text-center",
        },
        {
          key: 'crusref',
          label: '建立人員',
          sortable: true,
          sortDirection: 'crusref',
          // class: "text-center",
        },
        {
          key: 'mdstmp',
          label: '修改日期',
          sortable: true,
          sortDirection: 'mdstmp',
          // class: "text-center",
        },
        {
          key: 'mdusref',
          label: '修改人員',
          sortable: true,
          sortDirection: 'mdusref',
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

      addTypeList: [
        {
          key: 'pdname',
          label: '商品名稱',
        },
        {
          key: 'pddesc',
          label: '商品描述',
          editor: true,
        },
        {
          key: 'pdshort',
          label: '商品簡述',
        },
        {
          key: 'pdprice',
          label: '商品價格',
        },
      ],
      mode: '',
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      infoModal: {
        id: 'info-modal',
        title: '',
        content: '',
      },
    };
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
  },
  created() {
    this.getData();
  },
  mounted() {
    // Set the initial number of items
  },
  watch: {
    'form.pccode': {
      handler(key) {
        this.getSubCode(key);
      },
    },
    $route() {
      this.getData();
    },
  },
  methods: {
    getData() {
      const url = '/api/v1/InventoryApi/List';
      this.$http
        .get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.Jwt}`,
          },
        })
        .then((response) => {
          this.items = response.data.data;
          this.totalRows = response.data.data.length;
        });
    },
    getCode() {
      const url = '/api/v1/CategoryApi';
      this.$http.get(url).then((response) => {
        this.addTypeList[1].options = response.data.data.map((item) => {
          return {
            label: item.pcname,
            key: item.pccode,
          };
        });
      });
    },
    getSubCode(code) {
      let url = `/api/v1/CategoryApi/${code}`;
      this.$http.get(url).then((response) => {
        this.addTypeList[2].options = response.data.data.map((item) => {
          return {
            label: item.pscname,
            key: item.psccode,
          };
        });
      });
    },
    edititem(item, index, button) {
      // this.form = item;
      // this.mode = "edit";
      // this.$bvModal.show("modal-prevent-closing");

      // this.infoModal.title = `Row index: ${index}`;
      // this.infoModal.content = JSON.stringify(item, null, 2);
      // this.$root.$emit("bv::show::modal", this.infoModal.id, button);
      this.$router.push({
        name: 'editpurchasemanagement',
        params: {
          id: item.pdvpdref,
          item: item,
        },
      });
    },
    remove() {},
    details(row) {
      this.$nextTick(() => {
        row.toggleDetails();
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
      // Prevent modal from closinghandleO
      bvModalEvt.preventDefault();
      // Trigger submit handler
      // this.handleSubmit();
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
.k-editor *[contenteditable='false'] {
  opacity: 0.5 !important;
  cursor: default;
}
</style>