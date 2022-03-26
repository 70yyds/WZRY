<template>
  <div>
    <el-table :data="itemslist" style="width: 100%">
      <el-table-column prop="title" label="标题" width="280"> </el-table-column>
      <!-- <el-table-column prop="article" label="文章" width="180"> -->
      <!-- </el-table-column> -->
      <el-table-column label="封面">
        <template slot-scope="scope">
          <img
            :src="scope.row.wallpaper"
            alt=""
            style="height: 3rem"
            v-if="scope.row.wallpaper"
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
import { getArticle, deleteArticle } from "../../api/admin";
export default {
  data() {
    return {
      itemslist: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      let { data: items } = await getArticle();
      this.itemslist = items;
      console.log(items);
    },
    async handleEdit(e) {
      this.$router.push({ path: "/article/create", query: { id: e._id } });
    },

    async handleDelete(e) {
      await deleteArticle(e._id);
      this.getList();
    },
  },
};
</script>

<style></style>
