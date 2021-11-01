<template>
  <div style="padding-top: 120px">
    <div class="about container">
      <div class="main-title-b">
        <img src="../assets/images/title.svg" alt="" class="title-img" />
        <h2 class="main-title">為什麼要買搬家紙箱</h2>
        <div class="body-content">
          紙箱是搬家的好夥伴！
          許多人會想到的獲得途徑大多是附近的量販店、水果攤等……
          儘管二手的箱子減少了費用支出，但從長遠來看，為搬家購買新的紙箱可以為搬運、收拾過程創造更多意想不到的好處！
        </div>
      </div>
      <div class="sub-title-b">
        <div class="sub-img">
          <img src="../assets/images/1-1.svg" alt="" />
        </div>
        <h2 class="sub-title">更堅固</h2>
        <div class="body-content">
          搬運的過程難免有磕磕碰碰，新的紙箱有更佳的緩衝、支撐力，給物品更好的保護力。
          大家肯定都希望物品完完整整到達新住處，如果運送期間物品受損，事後要煩惱的問題可能會比想像中來得多。
        </div>
      </div>
      <div class="sub-title-b">
        <div class="sub-img">
          <img src="../assets/images/1-2.svg" alt="" />
        </div>
        <h2 class="sub-title">更容易堆疊</h2>
        <div class="body-content">
          新的紙箱因為比較堅固，可以放心將他們互相堆疊，不會傷害到內容物。此舉可以大大增加效率，不用怕箱子相疊後東西被擠壓或是箱子變形甚至是不平衡而倒塌。
        </div>
      </div>
      <div class="sub-title-b">
        <div class="sub-img">
          <img src="../assets/images/1-3.svg" alt="" />
        </div>
        <div class="sub-title">較無衛生疑慮</div>
        <div class="body-content">
          有些昆蟲（例如：蟑螂）會寄居或是產卵在紙箱的蜂巢結構內，尤其是裝過食物類的紙箱最容易吸引牠們。
          這些紙箱帶回家中，可能會產生衛生疑慮，如果使用全新的紙箱可以大大避免這件事情發生。
        </div>
      </div>
      <div class="sub-title-b">
        <div class="sub-img">
          <img src="../assets/images/1-4.svg" alt="" />
        </div>
        <div class="sub-title">空間充分利用</div>
        <div class="body-content">
          使用規格統一的新紙箱，可以更有效利用貨車、自載車的空間。如果紙箱大小不一，很多空間會被白白浪費，可能原本一車就能載完的東西，最後卻需要出動第二輛車，增加不必要的支出。
        </div>
      </div>
      <div class="about-img-b">
        <div class="link-area">
          <div class="title">↓點我購買↓</div>
          <div class="body-content">
            <a href="https://shop.igprice.com/List/3?ctId=frombuycarton"
              >專為搬家設計大型紙箱</a
            >
          </div>
        </div>
      </div>
      <div class="btm-area">
        <div class="title">繼續了解</div>
        <div class="more-view">
          <div class="view-item" @click="goLink('AboutBox2')">
            <div class="view-title">介紹</div>
            <img src="../assets/images/link2.svg" alt="" class="view-img" />
            <div class="sub-title">瓦楞紙箱</div>
          </div>
          <div class="view-item" @click="goLink('AboutBox3')">
            <div class="view-title">怎麼裝</div>
            <img src="../assets/images/link3.svg" alt="" class="view-img" />
            <div class="sub-title">搬家紙箱</div>
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
      title: '為什麼要買搬家紙箱',
      meta: [
        { name: 'keywords', content: '搬家紙箱' },
        {
          name: 'description',
          content:
            '紙箱是搬家的好夥伴！ 許多人會想到的獲得途徑大多是附近的量販店、水果攤等…… 儘管二手的箱子減少了費用支出，但從長遠來看，為搬家購買新的紙箱可以為搬運、收拾過程創造更多意想不到的好處！',
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