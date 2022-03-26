<template>
  <div class="Main">
    <div class="download bg-b fx">
      <div>
        <img src="@/assets/logo.png" alt="" width="100px" />
      </div>
      <div class="center fx-1 fs-w tx-left">
        <div>王者荣耀</div>
        <div class="fs-small fs-g">团队成就更多</div>
      </div>
      <div>
        <button class="btn bg-y fs-small">立即下载</button>
      </div>
    </div>
    <div class="nav bg-y fs-w fx">
      <div class="nav-item active">
        <router-link tag="div" to="/Home">首页</router-link>
      </div>
      <div class="nav-item">
        <router-link tag="div" to="/Some">攻略中心</router-link>
      </div>
      <div class="nav-item">
        <router-link tag="div" to="/Match">赛事中心</router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="less">
.Main {
  .download {
    padding: 0.625rem;
    .center {
      padding-left: 0.625rem;
    }
    .btn {
      padding: 0.3125rem 0.5625rem;
      border-radius: 0.1875rem;
      border: none;
    }
  }
  .nav {
    padding: 0.8125rem;
    justify-content: space-around;
    .nav-item {
      padding: 0.125rem;
      font-size: 0.875rem;
    }
    .active {
      border-bottom: 0.1875rem solid #fff;
    }
  }
}
</style>
