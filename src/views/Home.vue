<template>
  <div>
    <cookie-law theme="dark-lime" buttonText="同意並關閉">
      <div slot="message">
        本網站使用cookies於廣告、社群與分析等用途，藉以增進您的使用體驗，繼續使用本網站即代表您同意使用cookies，請參閱我們的
        <router-link :to="{ name: 'cookie' }">cookie聲明</router-link>
      </div></cookie-law
    >
    <!-- <Newheader></Newheader> -->
    <div class="banner">
      <slider :height="height" v-show="!clientWidth">
        <slider-item>
          <img
            src="../assets/images/banner-1.jpg"
            width="100%"
            :height="clientHeightSet"
            alt="速購家搬家紙箱、耗材這裡都買的到"
          />
          <!-- <img src="../assets/images/banner-1.jpg" :width="clientWidthSet" :height="clientHeightSet" /> -->
        </slider-item>
        <slider-item>
          <img
            src="../assets/images/banner-2.jpg"
            width="100%"
            :height="clientHeightSet"
            alt="速購家搬家紙箱、耗材這裡都買的到"
          />
          <!-- <img src="../assets/images/banner-1.jpg" :width="clientWidthSet" :height="clientHeightSet" /> -->
        </slider-item>
      </slider>
      <slider :height="MobileclientHeightSet" v-show="clientWidth">
        <slider-item>
          <img
            src="../assets/images/mobile-banner-1.jpg"
            width="100%"
            :height="MobileclientHeightSet"
            alt="速購家搬家紙箱、耗材這裡都買的到"
          />
        </slider-item>
        <slider-item>
          <img
            src="../assets/images/mobile-banner-2.jpg"
            width="100%"
            :height="MobileclientHeightSet"
            alt="速購家搬家紙箱、耗材這裡都買的到"
          />
        </slider-item>
      </slider>
    </div>
    <div class="container news">
      <h2 class="news-title">最新消息</h2>
      <div class="news-content">
        <carousel
          :perPage="1"
          :navigationEnabled="true"
          :paginationEnabled="true"
          :mouse-drag="true"
          :touch-drag="true"
          :autoplay="true"
          :autoplayHoverPause="true"
          :autoplayTimeout="3000"
          :loop="true"
          class="news-carousel-menu"
        >
          <slide class="news-carousel-item">
            <img src="../assets/images/news.jpg" width="100%" alt="最新消息" />
          </slide>
          <slide class="news-carousel-item">
            <img src="../assets/images/news1.jpg" width="100%" alt="最新消息" />
          </slide>
          <slide class="news-carousel-item">
            <img src="../assets/images/news2.jpg" width="100%" alt="最新消息" />
          </slide>
        </carousel>
      </div>
    </div>
    <div class="content">
      <div class="outside-box">
        <div class="description1" :class="{ fadeIn: fadeIn }">
          <div class="img-box">
            <h2 class="img-title">搬家如何打包</h2>
            <img src="../assets/images/des1.jpg" alt="搬家如何打包" />
          </div>
          <div class="text">
            <div class="text-title">大部分人會苦惱的問題</div>
            <div class="text-content">
              <h2 class="text-main-title">搬家如何打包</h2>
              <h3 class="text-sub-title">大部分人會苦惱的問題</h3>
              首先，你要找到適合的工具，讓自己省時省力。
              在過程中，你需要整理，將雜亂的物件用紙箱收納起來，然後在搬家當天請搬家公司或你自己裝載上車，搬運到新址。
            </div>
          </div>
          <!-- <div class="row">
          <div class="col-md-6 left">
            <div class="img-title">搬家如何打包</div>
            <img src="../assets/images/intro1.jpg" alt="" />
          </div>
          <div class="col-md-6 right">
            <div class="title">大部分人會苦惱的問題</div>
            <div class="text">
              首先，你要找到適合的工具，讓自己省時省力。
              在過程中，你需要整理，將雜亂的物件用紙箱收納起來，然後在搬家當天請搬家公司或你自己裝載上車，搬運到新址。
            </div>
          </div>
        </div> -->
        </div>
        <div class="description2" :class="{ fadeIn: fadeIn }">
          <div class="text">
            <h2 class="text-title">速購家搬家紙箱專賣店</h2>
            <div class="text-content">
              <h2 class="text-main-title">紙箱哪裡買</h2>
              <h3 class="text-sub-title">速購家搬家紙箱專賣店</h3>
              你需要堅固耐用的搬家專用紙箱。
              搬家很忙很累，重點在化繁為簡，在這裡，速購家已經為您準備好了，輕鬆上網手指動一動，搬家紙箱就送到你府上。
            </div>
          </div>
          <div class="img-box">
            <h2 class="img-title">紙箱哪裡買</h2>
            <img src="../assets/images/des2.jpg" alt="速購家搬家紙箱" />
          </div>

          <!-- <div class="row">
          <div class="col-md-6 left">
            <div class="img-title">搬家如何打包</div>
            <img src="../assets/images/intro1.jpg" alt="" />
          </div>
          <div class="col-md-6 right">
            <div class="title">大部分人會苦惱的問題</div>
            <div class="text">
              首先，你要找到適合的工具，讓自己省時省力。
              在過程中，你需要整理，將雜亂的物件用紙箱收納起來，然後在搬家當天請搬家公司或你自己裝載上車，搬運到新址。
            </div>
          </div>
        </div> -->
        </div>
      </div>
    </div>
    <!-- <div class="container product">
      <div class="product-menu">
        <div class="row">
          <div class="product-item" v-for="item in menu" :key="item.pdrefid">
            <div class="item-img">
              <img
                :src="item.pdphoto"
                width="100%"
                :alt="item.pdname"
                @click="goProduct(item)"
              />
            </div>
            <div class="item-body">
              <h3 class="product-title">{{ item.pdname }}</h3>
              <div class="product-size">{{ item.pdsize }}</div>
              <div class="product-price">${{ item.pdprice }}</div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <div class="product-show-description">
      <!-- <div class="product-show-description-title">專業級搬家紙箱</div> -->
      <div class="img-box">
        <img
          src="../assets/images/part1.jpg"
          width="100%"
          alt="專業級搬家紙箱"
        />
        <h2 class="img-title">專業級搬家紙箱</h2>
      </div>
    </div>
    <b-container class="mobile-container">
      <carousel
        :perPage="2"
        :navigationEnabled="true"
        :paginationEnabled="true"
        :mouse-drag="true"
        :touch-drag="true"
        class="product-slide"
      >
        <slide
          class="product-slide-item p-2"
          v-for="item in menu"
          :key="item.pdrefid"
        >
          <div class="product-item-box">
            <div class="img-box">
              <img
                :src="item.pdphoto"
                :alt="item.pdname"
                @click="goProduct(item)"
              />
            </div>
            <div class="product-item-body">
              <h3 class="product-title">{{ item.pdname }}</h3>
              <div class="product-size">
                <span
                  :class="{
                    isAnimation: item.pdsize.length > 20 ? true : false,
                  }"
                  >{{ item.pdsize }}</span
                >
              </div>
              <div class="product-price">${{ item.pdprice }}</div>
            </div>
          </div>
        </slide>
      </carousel>
    </b-container>
    <!-- <Newfooter></Newfooter> -->
  </div>
