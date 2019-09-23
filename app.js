const Koa = require('koa')
const parser = require('koa-bodyparser')

const catchError = require('./middlewares/exception')

const InitManager = require('./core/init')

const app = new Koa()

// 应用函数对象 中间件(函数)
app.use(catchError) // 全局异常处理异常中间件
app.use(parser())
app.use(async (ctx, next) => {
  // cxt 上下文 洋葱模型, next 下一个中间件
  console.log('a-进')
  await next()
  console.log('a-出')
})

app.use(async (ctx, next) => {
  console.log('b-进')
  await next()
  console.log('b-出')
})

app.use(async (ctx, next) => {
  console.log('c-进')
  await next()
  console.log('c-出')
})

/*
  获取参数:
  1. /v1/:id/book 路径里面的参数 ctx.params

  2. /v1/book?id=5 后面的参数 ctx.request.query

  3. headers里面的参数 ctx.request.headers

  4. body里面的参数 借助koa-bodyparser中间件 ctx.request.body
*/
InitManager.initCore(app)

// 发送http Koa 接收http
app.listen(3000)