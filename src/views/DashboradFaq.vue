<template>
  <div v-if="$route.meta.keepAlive">
    <div class="faq-main">
      <div class="faq-box" v-for="item in faqList" :key="item.id">
        <div class="gutter">
          <div class="faq-title">{{ item.title }}</div>
          <div class="faq-detail">
            <span class="item mr-2">
              <i class="far fa-calendar-alt"></i>
              {{ $DateFormate(item.createDate) }}
            </span>
            <span class="item mr-2">
              <i class="fas fa-user"></i>
              {{ item.createUser }}
            </span>
            <span class="item mr-2">
              <i class="fas fa-file"></i>
              {{ setTitle(item.cateId) }}
            </span>
          </div>
          <div class="faq-context" v-html="item.context"></div>
          <a class="faq-btn" @click.prevent="edit(item.id)">修改文章</a>
        </div>
      </div>
    </div>
  </div>
  <router-view v-else></router-view>
</template>
<script>
import $ from 'jquery';
export default {
  data() {
    return {
      faqList: [],
      LabelList: [],
    };
  },

  created() {
    this.getData();
    this.getTitle();
  },
  mounted() {
    // $(".md-body-content .faq-main .faq-box .faq-context").each(function (i) {
    //   // if ($(this).text().trim().length > len) {
    //   //   $(this).attr("title", $(this).text());
    //   //   var text =
    //   //     $(this)
    //   //       .text()
    //   //       .trim()
    //   //       .substring(0, len - 1) + "...";
    //   //   $(this).text(text);
    //   // }
    // });
  },
  watch: {
    $route(to, from) {
      if (from.name == 'faqEdit') {
        this.getData();
      }
    },
  },
  methods: {
    getData() {
      let url = '/api/v1/QuestionBank';
      this.$http.get(url).then((response) => {
        this.faqList = response.data.data;
      });
    },
    getTitle() {
      let url = '/api/v1/Quecategory';
      this.$http.get(url).then((response) => {
        this.LabelList = response.data.data;
      });
    },
    setTitle(key) {
      let title = this.LabelList.filter((item) => item.id == key);
      return title[0].context;
    },
    edit(id) {
      this.$router.push({
        name: 'faqEdit',
        params: {
          id: id,
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.faq-main {
  .faq-box {
    position: relative;
    margin: 20px 0px;
    background: white;
    .gutter {
      padding: 20px 30px;
      .faq-title {
        font-size: 20px;
        font-weight: bold;
        color: wheat;
      }
      .faq-detail {
        border-bottom: 1px solid black;
        .item {
          display: inline-block;
        }
      }
      .faq-btn {
        display: inline-block;
        cursor: pointer;
        text-decoration: none;
        padding-top: 10px;
      }
      .faq-context {
        margin-top: 15px;
        height: 200px;
        overflow-y: scroll;
        img {
          display: none !important;
        }
      }
    }
  }
}
</style>