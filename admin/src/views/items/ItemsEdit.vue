<template>
  <div class="category">
    <h1>{{ id ? "编辑" : "新增" }}物品</h1>
    <el-form label-width="120px" :rules="rules" ref="model" :model="model">
      <el-form-item label="物品" prop="name">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" @click="save('model')"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  itemsList,
  getItemsByid,
  editItems,
  postItems,
  uploadFile,
} from "../../api/admin";
export default {
  data() {
    return {
      model: {
        name: "",
        icon: "",
      },
      rules: {
        name: [{ required: true, message: "请输入物品", trigger: "blur" }],
        icon: [{ required: true, message: "请上传图标", trigger: "blur" }],
      },
    };
  },
  created() {
    this.id && this.getDetail();
  },
  methods: {
    // 通过id拿子菜单
    async getDetail() {
      const { data: res } = await getItemsByid(this.id);
      this.model.name = res.name;
    },
    beforeAvatarUpload(data) {
      let file = new FormData();
      file.append("files", data);
      uploadFile(file).then((res) => {
        console.log(res);
        this.model.icon = res.data.url;
      });
      return false;
    },
    handleAvatarSuccess(res) {
      console.log(res);
    },
    save(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.id) {
            // 编辑
            editItems(this.id, Object.assign(this.model));
          } else {
            // 新增
            postItems(this.model);
          }
          this.$router.push("/items/list");
          this.$message({
            type: "success",
            message: "保存成功",
          });
        } else {
          console.log("error submit!!");
          return false;
        }
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
