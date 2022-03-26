module.exports = (app) => {
  const assert = require('http-assert') //错误信息快捷处理
  // 此组件会拦截错误并可以传入数据进行特定返回数据

  const express = require('express')
  const jwt = require('jsonwebtoken')
  const router = express.Router()//子路由
  //token校验中间键
  const authMiddle = require('../../middleWare/auth')


  // -------------------增删改查通用路由
  // 添加
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  // 修改
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body,)
    res.send(model)
  })
  // 列表
  router.get('/', async (req, res) => {
    let items
    //通过模型名判断需不需要关联字段查询
    if (req.Model.modelName == 'Category') {
      items = await req.Model.find().populate('parent')  //查出parent关联字段 的整个对象 并返回
    } else {
      items = await req.Model.find()
    }
    res.send(items)
  })

  // id获取详情
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })
  // 删除
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndRemove(req.params.id, req.body)
    res.send({ success: true })
  })



  //增加一个动态参数  动态匹配url
  app.use('/admin/api/rest/:resource', authMiddle(), async (req, res, next) => {
    // 中间键 统一对每个请求地址处理模型地址问题，实现增删改查等普通接口的书写优化
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../../models/${modelName}`)
    next()
  }, router)//挂载子路由



  // -------------------资源上传路由
  //文件是如何与其模型关联的   上传文件其实是一个单独的功能，在前端最后保存的时候其实是提交了服务器给的一个url，因此关联
  const multer = require('multer')//使用multer中间键处理上传文件
  const upload = multer({ dest: __dirname + '/../../uploads' })
  app.post('/admin/api/upload', upload.single('files'), async (req, res) => {
    const file = req.file//本身没有req.file 
    file.url = `http://localhost:3000/uploads/${file.filename}` //实际项目中这里应该是从云服务中拿地址返回个前端
    res.send(file)
  })


  // --------------------登录路由
  app.use('/admin/api/login', async (req, res) => {
    const { name, password } = req.body  //解构赋值 方便拿数据
    //通过用户名找用户
    const user = require('../../models/User') //需要用到user这个模块

    const userInfo = await user.findOne({
      name: name
    }).select('+password') //在user模型的搜索，如果有，则追加此模型的password  后续和req.body中的密码进行比对

    assert(userInfo, 422, '用户不存在')//捕获错误抛出

    //校验密码
    const isValid = require('bcryptjs').compareSync(password, userInfo.password)  //比对密码  对应hashSync加密，此方法是解密
    assert(isValid, 422, '密码错误')//捕获错误抛出

    //返回token
    // res.send('success')
    const token = jwt.sign({ id: userInfo._id }, app.get('secret'))//生成token
    res.send({ token: token })
  })

  //登录校验的步骤思路   以下内容为登录路由完成，并配置好了密钥
  //---用户名校验
  // 1  前端输入用户名，密码，调用登录接口
  // 2  后端拿到请求body，解构出用户名和密码
  // 3  引入用户模块，拿数据库的用户名与前端传的用户名进行比对，如果有就追加这个模型的密码，此时模型中的密码已经散列加密了，需要加解密
  //
  //---密码校验
  // 1  使用bcrypt对模型中的密码进行解密，并与前端传回的密码进行比对
  // 
  // 用户名与密码都正确则返回给前端token，前端保存token并在请求拦截器中添加请求头:type token
  //---生成token
  // 1  使用jsonwebtoken插件，给指定id生成token，并加入密钥进行保险
  // 此后用户的每次请求都会携带token，后端则需要判断token是否存在且正确
  // 所以理论上，后端需要给所有接口添加token校验


  // 错误信息处理异步函数
  app.use(async (err, req, res, next) => {
    console.log(err);
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}


