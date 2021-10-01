<template>
  <div>
    <el-form>
      <el-form-item>
        <label for="">類別</label>
        <el-input
          v-model="form.context"
          placeholder="請輸入類別名稱"
        ></el-input>
      </el-form-item>
      <div class="btn btn-primary mr-2" @click="submit">新增</div>
      <div class="btn btn-info" @click="back">返回</div>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {},
    };
  },
  created() {},
  methods: {
    submit() {
      let url = '/api/v1/Quecategory';
      let data = {
        ...this.form,
      };
      this.$http
        .post(url, data, {
          headers: {
            Authorization: `Bearer ${localStorage.Jwt}`,
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
        name: 'faqset',
      });
    },
  },
};
</script>