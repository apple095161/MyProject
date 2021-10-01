<template>
  <div style="background: white">
    <b-container fluid class="dah-item-box py-3">
      <h3 class="py-2">編輯商品</h3>
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
              !item.isChecked &&
              !item.isDate &&
              !item.isSelect &&
              !item.editor &&
              !item.isUpload
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
          <el-upload
            action
            list-type="picture-card"
            v-else-if="item.isUpload"
            :file-list="fileList"
            :before-upload="beforeUpload"
            :http-request="handleChange"
          >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{ file }">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                alt=""
              />
              <span class="el-upload-list__item-actions">
                <!-- <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span> -->
                <!-- <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleDownload(file)"
                >
                  <i class="el-icon-download"></i>
                </span> -->
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="removeImage(file.url)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
        </b-form-group>
        <!-- <input id="uploadFile" type="file" @change="uploadFile" /> -->
        <button class="btn btn-primary mr-2" @click="handleSubmit">編輯</button>
        <button class="btn btn-info" @click="back">返回</button>
      </b-form>
    </b-container>
  </div>
</template>
<script>
import Axios from 'axios';
import { Editor } from '@progress/kendo-editor-vue-wrapper';
export default {
  components: {
    editor: Editor,
  },
  data() {
    return {
      id: this.$route.params.id,
      htmlText: '',
      selected: null,
      itemshow: false,
      nameState: '',
      UpLoadImageList: [],
      fileList: [
        {
          url: 'https://598info.blob.core.windows.net/598info/images/ecmall/product_EC-重物_1.png',
        },
      ],
      form: {
        pccode: null,
        psccode: null,
        context: '',
      },
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
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
          key: 'psccode',
          label: '運費規則',
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
          key: 'pdpfrefid',
          label: '運費規則',
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
          key: 'upload',
          label: '圖片上傳',
          isUpload: true,
          options: [],
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
    this.getData();
    this.getCode();
    this.getFare();
  },
  watch: {
    'form.pccode': {
      handler(key) {
        this.getSubCode(key);
      },
    },
  },
  methods: {
    formatNames(files) {
      // return files.length === 1
      //   ? files[0].name
      //   : `${files.length} files selected`;
    },
    clickUploadBtn() {
      let a = document.getElementById('uploadFile');
      a.click();
    },
    uploadFile(event) {
      console.log(event);
      const vm = this;
      // var sasKey =
      //   'sp=racw&st=2021-02-19T06:52:05Z&se=2121-02-19T14:52:05Z&sip=114.35.198.179&sv=2020-02-10&sr=c&sig=nqqrdCKOYfw%2FJMmYVlvO79sv6vi0YL4%2B7LYhQyjf1zc%3D';
      // var blobUri =
      //   'https://598info.blob.core.windows.net/598info/images/ecmall?sp=racw&st=2021-02-19T06:52:05Z&se=2121-02-19T14:52:05Z&sip=114.35.198.179&sv=2020-02-10&sr=c&sig=nqqrdCKOYfw%2FJMmYVlvO79sv6vi0YL4%2B7LYhQyjf1zc%3D';
      // var blobService = AzureStorage.createBlobServiceWithSas(
      //   blobUri,
      //   sasKey,
      // ).withFilter(new AzureStorage.ExponentialRetryPolicyFilter());
      // blobService.createBlockBlobFromText(
      //   'mycontainer',
      //   'myblob',
      //   event.target.files[0],
      //   function (error, result, response) {
      //     if (error) {
      //       console.log(error);
      //     } else {
      //       console.log(result, response);
      //     }
      //   },
      // );

      // this.$azureUpload(
      //   {
      //     baseUrl:
      //       'https://598info.blob.core.windows.net/598info/images/ecmall',
      //     sas1Token:
      //       'sp=racw&st=2021-02-19T06:52:05Z&se=2121-02-19T14:52:05Z&sip=114.35.198.179&sv=2020-02-10&sr=c&sig=nqqrdCKOYfw%2FJMmYVlvO79sv6vi0YL4%2B7LYhQyjf1zc%3D',
      //     file: event.target.files[0],
      //     progress: '',
      //     complete: this.test1,
      //     error: this.error1,
      //   },
      //   Axios.create({
      //     headers: {
      //       Authorization: 'Bearer b959ecac-a956-431e-b4f7-b5d08250b9d7',
      //       'Access-Control-Allow-Origin': '*',
      //       'Access-Control-Allow-Methods':
      //         'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      //       'Access-Control-Allow-Headers': 'Origin, Content-Type, x-ms-*',
      //       'Content-Type': 'image/png',
      //       'x-ms-blob-type': 'BlockBlob',
      //     },
      //   }),
      // );
    },
    beforeUpload(file) {
      const isImage = file.type.includes('image');
      if (!isImage) {
        this.$message.error('只能上傳圖片檔');
      }
      return isImage;
    },
    handleChange(file, fileList) {
      this.ToBase64(file.file).then((response) => {
        let imageData = {
          imgBase64: response,
          imgName: `${file.file.name}`,
          imgType: `${file.file.type}`,
        };
        this.UpLoadImageList.push(imageData);
      });
    },
    ToBase64(file) {
      return new Promise(function (resolve, reject) {
        let reader = new FileReader();
        let imgResult = '';
        reader.readAsDataURL(file);
        reader.onload = function () {
          imgResult = reader.result;
        };

        reader.onerror = function (error) {
          reject(error);
        };
        reader.onloadend = function () {
          resolve(imgResult);
        };
      });
    },
    UpLoadImage() {
      let url = '/api/v1/ProductApi/UpImgToAzure';
      this.$http
        .post(
          url,
          {
            productId: this.form.pdrefid,
            imgContexts: this.UpLoadImageList,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.Jwt}`,
            },
          },
        )
        .then((response) => {
          console.log(response);
        });
    },
    removeImage(fileName) {
      let url = `/api/v1/ProductApi/DeleteBlob/${fileName}`;
      this.$http
        .delete(url, {
          headers: {
            Authorization: `Bearer ${localStorage.Jwt}`,
          },
        })
        .then((response) => {
          console.log(response);
        });
    },
    handleRemove(file) {},
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {},

    uploadBlobFrom() {},
    getData() {
      let url = `/api/v1/ProductApi/${this.id}`;
      this.$http.get(url).then((response) => {
        this.form = response.data.data;
      });
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
    getFare() {
      let url = '/api/v1/FareMgmtApi';
      this.$http
        .get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.Jwt}`,
          },
        })
        .then((response) => {
          this.addTypeList[3].options = response.data.data.map((item) => {
            return {
              label: item.pfname,
              key: item.pfrefid,
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
      // Trigger submit handler
      // this.handleSubmit();
    },
    handleSubmit() {
      this.UpLoadImage();
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
      this.$http
        .put(url, data, {
          headers: {
            // RequestVerificationToken: "14a1347f412b39f",
            'X-CSRF-TOKEN': CSRFTOKEN,
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