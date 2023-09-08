import { Validator } from './helpers'

export class CategoryValidator extends Validator {
  static categoryNameRules = [(v) => CategoryValidator.isNotEmpty(v)]
  static categoryPhotoRules = [(v) => CategoryValidator.isNotEmpty(v)]
  static categorisRules = [(v) => CategoryValidator.isNotEmpty(v)]

  constructor() {
    super()
  }
}
