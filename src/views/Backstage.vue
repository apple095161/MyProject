<template>
  <div>
    <h2>已登入後台</h2>
    <p>{{ data }}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: this.$route.params.data || [],
    };
  },
};
</script>