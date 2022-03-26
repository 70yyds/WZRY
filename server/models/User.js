const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  password: {
    type: String,
    select: false,
    set(val) {
      //bcrypt 对密码进行散列加密  hashsync方法 第二个是保密等级
      return require('bcryptjs').hashSync(val, 10)
    }
  },
})

module.exports = mongoose.model('User', schema)