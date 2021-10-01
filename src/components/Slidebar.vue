<template>
  <div class="slidebar">
    <div>
      <div class="logo">
        <div class="logo-title">後台設定</div>
      </div>
      <div class="sidebar-wrapper">
        <ul class="md-list md-theme-default">
          <li class="md-list-item">
            <router-link
              class="md-list-item-link"
              :to="{ name: 'dashboardOrder' }"
            >
              <div class="md-list-item-content">
                <i class="md-icon fas fa-user"></i>
                <p>訂單管理</p>
                <b class="caret"></b>
              </div>
            </router-link>
            <!-- <ul class="md-list-item-sub-menu">
              <li>123</li>
              <li>456</li>
            </ul> -->
          </li>
          <li class="md-list-item">
            <a class="md-list-item-link">
              <div class="md-list-item-content">
                <i class="md-icon fas fa-arrow-alt-circle-up"></i>
                <p>服務建議書管理</p>
                <b class="caret"></b>
              </div>
            </a>
            <ul class="md-list-item-sub-menu">
              <li>
                <router-link :to="{ name: 'movingList' }">搬家服務</router-link>
              </li>
              <li>
                <router-link :to="{ name: 'igLifeList' }">居家服務</router-link>
              </li>
              <li>
                <router-link :to="{ name: 'ExLifeList' }"
                  >體驗人生服務</router-link
                >
              </li>
            </ul>
          </li>
          <li class="md-list-item">
            <a class="md-list-item-link" @click.prevent>
              <div class="md-list-item-content">
                <i class="md-icon fas fa-anchor"></i>
                <p>商品管理</p>
                <b class="caret"></b>
              </div>
            </a>
            <ul class="md-list-item-sub-menu">
              <li>
                <router-link :to="{ name: 'produtList' }">所有商品</router-link>
              </li>
              <li>
                <router-link :to="{ name: 'addType' }">新增類別</router-link>
              </li>
            </ul>
          </li>
          <!-- <li class="md-list-item">
            <router-link class="md-list-item-link" :to="{ name: 'table' }">
              <div class="md-list-item-content">
                <i class="md-icon fas fa-bolt"></i>
                <p>互動參數管理</p>
                <b class="caret"></b>
              </div>
            </router-link>
          </li> -->
          <!-- <li class="md-list-item">
            <router-link class="md-list-item-link" :to="{ name: 'table' }">
              <div class="md-list-item-content">
                <i class="md-icon fas fa-bolt"></i>
                <p>服務管理</p>
                <b class="caret"></b>
              </div>
            </router-link>
          </li> -->
          <li class="md-list-item">
            <router-link class="md-list-item-link" :to="{ name: 'faqset' }">
              <div class="md-list-item-content">
                <i class="md-icon fas fa-bolt"></i>
                <p>知識百科</p>
                <b class="caret"></b>
              </div>
            </router-link>
            <ul class="md-list-item-sub-menu">
              <li>
                <router-link
                  :to="{
                    name: 'faqEdit',
                    params: {
                      id: 'new',
                    },
                  }"
                  >新增題庫</router-link
                >
              </li>
              <li>
                <router-link :to="{ name: 'AddLabel' }">新增類型</router-link>
              </li>
            </ul>
          </li>
          <!-- <li class="md-list-item">
            <router-link class="md-list-item-link" :to="{ name: 'table' }">
              <div class="md-list-item-content">
                <i class="md-icon fas fa-bolt"></i>
                <p>訊息公告</p>
                <b class="caret"></b>
              </div>
            </router-link>
          </li> -->
          <!-- <li class="md-list-item">
            <router-link class="md-list-item-link" :to="{ name: 'table' }">
              <div class="md-list-item-content">
                <i class="md-icon fas fa-bolt"></i>
                <p>風格主題</p>
                <b class="caret"></b>
              </div>
            </router-link>
            <ul class="md-list-item-sub-menu">
              <li class="md-list-item-sub-menu-item">案例分享</li>
              <li>分析建議</li>
            </ul>
          </li> -->
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery';
export default {
  props: {
    role: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      index: Number,
    };
  },
  mounted() {
    $('.md-list-item').click(function (e) {
      $('.md-list-item').removeClass('active');
      $(this).addClass('active');
    });
  },
  methods: {},
};
</script>