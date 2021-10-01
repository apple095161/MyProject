<template>
  <div style="background: white">
    <b-container fluid class="dah-item-box py-3">
      <h3 class="py-2">新增商品庫存</h3>
      <b-form ref="form" @submit.stop.prevent>
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
            :value="htmlText"
            rows="10"
            cols="30"
            v-model="form[item.key]"
            v-else-if="item.editor"
          >
          </editor>
        </b-form-group>
        <button class="btn btn-primary mr-2" @click="handleSubmit">新增</button>
        <button class="btn btn-info" @click="back">返回</button>
      </b-form>
    </b-container>
  </div>
</template>
<script>
import { Editor } from '@progress/kendo-editor-vue-wrapper';
export default {
  components: {
    editor: Editor,
  },
  name: 'EditProductStock',
  data() {
    return {
      id: this.$route.params.id,
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
          key: 'pdname',
          label: '目前編輯的商品名稱',
          sortable: true,
          sortDirection: 'pdname',
          // class: "text-center",
        },
        {
          key: 'pdshort',
          label: '最低庫存量',
          sortable: true,
          sortDirection: 'pdshort',
          // class: "text-center",
        },
        { key: 'actions', label: '操作' },
      ],

      addTypeList: [
        {
          key: 'pdname',
          label: '商品名稱',
        },
        {
          key: 'alertCount',
          label: '最低庫存數量',
        },
        {
          key: 'purchaseCount',
          label: '當前庫存數量',
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
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key };
        });
    },
  },
  created() {
    this.getData();
    this.getCode();
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
  },
  methods: {
    getData() {
      let url = `/api/v1/ProductApi/${this.id}`;
      this.$http.get(url).then(response => {
        this.form = response.data.data;
      });
    },
    getCode() {
      let url = '/api/v1/CategoryApi';
      this.$http.get(url).then(response => {
        this.addTypeList[1].options = response.data.data.map(item => {
          return {
            label: item.pcname,
            key: item.pccode,
          };
        });
      });
    },
    getSubCode(code) {
      let url = `/api/v1/CategoryApi/${code}`;
      this.$http.get(url).then(response => {
        this.addTypeList[2].options = response.data.data.map(item => {
          return {
            label: item.pscname,
            key: item.psccode,
          };
        });
      });
    },
    modalShow() {
      this.mode = 'add';
      this.form = {};
      this.itemshow = true;
      // setTimeout(() => {
      //   this.$bvModal.show("modal-prevent-closing");
      // }, 100);
    },
    edititem(item, index, button) {
      this.form = item;
      this.mode = 'edit';
      this.$bvModal.show('modal-prevent-closing');

      // this.infoModal.title = `Row index: ${index}`;
      // this.infoModal.content = JSON.stringify(item, null, 2);
      // this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    remove() {},
    details(item, index, button) {},
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
    },
    handleSubmit() {
      let url = '/api/v1/InventoryApi/AddInventory';
      let form = new FormData();
      form.append('productId', this.form.pdrefid);
      form.append('purchaseCount', this.form.purchaseCount);
      form.append('alertCount', this.form.alertCount);
      this.$http
        .post(url, form, {
          headers: {
            Authorization: `Bearer ${localStorage.Jwt}`,
          },
        })
        .then(response => {
          this.$message({
            message: '成功!',
            type: 'success',
          });
        });
    },
    back() {
      this.$router.push({
        name: 'productstock',
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.dah-item-box {
}
</style>