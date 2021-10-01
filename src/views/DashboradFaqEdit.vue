<template>
  <div>
    <div class="title my-3">
      <el-input placeholder="請輸入標題" v-model="form.title">
        <template slot="prepend">標題:</template>
      </el-input>
    </div>
    <editor
      :resizable-content="true"
      :resizable-toolbar="true"
      :value="htmlText"
      rows="10"
      cols="30"
      v-model="form.context"
    >
    </editor>
    <!-- <quill-editor
      ref="myQuillEditor"
      v-model="form.context"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
      style="background: white"
    /> -->
    <div class="select my-3">
      <label for="" class="mr-3">文章類型</label>
      <el-select v-model="form.cateId" placeholder="請選擇">
        <el-option
          v-for="item in LabelList"
          :key="item.id"
          :label="item.context"
          :value="item.id"
        >
        </el-option>
        <div slot="empty" class="empty-style text-center" style="padding: 10px">
          暫無資料
        </div>
      </el-select>
    </div>
    <div class="btn-Group">
      <div
        class="btn btn-primary mr-2"
        v-if="$route.params.id == 'new'"
        @click="add"
      >
        新增
      </div>
      <div
        class="btn btn-primary mr-2"
        v-if="$route.params.id !== 'new'"
        @click="edit"
      >
        修改
      </div>
      <div class="btn btn-info" @click="back">返回</div>
    </div>
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
      form: {
        label: '',
        title: '',
        context: '',
      },
      options: [],
      content: '',
      editorOption: {},
      id: this.$route.params.id,
      LabelList: [],
      htmlText: '',
    };
  },
  created() {
    this.getTitle();
    if (this.id !== 'new') {
      this.getData();
    }
  },
  mounted() {
    if (this.$route.params.id == 'new') {
      this.$route.meta.title = '新增題庫';
    } else {
      this.$route.meta.title = '編輯題庫';
    }
  },
  watch: {
    $route(to, from) {
      if (from.name == 'faqEdit' && this.$route.params.id == 'new') {
        this.$route.meta.title = '新增題庫';
        this.form = {
          label: '',
          title: '',
          context: '',
        };
      } else {
        this.$route.meta.title = '編輯題庫';
      }
    },
  },
  methods: {
    getData() {
      let getCookie = document.cookie.split(';');
      let CSRFTOKEN = '';
      getCookie.forEach((item, index, arr) => {
        if (item.indexOf('csrf-secure') !== -1) {
          CSRFTOKEN = item.split('csrf-secure=')[1];
        }
      });
      let url = `/api/v1/QuestionBank/${this.id}`;
      this.$http
        .get(url, {
          headers: {
            'X-CSRF-TOKEN': CSRFTOKEN,
            Authorization: `Bearer ${localStorage.Jwt}`,
          },
        })
        .then((response) => {
          this.form = response.data.data;
        });
    },
    getTitle() {
      let url = '/api/v1/Quecategory';
      this.$http.get(url).then((response) => {
        this.LabelList = response.data.data;
      });
    },
    edit() {
      let url = `/api/v1/QuestionBank/${this.id}`;
      this.$http
        .put(url, this.form, {
          headers: {
            Authorization: `Bearer ${localStorage.Jwt}`,
          },
        })
        .then((response) => {
          this.$router.push({
            name: 'faqset',
          });
        });
    },
    add() {
      //   let getCookie = document.cookie.split(";");
      //   let CSRFTOKEN = "";
      //   getCookie.forEach((item, index, arr) => {
      //     if (item.indexOf("csrf-secure") !== -1) {
      //       CSRFTOKEN = item.split("csrf-secure=")[1];
      //     }
      //   });
      let url = '/api/v1/QuestionBank';
      this.$http
        .post(url, this.form, {
          headers: {
            // "X-CSRF-TOKEN": CSRFTOKEN,
            Authorization: `Bearer ${localStorage.Jwt}`,
          },
        })
        .then((response) => {
          this.$router.push({
            name: 'faqset',
          });
        });
    },
    onEditorBlur(quill) {},
    onEditorFocus(quill) {},
    onEditorReady(quill) {},
    onEditorChange({ quill, html, text }) {
      this.form.content = html;
    },
    back() {
      this.$router.push({
        name: 'faqset',
      });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>