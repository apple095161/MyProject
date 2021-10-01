<template>
  <div>
    <div class="bg-deg pt-120">
      <div class="box1">
        <img class="circle" src="../assets/images/circle.png" alt="" />
      </div>
      <img class="page1" src="../assets/images/owl-18.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      refId: '',
      token: '',
      allStr: `refid=${this.$route.query.refid}` || '',
    };
  },
  created() {
    // this.$router.push({
    //   name: 'verify',
    //   query: {
    //     refId: key.split('refid=')[1],
    //     token: key.split('token=')[1],
    //   },
    // });
    // let str = `refid=${this.$route.query.refid}`;
    // this.allstr = str;
    this.registerVerity();
  },
  mounted() {},
  methods: {
    registerVerity() {
      const vm = this;
      let key = this.allStr;
      let refid = key.split('refid=')[1].split('?token')[0];
      let token = key.split('token=')[1];
      let url = `/api/v1/Account/Verify`;
      const getCookie = document.cookie.split(';');
      let CSRFTOKEN = '';
      getCookie.forEach((item) => {
        if (item.indexOf('csrf-secure') !== -1) {
          CSRFTOKEN = item.split('csrf-secure=')[1];
        }
      });
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
            if (response.data.data == '1') {
              vm.$swal({
                title: '驗證成功！自動導頁...',
                type: 'success',
                allowOutsideClick: false,
                showConfirmButton: true,
                confirmButtonText: '回首頁',
                timer: 2000,
              }).then(function () {
                vm.$router.push({
                  name: 'home',
                });
              });
            } else if (response.data.data == '0') {
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
                  let url = '/regresend';
                  let form = new FormData();
                  form.append('usemail', e.value);
                  vm.$http.post(url, form).then((response) => {
                    vm.$swal({
                      icon: 'success',
                      title: `發送成功！！`,
                      text: '已發送驗證信件至您的E-MAIL請於24小時內進行驗證。',
                      confirmButtonText: 'OK',
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
    modifyPassword() {},
  },
};
</script>

<style lang="scss">
.bg-deg {
  height: 700px;
  text-align: center;
  position: relative;
  .box1 {
    position: absolute;
    left: 50%;
    top: 56%;
    transform: translate(-50%, -50%);
    .circle {
      max-width: 100%;
      animation: deggs 1s reverse infinite linear;
    }
  }

  .page1 {
    position: absolute;
    left: 50%;
    top: 55%;
    transform: translate(-50%, -50%);
    max-width: 45%;
  }
  img {
  }
}
@keyframes deggs {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>