<template>
  <div class="login-body">
    <div class="login loginPage" :class="{ active: FormType }">
      <div class="form">
        <h2>登入</h2>
        <div class="loginGroup">
          <label for="feedback-user">Email</label>
          <b-input
            v-model="loginForm.email"
            id="feedback-user"
            placeholder="請輸入Email"
          ></b-input>
          <!-- <b-form-valid-feedback :state="validation">
            Looks Good.
          </b-form-valid-feedback> -->
        </div>
        <!-- <div class="loginGroup">
          <label style="display: block" for="userID">Email:</label>
          <input
            type="email"
            id="userID"
            v-model="form.Email"
            placeholder="請輸入Email"
          />
        </div> -->
        <div class="loginGroup">
          <label for="password">密碼</label>
          <b-input
            v-model="loginForm.password"
            id="password"
            type="password"
            placeholder="請輸入密碼"
          ></b-input>
          <!-- <b-form-valid-feedback :state="validation">
            Looks Good.
          </b-form-valid-feedback> -->
        </div>
        <!-- <div class="loginGroup">
          <label for="password" style="display: block">密碼:</label>
          <input
            type="password"
            id="password"
            v-model="form.Password"
            placeholder="請輸入密碼"
          />
        </div> -->
        <div class="btn-broup">
          <button class="btn btn-primary mr-2" @click="login">登入</button>
          <button class="btn btn-info" @click="back">取消</button>
        </div>
        <div class="btn-style">
          <span class="mr-2">沒有帳號?</span>
          <span @click="FormType = false">申請帳號</span>
        </div>
      </div>
    </div>
    <div class="login register" :class="{ active: !FormType }">
      <div class="form">
        <h2>會員註冊</h2>
        <div class="loginGroup">
          <label for="feedback-user">使用者名稱</label>
          <b-input
            v-model="form.usname"
            placeholder="請輸入使用者名稱"
          ></b-input>
          <!-- <b-form-valid-feedback :state="validation">
            Looks Good.
          </b-form-valid-feedback> -->
        </div>
        <div class="loginGroup">
          <label for="RegisterAccount">Email</label>
          <b-input
            v-model="form.email"
            id="RegisterAccount"
            placeholder="請輸入Email"
          ></b-input>

          <!-- <b-form-invalid-feedback :state="validation">
            請輸入電子郵件   :state="validation"
          </b-form-invalid-feedback> -->
        </div>
        <!-- <div class="loginGroup">
          <label style="display: block" for="RegisterAccount">Email:</label>
          <input
            type="email"
            id="RegisterAccount"
            v-model="form.RegisterAccount"
            placeholder="請輸入Email"
          />
        </div> -->
        <div class="loginGroup">
          <label for="RegisterPassword" style="display: block">密碼:</label>
          <input
            type="password"
            id="RegisterPassword"
            v-model="form.password"
            placeholder="請輸入密碼"
          />
        </div>
        <div class="loginGroup">
          <label for="checkPassword" style="display: block">確認密碼:</label>
          <input
            type="password"
            id="checkPassword"
            v-model="form.confirmPassword"
            placeholder="請輸入密碼"
          />
        </div>
        <div class="btn-broup">
          <button class="btn btn-primary mr-2" @click="register">註冊</button>
        </div>
        <div class="btn-style">
          <span class="mr-2">已有帳號?</span>
          <span @click="FormType = true">登入</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    routeP: {
      type: String,
      defeult() {
        return '';
      },
    },
  },
  data() {
    return {
      FormType: true,
      loginForm: {},
      form: {},
    };
  },
  created() {
    // const vm = this;
    // vm.$store.dispatch("updateLoadgin", false);
  },
  computed: {
    validation() {
      return this.form.email.indexOf('@');
    },
  },
  methods: {
    login() {
      const url = '/signin';
      const form = this.loginForm;
      // let XCSRFTOKEN = escape(name);
      const getCookie = document.cookie.split(';');
      let CSRFTOKEN = '';
      getCookie.forEach((item, index, arr) => {
        if (item.indexOf('csrf-secure') !== -1) {
          CSRFTOKEN = item.split('csrf-secure=')[1];
        }
      });

      this.$http
        .post(url, form, {
          headers: {
            // RequestVerificationToken: "14a1347f412b39f",
            'X-CSRF-TOKEN': CSRFTOKEN,
          },
        })
        .then((response) => {
          this.$message({
            message: '成功',
            type: 'success',
          });
          const userString = decodeURIComponent(
            escape(window.atob(response.data.data.split('.')[1])),
          );

          if (JSON.parse(userString).roles == '1') {
            localStorage.setItem('User', userString);
            localStorage.setItem('Jwt', response.data.data);
            this.$router.push({
              name: 'ShopPage',
            });
          } else if (JSON.parse(userString).roles == '0') {
            localStorage.setItem('User', userString);
            localStorage.setItem('Jwt', response.data.data);
            this.$router.push({
              name: 'ShopPage',
            });
          } else if (JSON.parse(userString).roles == '5') {
            localStorage.setItem('User', userString);
            localStorage.setItem('Jwt', response.data.data);
            this.$router.push({
              name: 'ShopPage',
            });
          } else {
            localStorage.setItem('User', userString);
            localStorage.setItem('Jwt', response.data.data);
            this.$router.push({
              name: 'ShopPage',
            });
          }
          // localStorage.setItem("User", userString);
          // this.$router.push({
          //   name: "dashboard",
          //   params: {
          //     data: userString,
          //   },
          // });
        })
        .catch((error) => {
          // this.$message({
          //   message: "帳號或密碼錯誤",
          //   type: "warning",
          // });
        });
    },
    register() {
      const url = '/register';
      let data = {
        email: this.form.email,
        password: this.form.password,
        confirmPassword: this.form.confirmPassword,
        usname: this.form.usname,
      };
      try {
        this.checkFrom();
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: `${error}`,
          // text: "Something went wrong!",
        });
        return;
      }
      if (this.form.email.indexOf('@') == -1) {
      } else if (this.form.password !== this.form.confirmPassword) {
        this.$swal({
          icon: 'error',
          title: '密碼與確認密碼不符，請重新輸入',
          // text: "Something went wrong!",
        });
        return;
      } else {
        this.$http.post(url, data).then((response) => {
          this.$swal({
            icon: 'success',
            title: '註冊成功!自動跳轉...',
            showConfirmButton: false,
            timer: 1500,
          }).then((result) => {
            // let XCSRFTOKEN = escape(name);
            let getCookie = document.cookie.split(';');
            let CSRFTOKEN = '';
            getCookie.forEach((item, index, arr) => {
              if (item.indexOf('csrf-secure') !== -1) {
                CSRFTOKEN = item.split('csrf-secure=')[1];
              }
            });
            let base64Url = response.data.data.split('.')[1];
            let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            let userString = decodeURIComponent(escape(window.atob(base64)));
            // let userString = response.data.data.split('.')[1];
            if (JSON.parse(userString).roles == '1') {
              localStorage.setItem('User', userString);
              this.$router.push({
                name: 'ShopPage',
              });
            } else if (JSON.parse(userString).roles === '0') {
              localStorage.setItem('User', userString);
              localStorage.setItem('Jwt', response.data.data);
              this.$router.push({
                name: 'ShopPage',
                params: {
                  data: userString,
                },
              });
            } else {
              localStorage.setItem('User', userString);
              localStorage.setItem('Jwt', response.data.data);
              this.$router.push({
                name: 'ShopPage',
                params: {
                  data: userString,
                },
              });
            }
          });
        });
      }
    },
    checkFrom() {
      if (!this.form.usname) {
        throw new Error('請輸入使用者名稱');
      }
      if (!this.form.email) {
        throw new Error('請輸入電子郵件');
      }
      if (this.form.email.indexOf('@') == -1) {
        throw new Error('無效的電子郵件');
      }
      if (!this.form.password) {
        throw new Error('請輸入密碼');
      }
      if (!this.form.confirmPassword) {
        throw new Error('請輸入確認密碼');
      }

      if (this.form.password !== this.form.confirmPassword) {
        throw new Error('密碼與確認密碼不符，請重新輸入請重新輸入');
      }
    },
    testLogin() {
      this.$router.push({
        name: 'dashboard',
      });
    },
    back() {
      this.$router.push({
        name: 'home',
      });
    },
  },
};
</script>