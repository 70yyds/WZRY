<template>
  <el-dialog
    title="提示"
    :visible.sync="visible"
    width="50%"
    center
    class="skillmodal"
  >
    <el-button type="primary" @click="(rule) => rules.push({})"
      >添加技能</el-button
    >
    <!-- <span>需要注意的是内容是默认不居中的</span> -->
    <div style="display: flex; flex-wrap: wrap">
      <el-form label-width="120px" v-for="(item, index) in rules" :key="index">
        <el-form-item label="技能名称">
          <el-input v-model="item.name"></el-input>
        </el-form-item>
        <el-form-item label="技能描述">
          <el-input v-model="item.description"></el-input>
        </el-form-item>
        <el-form-item label="小提示">
          <el-input v-model="item.tips"></el-input>
        </el-form-item>
        <el-form-item label="技能图标">
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :http-request="handleImg"
            :data="{ imgindex: index }"
            :key="renderIndex"
          >
            <img v-if="item.icon" :src="item.icon" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="handleSave()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { uploadFile } from "../../api/admin";
export default {
  data() {
    return {
      visible: false,
      imageUrl: "",
      rules: [{}],
      imgindex: null,
      renderIndex: 1,
    };
  },
  methods: {
    forceRender() {
      this.renderIndex++;
    },
    showModal() {
      this.visible = true;
    },
    handleImg(data) {
      let file = new FormData();
      file.append("files", data.file);
      uploadFile(file).then((res) => {
        console.log(res);
        this.rules[data.data.imgindex].icon = res.data.url;
        this.forceRender();
        console.log(this.rules[data.data.imgindex].icon);
      });
      return false;
    },
    handleSave() {
      this.$emit("ok", this.rules);
    },
    cancel() {
      this.visible = false;
      this.rules = [{}];
    },
  },
};
</script>

<style lang="less">
.skillmodal {
}
</style>
