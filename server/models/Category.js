const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Parentcate' }//创建父级分类字段   关联category模型
})
module.exports = mongoose.model('Category', schema)