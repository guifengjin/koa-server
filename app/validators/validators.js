const { LinValidator, Rule } = require('../../core/lin-validator')

class IntegerValidator extends LinValidator {
  constructor() {
    super()
    this.id = [
      new Rule('isInt', '需要正整数', {min: 1}) // 检验规则 提示 可选参数
    ]
  }
}

module.exports = {
  IntegerValidator
}