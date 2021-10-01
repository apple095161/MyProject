<template>
  <div>
    <div
      class="wrap"
      :class="{ 'sidebar-open': toggled, clickshow: slidershow }"
    >
      <Slidebar v-if="!loginForm"></Slidebar>
      <div class="main-panel">
        <div class="slider-ctrl">
          <div class="icon-box" @click="slidershow = !slidershow">
            <i class="fad fa-frog"></i>
          </div>
        </div>
        <div class="md-toolbar">
          <div class="md-toolbar-row">
            <div class="md-toolbar-section-start">
              <h3 class="md-title">{{ contentTitle }}</h3>
            </div>
            <div class="md-toolbar-section-end">
              <!-- <div class="md-list-item-content">
                <span
                  @click="showMenu"
                  tabindex="0"
                  class="icon-style"
                  style="
                    cursor: pointer !important;
                    font-size: 20px;
                    outline: none;
                  "
                >
                  <i class="fas fa-user"></i>
                </span>
                <ul
                  class="dropdown-menu dropdown-menu-right dropdown-navbar"
                  id="dshUserList"
                  :class="{ show: menuShow }"
                >
                  <li class="nav-link">
                    <span href class="dropdown-item" style="cursor: pointer">{{
                      role.family_name
                    }}</span>
                  </li>
                  <div class="dropdown-divider"></div>
                  <li class="nav-link">
                    <span
                      href
                      class="dropdown-item"
                      style="cursor: pointer"
                      @click="goHome"
                      >返回首頁</span
                    >
                  </li>
                  <li class="nav-link">
                    <span
                      class="dropdown-item"
                      @click="logout"
                      style="cursor: pointer"
                      >登出</span
                    >
                  </li>
                </ul>
              </div> -->
              <button
                class="md-button md-just-icon"
                @click="toggle"
                :class="{ toggled: toggled }"
              >
                <div class="md-ripple">
                  <div class="md-button-content">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div class="md-body-content" style="background: #eee">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <el-dialog
      title="登入時效過期，請重新登入"
      :visible.sync="loginForm"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      :center="true"
    >
      <el-form :model="form">
        <el-form-item label="帳號">
          <el-input v-model="form.email" @keyup.enter.native="login"></el-input>
        </el-form-item>
        <el-form-item label="密碼">
          <el-input
            v-model="form.password"
            show-password
            @keyup.enter.native="login"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="login">登入</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Slidebar from '../components/NewSidebar';
export default {
  components: {
    Slidebar,
  },
  data() {
    return {
      toggled: false,
      menuShow: false,
      role: localStorage.User ? JSON.parse(localStorage.User) : [],
      contentTitle: '',
      form: {},
      slidershow: false,
    };
  },
  watch: {
    $route(to, from) {
      this.$nextTick(() => {
        this.contentTitle = to.meta.title || '';
      });
    },
  },
  computed: {
    loginForm() {
      return this.$store.state.isLoading;
    },
  },

  created() {
    if (!localStorage.User) {
      this.$store.dispatch('updateLoadgin', true);
    } else {
      if (JSON.parse(localStorage.User).roles == '0') {
        this.$store.dispatch('updateLoadgin', false);
      } else {
        this.$store.dispatch('updateLoadgin', true);
      }
    }
    const vm = this;
    document.addEventListener('click', function (e) {
      if (e.target.className == 'fas fa-user') {
        vm.menuShow = true;
      } else if (
        e.target.className !== 'nav-link' &&
        e.target.className !== 'dropdown-item'
      ) {
        vm.menuShow = false;
      }
    });
  },
  mounted() {
    const vm = this;
    this.$nextTick(() => {
      this.contentTitle = this.$route.meta.title || '';
    });
    window.addEventListener('resize', function (e) {
      vm.slidershow = false;
    });
  },
  methods: {
    toggle() {
      this.toggled = !this.toggled;
    },
    showMenu() {
      this.menuShow = !this.menuShow;
    },
    blur() {
      this.menuShow = false;
    },
    logout() {
      localStorage.removeItem('User');
      localStorage.removeItem('Jwt');
      this.$router.push({
        name: 'home',
      });
    },
    goHome() {
      this.$router.push({
        name: 'home',
      });
    },
    getData() {},
    checkForm() {
      if (!this.form.email) {
        throw new Error('請輸入帳號');
      } else if (!this.form.password) {
        throw new Error('請輸入密碼');
      }
    },
    login() {
      try {
        this.checkForm();
      } catch (error) {
        this.$message.closeAll();
        this.$message({
          message: `${error}`,
          type: 'error',
        });
        return;
      }
      let url = '/signin';
      let data = {
        ...this.form,
      };
      const result = (response) => {
        if (response.data.isSuccess == true) {
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
          if (JSON.parse(userString).roles == '0') {
            localStorage.setItem('User', userString);
            localStorage.setItem('Jwt', response.data.data);
            this.$store.dispatch('updateLoadgin', false);
            window.location.reload();
          } else {
            localStorage.setItem('User', userString);
            localStorage.setItem('Jwt', response.data.data);
            this.$store.dispatch('updateLoadgin', false);
            this.$router.push({
              name: 'home',
              params: {
                data: userString,
              },
            });
          }
        } else {
          this.$message.closeAll();
          this.$message({
            message: '帳號密碼錯誤',
            type: 'error',
          });
        }
      };
      this.AxiosPost(url, data, result);
    },
  },
};
</script>