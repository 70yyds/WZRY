<template>
  <div>
    <el-table :data="itemslist" style="width: 100%">
      <el-table-column prop="_id" label="id" width="280"> </el-table-column>
      <el-table-column prop="hero" label="英雄" width="180"> </el-table-column>
      <el-table-column label="职业" width="180">
        <template slot-scope="scope">
          <span v-for="(item, index) in tojob(scope.row.job)" :key="index">
            {{ item.name }}/</span
          >
        </template>
      </el-table-column>
      <el-table-column prop="title" label="称号" width="180"> </el-table-column>
      <el-table-column label="图标">
        <template slot-scope="scope">
          <img
            :src="scope.row.avator"
            alt=""
            style="height: 3rem"
            v-if="scope.row.avator"
          />
          <span v-else>暂无</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  heroList,
  getHeroByid,
  editHero,
  postHero,
  deleteHero,
  getParentCateList,
} from "../../api/admin";
export default {
  data() {
    return {
      itemslist: [],
      jobList: [], //总分类
      newJob: [],
    };
  },
  async created() {
    this.getList();
    await this.getJob();
  },
  computed: {},
  methods: {
    // do 目前没正确获得该数组
    tojob(arr, index) {
      let newarr = this.jobList.filter((e) => {
        return arr.some((item) => item == e._id);
      });
      return newarr;
    },
    // 获取全部分类
    getJob() {
      getParentCateList().then((res) => {
        console.log(res.data);
        this.jobList = res.data;
      });
    },
    // 获取表格数据
    async getList() {
      let { data: res } = await heroList();
      console.log(res);
      this.itemslist = res;
    },
    async handleEdit(e) {
      this.$router.push({ path: "/hero/create", query: { id: e._id } });
    },

    async handleDelete(e) {
      await deleteHero(e._id);
      this.getList();
    },
  },
};
</script>

<style></style>
