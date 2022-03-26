<template>
  <div class="category">
    <h1>{{ id ? "编辑" : "新增" }}英雄</h1>
    <el-form label-width="120px" :rules="rules" ref="model" :model="model">
      <el-form-item label="英雄:" prop="hero">
        <el-input v-model="model.hero"></el-input>
      </el-form-item>
      <el-form-item label="称号:" prop="title">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="职业:" prop="job">
        <el-select
          v-model="model.job"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择文章标签"
        >
          <el-option
            v-for="item in jobOptions"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <!--  -->
      <el-form-item label="难度:" prop="score">
        <div>
          上手难度：
          <el-rate v-model="model.score.difficult"></el-rate>
        </div>
        <div>技能难度：<el-rate v-model="model.score.skills"></el-rate></div>
        <div>攻击：<el-rate v-model="model.score.attack"></el-rate></div>
        <div>生存：<el-rate v-model="model.score.survive"></el-rate></div>
      </el-form-item>
      <el-form-item label="技能:" prop="skills">
        <el-button type="primary" @click="handleShow(model)"
          >添加技能</el-button
        >
      </el-form-item>
      <el-form-item label="顺风出装:" prop="items1">
        <el-select
          v-model="model.items1"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择文章标签"
        >
          <el-option
            v-for="item in itemsOptions"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="逆风出装:" prop="items2">
        <el-select
          v-model="model.items2"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择文章标签"
        >
          <el-option
            v-for="item in itemsOptions"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <!-- string -->
      <el-form-item label="使用技巧:" prop="useTip">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="model.useTip"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="团战技巧:" prop="team">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="model.team"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="战斗技巧:">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="model.battleTips"
        >
        </el-input>
      </el-form-item>

      <!--  -->
      <!-- <el-form-item label="搭档:" prop="patner">
        <el-select
          v-model="heroValueP"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择文章标签"
        >
          <el-option
            v-for="item in heroOptions"
            :key="item._id"
            :label="item.label"
            :value="item.hero"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="counter:" prop="counter">
        <el-select
          v-model="heroValueC"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择文章标签"
        >
          <el-option
            v-for="item in heroOptions"
            :key="item._id"
            :label="item.label"
            :value="item.hero"
          >
          </el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="图标:" prop="avator">
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="model.avator" :src="model.avator" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" @click="save('model')"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
    <skill-modal ref="skill" @ok="handlOk" />
  </div>
</template>

<script>
import {
  getHeroByid,
  editHero,
  postHero,
  uploadFile,
  itemsList,
  heroList,
  getParentCateList,
} from "../../api/admin";
import skillModal from "./skillModal.vue";
export default {
  components: {
    skillModal,
  },
  data() {
    return {
      jobOptions: [],
      heroOptions: [],
      itemsOptions: [], //装备物品
      jobValue: [],
      heroValueP: [], //搭档
      heroValueC: [], //敌人
      //----------------
      model: {
        hero: "",
        avator: "",
        title: "", //称号
        job: "", //职业
        // 上手难度
        score: {
          difficult: 0, //上手
          skills: 0, //技能难度
          attack: 0, //攻击
          survive: 0, //生存
        },
        //技能
        skills: [
          {
            icon: "",
            name: "",
            description: "",
            tips: "",
          },
        ],
        //顺风出装
        items1: [],
        // 逆风出装
        items2: [],
        //使用技巧
        useTip: "",
        //团战技巧
        team: "",
        battleTips: "",
        // 搭档
        // patner: [
        // ],
        // counter: [

        // ],
        //战斗技巧
      },
      rules: {
        hero: [{ required: true, message: "请输入角色", trigger: "blur" }],
        avator: [{ required: true, message: "请上传头像", trigger: "blur" }],
      },
    };
  },
  created() {
    this.id && this.getDetail();
    this.init();
  },
  methods: {
    init() {
      itemsList().then((res) => {
        this.itemsOptions = res.data;
      });
      getParentCateList().then((res) => {
        this.jobOptions = res.data;
      });
      // heroList().then((res) => {
      //   this.heroOptions = res.data;
      // });
    },
    // 通过id拿子菜单
    async getDetail() {
      const { data: res } = await getHeroByid(this.id);
      console.log(res);
      this.model = res;
    },
    beforeAvatarUpload(data) {
      let file = new FormData();
      file.append("files", data);
      uploadFile(file).then((res) => {
        console.log(res);
        this.model.avator = res.data.url;
      });
      return false;
    },
    handleShow(e) {
      this.$refs.skill.showModal();
    },
    save(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.id) {
            // 编辑
            editHero(this.id, Object.assign(this.model)).then((res) => {
              this.$router.push("/hero/list");
              this.$message({
                type: "success",
                message: "修改成功",
              });
            });
          } else {
            // 新增
            postHero(this.model).then((res) => {
              this.$router.push("/hero/list");
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
    handlOk(e) {
      console.log(e);
      this.model.skills = e;
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
.category {
  .el-input {
    width: 200px !important;
  }
  .el-rate {
    display: inline-block !important;
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
    width: 78px;
    height: 78px;
    line-height: 78px;
    text-align: center;
  }
  .avatar {
    width: 78px;
    height: 78px;
    display: block;
  }
}
</style>
