<template>
  <div>
    <div class="reset-box pt-120">
      <div class="reset-item">
        <div class="form-item">
          <label for="">新密碼</label>
          <input type="password" placeholder="輸入新密碼" v-model="NewPswd" />
          <div class="form-item">
            <label for="">確認新密碼</label>
            <input
              type="password"
              placeholder="輸入確認新密碼"
              v-model="ConfNewPswd"
            />
          </div>
          <button class="btn btn-outline-primary" @click="submit">送出</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Newheader from '../components/NewHeader';
import Newfooter from '../components/Footer';
export default {
  components: { Newheader, Newfooter },
  data() {
    return {
      refId: '',
      token: '',
      allStr: `refid=${this.$route.query.refid}` || '',
      keys: {},
      NewPswd: '',
      ConfNewPswd: '',
    };
  },
  created() {
    this.resets();
  },
  methods: {
    resets() {
      const vm = this;
      let key = this.allStr;
      const getCookie = document.cookie.split(';');
      let CSRFTOKEN = '';
      getCookie.forEach((item) => {
        if (item.indexOf('csrf-secure') !== -1) {
          CSRFTOKEN = item.split('csrf-secure=')[1];
        }
      });
      let refid = key.split('refid=')[1].split('?token')[0];
      let token = key.split('token=')[1];
      let url = `/api/v1/Account/Verify/reset`;
      this.$swal({
        title: '驗證中...',
        type: 'info',
        allowOutsideClick: false,
        showConfirmButton: false,
        timer: 2000,
      }).then(function () {
        let form = new FormData();
        form.append('refid', refid);
        form.append('token', token);
        vm.$http
          .post(url, form, {
            headers: {
              'X-CSRF-TOKEN': CSRFTOKEN,
            },
          })
          .then((response) => {
            if (response.data.isSuccess) {
              vm.$swal({
                title: '驗證成功！自動跳轉．．．',
                type: 'success',
                allowOutsideClick: false,
                showConfirmButton: true,
                confirmButtonText: '手動跳轉',
                timer: 2000,
              }).then(function () {
                vm.keys = response.data.data.refId;
              });
            } else if (!response.data.isSuccess) {
              vm.$swal({
                icon: 'error',
                title: '驗證失敗！請重新驗證Eamil',
                input: 'email',
                showCancelButton: true,
                closeOnConfirm: false,
                allowOutsideClick: false,
                confirmButtonText: '送出',
                animation: 'slide-from-top',
                inputPlaceholder: '請輸入Email',
              }).then(function (e) {
                if (e.isConfirmed == false) {
                  vm.$swal({
                    icon: 'warning',
                    title: `已取消驗證！！`,
                  });
                  vm.$router.push({
                    name: 'home',
                  });
                } else if (e.isConfirmed == true) {
                  let url = '/forget';
                  let form = new FormData();
                  form.append('usemail', e.value);
                  vm.$swal({
                    title: '發送信件中..請稍後',
                    type: 'success',
                    allowOutsideClick: false,
                    showConfirmButton: false,
                  });
                  vm.$http
                    .post(url, form, {
                      headers: {
                        'X-CSRF-TOKEN': CSRFTOKEN,
                      },
                    })
                    .then((response) => {
                      vm.$swal({
                        icon: 'success',
                        title: `發送成功！！`,
                        text:
                          '已發送驗證信件至您的E-MAIL請於24小時內進行驗證。',
                      });
                      vm.$router.push({
                        name: 'home',
                      });
                    });
                }
              });
            }
          });
      });
    },
    forgetPwd() {
      let url = '/forget';
      let form = new FormData();
      form.append('usemail', e.value);
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      this.$http.post(url, form).then((response) => {
        loading.close();
        this.$swal({
          icon: 'success',
          title: `發送成功！！`,
          text: '已發送驗證信件至您的E-MAIL請於24小時內進行驗證。',
        });
        this.$router.push({
          name: 'home',
        });
      });
    },
    submit() {
      const vm = this;
      vm.$swal({
        title: '發送中..請稍後',
        type: 'info',
        allowOutsideClick: false,
        showConfirmButton: false,
      });
      let url = '/cgpswd';
      let form = new FormData();
      const getCookie = document.cookie.split(';');
      let CSRFTOKEN = '';
      getCookie.forEach((item) => {
        if (item.indexOf('csrf-secure') !== -1) {
          CSRFTOKEN = item.split('csrf-secure=')[1];
        }
      });
      form.append('RefId', this.keys);
      form.append('NewPswd', this.NewPswd);
      form.append('ConfNewPswd', this.ConfNewPswd);
      this.$http
        .post(url, form, {
          headers: {
            'X-CSRF-TOKEN': CSRFTOKEN,
          },
        })
        .then((response) => {
          if (response.data.isSuccess) {
            vm.$swal({
              title: '修改成功！自動跳轉．．．',
              type: 'success',
              allowOutsideClick: false,
              showConfirmButton: true,
              confirmButtonText: '手動跳轉',
              timer: 1500,
            }).then(function () {
              vm.$router.push({
                name: 'home',
              });
            });
          }
        });
    },
  },
};
</script>

<style lang="scss">
.reset-box {
  position: relative;
  padding-top: 120px;
  height: 605px;
  .reset-item {
    position: absolute;
    width: 40%;
    left: 50%;
    top: 50%;
    margin-top: 60px;
    padding: 30px 50px;
    border: 2px solid #d0d0d0;
    transform: translate(-50%, -50%);
    .form-item {
      label {
        margin: 10px 0px;
        font-size: 25px;
        font-weight: bold;
      }
      input {
        width: 100%;
        padding: 15px;
        border: 2px solid black;
      }
      button {
        font-size: 22px;
        margin: 15px 0px;
      }
    }
  }
}
@media (max-width: 991px) {
  .reset-box {
    .reset-item {
      width: 75%;
    }
  }
}
</style>