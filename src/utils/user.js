import { Validator } from './helpers'

export class UserValidator extends Validator {
  static usernameRules = [
    (v) => UserValidator.isNotEmpty(v),
    (v) => UserValidator.isString(v),
    (v) => UserValidator.isFullName(v),
  ]
  static phoneNumberRules = [
    (v) => UserValidator.isNotEmpty(v),
    (v) => UserValidator.isPhoneNumber(v),
  ]
  static passwordRules = [(v) => UserValidator.isNotEmpty(v)]

  static emailRules = [
    (v) => UserValidator.isNotEmpty(v), 
    (v) => UserValidator.isEmail(v)
  ]
 
  
  constructor() {
    super()
  }

  static isEmail(value) {
    if(!((/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gm).test(value))) {
      return 'البريد الالكتروني غير صحيح'
    }
    return true;
  }

  static isPhoneNumber(value) {
    if (value.trim().length !== 11) {
      return 'رقم الهاتف غير صحيح'
    }
    return true
  }

  static isString(value) {
    if (value.match(/[^أ-ي\s]+/gm) !== null) {
      return 'يرجى عدم كتابة الأرقام أو الرموز أو الحروف الغير عربية.'
    }
    return true
  }

  static isFullName(value) {
    if (value.trim().match(/[أ-ي]+/gm) && value.trim().match(/[أ-ي]+/gm).length <= 3) {
      return 'يجب كتابة الأسم الرباعي'
    } else if (value.trim().split(' ').includes('')) {
      return 'هنالك مسافة زائدة بين الأسماء'
    }

    return true
  }
}
