<template>
  <div>
    <!-- <Newheader></Newheader> -->
    <div class="container pt-120">
      <div class="row User-lr-box">
        <div class="col-md-6 user-login" :class="{ 'md-l-sw': mdlsw }">
          <div class="form">
            <div class="title">會員登入</div>
            <div class="form-body-group">
              <label for="email" class="form-label">
                <div class="mx-2 py-2">信箱</div>
                <input
                  type="email"
                  class="form-input"
                  id="email"
                  placeholder="電子信箱"
                  v-model="loginForm.email"
                  autocomplete="off"
                />
              </label>
              <label for="password" class="form-label">
                <div class="mx-2 py-2">密碼</div>
                <input
                  type="password"
                  class="form-input"
                  id="password"
                  placeholder="密碼"
                  v-model="loginForm.password"
                />
              </label>
              <div class="checkbox-ctrl">
                <label for="keep-login" class="form-checkbox-label mb-0">
                  <input
                    type="checkbox"
                    id="keep-login"
                    class="form-checkbox mr-2"
                  />
                  <span class="keep-login">記住我</span>
                </label>
                <router-link
                  class="forgot-password ml-3"
                  :to="{ name: 'forgetPassword' }"
                  >忘記密碼？</router-link
                >
              </div>
              <div class="sw-control">
                <a class="sw-btn" @click.prevent="changeForm('noA')"
                  >沒有帳號？註冊</a
                >
              </div>
              <div class="form-login-btn">
                <button class="button" @click="login">登入</button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 user-regster" :class="{ 'md-r-sw': mdrsw }">
          <div class="form">
            <div class="title">會員註冊</div>
            <div class="form-body-group">
              <label for="usname" class="form-label">
                <div class="mx-2 py-2">使用者名稱</div>
                <input
                  type="text"
                  class="form-input"
                  id="usname"
                  placeholder="使用者名稱"
                  autocomplete="off"
                  v-model="registerForm.usname"
                />
              </label>
              <label for="email" class="form-label">
                <div class="mx-2 py-2">信箱</div>
                <input
                  type="email"
                  class="form-input"
                  id="email"
                  placeholder="電子信箱"
                  autocomplete="off"
                  v-model="registerForm.email"
                />
              </label>
              <label for="password" class="form-label">
                <div class="mx-2 py-2">密碼</div>
                <input
                  type="password"
                  class="form-input"
                  id="password"
                  placeholder="密碼"
                  v-model="registerForm.password"
                />
              </label>
              <label for="checkpassword" class="form-label">
                <div class="mx-2 py-2">再次輸入密碼</div>
                <input
                  type="password"
                  class="form-input"
                  id="confirmPassword"
                  placeholder="再次輸入密碼"
                  v-model="registerForm.confirmPassword"
                />
              </label>
              <!-- <label for="receive" class="form-checkbox-label">
                <input
                  type="checkbox"
                  id="receive"
                  class="form-checkbox mr-2"
                  v-model="registerForm.reveicePaper"
                />
                <span class="keep-login">我願意收到最新優惠情報</span>
              </label> -->
              <div style="padding: 10px 0px">
                <strong style="color: #a88754; letter-spacing: 3px"
                  >點擊註冊代表您同意會員服務條款與隱私權政策</strong
                >
              </div>
              <div class="sw-control">
                <a class="sw-btn" @click.prevent="changeForm('hasA')"
                  >已有帳號？登入</a
                >
              </div>
              <div class="form-register-btn">
                <button class="button" @click="register">註冊</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <Newfooter></Newfooter> -->
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
      loginForm: {},
      registerForm: {
        confirmPassword: '',
        email: '',
        password: '',
        usname: '',
      },
      mdlsw: true,
      mdrsw: false,
    };
  },
  // metaInfo: {
  //   title: 'abaac',
  // },
  methods: {
    changeForm(key) {
      if (key == 'noA') {
        this.mdlsw = false;
        this.mdrsw = true;
        window.scrollTo(0, 0);
      } else {
        this.mdlsw = true;
        this.mdrsw = false;
        window.scrollTo(0, 0);
      }
    },
    login(key) {
      const vm = this;
      try {
        this.checkLoginForm();
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: `${error}`,
        });
        return;
      }
      const loading = vm.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      let url = '/signin';
      let data = {
        ...this.loginForm,
      };
      const result = (response) => {
        if (response.data.isSuccess == true) {
          loading.close();
          this.$message({
            message: '成功',
            type: 'success',
          });

          let base64Url = response.data.data.split('.')[1];
          let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          let userString = decodeURIComponent(escape(window.atob(base64)));
          let urserData = JSON.parse(userString);
          // let userString = response.data.data.split('.')[1];
          if (urserData.roles == '0') {
            localStorage.setItem('User', userString);
            localStorage.setItem('Jwt', response.data.data);
            this.$router.push({
              name: 'dashboard',
              params: {
                data: userString,
              },
            });
          } else {
            localStorage.setItem('User', userString);
            localStorage.setItem('Jwt', response.data.data);
            this.$router.push({
              name: 'home',
            });
          }
        } else {
          loading.close();
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
      } else if (this.loginForm.email.indexOf('@') == -1) {
        throw new Error('電子郵件格式錯誤');
      } else if (!this.loginForm.password) {
        throw new Error('請輸入密碼');
      }
    },
    register() {
      const vm = this;
      let url = '/register';
      let data = {
        ...this.registerForm,
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
      const loading = vm.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      const result = (response) => {
        loading.close();
        this.$swal({
          icon: 'success',
          title: '註冊成功！',
          text: '已發送驗證信件至您的E-MAIL請於24小時內進行驗證。',
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          this.registerForm.confirmPassword = '';
          this.registerForm.email = '';
          this.registerForm.password = '';
          this.registerForm.usname = '';
        });
      };
      this.AxiosPost(url, data, result);
    },
    checkFrom() {
      if (!this.registerForm.usname) {
        throw new Error('請輸入使用者名稱');
      }
      if (!this.registerForm.email) {
        throw new Error('請輸入電子郵件');
      }
      if (this.registerForm.email.indexOf('@') == -1) {
        throw new Error('無效的電子郵件');
      }
      if (!this.registerForm.password) {
        throw new Error('請輸入密碼');
      }
      if (!this.registerForm.confirmPassword) {
        throw new Error('請輸入確認密碼');
      }
      if (this.registerForm.password !== this.registerForm.confirmPassword) {
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
.User-lr-box {
  padding: 30px 10px;
  min-height: calc(100vh - 520px);
  align-items: center;
  .user-login {
    position: relative;
    // padding-left: 0;

    .form {
      min-height: 350px;
      border: 2px solid #a88754;
      .title {
        color: #ffffff;
        background: #a88754;
        text-align: center;
        padding: 10px 0px;
        font-size: 20px;
        letter-spacing: 5px;
      }
      .form-body-group {
        padding: 30px 55px;
        .form-label {
          display: block;
          position: relative;
          color: #a88754;
          input {
            border: 2px solid #a88754;
            &::placeholder {
              color: #a88754;
              font-size: 18px;
            }
          }
        }
        .form-checkbox-label {
          input {
            position: relative;
            width: 20px;
            height: 20px;
            &:checked::before {
              position: absolute;
              content: '';
              width: 20px;
              height: 20px;
              background: #a88754;
            }
            &:checked::after {
              color: #ffffff;
              position: absolute;
              font-weight: 700;
              content: '\2714';
              padding: 0px 0px 0px 4px;
            }
          }
          .keep-login {
            display: inline-block;
            vertical-align: top;
          }
        }
        .form-input {
          padding: 7px;
          width: 100%;
          outline: none;
          font-size: 18px;
        }
        .form-login-btn {
          text-align: center;
          padding: 15px 0px;
          button {
            padding: 10px 0px;
            width: 100%;
            font-size: 18px;
            background-image: linear-gradient(180deg, #a88754 50%, #b89368 51%);
            color: #fff;
            outline: none;
            border: none;
            letter-spacing: 5px;
          }
        }
        .checkbox-ctrl {
          display: flex;
          justify-content: space-between;
          padding: 10px 0px;
          label {
            color: #a88754;
          }
          .forgot-password {
            text-decoration: none;
            color: #a88754;
            cursor: pointer;
            &:hover {
              color: royalblue;
            }
          }
        }
      }
    }
    .sw-control {
      display: none;
    }
  }
  .user-regster {
    // padding-right: 0;
    min-height: calc(100vh - 520px);
    align-items: center;
    .form {
      min-height: 420px;
      min-height: 350px;
      border: 2px solid #a88754;
      .title {
        color: #ffffff;
        background: #a88754;
        text-align: center;
        padding: 10px 0px;
        font-size: 20px;
        letter-spacing: 5px;
      }
      .form-body-group {
        padding: 30px 55px;
        .form-label {
          display: block;
          position: relative;
          color: #a88754;
          input {
            border: 2px solid #a88754;
            &::placeholder {
              color: #a88754;
              font-size: 18px;
            }
          }
        }
        .form-checkbox-label {
          input {
            position: relative;
            width: 20px;
            height: 20px;
            &:checked::before {
              position: absolute;
              content: '';
              width: 20px;
              height: 20px;
              background: #ffdf88;
            }
            &:checked::after {
              color: black;
              position: absolute;
              content: '\2714';
              padding: 0px 0px 0px 4px;
            }
          }
          .keep-login {
            display: inline-block;
            vertical-align: top;
          }
        }
        .form-input {
          padding: 7px;
          width: 100%;
          outline: none;
          font-size: 18px;
        }
        .form-register-btn {
          text-align: center;
          padding: 15px 0px;
          button {
            padding: 10px 0px;
            width: 100%;
            font-size: 18px;
            background-image: linear-gradient(180deg, #a88754 50%, #b89368 51%);
            color: #fff;
            outline: none;
            border: none;
            letter-spacing: 5px;
          }
        }
      }
    }

    .sw-control {
      display: none;
    }
  }
}
@media (max-width: 991px) {
  .User-lr-box {
    .user-login {
      .form {
        padding: 0;
        .form-body-group {
          padding: 30px 10px;
        }
      }
    }
    .user-regster {
      .form {
        padding: 0;
        .form-body-group {
          padding: 30px 10px;
        }
      }
    }
  }
}
@media (max-width: 767px) {
  .User-lr-box {
    .user-login {
      display: none;
      &::after {
        display: none;
      }
      &.md-l-sw {
        display: block;
      }
      .sw-control {
        display: block;
        .sw-btn {
          // color: #a88754;
          cursor: pointer;
          &:hover {
            color: royalblue;
          }
        }
      }
    }
    .user-regster {
      display: none;
      // .form {
      //   padding: 30px 20px;
      // }
      &.md-r-sw {
        display: block;
      }
      .sw-control {
        display: block;
        .sw-btn {
          cursor: pointer;
        }
      }
    }
  }
}
</style>