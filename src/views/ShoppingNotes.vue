<template>
  <div>
    <!-- <Newheader></Newheader> -->
    <div class="container faq pt-120">
      <!-- <div class="btnGroup">
        <div
          class="F-btn"
          v-for="btn in items"
          :key="btn.id"
          @click="changeList(btn)"
        >
          {{ btn.context }}
        </div>
      </div>
      <router-view :change="change"></router-view> -->
      <div class="row faq-menu">
        <div
          class="col-md-12 faq-item"
          v-for="item in OriginList"
          :key="item.id"
          :class="{ open: item.isClick }"
        >
          <!-- <div class="index">{{ index + 1 }}.</div> -->
          <button class="faq-item-title" @click="MouseDown($event)">
            <i class="fas fa-chevron-down mr-3"></i> {{ item.title }}
          </button>
          <div class="faq-item-body" v-html="item.context"></div>
        </div>
      </div>
    </div>
    <!-- <Newfooter></Newfooter> -->
  </div>
</template>
<script>
import $ from 'jquery';
import Newheader from '../components/NewHeader';
import Newfooter from '../components/Footer';
export default {
  name: 'ShoppingNotes',
  components: { Newheader, Newfooter },
  data() {
    return {
      key: -1,
      items: [],
      OriginList: [],
      List: [],
      test: [],
      change: '',
    };
  },
  watch: {
    $route() {
      this.change = this.$route.query.type;
    },
  },
  created() {
    this.getLabel();
    this.getList();
  },
  mounted() {
    // setTimeout(() => {
    //   $('.faq .faq-menu .faq-item .faq-item-title').click(function (e) {
    //     $(this).next().toggleClass('show');
    //     $(this).toggleClass('show');
    //   });
    // }, 300);
    // target.addEventListener('click', function (e) {
    //   console.log(e);
    // });
    // setTimeout(() => {
    //   $('.faq .faq-menu .faq-item .faq-item-body').slideUp(0);
    // }, 150);
  },
  methods: {
    MouseDown(event) {
      event.target.classList.toggle('show');
      event.target.nextElementSibling.classList.toggle('show');

      // event.path[1].children[1].classList.toggle('show');
    },
    changeList(key) {
      this.change = key.context;
      this.$router.push({
        name: 'note',
        params: {
          key: key.id,
        },
        query: {
          type: key.context,
        },
      });
    },
    getLabel() {
      let url = '/api/v1/Quecategory';
      this.$http.get(url).then((response) => {
        this.items = response.data.data;
      });
    },
    getList() {
      let url = '/api/v1/QuestionBank';
      this.$http.get(url).then((response) => {
        this.OriginList = response.data.data.map((item) => {
          return {
            ...item,
            isClick: false,
          };
        });
        this.List = response.data.data.filter((item) => {
          return item.cateId == 1;
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.faq {
  .btnGroup {
    margin-top: 15px;
    text-align: center;
    .F-btn {
      display: inline-block;
      width: 120px;
      line-height: 40px;
      cursor: pointer;
      border: 2px solid #78bef8;
      margin: 15px;
      text-align: center;
    }
  }
  .faq-menu {
    padding: 15px 30px;
    min-height: calc(100vh - 520px);
    align-items: center;
    .faq-item {
      display: block;
      text-align: center;
      padding: 10px 0px;
      .faq-item-title {
        width: 180px;
        background: transparent;
        border: none;
        text-align: left;
        display: inline-block;
        font-size: 20px;
        cursor: pointer;
        padding: 10px 5px;
        color: #a88754;
        transform: translate(13%);
        outline: none;
        font-weight: bold;
        &.show {
          i {
            transform: rotate(180deg);
          }
        }
      }
      .index {
        display: inline-block;
        padding-right: 10px;
        font-size: 18px;
      }
      .faq-item-body {
        display: none;
        width: 100%;
        // font-size: 18px;
        // font-family: Source Han Sans TW;
        padding: 5px 40px;
        // color: #a88754;
        .yF0IC {
          img {
            width: 100% !important;
          }
        }
        &.show {
          display: block;
        }
      }
      &.open {
        .faq-item-body {
        }
      }
    }
  }
}
@media (max-width: 767px) {
  .faq {
    .btnGroup {
      text-align: center;
    }
    .faq-menu {
      padding: 15px 15px;
      .faq-item {
        .faq-item-body {
          padding: 5px 0px;
        }
      }
    }
  }
}
@media (max-width: 500px) {
  .faq {
    .btnGroup {
      .F-btn {
        width: calc(50% - 30px);
        margin: 15px;
      }
    }
  }
}
img {
  width: 100% !important;
}
</style>