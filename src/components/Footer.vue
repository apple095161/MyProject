<template>
  <div>
    <footer class="footer">
      <div class="container" style="height: 100%">
        <div class="icon-area">
          <!-- <i class="fab fa-line"></i> -->
          <a
            href="https://page.line.me/igprice"
            target="_blank"
            title="速購家LINE@"
          >
            <img
              src="../assets/images/line_logo.svg"
              width="70"
              height="70"
              alt="速購家LINE@"
              class="mr-2"
            />
          </a>
          <a
            href="https://shopee.tw/shop/401092732/"
            target="_blank"
            title="速購家蝦皮賣場"
          >
            <img
              src="../assets/images/Shopee__logo.svg"
              width="70"
              height="70"
              alt="速購家蝦皮賣場"
          /></a>
          <a
            href="https://www.ruten.com.tw/store/598move/"
            target="_blank"
            title="速購家露天拍賣"
          >
            <img
              src="../assets/images/ruten.svg"
              width="60"
              height="60"
              alt="速購家露天拍賣"
          /></a>
        </div>
        <div class="detail">
          客服信箱：service@igprice.com <br />
          連絡電話：07-3592102<br />
          服務時間：週一 ~ 五 8:30~17:30，週六日、例假日休息 。
        </div>
        <div class="footer-logo">
          <img src="../assets/images/footer-logo.png" alt="" />
        </div>
        <div class="copy-right">
          <div class="text">
            Copyright © 2021 五九八資訊科技有限公司. All rights reserved.
          </div>
          <div class="link">
            <router-link :to="{ name: 'ServicePolicy' }" class="mr-2"
              >服務條款</router-link
            >
            <router-link :to="{ name: 'PrivacyPolicy' }"
              >隱私權政策</router-link
            >
          </div>
        </div>
      </div>
    </footer>
    <!-- <footer class="footer">
      <div class="container">
        <div class="row" style="justify-content: center">
          <div class="col-10" style="padding: 25px 0px 15px 0px">
            <div class="row">
              <div class="col-lg-4 col-md-4 footer-box">
                <div class="footer-left">
                  <span>聯繫我們</span>
                </div>
              </div>
              <div class="col-lg-7 col-md-8 footer-box">
                <div class="row" style="align-items: center">
                  <div
                    class="col-lg-6 col-6"
                    style="display: flex; align-items: center"
                  >
                    <div class="footer-middle">
                      <div class="footer-title">五九八資訊科技有限公司</div>
                      <div class="footer-des">
                        <a
                          href="https://page.line.me/igprice"
                          target="_blank"
                          class="mr-2 my-1"
                        >
                          <img
                            src="../assets/images/line2.png"
                            width="135px"
                            height="35px"
                            alt="LineID"
                            title="速購家"
                          />
                        </a>
                        <a
                          href="https://shopee.tw/shop/401092732/"
                          target="_blank"
                          class="my-1"
                          style="display: inline-block"
                        >
                          <img
                            src="../assets/images/Shopee_Taiwan_logo.svg"
                            width="50"
                            height="50"
                            alt="蝦皮賣場"
                            title="速購家蝦皮賣場"
                          />
                        </a>
                      </div>
                      <div class="footer-des">
                        客服信箱：<span>service@igprice.com</span>
                      </div>
                      <div class="footer-des">
                        服務時間：<span>週一 ~ 五</span>
                        8:30~17:30，週六日、例假日休息 。
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6 col-6">
                    <img
                      src="../assets/images/footer-logo.png"
                      alt=""
                      width="100%"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="copy-right text-center">
          Copyright © {{ getyear() }} 五九八資訊科技有限公司. All rights
          reserved.
          <router-link class="mr-1" :to="{ name: 'ServicePolicy' }"
            >服務條款</router-link
          >
          <router-link :to="{ name: 'PrivacyPolicy' }">隱私權政策</router-link>
        </div>
      </div>
    </footer>
    <div class="footer-img"></div> -->
  </div>
</template>
<script>
export default {
  props: {
    widthShow: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    getyear() {
      let data = new Date();
      return data.getFullYear();
    },
  },
};
</script>