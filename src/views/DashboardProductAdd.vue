<template>
  <div style="background: white">
    <b-container fluid class="dah-item-box py-3">
      <h3 class="py-2">新增商品</h3>
      <b-form @submit="onSubmit">
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
            required
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
        <button class="btn btn-primary mr-2" type="submit">新增</button>
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
          key: 'pdrefid',
          label: '商品編號',
          sortable: true,
          sortDirection: 'pdrefid',
        },
        {
          key: 'pdname',
          label: '商品名稱',
          sortable: true,
          sortDirection: 'pdname',
          // class: "text-center",
        },
        {
          key: 'pccode',
          label: '主類別',
          sortable: true,
          sortDirection: 'pccode',
          // class: "text-center",
        },
        {
          key: 'psccode',
          label: '次類別',
          sortable: true,
          sortDirection: 'psccode',
          // class: "text-center",
        },
        {
          key: 'pdcolor',
          label: '商品顏色',
          sortable: true,
          sortDirection: 'pdcolor',
          // class: "text-center",
        },
        {
          key: 'pdsize',
          label: '商品尺寸',
          sortable: true,
          sortDirection: 'pdsize',
          // class: "text-center",
        },
        {
          key: 'pddesc',
          label: '商品描述',
          sortable: true,
          sortDirection: 'pddesc',
          // class: "text-center",
        },
        {
          key: 'pdshort',
          label: '商品簡述',
          sortable: true,
          sortDirection: 'pdshort',
          // class: "text-center",
        },
        {
          key: 'pdprice',
          label: '商品價格',
          sortable: true,
          sortDirection: 'pdprice',
          // class: "text-center",
        },
        // {
        //   key: "pdphoto",
        //   label: "圖片連結",
        //   sortable: true,
        //   sortDirection: "pdphoto",
        //   // class: "text-center",
        // },
        {
          key: 'pdshile',
          label: '上架日期',
          sortable: true,
          sortDirection: 'pdshile',
          // class: "text-center",
        },
        {
          key: 'pdavailable',
          label: '是否可用',
          selected: 1,
          sortable: true,
          sortDirection: 'pdavailable',
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
          key: 'pccode',
          label: '主類別',
          isSelect: true,
          options: [],
        },
        {
          key: 'psccode',
          label: '次類別',
          isSelect: true,
          options: [],
        },
        {
          key: 'pdcolor',
          label: '商品顏色',
        },
        {
          key: 'pdsize',
          label: '商品尺寸',
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
        {
          key: 'pdphoto',
          label: '圖片連結',
        },
        {
          key: 'pdshile',
          label: '上架日期',
          isDate: true,
        },
        {
          key: 'pdavailable',
          label: '是否可用',
          isChecked: true,
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
    onSubmit(evt) {
      evt.preventDefault();
      this.handleSubmit();
    },
    getCode() {
      let url = '/api/v1/CategoryApi';
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
      const url = '/api/v1/ProductApi';
      let getCookie = document.cookie.split(';');
      let CSRFTOKEN = '';
      getCookie.forEach((item, index, arr) => {
        if (item.indexOf('csrf-secure') !== -1) {
          CSRFTOKEN = item.split('csrf-secure=')[1];
        }
      });
      const data = {
        ...this.form,
      };
      this.$http
        .post(url, data, {
          headers: {
            // RequestVerificationToken: "14a1347f412b39f",
            'X-CSRF-TOKEN': CSRFTOKEN,
          },
        })
        .then((response) => {
          this.$message({
            message: '新增成功',
            type: 'success',
          });
        });
    },
    back() {
      this.$router.push({
        name: 'produtList',
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.dah-item-box {
}
</style>