</template>

<script>
import Newheader from '../components/NewHeader';
import Newfooter from '../components/Footer';
import { Slider, SliderItem } from 'vue-easy-slider';
import CookieLaw from 'vue-cookie-law';
import { Carousel, Slide } from 'vue-carousel';
export default {
  name: 'home',
  props: {
    RouterChangerInnerWidth: {
      type: Number,
      default() {
        return 0;
      },
    },
  },
  components: {
    Newheader,
    Newfooter,
    Slider,
    SliderItem,
    Carousel,
    Slide,
    'cookie-law': CookieLaw,
  },
  metaInfo() {
    return {
      title: this.title,
    };
  },
  data() {
    return {
      settings: {
        dots: true,
        dotsClass: 'slick-dots custom-dot-class',
        edgeFriction: 0.35,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      },
      name: '',
      clientHeightSet: null,
      clientWidth: false,
      sliding: null,
      logoshow: false,
      fadeIn: false,
      MobileclientHeightSet: '767px',
      content: '',
      height: '800px',
      config: {},
      htmlText: '<p>Some sample text.</p>',
      imageBrowser: {
        transport: {
          read: 'https://demos.telerik.com/kendo-ui/service/ImageBrowser/Read',
          destroy: {
            url: 'https://demos.telerik.com/kendo-ui/service/ImageBrowser/Destroy',
            type: 'POST',
          },
          create: {
            url: 'https://demos.telerik.com/kendo-ui/service/ImageBrowser/Create',
            type: 'POST',
          },
          thumbnailUrl:
            'https://demos.telerik.com/kendo-ui/service/ImageBrowser/Thumbnail',
          uploadUrl:
            'https://demos.telerik.com/kendo-ui/service/ImageBrowser/Upload',
          imageUrl:
            'https://demos.telerik.com/kendo-ui/service/ImageBrowser/Image?path={0}',
        },
      },
      fileBrowser: {
        transport: {
          read: 'https://demos.telerik.com/kendo-ui/service/FileBrowser/Read',
          destroy: {
            url: 'https://demos.telerik.com/kendo-ui/service/FileBrowser/Destroy',
            type: 'POST',
          },
          create: {
            url: 'https://demos.telerik.com/kendo-ui/service/FileBrowser/Create',
            type: 'POST',
          },
          uploadUrl:
            'https://demos.telerik.com/kendo-ui/service/FileBrowser/Upload',
          fileUrl:
            'https://demos.telerik.com/kendo-ui/service/FileBrowser/File?fileName={0}',
        },
      },
      title: '搬家紙箱專賣店 | 速購家',
      options: {
        rewind: true,
        focus: 2,
        perPage: 2,
        autoplay: true,
        type: 'fade',
        pauseOnHover: false,
        arrows: 'slider',
      },
      menu: [],
    };
  },
  watch: {
    RouterChangerInnerWidth: {
      handler() {
        const vm = this;
        // window.onload = function () {
        //   if (window.screen.width < 767) {
        //     vm.MobileclientHeightSet = vm.RouterChangerInnerWidth + 300 + 'px';
        //   } else if (window.screen.width < 576) {
        //     vm.MobileclientHeightSet = vm.RouterChangerInnerWidth + 150 + 'px';
        //   } else if (window.screen.width > 767) {
        //   }
        // };
      },
      deep: true,
    },
  },
  created() {
    this.getList();
    if (window.innerWidth > 996) {
      this.clientWidth = false;
      this.height = window.innerWidth / 2 + 'px';
      this.clientHeightSet = window.innerWidth / 2 + 'px';
    } else if (window.innerWidth > 767 && window.innerWidth < 996) {
      this.clientWidth = false;
      this.height = window.innerWidth / 2 + 'px';
      this.clientHeightSet = window.innerWidth / 2 + 'px';
    } else if (window.innerWidth < 767) {
      this.clientWidth = true;
      this.MobileclientHeightSet = window.innerWidth + 300 + 'px';
    } else if (window.innerWidth < 576) {
      this.clientWidth = true;
      this.MobileclientHeightSet = window.innerWidth + 150 + 'px';
    }
    if (this.$route.query.igcid) {
      localStorage.setItem('FromUrl', this.$route.query.igcid);
    }
  },
  mounted() {
    const vm = this;
    // window.onload = function () {
    //   vm.height = window.innerWidth / 2 + 'px';

    //   if (window.screen.width > 767) {
    //     vm.clientWidth = false;
    //   } else if (window.screen.width < 767) {
    //     vm.clientWidth = true;
    //     vm.MobileclientHeightSet = window.innerWidth + 300 + 'px';
    //   } else if (window.screen.width < 576) {
    //     vm.MobileclientHeightSet = window.innerWidth + 150 + 'px';
    //   }
    // };
    window.addEventListener('resize', function (e) {
      vm.clientHeightSet = e.target.innerWidth / 2;
      vm.height = e.target.innerWidth / 2 + 'px';
      if (window.innerWidth < 767) {
        vm.clientWidth = true;
        vm.MobileclientHeightSet = e.target.innerWidth + 300 + 'px';
      } else if (window.innerWidth < 576) {
        vm.MobileclientHeightSet = e.target.innerWidth + 150 + 'px';
      } else if (window.innerWidth > 767) {
        vm.clientWidth = false;
      }
    });
    window.addEventListener('scroll', function (e) {
      if (vm.$route.name == 'home') {
        let top =
          document.querySelector('.content .outside-box .description1')
            .offsetTop || '';
        let scroll = window.scrollY;
        let cult = top - scroll;
        if (top - scroll > 150) {
          vm.fadeIn = true;
        } else if (scroll > top) {
          vm.fadeIn = true;
        }
      } else {
        return;
      }
    });
  },
  methods: {
    getList() {
      let url = `/api/v1/ProductApi/Popular`;
      this.$http.get(url).then((response) => {
        this.menu = response.data.data.map((item) => {
          return {
            pdname: item.pdname,
            pdphoto: item.pdphoto,
            pdrefid: item.pdrefid,
            pdsize: item.pdsize,
            pdprice: item.pdprice,
          };
        });
      });
    },
    goDetail(item) {
      this.$router.push({
        name: 'commodity',
        params: {
          id: item.pdrefid,
        },
      });
    },
    addTocart(id) {
      if (localStorage.cartId) {
        this.postItem(id);
      } else {
        const url = '/api/v1/CartApi';
        let form = new FormData();
        form.append('CartID', '');
        this.$http.post(url, form).then((response) => {
          localStorage.setItem('cartId', response.data.data.cartID);
          setTimeout(() => {
            this.postItem(id);
          }, 100);
        });
      }
    },
    postItem(id) {
      const vm = this;
      const url = '/api/v1/CartApi/AddProduct';
      let form = new FormData();
      form.append('CartID', localStorage.getItem('cartId'));
      form.append('ProductId', id);
      form.append('Quantity', 1);
      this.$http.post(url, form).then((response) => {
        if (response.data.isSuccess) {
          this.$store.dispatch('updateCart');
          this.$message({
            showClose: true,
            message: '已加入購物車',
            type: 'success',
          });
        } else {
          this.$swal({
            icon: 'error',
            title: `${response.data.message}`,
          });
        }
      });
    },
    goProduct(item) {
      this.$router.push({
        name: 'commodity',
        params: {
          id: item.pdrefid,
        },
      });
    },
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .banner {
  .banner-box {
    .el-carousel__container {
      height: 860px !important;
    }
    .banner-item {
      // background: url('../assets/images/banner1.png');
      // background-size: contain !important;
      // background-repeat: no-repeat;
      // background-position: center center;
    }
    .banner-item2 {
      background: url('../assets/images/banner_carton.png');
      background-size: contain !important;
      background-repeat: no-repeat;
      background-position: center center;
    }
  }
  .slider {
    .slider-btn-right {
      .slider-icon-right {
        border-left: 2px solid #a88754 !important;
        border-bottom: 2px solid #a88754 !important;
      }
    }
    .slider-btn-left {
      .slider-icon-left {
        border-left: 2px solid #a88754;
        border-bottom: 2px solid #a88754;
      }
    }
    .slider-indicators {
      span {
        background-color: #a88754;
        &.slider-indicator-active {
          background-color: #a88754;
          opacity: 0.5;
        }
      }
    }
  }
}
/*PEN STYLES*/

::v-deep .mobile-container {
  padding-top: 50px;
  padding-bottom: 30px;
  max-width: 400px;
  .product-slide {
    .product-slide-item {
      .product-item-box {
        height: 270px;
        max-width: 169px;
        border: 2px solid #a88754;
        border-radius: 15px;
        overflow: hidden;
        .img-box {
          display: flex;
          height: 60%;
          cursor: pointer;
          overflow: hidden;

          img {
            transform: scale(1);
            transition: 0.3s;
            width: 100%;
            // height: 100%;
            &:hover {
              transform: scale(1.1);
              transition: 0.3s;
            }
          }
        }
        .product-item-body {
          height: 40%;
          text-align: center;
          overflow: hidden;
          .product-title {
            height: 33.3333%;
            padding: 5px;
            font-size: 15px;
            margin-bottom: 0;
          }

          .product-size {
            position: relative;
            height: 33.3333%;
            padding: 5px;
            opacity: 0.5;
            font-size: 14px;
            white-space: nowrap;
            .isAnimation {
              transform: translateX(90px);
              position: absolute;
              animation: small-animation 5s infinite linear;
            }
          }

          .product-price {
            height: 33.3333%;
            padding: 5px;
            color: red;
            font-size: 14px;
          }
        }
      }
    }
    .VueCarousel-navigation {
      button {
        padding: 0 !important;
        outline: none !important;
        color: #a88754 !important;
      }
    }
    .VueCarousel-pagination {
      .VueCarousel-dot-container {
        button {
          outline: none !important;
          &.VueCarousel-dot--active {
            background-color: #a88754 !important;
          }
        }
      }
    }
  }
}
@keyframes small-animation {
  0% {
    transform: translateX(90px);
  }
  100% {
    transform: translateX(-500px);
  }
}
::v-deep .news {
  max-width: 500px;
  margin-top: 50px;
  padding-bottom: 50px;
  .news-title {
    padding: 15px 0px;
    font-size: 20px;
    text-align: center;
    color: #a88754;
    letter-spacing: 5px;
  }

  .news-carousel-menu {
    padding: 0px 10px;
    .VueCarousel-wrapper {
      background: #e3d7c3 !important;
      .news-carousel-item {
        h3 {
          font-size: 17px;
          padding: 10px;
        }
      }
    }
    .VueCarousel-navigation {
      button {
        color: #a88754;
        padding: 25px 5px !important;
        transform: none;
        outline: none !important;
      }
    }
    .VueCarousel-pagination {
      .VueCarousel-dot-container {
        button {
          outline: none !important;
          &.VueCarousel-dot--active {
            background-color: #a88754 !important;
          }
        }
      }
    }
  }
}

@media (max-width: 576px) {
  .mobile-container　 {
    .product-slide {
      .product-slide-item {
        .product-item-box {
          .img-box {
            height: 65%;
            img {
              width: 100%;
              height: 100% !important;
            }
          }
        }
      }
    }
  }
}

$color_white: #fff;
$color_prime: #5e65ce;
$color_grey: #e2e2e2;
$color_grey_dark: #a2a2a2;
.blog-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 1rem auto;
  box-shadow: 0 3px 7px -1px rgba(#000, 0.1);
  // margin-bottom: 1.6%;
  background: $color_white;
  line-height: 1.4;
  font-family: sans-serif;
  border-radius: 5px;
  overflow: hidden;
  z-index: 0;
  a {
    color: inherit;
    // &:hover {
    //   color: $color_prime;
    // }
  }
  // &:hover {
  //   .photo {
  //     transform: scale(1.1);
  //   }
  // }
  // &:nth-child(2) {
  //   .photo {
  //     background-image: url('../assets/images/pages1.png');
  //     background-position: bottom;
  //   }
  // }
  // &:nth-child(3) {
  //   .photo {
  //     background-image: url('../assets/images/pages2.png');
  //     background-position: bottom;
  //   }
  // }

  // .meta {
  //   position: relative;
  //   z-index: 0;
  //   height: 300px;
  // }
  // .photo {
  //   position: absolute;
  //   top: 0;
  //   right: 0;
  //   bottom: 0;
  //   left: 0;
  //   background-size: cover;
  //   background-position: center;
  //   transition: transform 0.2s;
  // }
  .details,
  .details ul {
    margin: auto;
    padding: 0;
    list-style: none;
  }

  .details {
    position: absolute;
    top: 0;
    bottom: 0;
    left: -100%;
    margin: auto;
    transition: left 0.2s;
    background: rgba(#000, 0.6);
    color: $color_white;
    padding: 10px;
    width: 100%;
    font-size: 0.9rem;
    a {
      text-decoration: dotted underline;
    }
    ul li {
      display: inline-block;
    }
    .author:before {
      font-family: FontAwesome;
      margin-right: 10px;
      content: '\f007';
    }

    .date:before {
      font-family: FontAwesome;
      margin-right: 10px;
      content: '\f133';
    }

    .tags {
      ul:before {
        font-family: FontAwesome;
        content: '\f02b';
        margin-right: 10px;
      }
      li {
        margin-right: 2px;
        &:first-child {
          margin-left: -4px;
        }
      }
    }
  }
  .description {
    padding: 1rem;
    background: $color_white;
    position: relative;
    z-index: 1;

    h2 {
      font-size: 1rem;
      font-weight: bold;
      text-transform: uppercase;
      font-size: 22px;
      margin-top: 5px;
      font-family: Poppins, sans-serif;
    }
    h3 {
      font-size: 1rem;
      font-weight: 700;
      text-transform: uppercase;
      color: green;
      margin-top: 5px;
    }
    .read-more {
      text-align: right;
      a {
        color: $color_prime;
        display: inline-block;
        position: relative;
        &:after {
          content: '\f061';
          font-family: FontAwesome;
          margin-left: -10px;
          opacity: 0;
          vertical-align: middle;
          transition: margin 0.3s, opacity 0.3s;
        }

        // &:hover:after {
        //   margin-left: 5px;
        //   opacity: 1;
        // }
      }
    }
  }
  p {
    position: relative;
    margin: 1rem 0 0;
    &:first-of-type {
      margin-top: 1.25rem;
      &:before {
        content: '';
        position: absolute;
        height: 5px;
        background: lightskyblue;
        width: 35px;
        top: -0.75rem;
        border-radius: 3px;
      }
    }
  }
  // &:hover {
  //   .details {
  //     left: 0%;
  //   }
  // }

  @media (min-width: 640px) {
    flex-direction: row;
    // max-width: 700px;
    // .meta {
    //   flex-basis: 40%;
    //   height: 300px;
    // }
    .description {
      // flex-basis: 60%;
      // &:before {
      //   transform: skewX(-3deg);
      //   content: '';
      //   background: #fff;
      //   width: 30px;
      //   position: absolute;
      //   left: -10px;
      //   top: 0;
      //   bottom: 0;
      //   z-index: -1;
      // }
    }
    // &.alt {
    //   flex-direction: row-reverse;
    //   .description {
    //     &:before {
    //       left: inherit;
    //       right: -10px;
    //       transform: skew(3deg);
    //     }
    //   }
    //   .details {
    //     padding-left: 25px;
    //   }
    // }
  }
}
.product-list {
  display: flex;
  // background: #fafafa;
  padding-top: 1.5rem;
  margin-top: 30px;

  .main-product {
    position: relative;
    width: 100%;
    // background: #fafafa;
    padding-bottom: 60px;
    .product-menu-outter {
      margin: 0px 30px;
      .product-item {
        position: relative;
        background-color: #fff;
        border-radius: 0.4rem;
        // overflow: hidden;
        box-shadow: 0 3rem 6rem rgba(0, 0, 0, 0.1);
        // cursor: pointer;
        transition: 0.2s;
        margin-bottom: 30px;
        // box-sizing: border-box;
        // margin-bottom: 15px;
        // box-shadow: 0px 0px 2px 0px black;
        .box {
          position: absolute;
        }
        .img-box {
          overflow: hidden;
          .box {
            max-width: 600px;
            width: 90%;
            background: #fff;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
          }

          /* common */
          .ribbon {
            width: 150px;
            height: 150px;
            overflow: hidden;
            position: absolute;
          }
          .ribbon::before,
          .ribbon::after {
            position: absolute;
            z-index: -1;
            content: '';
            display: block;
            border: 5px solid red;
          }
          .ribbon span {
            position: absolute;
            display: block;
            width: 225px;
            padding: 15px 0;
            background-color: red;
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
            color: #fff;
            font: 700 18px/1 'Lato', sans-serif;
            text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
            text-transform: uppercase;
            text-align: center;
          }

          /* top left*/
          .ribbon-top-left {
            top: -10px;
            left: -10px;
            z-index: 50;
          }
          .ribbon-top-left::before,
          .ribbon-top-left::after {
            border-top-color: transparent;
            border-left-color: transparent;
          }
          .ribbon-top-left::before {
            top: 0;
            right: 0;
          }
          .ribbon-top-left::after {
            bottom: 0;
            left: 0;
          }
          .ribbon-top-left span {
            right: -25px;
            top: 30px;
            transform: rotate(-45deg);
          }

          /* top right*/
          .ribbon-top-right {
            top: -10px;
            right: -10px;
          }
          .ribbon-top-right::before,
          .ribbon-top-right::after {
            border-top-color: transparent;
            border-right-color: transparent;
          }
          .ribbon-top-right::before {
            top: 0;
            left: 0;
          }
          .ribbon-top-right::after {
            bottom: 0;
            right: 0;
          }
          .ribbon-top-right span {
            left: -25px;
            top: 30px;
            transform: rotate(45deg);
          }

          /* bottom left*/
          .ribbon-bottom-left {
            bottom: -10px;
            left: -10px;
          }
          .ribbon-bottom-left::before,
          .ribbon-bottom-left::after {
            border-bottom-color: transparent;
            border-left-color: transparent;
          }
          .ribbon-bottom-left::before {
            bottom: 0;
            right: 0;
          }
          .ribbon-bottom-left::after {
            top: 0;
            left: 0;
          }
          .ribbon-bottom-left span {
            right: -25px;
            bottom: 30px;
            transform: rotate(225deg);
          }

          /* bottom right*/
          .ribbon-bottom-right {
            bottom: -10px;
            right: -10px;
          }
          .ribbon-bottom-right::before,
          .ribbon-bottom-right::after {
            border-bottom-color: transparent;
            border-right-color: transparent;
          }
          .ribbon-bottom-right::before {
            bottom: 0;
            left: 0;
          }
          .ribbon-bottom-right::after {
            top: 0;
            right: 0;
          }
          .ribbon-bottom-right span {
            left: -25px;
            bottom: 30px;
            transform: rotate(-225deg);
          }
          .product-img {
            width: 100%;
            height: 100%;
            cursor: pointer;
            transform: scale(1);
            transition: transform 0.6s;
          }
          &:hover {
            .product-img {
              transform: scale(1.1);
              transition: 0.6s;
            }
          }
        }

        .item-body {
          width: 100%;
          text-align: center;
          padding: 15px;
          border-top: 1px solid #cecece;
          .price-box {
            .origin-price {
              display: inline-block;
              margin-right: 5px;
              color: #999;
              text-decoration: line-through;
            }
            .price {
              display: inline-block;
              color: red;
              font-weight: 700;
            }
            .addTocart {
              .add-btn {
                outline: none;
                border: none;
                background: #999;
                color: white;
                font-weight: bold;
                padding: 5px 30px;
                border-radius: 15px;
                margin: 10px 0px;
              }
            }
          }
        }
        // &:hover {
        //   .img-box {
        //     .product-img {
        //       transform: scale(1.1);
        //       transition: 0.6s;
        //     }
        //   }
        // }
      }
    }
  }
}
.other-img {
  text-align: center;
  img {
    max-width: 100%;
  }
}
@media (max-width: 1424px) {
  .banner {
    .banner-box {
      .el-carousel__container {
        height: 500px !important;
      }
      .banner-item {
        background-size: contain;
      }
    }
  }
}
@media (max-width: 895px) {
  .banner {
    .banner-box {
      .el-carousel__container {
        height: 400px !important;
      }
      .banner-item {
        background-size: cover !important;
      }
    }
  }
}
@media (max-width: 700px) {
  .banner {
    .banner-box {
      .el-carousel__container {
        height: 300px !important;
      }
      .banner-item {
        background-size: cover !important;
      }
    }
  }
}
@media (max-width: 450px) {
  .banner {
    .banner-box {
      .el-carousel__container {
        height: 200px !important;
      }
    }
  }
}
</style>