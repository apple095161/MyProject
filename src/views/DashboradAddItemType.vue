<template>
  <div style="background: white">
    <b-container fluid class="dah-item-box py-3">
      <button class="btn btn-primary" v-b-modal.modal-prevent-closing>
        新增類別
      </button>
      <b-row>
        <b-col lg="6" class="my-1">
          <b-form-group
            label="Sort"
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
                <option :value="false">Asc</option>
                <option :value="true">Desc</option>
              </b-form-select>
            </b-input-group>
          </b-form-group>
        </b-col>

        <b-col lg="6" class="my-1">
          <b-form-group
            label="Filter"
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
                placeholder="Type to Search"
              ></b-form-input>
              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''"
                  >Clear</b-button
                >
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
<!-- 
        <b-col lg="6" class="my-1">
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
      >
        <!-- <template v-slot:cell(name)="row"
          >{{ row.value.first }} {{ row.value.last }}</template
        > -->

        <template v-slot:cell(actions)="row">
          <b-button
            size="sm"
            @click="info(row.item, row.index, $event.target)"
            v-b-modal.sub-add-modal
            class="mr-1"
            >新增次類別</b-button
          >
          <b-button size="sm" @click="details(row)"> 查看次類別 </b-button>
        </template>

        <template v-slot:row-details="row">
          <b-card>
            <ul>
              <li v-for="(item, key) in row.item.showDetails" :key="key">
                次類別名稱:{{ item.psccode }} 次類別名稱:{{ item.pscname }}
              </li>
            </ul>
          </b-card>
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
    <!-- 新增主類別 -->
    <b-modal
      class="add-modal"
      id="modal-prevent-closing"
      ref="modal"
      title="新增主類別"
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
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
    <!-- 新增次類別 -->
    <b-modal
      class="add-modal"
      id="sub-add-modal"
      ref="supmodal"
      title="新增次類別"
      @show="resetModal"
      @hidden="resetModal"
      @ok="addsubModal"
    >
      <form ref="subForm" @submit.stop.prevent="handleSubmit">
        <b-form-group
          :state="nameState"
          :label="item.label"
          :label-for="item.key"
          :invalid-feedback="item.label"
          v-for="item in addsbpTypeList"
          :key="item.key"
        >
          <b-form-input
            :id="item.key"
            v-model="form[item.key]"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selected: null,
      nameState: '',
      form: {
        pccode: null,
        psccode: null,
      },
      items: [
        // {
        //   pccode: "123456",
        //   pcname: "測試名稱",
        // },
        // {
        //   pccode: "123456",
        //   pcname: "測試名稱",
        // },
      ],
      fields: [
        {
          key: 'pccode',
          label: '主類別代碼',
          sortable: true,
          sortDirection: 'pccode',
          // class: "text-center",
        },
        {
          key: 'pcname',
          label: '主類別名稱',
          sortable: true,
          sortDirection: 'pcname',
          // class: "text-center",
        },
        { key: 'actions', label: '新增次類別' },
        // {
        //   key: "psccode",
        //   label: "次類別名稱",
        //   sortable: true,
        //   sortDirection: "psccode",
        //   // class: "text-center",
        // },
        // {
        //   key: "pscname",
        //   label: "次類別代碼",
        //   sortable: true,
        //   sortDirection: "pscname",
        //   // class: "text-center",
        // },
      ],

      addTypeList: [
        {
          key: 'pccode',
          label: '類別代碼',
          sortable: true,
          sortDirection: 'pccode',
          // class: "text-center",
        },
        {
          key: 'pcname',
          label: '類別名稱',
          sortable: true,
          sortDirection: 'psccode',
          // class: "text-center",
        },
      ],
      addsbpTypeList: [
        {
          key: 'psccode',
          label: '次類別代碼',
          sortable: true,
          sortDirection: 'psccode',
          // class: "text-center",
        },
        {
          key: 'pscname',
          label: '次類別名稱',
          sortable: true,
          sortDirection: 'pscname',
          // class: "text-center",
        },
      ],
      subItems: [
        {
          label: '132',
          key: 132,
        },
      ],
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
    this.totalRows = this.items.length;
  },
  methods: {
    getData() {
      let url = '/api/v1/CategoryApi';
      this.$http.get(url).then((response) => {
        this.items = response.data.data;
      });
    },
    info(item, index, button) {
      this.form.pccode = item.pccode;
      this.form.pcname = item.pcname;
      //   this.infoModal.title = `Row index: ${index}`;
      //   this.infoModal.content = JSON.stringify(item, null, 2);
      //   this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    details(row) {
      // this.$set(row.item, "showDetails", []);
      this.$set(row.item, 'showDetails', []);

      let url = `/api/v1/CategoryApi/${row.item.pccode}`;
      this.$http.get(url).then((response) => {
        row.item.showDetails = response.data.data.map((item) => {
          return {
            ...item,
          };
        });
        this.$nextTick(() => {
          row.toggleDetails();
        });
      });
    },
    returnTable(row) {
      const vm = this;
      let str = '';
      let url = `/api/v1/CategoryApi/${row.pccode}`;
      this.$http.get(url).then((response) => {
        let data = [];
        response.data.data.forEach((item) => {
          this.$set(item, '_showDetails', false);
        });
        this.$nextTick(() => {
          row.toggleDetails();
        });
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

    //add-madal 主類別新增欄位驗證
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },
    //add sub modal 驗證欄位沒填寫
    checksSubFormValidity() {
      const valid = this.$refs.subForm.checkValidity();
      this.nameState = valid;
      return valid;
    },
    resetModal() {
      this.name = '';
      this.nameState = null;
    },
    addsubModal(submodal) {
      submodal.preventDefault();
      // Trigger submit handler
      this.addsubSubmit();
    },
    addsubSubmit() {
      // Exit when the form isn't valid
      if (!this.checksSubFormValidity()) {
        return;
      }
      let url = `/api/v1/CategoryApi/${this.form.pccode}`;
      const form = new FormData();
      form.append('SubCode', this.form.psccode);
      form.append('Name', this.form.pscname);
      this.$http.post(url, form).then((response) => {
        this.$message({
          message: '新增成功',
          type: 'success',
        });
        this.$nextTick(() => {
          this.$bvModal.hide('sub-add-modal');
          this.getData();
        });
      });
    },

    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      let url = '/api/v1/CategoryApi';
      const form = new FormData();
      form.append('MainCode', this.form.pccode);
      form.append('Name', this.form.pcname);
      this.$http.post(url, form).then((response) => {
        this.$message({
          message: '新增成功',
          type: 'success',
        });
        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing');
          this.getData();
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.dah-item-box {
}
</style>