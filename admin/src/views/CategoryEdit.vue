<template>
  <div class="category">
    <h1>{{ id ? "编辑" : "新增" }}分类</h1>
    <el-input
      placeholder="请输入一级分类名称"
      v-model="parentData.name"
      class="input-with-select"
      style="margin-bottom: 20px"
    >
      <el-button
        type="primary"
        slot="append"
        icon="el-icon-check"
        @click="createParent"
      ></el-button>
    </el-input>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="一级分类">
        <el-select v-model="model.parent" placeholder="请选择">
          <el-option
            v-for="item in parents"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="新增次级子分类">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  getDetailByid,
  getList,
  postCate,
  editCate,
  postParent,
  getParentCateList,
} from "../api/admin";
export default {
  data() {
    return {
      model: {
        name: "",
        parent: "",
      },
      parents: [],
      parentData: {
        name: "",
      },
    };
  },
  created() {
    this.getList();
    this.getParentList();
    this.id && this.getDetail();
  },
  methods: {
    // 创建父菜单
    createParent() {
      if (!this.parentData.name) return;
      postParent(this.parentData).then((res) => {});
    },
    // 父列表
    getParentList() {
      getParentCateList().then((res) => {
        console.log(res);
        this.parents = res.data;
      });
    },
    // 子列表
    async getList() {
      let { data: res } = await getList();
      console.log(res);
    },
    // 通过id拿子菜单
    async getDetail() {
      const { data: res } = await getDetailByid(this.id);
      this.model.name = res.name;
    },
    async save() {
      let res;
      if (this.id) {
        // 编辑
        res = await editCate(this.id, Object.assign(this.model));
      } else {
        // 新增
        res = await postCate(this.model);
      }
      this.$router.push("/categories/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
  },
  computed: {
    id() {
      return this.$route.query.id;
    },
  },
};
</script>

<style>
.category {
}
</style>
