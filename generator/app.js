//系统模块
const path = require('path')

//express模块
const express = require('express')
const app = new express()
//提供程序的进入端口
const httpPort = 3000

//设置模版引擎
app.set('view engine', 'ejs')
//配置静态资源
app.use('/public', express.static(path.join(__dirname, 'public')))
//路由器
const router_main = require('./routers/main')
//配置路由
app.use('/main', router_main)

//开启监听
app.listen(httpPort, () => {
    console.log(`This App Listening on port ${httpPort}`)
})