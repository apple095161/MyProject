<template>
  <div>
    <!-- <div class="page-title">
      <div class="text">{{ title }}</div>
    </div> -->
    <div class="container" style="margin-top: 15px; margin-bottom: 15px">
      <div class="step-box">
        <div
          class="step"
          :class="{ active: index == 1 || index == 2 || index == 3 }"
        >
          <!-- <div class="circle"></div> -->
          <i class="fas fa-shopping-cart"></i>
          <div class="num">購物車商品</div>
        </div>
        <div class="step" :class="{ active: index == 2 || index == 3 }">
          <!-- <div class="circle"></div> -->
          <i class="fas fa-dollar-sign"></i>
          <div class="num">確認商品及付款</div>
        </div>
        <div class="step" :class="{ active: index == 3 }">
          <!-- <div class="circle"></div> -->
          <i class="fas fa-check-circle"></i>
          <div class="num">付款結果</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
    },
    index: {
      type: Number,
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.page-title {
  text-align: center;
  padding: 15px;
  .text {
    display: inline-block;
    padding: 5px 70px;
    letter-spacing: 3px;
    border: 2px solid #707070;
  }
}
//共用的step
.step-box {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 60px 0px 60px;
  transition: all 0.3s;
  .step {
    width: 33.3333%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    i {
      font-size: 24px;
      color: #d4c5ae;
    }
    .circle {
      width: 30px;
      height: 30px;
      background: #bcc1be;
      border-radius: 50%;
    }

    .num {
      // position: absolute;
      // font-size: 14px;
      // bottom: -30px;
      font-size: 18px;
      margin-top: 15px;
      letter-spacing: 3px;
      color: #d4c5ae;
    }

    &:nth-child(1) {
      padding: 15px 0px 15px 0px;

      &::before {
        display: none;
      }
    }

    &::before {
      position: absolute;
      content: '';
      height: 3px;
      width: 50%;
      background: #d0d0d0;
      top: 15px;
      left: -28%;
      transition: all 0.3s;
    }

    &.active {
      i {
        color: #a88754;
      }
      .num {
        color: #a88754;
      }
      &::before {
        background: #a88754;
      }
    }
  }
}
@media (max-width: 767px) {
  .step-box {
    padding: 0;
    transition: all 0.3s;
    .step {
      .num {
        font-size: 12px;
        transition: all 0.3s;
      }
      &::after {
        width: 40%;
        left: 80%;
        transition: all 0.3s;
      }
    }
  }
}
</style>