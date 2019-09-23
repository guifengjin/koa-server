/* 
  全局异常捕捉中间件
  1. 捕捉错误
  2. 返回一段有意义的错误信息给客服端
    http code
    error code 自定义
    message

    已知错误 em:参数类型错误  param int ---> 'abc'
    未知错误 程序潜在错误,em: 数据库账号密码错误
*/
const { HttpException } = require('../core/httpException')

const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    if(error instanceof HttpException) { // 已知异常
      ctx.body = {
        msg: error.message,
        code: error.code,
        requestUrl: `${ctx.method} ${ctx.path}`
      }
      ctx.status = error.status
    }else { // 未知异常
      ctx.body = {
        msg: '未知错误',
        code: 1010,
        requestUrl: `${ctx.method} ${ctx.path}`
      }
      ctx.status = 500
    }
  }
}

module.exports = catchError