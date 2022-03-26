const express = require('express')


const app = express()

app.use(require('cors')())//跨域
app.use(express.json())//中间键  把请求body解析为json
app.use('/uploads', express.static(__dirname + '/uploads'))//暴露静态文件给前端，否则访问不到
app.set('secret', '1w2e23r3rf3f47')//全局设定一个简单的密钥

require('./routes/admin')(app)
require('./plugins/db')(app)


app.listen(3000, () => {
  console.log('running')
})