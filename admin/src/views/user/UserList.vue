<template>
  <div>
    <el-table :data="itemslist" style="width: 100%">
      <el-table-column prop="name" label="管理员"> </el-table-column>
      <!-- <el-table-column prop="password" label="密码"> </el-table-column> -->
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
import { getUser, deleteUser } from "../../api/admin";
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
      let { data: items } = await getUser();
      this.itemslist = items;
      console.log(items);
    },
    async handleEdit(e) {
      this.$router.push({ path: "/user/create", query: { id: e._id } });
    },

    async handleDelete(e) {
      await deleteUser(e._id);
      this.getList();
    },
  },
};
</script>

<style></style>
