<template>
  <div class="category">
    <h1>{{ id ? "编辑" : "新增" }}文章</h1>
    <el-form label-width="120px" :rules="rules" ref="model" :model="model">
      <el-form-item label="标题" prop="title">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="文章" prop="article">
        <el-upload
          v-show="false"
          class="avatar-uploader1"
          :show-file-list="false"
          action=""
          :http-request="upload"
        >
          <i class="el-icon-plus avatar-uploader-icon custom-img"></i>
        </el-upload>
        <quill-editor
          v-model="model.article"
          ref="myQuillEditor"
          :options="editorOption"
        />
      </el-form-item>
      <el-form-item label="封面" prop="wallpaper">
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="model.wallpaper" :src="model.wallpaper" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" @click="save('model')">
          保存
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  getArticle,
  getArticleByid,
  editArticle,
  postArticle,
  uploadFile,
} from "../../api/admin";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
export default {
  components: {
    quillEditor,
  },
  data() {
    return {
      model: {
        title: "",
        article: "",
        wallpaper: "",
      },
      editorOption: {
        // some quill options
        modules: {
          toolbar: {
            container: [
              // 工具栏配置, 默认是全部
              ["bold"],
              ["italic"],
              ["underline"],
              ["strike"],
              [{ header: 1 }, { header: 2 }],
              [{ color: [] }, { background: [] }],
              [{ align: [] }],
              [{ header: [1, 2, 3, 4, 5, 6, !1] }],
              //    ['blockquote'], ['code-block'],//不需要的可以干掉
              ["image"],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ direction: "rtl" }],
            ],
            handlers: {
              image: function (value) {
                if (value) {
                  // 给个点击触发ele框选择图片文件
                  document.querySelector(".custom-img").click();
                } else {
                  this.quill.format("image", false);
                }
              },
            },
          },
        },
      },
      url: "",
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        article: [{ required: true, message: "请编写文章", trigger: "blur" }],
      },
    };
  },
  created() {
    this.id && this.getDetail();
  },
  methods: {
    // 通过id拿子菜单
    async getDetail() {
      const { data: res } = await getArticleByid(this.id);
      console.log(res);
      this.model = res;
    },
    beforeAvatarUpload(data) {
      let file = new FormData();
      file.append("files", data);
      uploadFile(file).then((res) => {
        console.log(res);
        this.model.wallpaper = res.data.url;
      });
      return false;
    },
    handleAvatarSuccess(res) {
      console.log(res);
    },
    upload(data) {
      let file = new FormData();
      file.append("files", data.file);
      uploadFile(file).then((res) => {
        this.url = res.data.url;
        let quill = this.$refs.myQuillEditor.quill;
        // 如果上传成功
        //console.log(res)
        // 获取光标所在位置
        if (res) {
          let length = quill.getSelection().index;
          // 插入图片  res为服务器返回的图片地址
          quill.insertEmbed(length, "image", this.url);
          // 调整光标到最后
          quill.setSelection(length + 1);
          this.$message("上传成功");
        } else if (res.file.status === "error") {
          this.$message("图片插入失败");
        }
      });
    },
    save(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.id) {
            // 编辑
            editArticle(this.id, Object.assign(this.model));
          } else {
            // 新增
            postArticle(this.model);
          }
          this.$router.push("/article/list");
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

<style lang="less">
.ql-editor {
  img {
    width: 100px;
  }
}
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
