<template>
  <div>
    <el-table :data="itemslist" style="width: 100%">
      <el-table-column prop="_id" label="id" width="280"> </el-table-column>
      <el-table-column prop="name" label="名称" width="180"> </el-table-column>
      <el-table-column label="图标">
        <template slot-scope="scope">
          <img
            :src="scope.row.icon"
            alt=""
            style="height: 3rem"
            v-if="scope.row.icon"
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
  itemsList,
  getItemsByid,
  editItems,
  postItems,
  deleteItems,
} from "../../api/admin";
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
      let { data: items } = await itemsList();
      this.itemslist = items;
      console.log(items);
    },
    async handleEdit(e) {
      this.$router.push({ path: "/items/create", query: { id: e._id } });
    },

    async handleDelete(e) {
      await deleteItems(e._id);
      this.getList();
    },
  },
};
</script>

<style></style>
