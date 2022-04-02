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
    <!-- 入口站 -->
    <entry-box></entry-box>
    <msg-card :messageInfo="messageInfo" class="mssage"></msg-card>
    <hero-list :messageInfo="heroList" />
  </div>
</template>

<script>
import { messageInfo, heroList } from "./message";
import entryBox from "@/components/entryBox/EntryBox";
import msgCard from "@/components/card/MsgCard";
import HeroList from "@/components/heroList/HeroList";
export default {
  components: { entryBox, msgCard, HeroList },
  data() {
    return {
      messageInfo,
      heroList,
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
  methods: {},
};
</script>

<style lang="less">
.home {
  img {
    width: 100%;
  }
  .mssage {
    margin-bottom: 10px;
  }
}
.swiper-container {
  width: 100%;
}
</style>
