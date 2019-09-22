const Router = require('koa-router')
const requireDirectorys = require('require-directory')

class InitManager {

  static initCore(app) {
    InitManager.app = app
    InitManager.initLoadRouters()
  }

  // 初始化路由
  static initLoadRouters() {
    const apiDirectory = `${process.cwd()}/app/api` // process.cwd() 根目录
    // 将路由一一注册
    requireDirectorys(module, apiDirectory, { visit: renderModule })

    function renderModule(obj) {
      if (obj instanceof Router) {
        InitManager.app.use(obj.routes()) // obj.routes() Router自带的方法
      }
    }
  }
}

module.exports = InitManager