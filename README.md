### Koa

#### 洋葱模型

![img](http://www.json119.com/content/images/2018/10/1.png)

koa2 的中间件是洋葱模型。基于async/await 可以更好的处理异步操作。

想象一下拿针从洋葱穿过, 最外层a(进)-->里面一层b(进)--->中心层c(进)--->中心层c(出)--->里面一层b(出)--->最外层a(出)

这样做的好处是什么?

首先我们想想异步编程最难的是什么？没错就是代码执行的顺序，因为我们无法知道某一段异步代码什么时候执行完成。

Koa遇到next执行下一个中间件,通过async/await来将我们的异步代码分为"进"层和"出"层,让我们编写异步代码就像同步代码一样简单。

示例代码:
```js
const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
    // cxt 上下文 洋葱模型, next 下一个中间件
    console.log('a-进')
    await next()
    // 模拟异步
    setTimeout(() => {
    	console.log('a-出')
    }, 1000)
})

app.use(async (ctx, next) => {
    // 模拟异步
    setTimeout(() => {
    	console.log('b-进')
    }, 1000)
    await next()
    console.log('b-出')
})

app.use(async (ctx, next) => {
    console.log('c-进')
    await next()
    console.log('c-出')
})

app.listen(3000)

// 结果是: a-进 b-进 c-进 c-出 b-出 a-出
``` 

#### 中间件

中间件可以理解为帮助我们实现某一项功能的函数
```js
// app.js
const middlewareName = require('./middlewares/xxx') // 引入中间件

// app.use使用中间件
app.use(async (ctx, next) => { // 中间件1
    // 需要实现的功能代码
    await next()
})
app.use(middlewareName) // 中间件2
```

### 初始化项目

1. `npm init` 或者 `yarn init` ,版本信息等自己填写
2. 安装依赖: `yarn` 或者 `npm`
```js
axios 
basic-auth 
bcryptjs 
jsonwebtoken 
koa 
koa-bodyparser 
koa-router
koa-static 
lodash 
mysql2 
npm-check 
require-directory 
sequelize validator
```
3. 新建app.js
```js
const Koa = require('koa')
const parser = require('koa-bodyparser')
/*
    获取参数:
    1. /v1/:id/book 路径里面的参数 ctx.params
    2. /v1/book?id=5 后面的参数 ctx.request.query
    3. headers里面的参数 ctx.request.headers
    4. body里面的参数 借助koa-bodyparser中间件 ctx.request.body+
*/
... // 具体代码请看 app.js
app.listen(3000)
```

### 全局异常捕捉中间件

1. 捕捉错误 `try catch`
2. 返回一段有意义的错误信息给客服端 `ctx.body`
	status: http 状态码
	code: 自定义状态码
	message: 自定义状态码信息

exception.js
```js
const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
	// 这里可以进行统一处理请求异常
    ctx.body = "程序异常"
  }
}

module.exports = catchError
```
异常统一处理请看core目录下的`httpException.js`

错误分类:

1. 已知错误, em: 参数错误

2. 未知错误(程序潜在错误), em: 数据库连接错误, 服务器代码错误  
 
| status | code | message |  
| --- | --- | --- |
| 200 | 1000 | 请求成功 |
| 304 | 1001 | 文件未修改 |
| 400 | 1002 | 参数错误 |
| 401 | 1003 | 未授权 |  
| 403 | 1004 | 禁止访问 |
| 404 | 1005 | 未找到 | 
| 405 | 1006 | 请求方法错误 |
| 408 | 1008 | 请求超时 |
| 500 | 1010 | 服务器错误 |
| 503 | 1011 | 服务器暂时不可用 |


### 查看具体效果

1. `git clone https://github.com/guifengjin/koa-server.git`
2. `cd koa-server`
3. 安装依赖: `yarn` or `npm`
4. `node app.js`
5. GET http://localhost:3000/v1/book/list?id=8 ,注: id必须为正整数, 
