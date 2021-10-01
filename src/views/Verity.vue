<template>
  <div>
    <!-- <Newheader></Newheader> -->
    <div v-if="$route.meta.keepAlive" class="pt-120"></div>
    <router-view v-else></router-view>
    <!-- <Newfooter></Newfooter> -->
  </div>
</template>

<script>
import Newheader from '../components/NewHeader';
import Newfooter from '../components/Footer';
export default {
  components: {
    Newheader,
    Newfooter,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
</style>