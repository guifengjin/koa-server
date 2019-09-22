const Router = require('koa-router')
const router = new Router()

router.get('/v1/classic/list', (ctx, next) => {
  ctx.body = {
    path: ctx.path
  }
})

module.exports = router