<template>
  <div style="background: white">
    <b-container fluid class="dah-item-box py-3">
      <h3 class="py-2">修改進貨</h3>
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
            :disabled="item.disable"
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
        <button class="btn btn-primary mr-2" @click="handleSubmit">送出</button>
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
  name: 'EditPurchaseManagement',
  data() {
    return {
      id: this.$route.params.id,
      htmlText: '',
      selected: null,
      itemshow: false,
      nameState: '',
      form: this.$route.params.item,
      items: [],
      fields: [
        {
          key: 'pdvpdref',
          label: '商品編號',
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
          key: 'pdvrefid',
          label: '庫存編號',
          disable: true,
        },
        {
          key: 'pdvpurcsecnt',
          label: '目前進貨量',
          disable: true,
        },
        {
          key: 'Quantity',
          label: '修改進貨量',
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
    if (!this.$route.params.item) {
      this.$router.push({
        name: 'purchasemanagement',
      });
    }
  },
  mounted() {
    // Set the initial number of items
  },
  watch: {
    // 'form.pccode': {
    //   handler(key) {
    //     this.getSubCode(key);
    //   },
    // },
  },
  methods: {
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
      let url = '/api/v1/InventoryApi/EditPurchase';
      let form = new FormData();
      form.append('ProductId', this.form.pdvpdref);
      form.append('Quantity', this.form.Quantity);
      form.append('StockId', this.form.pdvrefid);
      this.$http
        .post(url, form, {
          headers: {
            Authorization: `Bearer ${localStorage.Jwt}`,
          },
        })
        .then((response) => {
          this.$message({
            message: '成功!',
            type: 'success',
          });
        });
    },
    back() {
      this.$router.push({
        name: 'purchasemanagement',
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.dah-item-box {
}
</style>