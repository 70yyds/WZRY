<template>
  <div class="card bg-w">
    <div class="head">
      <!-- 后台富文本编辑数据  详情页渲染上去做一些样式兼容即可 -->
      <div class="fs-big">新闻资讯</div>
      <div>...</div>
    </div>
    <swiper ref="mySwiper" :options="swiperOption">
      <swiper-slide>
        <img src="@/assets/activity/1.jpeg" alt="" />
      </swiper-slide>
      <swiper-slide>
        <img src="@/assets/activity/2.jpeg" alt="" />
      </swiper-slide>
      <swiper-slide>
        <img src="@/assets/activity/3.jpeg" alt="" />
      </swiper-slide>
    </swiper>
    <a-tabs :active-key="selectIndex" @change="handleChange">
      <a-tab-pane v-for="(item, index) in messageInfo" :key="index">
        <template slot="tab">
          <div :class="{ active: index == selectIndex }">
            {{ item.name }}
          </div>
        </template>
        <div class="heroItem fx">
          <div class="item" v-for="(i, j) in item.hero" :key="j">
            <img :src="i.url" alt="" />
            <div>{{ i.name }}</div>
          </div>
          <div class="fx-1"></div>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { Tabs } from "ant-design-vue";
const { TabPane } = Tabs;
export default {
  components: { "a-tabs": Tabs, "a-tab-pane": TabPane },
  props: {
    messageInfo: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      selectIndex: 0,
      swiperOption: {
        loop: true,
        autoplay: true,
      },
    };
  },
  methods: {
    handleChange(e) {
      this.selectIndex = e;
    },
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
  },
};
</script>

<style lang="less">
.card {
  padding: 0 15px;
  .head {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgb(207, 207, 207);
    padding: 10px 0;
  }
  .active {
    color: #db9e3f !important;
    border-bottom: 5px solid #db9e3f !important;
  }
  .ant-tabs {
    margin-top: 10px;
    .ant-tabs-bar {
      border: none;
    }
    .ant-tabs-nav {
      width: 100%;
      div:nth-child(1) {
        display: flex;
        justify-content: space-between;
        .ant-tabs-tab {
          padding: 0px;
          color: black;
        }
      }
      .ant-tabs-ink-bar {
        display: none !important;
      }
    }
    .ant-tabs-nav .ant-tabs-tab {
      margin: 0;
    }
  }
  .heroItem {
    margin-bottom: 10px;
    flex-wrap: wrap;
    justify-content: space-between;
    .item {
      margin: 0 10px 5px 0;
    }
    .item:nth-of-type(5n + 5) {
      margin-right: 0;
    }
    img {
      width: 60px;
    }
  }
}
</style>
