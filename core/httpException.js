class HttpException extends Error {
  constructor(message='服务器错误', code=1010, status=500) {
    super()
    this.code = code // 自定义错误码
    this.message = message // 错误信息
    this.status = status // http错误码
  }
}

// 参数类型错误
class ParameterException extends HttpException {
  constructor(message, code) {
    super()
    this.code = 1002 || code
    this.message = message || '参数错误'
    this.status = 400
  }
}

module.exports = {
  HttpException,
  ParameterException
}