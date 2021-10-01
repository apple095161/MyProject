<template>
  <div v-if="$route.meta.keepAlive">
    <ShopHeader
      :cartLst="cartList"
      :isLogin="isLogin"
      :topList="topList"
    ></ShopHeader>
    <div class="carousel-box">
      <el-carousel :interval="4000" height="500px">
        <el-carousel-item>
          <!-- <h3 class="medium">{{ item }}</h3> -->
          <img
            src=""
            alt=""
            width="100%"
            height="100%"
            style="cursor: pointer"
            @click="goProduct(12)"
          />
        </el-carousel-item>
        <el-carousel-item>
          <!-- <h3 class="medium">{{ item }}</h3> -->
          <img
            src=""
            alt=""
            width="100%"
            height="100%"
            style="cursor: pointer"
            @click="goProduct(13)"
          />
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="main my-3">
      <div class="hot-area">
        <div class="col-md-12">
          <h4 class="text-center">熱門商品</h4>
          <div class="row box-set" v-if="hotArrar.length > 0">
            <!-- <div
              class="box"
              :style="`background-image:url(&quot;${item.pdphoto}&quot;);cursor: pointer;`"
              v-for="item in hotArrar"
              :key="item.pdrefid"
              @click="goProduct(item.pdrefid)"
            ></div> -->
            <div
              class="col-md-4 mt-3"
              v-for="item in hotArrar"
              :key="item.pdrefid"
              @click="goProduct(item.pdrefid)"
              style="cursor: pointer"
            >
              <!-- <img :src="item.pdphoto" alt="" width="100%" height="100%" /> -->
            </div>

            <!-- <div class="row">
              <div
                class="col-md-4"
                v-for="item in hotArrar"
                :key="item.pdphoto"
              >
                <b-card
                  title="Card Title"
                  :img-src="item.pdphoto"
                  img-alt="Image"
                  img-top
                  tag="article"
                  style="max-width: 20rem"
                  class="mb-2"
                >
                </b-card>
              </div>
            </div> -->
            <!-- <div class="col-md-4 my-2">
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-6">
                    <img
                      width="100%"
                      alt=""
                      style="cursor: pointer"
                      class="my-2"
                      :src="hotArrar[0].pdphoto"
                      @click="goProduct(hotArrar[0].pdrefid)"
                      height="100%"
                    />
                  </div>
                  <div class="col-md-6">
                    <img
                      width="100%"
                      alt=""
                      style="cursor: pointer"
                      class="my-2"
                      :src="hotArrar[0].pdphoto"
                      @click="goProduct(hotArrar[0].pdrefid)"
                      height="100%"
                    />
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-6">
                    <img
                      width="100%"
                      alt=""
                      style="cursor: pointer"
                      :src="hotArrar[0].pdphoto"
                      @click="goProduct(hotArrar[0].pdrefid)"
                      height="100%"
                    />
                  </div>
                  <div class="col-md-6">
                    <img
                      width="100%"
                      alt=""
                      style="cursor: pointer"
                      :src="hotArrar[0].pdphoto"
                      @click="goProduct(hotArrar[0].pdrefid)"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-8 mt-2">
              <div class="row">
                <div class="col-md-4 mt-2">
                  <img
                    :src="hotArrar[1].pdphoto"
                    @click="goProduct(hotArrar[1].pdrefid)"
                    width="100%"
                    height="100%"
                    alt=""
                    style="cursor: pointer"
                  />
                </div>
                <div class="col-md-4 mt-2">
                  <img
                    :src="hotArrar[2].pdphoto"
                    @click="goProduct(hotArrar[2].pdrefid)"
                    width="100%"
                    height="100%"
                    alt=""
                    style="cursor: pointer"
                  />
                </div>
                <div class="col-md-4 mt-2">
                  <img
                    :src="hotArrar[3].pdphoto"
                    @click="goProduct(hotArrar[3].pdrefid)"
                    width="100%"
                    height="100%"
                    alt=""
                    style="cursor: pointer"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-md-4 my-2">
                  <img
                    :src="hotArrar[4].pdphoto"
                    @click="goProduct(hotArrar[4].pdrefid)"
                    width="100%"
                    height="100%"
                    alt=""
                    style="cursor: pointer"
                  />
                </div>
                <div class="col-md-4 my-2">
                  <img
                    :src="hotArrar[4].pdphoto"
                    width="100%"
                    height="100%"
                    alt=""
                    style="cursor: pointer"
                  />
                </div>
                <div class="col-md-4 my-2">
                  <img
                    :src="hotArrar[4].pdphoto"
                    width="100%"
                    height="100%"
                    alt=""
                    style="cursor: pointer"
                  />
                </div>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <ShopFooter :widthShow="widthShow"></ShopFooter>
  </div>
  <router-view v-else :route="route" :itemChange="itemChange"></router-view>
</template>
<script>
import ShopHeader from './ShopHeader';
import ShopFooter from './Footer';
export default {
  components: { ShopHeader, ShopFooter },
  name: 'Shophome',
  props: {
    itemChange: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      items: [
        {
          url: '../assets/images/shopSlide-1',
        },
        {
          url: '../assets/images/shopSlide-2',
        },
        {
          url: '../assets/images/shopSlide-3',
        },
        {
          url: '../assets/images/shopSlide-4',
        },
      ],
      hotArrar: [],
      cartList: [],
      menuList: [
        {
          pcname: '全部商品',
          pccode: 'ALL',
        },
      ],
      isLogin: false,
      route: '',
      topList: true,
      widthShow: false,
    };
  },
  created() {
    this.getCart();
    // this.getType();
  },
  mounted() {
    const vm = this;
    this.getPopular();
    if (window.innerWidth <= 767) {
      vm.widthShow = true;
    } else {
      vm.widthShow = false;
    }
    window.onresize = () => {
      if (window.innerWidth <= 767) {
        vm.widthShow = true;
      } else {
        vm.widthShow = false;
      }
    };
  },
  watch: {
    $route(to, from) {
      // this.route = from.name;
      this.getCart();
    },
  },
  methods: {
    getCart() {
      if (localStorage.cartId) {
        const url = `/api/v1/CartApi`;
        const form = new FormData();
        form.append('CartID', localStorage.getItem('cartId'));
        this.$http.post(url, form).then((response) => {
          this.cartList = response.data.data.purchaseList;
          this.data = response.data.data.purchaseList;
        });
      }
      if (localStorage.User) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    },
    getPopular() {
      const url = '/api/v1/ProductApi/Popular';
      this.$http.get(url).then((response) => {
        // let array = response.data.data;
        // array.forEach((item, id, arr) => {
        //   let index = Math.floor(Math.random() * arr.length);
        // });

        // setTimeout(() => {
        //   this.done(response.data.data, 6);
        // }, 100);
        this.hotArrar = response.data.data.filter((item, index) => {
          if (index < 6) {
            return item;
          }
        });
      });
    },
    getType() {
      const url = '/api/v1/CategoryApi';
      this.$http.get(url).then((response) => {
        response.data.data.map((item) => {
          this.menuList.push({
            ...item,
          });
        });
      });
    },
    done(arr, count) {
      for (var i = 0; i < count; i++) {
        let index = Math.floor(Math.random() * arr.length);
        this.hotArrar.push(arr[index]);
      }
    },
    goProduct(id) {
      this.$router.push({
        name: 'commodity',
        params: {
          id: id,
        },
      });
    },
  },
};
</script>