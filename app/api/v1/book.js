const Router = require('koa-router')
const router = new Router()
const { ParameterException } = require('../../../core/httpException')

const { IntegerValidator } = require('../../validators/validators')


router.get('/v1/book/list', (ctx, next) => {

  const v = new IntegerValidator().validate(ctx)

  const id = v.get('query.id')
  ctx.body = {
    id,
    path: ctx.path,
  }
})

module.exports = router