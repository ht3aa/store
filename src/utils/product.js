import { Validator } from './helpers'

export class ProductValidator extends Validator {
  static productNameRules = [(v) => ProductValidator.isNotEmpty(v)]

  static productDesriptionRules = [(v) => ProductValidator.isNotEmpty(v)]

  static productPriceRules = [(v) => ProductValidator.isNotEmpty(v)]

  static productQuantityRules = [(v) => ProductValidator.isNotEmpty(v)]

  static productPhotosRules = [(v) => ProductValidator.isNotEmpty(v)]
  constructor() {
    super()
  }
  static isStartWithZero(value) {
    if (value.trim().indexOf('0') === 0) {
      return 'العمر غير صحيح'
    }
    return true
  }
}
