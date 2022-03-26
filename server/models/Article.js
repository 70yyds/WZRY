const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: { type: String },
  article: { type: String },
  wallpaper: { type: String }
})

module.exports = mongoose.model('Article', schema)