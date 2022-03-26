<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>请登录</span>
    </div>
    <div>
      <el-form>
        <el-form-item label="用户名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login" @click="login"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
import { login } from "../api/login";
export default {
  data() {
    return {
      form: {
        name: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      login(this.form).then((res) => {
        console.log(res);
        let token = localStorage.getItem("token");
        if (token) {
          this.$router.push("/");
        }
      });
    },
  },
};
</script>

<style lang="less">
.box-card {
  width: 30rem;
  margin: 10rem auto;
  .login {
    width: 10rem;
    display: inline-block;
    margin: 0 auto;
  }
}
</style>
