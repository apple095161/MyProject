<template>
  <div>
    <div class="container faq">
      <div class="row faq-menu">
        <div
          class="col-md-12 faq-item"
          v-for="(item, index) in List"
          :key="item.id"
          :class="{ open: item.isClick }"
        >
          <div class="index">{{ index + 1 }}.</div>
          <div class="faq-item-title" @click="self($event)">
            {{ item.title }}
          </div>
          <div class="faq-item-body" v-html="item.context"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ShoppingNotesChidren',
  props: {
    change: {
      type: String,
    },
  },
  data() {
    return {
      id: this.$route.params.key,
      key: this.$route.query.type,
      List: [],
    };
  },
  watch: {
    change: {
      handler() {
        this.getData();
      },
    },
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      let url = `/api/v1/QuestionBank/GetByCate/${this.$route.params.key}`;
      this.$http.get(url).then((response) => {
        this.List = response.data.data;
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
    .faq-item {
      border-bottom: 2px dashed #78bef8;
      display: block;

      .faq-item-title {
        display: inline-block;
        font-size: 18px;
        cursor: pointer;
        padding: 10px 15px 10px 15px;
        color: black;
        font-weight: bold;
      }
      .index {
        display: inline-block;
        padding-right: 10px;
        font-size: 18px;
      }
      .faq-item-body {
        padding: 5px 40px;
        width: 100%;
        .yF0IC {
          img {
            width: 100% !important;
          }
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
      text-align: left;
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