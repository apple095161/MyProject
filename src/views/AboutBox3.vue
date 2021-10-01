<template>
  <div style="padding-top: 120px">
    <div class="about container">
      <h2 class="about-title">怎麼裝搬家紙箱</h2>
      <div class="main-title-b">
        <img src="../assets/images/title.svg" alt="" class="title-img" />
        <div class="main-title ab-sty">事前作業</div>
        <div class="body-content">
          首先列一張搬家清單，盤點所有需要搬的物品，不用到非常細微，主要讓自己對要搬的物品有總體的了解。
        </div>
      </div>

      <div class="main-title-b">
        <img src="../assets/images/title.svg" alt="" class="title-img" />
        <div class="main-title ab-sty">裝箱守則</div>
        <div class="body-content">
          <ul>
            <li>．箱內應避免有空隙</li>
            <li>
              如果箱內有空隙，物品會容易移動，進而導致破損。
              若是物品無法填滿空隙，建議以報紙等…緩衝材料固定箱內物品。
            </li>
            <li>．不要裝太多、太重</li>
            <li>
              紙箱畢竟還是要透過人為搬動，如果太重會導致無法搬運、箱子變形，或是搬運時讓自己受傷。
              建議可以一邊裝一邊評估重量，不要超過個人負荷。
            </li>
            <li>．由大而小、由重到輕</li>
            <li>
              這是物品的最佳擺放順序，讓物品在箱內更穩定，也不易出現重心不穩的情況。
              這邊也提醒，一定要封緊箱子，尤其是放置重物的紙箱。
            </li>
            <li>．必用物品，特別整理</li>
            <li>
              將每天必用的物品（例如：盥洗用具）特別放一箱，也在該紙箱外註明，搬到新住處時即可使用。
            </li>
          </ul>
        </div>
      </div>
      <div class="main-title-b">
        <img src="../assets/images/title.svg" alt="" class="title-img" />
        <div class="main-title ab-sty">結語</div>
        <div class="body-content">
          搬家紙箱可以幫助我們更加方便地進行打包。
          選擇合適的紙箱尺寸，參考裝箱守則。 讓搬家更有效率，提升搬家品質。
        </div>
      </div>
      <div class="about-img-b">
        <div class="link-area">
          <div class="title">↓點我購買↓</div>
          <div class="body-content">
            <a href="https://shop.igprice.com/List/3?ctId=frompackmovingcarton"
              >五層專業級搬家紙箱</a
            >
          </div>
        </div>
      </div>

      <div class="btm-area">
        <div class="title">繼續了解</div>
        <div class="more-view">
          <div class="view-item" @click="goLink('AboutBox')">
            <div class="view-title">為什麼要買</div>
            <img src="../assets/images/link1.svg" alt="" class="view-img" />
            <div class="sub-title">搬家紙箱</div>
          </div>
          <div class="view-item" @click="goLink('AboutBox2')">
            <div class="view-title">介紹</div>
            <img src="../assets/images/link2.svg" alt="" class="view-img" />
            <div class="sub-title">瓦楞紙箱</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  metaInfo() {
    return {
      title: '搬家紙箱怎麼裝',
      meta: [
        { name: 'keywords', content: '搬家紙箱怎麼裝' },
        {
          name: 'description',
          content:
            '首先列一張搬家清單，盤點所有需要搬的物品，不用到非常細微，主要讓自己對要搬的物品有總體的了解。',
        },
      ],
    };
  },
  data() {
    return {
      show: false,
    };
  },
  mounted() {
    this.show = !this.show;
  },
  methods: {
    goLink(key) {
      this.$router.push({
        name: `${key}`,
      });
    },
  },
};
</script>
<style lang="scss">
</style>