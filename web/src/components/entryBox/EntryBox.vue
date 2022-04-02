<template>
  <div class="box bg-w">
    <div class="entry" :class="{ spread: newSpread }">
      <div
        class="entry_item"
        :class="{ last_item: (i == 10 || i % 4 == 0) && !newSpread }"
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
      v-if="!newSpread"
    >
      <img src="@/assets/icon/arrow.png" alt="" />
      <div>收起</div>
    </div>
    <div class="arrow fx fs-g fs-small bg-g" @click="handleSpread" v-else>
      <img src="@/assets/icon/Darrow.png" alt="" />
      <div>展开</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newSpread: false,
    };
  },
  methods: {
    handleSpread() {
      this.newSpread = !this.newSpread;
    },
  },
};
</script>
<style lang="less">
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
</style>
