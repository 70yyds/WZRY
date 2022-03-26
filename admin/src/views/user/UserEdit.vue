<template>
  <div class="category">
    <h1>{{ id ? "编辑" : "新增" }}管理员</h1>
    <el-form label-width="120px" :rules="rules" ref="model" :model="model">
      <el-form-item label="管理员" prop="name">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input show-password v-model="model.password"></el-input>
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
import { getUserByid, editUser, postUser } from "../../api/admin";
export default {
  data() {
    return {
      model: {
        name: "",
        password: "",
      },
      rules: {
        name: [{ required: true, message: "请输入物品", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  created() {
    this.id && this.getDetail();
  },
  methods: {
    // 通过id拿子菜单
    async getDetail() {
      const { data: res } = await getUserByid(this.id);
      this.model.name = res.name;
    },
    handleAvatarSuccess(res) {
      console.log(res);
    },
    save(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.id) {
            // 编辑
            editUser(this.id, Object.assign(this.model)).then((res) => {
              this.$router.push("/user/list");
              this.$message({
                type: "success",
                message: "保存成功",
              });
            });
          } else {
            // 新增
            postUser(this.model).then((res) => {
              this.$router.push("/user/list");
              this.$message({
                type: "success",
                message: "保存成功",
              });
            });
          }
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
