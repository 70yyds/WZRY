<template>
  <div class="home">
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
    <div class="box bg-w">
      <div class="entry" :class="{ spread: spread }">
        <div
          class="entry_item"
          :class="{ last_item: (i == 10 || i % 4 == 0) && !spread }"
          v-for="i in 10"
          :key="i + 'aa'"
        >
          <i class="icon"> <img src="@/assets/icon/battle.png" alt="" /></i>
          <div class="fs-small fs-g">爆料站</div>
        </div>
      </div>
      <div
        class="arrow fx fs-g fs-small bg-g"
        @click="handleSpread"
        v-if="!spread"
      >
        <img src="@/assets/icon/arrow.png" alt="" />
        <div>收起</div>
      </div>
      <div class="arrow fx fs-g fs-small bg-g" @click="handleSpread" v-else>
        <img src="@/assets/icon/Darrow.png" alt="" />
        <div>展开</div>
      </div>
    </div>
    <div class="card bg-w">
      <div class="head">
        <div class="fs-big">新闻资讯</div>
        <div>...</div>
      </div>
      <a-tabs :active-key="index" @change="handleChange">
        <a-tab-pane v-for="i in 5" :key="i">
          <template slot="tab">
            <div :class="{ active: i == index }">热门</div>
          </template>
          {{ i }}--{{ index }}
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import { Tabs } from "ant-design-vue";
const { TabPane } = Tabs;
export default {
  components: { "a-tabs": Tabs, "a-tab-pane": TabPane },
  data() {
    return {
      spread: false,
      index: 1,
      swiperOption: {
        loop: true,
        autoplay: true,
      },
    };
  },
  mounted() {},
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
  },
  mounted() {},
  methods: {
    handleSpread() {
      this.spread = !this.spread;
    },
    handleChange(e) {
      this.index = e;
    },
  },
};
</script>

<style lang="less">
.home {
  img {
    width: 100%;
  }
  .box {
    .entry {
      display: flex;
      flex-wrap: wrap;
      margin-top: 0.625rem;
      .entry_item {
        width: 25%;
        padding: 0.3125rem;
        margin: 0.625rem 0;
        border-right: 0.0625rem solid rgb(180, 180, 180);
        img {
          width: 20px;
        }
      }
      .last_item {
        border: none;
      }
    }
    .spread {
      overflow: scroll;
      flex-wrap: nowrap;
      .entry_item {
        min-width: 25vw !important;
      }
    }
    .arrow {
      justify-content: center;
      align-content: center;
      padding: 5px;
      img {
        width: 20px;
        display: inline-block;
      }
    }
  }
  .card {
    padding: 0 12.5px;
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
  }
}
.swiper-container {
  width: 100%;
}
</style>
