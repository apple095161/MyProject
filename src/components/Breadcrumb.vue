<template>
  <div>
    <b-breadcrumb :items="breadList" class="breadcrumb"></b-breadcrumb>
  </div>
</template>
<script>
export default {
  props: {
    bcItem: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      breadList: [], // 路由集合
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    isHome(route) {
      return route.name == 'home';
    },
    getBreadcrumb() {
      let matched = this.$route.matched;
      //如果不是首頁
      setTimeout(() => {
        if (!this.isHome(matched[0])) {
          matched = [{ path: '/', meta: { title: '首頁', href: '/' } }].concat(
            matched,
          );
        }
        this.breadList = matched.map((item) => {
          return {
            text: item.meta.title,
            href: item.path,
          };
        });
      });
    },
  },
};
</script>