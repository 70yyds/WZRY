<template>
  <div class="card bg-w">
    <div class="head">
      <div class="fs-big">新闻资讯</div>
      <div>...</div>
    </div>
    <a-tabs :active-key="selectIndex" @change="handleChange">
      <a-tab-pane v-for="(item, index) in messageInfo" :key="item.id">
        <template slot="tab">
          <div :class="{ active: index + 1 == selectIndex }">
            {{ item.name }}
          </div>
        </template>

        <div class="messageItem fx" v-for="(i, j) in item.message" :key="j">
          <div>{{ i.msg }}</div>
          <div>{{ i.date }}</div>
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
        return {};
      },
    },
  },
  data() {
    return {
      selectIndex: 1,
    };
  },
  methods: {
    handleChange(e) {
      this.selectIndex = e;
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
  .messageItem {
    justify-content: space-between;
    margin-bottom: 10px;
    div:nth-child(1) {
      max-width: 75%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
</style>
