module.exports = options => {
  const assert = require('http-assert') //错误信息快捷处理
  const jwt = require('jsonwebtoken')
  const User = require('../models/User')


  return async (req, res, next) => {
    const token = String(req.headers.authorization || '').split(' ').pop() //'bearer token' split之后变成了数组，pop方法取尾项token
    assert(token, 401, '请提供jwtToken 请先登录')
    //这里app实例拿不到  使用req中的实例
    const { id } = jwt.verify(token, req.app.get('secret')) //与jwt.sign()对应，输入密钥，解密token 拿到登录用户的id
    req.user = await User.findById(id)//在模型中找到此id对应得用户  找不到则报错让前端跳转到登录页重新登录
    assert(req.user, 401, '请先登录')
    await next()
  }
  // 
  // 此中间键作用于各个通用接口的时候，用于校验用户是否携带token操作接口，没有则表示非法用户不予操作
  // 
}
