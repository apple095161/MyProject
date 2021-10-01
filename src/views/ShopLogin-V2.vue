<template>
  <div>
    <Newheader></Newheader>
    <div class="bgs">
      <div class="logined">
        <div class="login-tab">
          <button
            class="tabs"
            :class="{ active: index == 1 }"
            @click="index = 1"
          >
            登入
          </button>
          <button
            class="tabs"
            :class="{ active: index == 2 }"
            @click="index = 2"
          >
            註冊
          </button>
        </div>
        <div class="logined-title" v-if="index == 1">IG LIFE商城登入</div>
        <div class="logined-title" v-else>IG LIFE商城註冊</div>
        <div class="body-form" v-if="index == 1">
          <div class="form-set">
            <label for="Email" class="form-label">Email*</label>
            <input
              type="text"
              class="form-input"
              placeholder="請輸入電子郵件"
              id="Email"
              v-model="loginForm.email"
            />
          </div>
          <div class="form-set">
            <label for="password" class="form-label">密碼*</label>
            <input
              type="password"
              class="form-input"
              placeholder="請輸入密碼"
              id="password"
              v-model="loginForm.password"
            />
          </div>
          <div class="btn-Group">
            <button class="btn-style" @click="login">登入</button>
          </div>
        </div>
        <div class="body-form" v-else>
          <div class="form-set">
            <label for="reg-name" class="form-label">使用者名稱*</label>
            <input
              type="text"
              class="form-input"
              placeholder="請輸入使用者名稱"
              v-model="form.usname"
              id="reg-name"
            />
          </div>
          <div class="form-set">
            <label for="reg-email" class="form-label">Email*</label>
            <input
              type="text"
              class="form-input"
              placeholder="請輸入電子郵件"
              v-model="form.email"
              id="reg-email"
            />
          </div>
          <div class="form-set">
            <label for="reg-password" class="form-label">密碼*</label>
            <input
              type="password"
              class="form-input"
              placeholder="請輸入密碼"
              v-model="form.password"
              id="reg-password"
            />
          </div>
          <div class="form-set">
            <label for="reg-comfirmpwd" class="form-label">確認密碼*</label>
            <input
              type="password"
              class="form-input"
              placeholder="請再次輸入密碼"
              v-model="form.confirmPassword"
              id="reg-comfirmpwd"
            />
          </div>
          <div class="btn-Group">
            <button class="btn-style" @click="register">註冊</button>
          </div>
        </div>
      </div>
    </div>
    <Newfooter></Newfooter>
  </div>
</template>
<script>
import Newheader from '../components/NewHeader';
import Newfooter from '../components/Footer';
export default {
  name: 'login',
  components: { Newheader, Newfooter },
  data() {
    return {
      index: 1,
      loginForm: {},
      form: {},
    };
  },
  watch: {
    index() {
      this.loginForm = {};
      this.form = {};
    },
  },
  methods: {
    login(key) {
      try {
        this.checkLoginForm();
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: `${error}`,
        });
        return;
      }
      let url = '/signin';
      let data = {
        ...this.loginForm,
      };
      const result = (response) => {
        if (response.data.isSuccess == true) {
          this.$message({
            message: '成功',
            type: 'success',
          });

          let base64Url = response.data.data.split('.')[1];
          let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          let userString = decodeURIComponent(escape(window.atob(base64)));
          // let userString = response.data.data.split('.')[1];
          localStorage.setItem('User', userString);
          localStorage.setItem('Jwt', response.data.data);
          this.$router.push({
            name: 'ShopPage',
            params: {
              data: userString,
            },
          });
        } else {
          this.$swal({
            icon: 'error',
            title: `帳號密碼錯誤`,
          });
        }
      };
      this.AxiosPost(url, data, result);
    },
    checkLoginForm() {
      if (!this.loginForm.email) {
        throw new Error('請輸入帳號');
      } else if (!this.loginForm.password) {
        throw new Error('請輸入密碼');
      }
    },
    register() {
      let url = '/register';
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
        });
        return;
      }
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
          let userString = decodeURIComponent(
            escape(window.atob(response.data.data.split('.')[1])),
          );
          localStorage.setItem('User', userString);
          localStorage.setItem('Jwt', response.data.data);
          this.$router.push({
            name: 'ShopPage',
            params: {
              data: userString,
            },
          });
        });
      });
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
        throw new Error('密碼與確認密碼不符，請重新輸入');
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
<style lang="scss" scoped>
.bgs {
  display: flex;
  position: relative;
  background: rgba(0, 0, 0, 0.2);
  height: 100vh;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  // background: url('../assets/images//bedroom-1.jpg') no-repeat;
  background-size: cover;
  background-position: center center;

  .logined {
    width: 400px;
    background: white;
    height: auto;
    margin: 30px;
    box-shadow: 0px 0px 10px 1px gray;
    .login-tab {
      width: 100%;
      .tabs {
        width: 50%;
        position: relative;
        display: inline-block;
        text-align: center;
        background: #d2d8d8;
        line-height: 72px;
        text-decoration: none;
        outline: none;
        border: none;
        color: #809191;
        font-weight: 700;
        font-size: 16px;
        cursor: pointer;
        &.active {
          background: white;
        }
      }
    }
    .logined-title {
      display: block;
      font-weight: 400;
      font-size: 18px;
      color: #888;
      line-height: 72px;
      text-align: center;
    }
    .body-form {
      width: 100%;
      .form-set {
        padding: 10px 15px;
        border-top: 1px solid #e5e5e5;
        border-bottom: 1px solid #e5e5e5;
        .form-label {
          display: block;
          width: 100%;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 700;
          font-size: 15px;
          line-height: 24px;
        }
        .form-input {
          width: 100%;
          background: transparent;
          border: none;
        }
        &:nth-child(n + 1) {
          border-top: none;
        }
      }
      .btn-Group {
        padding: 20px 15px;
        .btn-style {
          display: inline-block;
          width: 50%;
          background: #4caf50;
          color: white;
          line-height: 42px;
          text-align: center;
          outline: none;
          border: none;
          font-weight: 700;
          font-size: 18px;
        }
      }
    }
  }
}
</style>