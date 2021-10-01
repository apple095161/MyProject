<template>
  <div class="forget-box">
    <div class="forget-item">
      <div class="form-item">
        <h3 class="form-title">重置密碼</h3>
        <label for="forgetEmail">E-mail</label>
        <input
          type="email"
          id="forgetEmail"
          placeholder="輸入Email"
          v-model="usemail"
        />
        <button class="btn btn-outline-info" @click="submit">送出</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usemail: '',
    };
  },
  methods: {
    submit() {
      const vm = this;
      try {
        this.checkFrom();
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: `${error}`,
        });
        return;
      }
      vm.$swal({
        title: '發送中..請稍後',
        type: 'info',
        allowOutsideClick: false,
        showConfirmButton: false,
      });
      const getCookie = document.cookie.split(';');
      let CSRFTOKEN = '';
      getCookie.forEach((item) => {
        if (item.indexOf('csrf-secure') !== -1) {
          CSRFTOKEN = item.split('csrf-secure=')[1];
        }
      });
      let url = '/forget';
      let form = new FormData();
      form.append('usemail', this.usemail);
      this.$http
        .post(url, form, {
          headers: {
            'X-CSRF-TOKEN': CSRFTOKEN,
          },
        })
        .then((response) => {
          if (response.data.isSuccess) {
            vm.$swal({
              icon: 'success',
              title: `發送成功！！`,
              text: '已發送驗證信件至您的E-MAIL請於24小時內進行驗證。',
              timer: 1500,
            });
            vm.$router.push({
              name: 'login',
            });
          } else {
            vm.$swal({
              icon: 'error',
              title: `發送失敗！！請重新填寫Email`,
            });
          }
        });
    },
    checkFrom() {
      if (!this.usemail) {
        throw new Error('請輸入Email');
      }
      if (this.usemail.indexOf('@') == -1) {
        throw new Error('無效的電子郵件');
      }
    },
  },
};
</script>

<style lang="scss">
.forget-box {
  position: relative;
  height: 605px;
  .forget-item {
    position: absolute;
    width: 40%;
    left: 50%;
    top: 50%;
    padding: 30px 50px;
    margin-top: 50px;
    border: 2px solid #d0d0d0;
    transform: translate(-50%, -50%);
    .form-item {
      .form-title {
        text-align: center;
        font-weight: bold;
      }
      label {
        margin: 10px 0px;
        font-size: 25px;
        font-weight: bold;
      }
      input {
        width: 100%;
        padding: 15px;
        border: 1px solid black;
      }
      button {
        font-size: 22px;
        margin: 15px 0px;
      }
    }
  }
}
@media (max-width: 991px) {
  .forget-box {
    .forget-item {
      width: 75%;
    }
  }
}
</style>