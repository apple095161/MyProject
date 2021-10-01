<template>
  <div>
    <div class="container" style="padding-top:160px;">
      <div class="row User-lr-box">
        <div class="col-6 user-login">
          <div class="form">
            <div class="title">會員登入</div>
            <!-- <div class="Email">
              信箱
              <label for="" class="form-label">
                <i class="fas fa-envelope-open icons"></i>
                <input type="text" class="form-input" placeholder="電子信箱" />
              </label>
            </div> -->
            <label for="email" class="form-label">
              <i class="fas fa-envelope-open icons"></i>
              <input
                type="text"
                class="form-input"
                id="email"
                placeholder="電子信箱"
              />
            </label>
            <label for="password" class="form-label">
              <i class="fas fa-key icons"></i>
              <input
                type="text"
                class="form-input"
                id="password"
                placeholder="密碼"
              />
            </label>
            <label for="keep-login" class="form-checkbox-label">
              <input
                type="checkbox"
                id="keep-login"
                class="form-checkbox mr-2"
              />
              <span class="keep-login">記住我</span>
            </label>
            <div class="form-login-btn">
              <button class="button">登入</button>
            </div>
          </div>
        </div>
        <div class="col-6 regster-login">
          <div class="form">
            <div class="title">會員註冊</div>
            <!-- <div class="Email">
              信箱
              <label for="" class="form-label">
                <i class="fas fa-envelope-open icons"></i>
                <input type="text" class="form-input" placeholder="電子信箱" />
              </label>
            </div> -->
            <label for="email" class="form-label">
              <i class="fas fa-envelope-open icons"></i>
              <input
                type="text"
                class="form-input"
                id="email"
                placeholder="電子信箱"
              />
            </label>
            <label for="password" class="form-label">
              <i class="fas fa-key icons"></i>
              <input
                type="text"
                class="form-input"
                id="password"
                placeholder="最少6碼最多20碼"
              />
            </label>
            <label for="checkpassword" class="form-label">
              <i class="fas fa-key icons"></i>
              <input
                type="text"
                class="form-input"
                id="checkpassword"
                placeholder="最少6碼最多20碼"
              />
            </label>
            <label for="receive" class="form-checkbox-label">
              <input type="checkbox" id="receive" class="form-checkbox mr-2" />
              <span class="receive">我願意收到最新優惠情報</span>
            </label>
            <div>點擊註冊代表您同意會員服務條款與隱私權政策</div>
            <div class="form-login-btn">
              <button class="button">註冊</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    this.test();
  },
  methods: {
    test() {},
  },
};
</script>

<style lang="scss" scoped>
.User-lr-box {
  padding: 30px 10px;
  .user-login {
    padding-right: 0;
    .title {
      text-align: center;
    }
    .form {
      min-height: 420px;
      padding: 30px 55px;
      background: #3f5d45;
      .title {
        color: #eaf0ed;
        font-size: 20px;
        padding: 15px;
      }
      .form-label {
        display: block;
        position: relative;
      }
      .form-checkbox-label {
        color: #eaf0ed;
        input {
          position: relative;
          width: 20px;
          height: 20px;
          &:checked::before {
            position: absolute;
            content: '';
            width: 20px;
            height: 20px;
            background: #eaf0ed;
          }
          &:checked::after {
            color: green;
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
        padding: 15px 15px 15px 35px;
        width: 100%;
        background: #eaf0ed;
        outline: none;
        font-size: 18px;
      }
      .icons {
        position: absolute;
        left: 9px;
        top: 18px;
        font-size: 22px;
        color: #3f5d45;
      }
      .form-login-btn {
        button {
          padding: 6px 25px;
          background: #eaf0ed;
          border-radius: 5px;
          outline: none;
          border: none;
        }
      }
    }
  }
  .regster-login {
    padding-left: 0;
    .title {
      text-align: center;
    }
    .form {
      padding: 20px 55px;
      margin-top: 10px;
      margin-bottom: 10px;
      background: #eaf0ed;
      .title {
        color: #8da291;
        font-size: 30px;
        padding: 15px;
      }
      .form-label {
        display: block;
        position: relative;
      }
      .form-checkbox-label {
        color: #8da291;
        input {
          position: relative;
          width: 20px;
          height: 20px;
          &:checked::before {
            position: absolute;
            content: '';
            width: 20px;
            height: 20px;
            background: white;
          }
          &:checked::after {
            color: #3f5d45;
            position: absolute;
            content: '\2714';
            padding: 0px 0px 0px 4px;
          }
        }
        .receive {
          display: inline-block;
          vertical-align: top;
        }
      }
      .form-input {
        padding: 15px 15px 15px 35px;
        width: 100%;
        background: #ffffff;
        outline: none;
        font-size: 18px;
        border: #8da291;
      }
      .icons {
        position: absolute;
        left: 9px;
        top: 18px;
        font-size: 22px;
        color: #3f5d45;
      }
      .form-login-btn {
        button {
          padding: 6px 25px;
          background: #8da291;
          border-radius: 5px;
          outline: none;
          border: #eaf0ed;
          color: white;
        }
      }
    }
  }
}
</style>