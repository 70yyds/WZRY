<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="一级菜单" name="first">
        <el-table :data="parentlist" style="width: 100%">
          <el-table-column prop="_id" label="id" width="280"> </el-table-column>
          <el-table-column prop="name" label="名称" width="180">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="deleteParentByid(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="二级菜单" name="second">
        <el-table :data="childrenList" style="width: 100%">
          <el-table-column prop="_id" label="id" width="280"> </el-table-column>
          <el-table-column prop="name" label="名称" width="180">
          </el-table-column>
          <el-table-column prop="parent.name" label="父菜单" width="180">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row)"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {
  getList,
  getParentCateList,
  deleteCate,
  deleteParentByid,
} from "../api/admin";
export default {
  data() {
    return {
      activeName: "first",
      parentlist: [],
      childrenList: [],
    };
  },
  created() {
    this.getParentList();
    this.getList();
  },
  methods: {
    // 父列表
    getParentList() {
      getParentCateList().then((res) => {
        console.log(res);
        this.parentlist = res.data;
      });
    },
    async getList() {
      let { data: items } = await getList();
      this.childrenList = items;
      console.log(items);
    },
    async handleEdit(e) {
      this.$router.push({ path: "/categories/create", query: { id: e._id } });
    },
    async deleteParentByid(e) {
      await deleteParentByid(e._id);
      this.getParentList();
    },
    async handleDelete(e) {
      await deleteCate(e._id);
      this.getList();
    },
  },
};
</script>

<style></style>
