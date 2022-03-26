const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  hero: { type: String },
  avator: { type: String },
  title: { type: String },//称号
  job: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],//职业
  //上手
  score: {
    difficult: { type: Number },//上手
    skills: { type: Number },//技能难度
    attack: { type: Number },//攻击
    survive: { type: Number },//生存
  },
  //技能
  skills: [{
    icon: { type: String },
    name: { type: String },
    description: { type: String },
    tips: { type: String },
  }],
  //顺风出装
  items1: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  // 逆风出装
  items2: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  //使用技巧
  useTip: { type: String },
  //团战技巧
  team: { type: String },
  // 搭档
  patner: [
    {
      type: mongoose.Schema.Types.ObjectId, ref: 'Hero',
      description: { type: String },
    }
  ],
  //counter
  // counter: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId, ref: 'Hero',
  //     description: { type: String },
  //   }
  // ],
  //战斗技巧
  battleTips: { type: String }
})

module.exports = mongoose.model('hero', schema)