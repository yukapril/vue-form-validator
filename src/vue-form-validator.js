/**
 * 获取对象值
 * @param obj
 * @param str
 * @returns {*}
 */
const getValue = (obj, str) => {
  let arr = str.split('.')
  return arr.reduce((val, n) => {
    if (!val) return
    return val[n]
  }, obj)
}

/**
 * 设置对象值
 * @param obj
 * @param str
 * @param value
 * @returns {*}
 */
const setValue = (obj, str, value) => {
  let arr = str.split('.')
  let len = arr.length
  arr.reduce((val, n, idx) => {
    if (idx === len - 1) {
      val[n] = value
    } else {
      val[n] = typeof val[n] === 'object' ? val[n] : {}
    }
    return val[n]
  }, obj)
  return obj
}

/**
 * 判断是否有值
 * @param val
 */
const hasValue = val => {
  return val === 0 || !!val
}

/**
 * 检查所有errorObject 状态
 * @param errorObject
 */
const allCheck = (errorObject) => {
  let flag = true
  for (let item in errorObject) {
    if (item.indexOf('$') !== 0 && !errorObject[item].$valid) {
      flag = false
    }
  }
  errorObject.$valid = flag
}


const checkValues = (options) => {
  let {opts, data, val, flag} = options
  if (opts.regex) {
    let regex = opts.regex.test(val)
    data.regex = regex
    if (!regex) flag = false
  } else {
    data.regex = true
  }

  if (typeof opts.fn === 'function') {
    let fn = !!opts.fn(val)
    data.fn = fn
    if (!fn) flag = false
  } else {
    data.fn = true
  }

  if (typeof opts.length === 'number') {
    let length = val.length === opts.length
    data.length = length
    data.min = true
    data.max = true
    if (!length) flag = false
  } else {
    data.length = true

    if (typeof opts.min === 'number') {
      let min = val.length >= opts.min
      data.min = min
      if (!min) flag = false
    } else {
      data.min = true
    }

    if (typeof opts.max === 'number') {
      let max = val.length <= opts.max
      data.max = max
      if (!max) flag = false
    } else {
      data.max = true
    }
  }
  return flag
}

/**
 * 检查元素有效性
 * @param options
 */
const check = (options) => {
  let {model, val, errorObject, opts} = options
  let data = {}
  setValue(errorObject, model, data)

  let flag = true

  if (opts.isRequired) {
    data.isRequired = hasValue(val)
    if (!val) flag = false
    flag = checkValues({opts, data, val, flag})
  } else {
    data.isRequired = true
    if (hasValue(val)) {
      // 非必输且当前有值，则验证
      flag = checkValues({opts, data, val, flag})
    } else {
      data.regex = true
      data.fn = true
      data.length = true
      data.min = true
      data.max = true
    }
  }
  data.$valid = flag

  let obj
  let modelArr = model.split('.')
  if (modelArr.length >= 2) {
    modelArr.pop()
    let validErrorObject = modelArr.join('.')
    obj = getValue(errorObject, validErrorObject)
  } else {
    obj = errorObject
  }
  allCheck(obj)
}

const Validator = {}

Validator.install = Vue => {
  Vue.prototype.$validator = function (errorObject, options) {
    if (typeof errorObject === 'string') errorObject = getValue(this, errorObject)

    if (!errorObject) throw new Error('[vue-form-validator] errorObject not exist.')
    options.forEach(opts => {
      let model = opts.model
      if (!/^[A-Za-z_]+[A-Za-z\d_.$]+?$/.test(model)) return

      this.$watch(model, val => {
        check({model, val, errorObject, opts})
      })

      let val = getValue(this, model)
      check({model, val, errorObject, opts})
    })
  }
}
export default Validator