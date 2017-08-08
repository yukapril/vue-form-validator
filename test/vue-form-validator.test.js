import Vue from 'vue'
import Validator from '../src/vue-form-validator'
Vue.use(Validator)

describe('normal', () => {
  const rules = [
    {
      model: 'name',
      isRequired: true,
      regex: /^[A-Za-z]+$/,
      min: 2,
      max: 6,
      fn: val => val !== 'admin'
    },
    {
      model: 'age',
      min: 1,
      max: 2
    }
  ]

  const vm = new Vue({
    data(){
      return {
        name: '',
        age: '',
        err: {}
      }
    },
    created(){
      this.$validate(rules, this.err)
    }
  })

  test('name-1', done => {
    vm.name = 'abcdefghijklmn'
    setTimeout(() => {
      expect(vm.err.name.isRequired).toBe(true)
      expect(vm.err.name.regex).toBe(true)
      expect(vm.err.name.min).toBe(true)
      expect(vm.err.name.max).toBe(false)
      expect(vm.err.name.fn).toBe(true)
      expect(vm.err.name.$valid).toBe(false)
      done()
    }, 100)
  })
  test('name-2', done => {
    vm.name = 'admin'
    setTimeout(() => {
      expect(vm.err.name.isRequired).toBe(true)
      expect(vm.err.name.regex).toBe(true)
      expect(vm.err.name.min).toBe(true)
      expect(vm.err.name.max).toBe(true)
      expect(vm.err.name.fn).toBe(false)
      expect(vm.err.name.$valid).toBe(false)
      done()
    }, 100)
  })
  test('age-1', done => {
    vm.age = ''
    setTimeout(() => {
      expect(vm.err.age.isRequired).toBe(true)
      expect(vm.err.age.regex).toBe(true)
      expect(vm.err.age.min).toBe(true)
      expect(vm.err.age.max).toBe(true)
      expect(vm.err.age.fn).toBe(true)
      expect(vm.err.age.$valid).toBe(true)
      done()
    }, 100)
  })
  test('age-1', done => {
    vm.age = '200'
    setTimeout(() => {
      expect(vm.err.age.isRequired).toBe(true)
      expect(vm.err.age.regex).toBe(true)
      expect(vm.err.age.min).toBe(true)
      expect(vm.err.age.max).toBe(false)
      expect(vm.err.age.fn).toBe(true)
      expect(vm.err.age.$valid).toBe(false)
      done()
    }, 100)
  })
  test('valid-1', done => {
    vm.name = 'abcdefghijklmn'
    vm.age = '200'
    setTimeout(() => {
      expect(vm.err.$valid).toBe(false)
      done()
    }, 100)
  })
  test('valid-2', done => {
    vm.name = 'abcde'
    vm.age = ''
    setTimeout(() => {
      expect(vm.err.$valid).toBe(true)
      done()
    }, 100)
  })
})

describe('form-in-object', () => {
  const rules = [
    {
      model: 'form.name',
      isRequired: true,
      min: 2,
      max: 6
    }
  ]

  const vm = new Vue({
    data(){
      return {
        form: {
          name: ''
        },
        err: {}
      }
    },
    created(){
      this.$validate(rules, this.err)
    }
  })

  test('name', done => {
    vm.form.name = 'abcdefghijklmn'
    setTimeout(() => {
      expect(vm.err.form.name.isRequired).toBe(true)
      expect(vm.err.form.name.regex).toBe(true)
      expect(vm.err.form.name.min).toBe(true)
      expect(vm.err.form.name.max).toBe(false)
      expect(vm.err.form.name.fn).toBe(true)
      expect(vm.err.form.name.$valid).toBe(false)
      done()
    }, 100)
  })
})

describe('rules-length', () => {
  const rules = [
    {
      model: 'form.name',
      isRequired: true,
      length: 5,
      min: 10,
      max: 20
    }
  ]

  const vm = new Vue({
    data(){
      return {
        form: {
          name: ''
        },
        err: {}
      }
    },
    created(){
      this.$validate(rules, this.err)
    }
  })

  test('name', done => {
    vm.form.name = 'abcdefghijklmn'
    setTimeout(() => {
      expect(vm.err.form.name.isRequired).toBe(true)
      expect(vm.err.form.name.regex).toBe(true)
      expect(vm.err.form.name.length).toBe(false)
      expect(vm.err.form.name.min).toBe(true)
      expect(vm.err.form.name.max).toBe(true)
      expect(vm.err.form.name.fn).toBe(true)
      expect(vm.err.form.name.$valid).toBe(false)
      done()
    }, 100)
  })
})

describe('invalid-length', () => {
  const rules = [
    {
      model: 'form.age',
      isRequired: true,
      regex: /^\d+$/,
      min: 'a',
      max: '2'
    }
  ]

  const vm = new Vue({
    data(){
      return {
        form: {
          age: ''
        },
        err: {}
      }
    },
    created(){
      this.$validate(rules, this.err)
    }
  })

  test('age', done => {
    vm.form.age = '200'
    setTimeout(() => {
      expect(vm.err.form.age.isRequired).toBe(true)
      expect(vm.err.form.age.regex).toBe(true)
      expect(vm.err.form.age.length).toBe(true)
      expect(vm.err.form.age.min).toBe(true)
      expect(vm.err.form.age.max).toBe(true)
      expect(vm.err.form.age.fn).toBe(true)
      expect(vm.err.form.age.$valid).toBe(true)
      done()
    }, 100)
  })
})

describe('error-object-in-string', () => {
  const rules = [
    {
      model: 'form.age',
      isRequired: true,
      regex: /^\d+$/
    }
  ]

  const vm = new Vue({
    data(){
      return {
        form: {
          age: ''
        },
        err: {}
      }
    },
    created(){
      this.$validate(rules, 'err')
    }
  })

  test('age', done => {
    vm.form.age = '200'
    setTimeout(() => {
      expect(vm.err.form.age.isRequired).toBe(true)
      expect(vm.err.form.age.regex).toBe(true)
      expect(vm.err.form.age.length).toBe(true)
      expect(vm.err.form.age.min).toBe(true)
      expect(vm.err.form.age.max).toBe(true)
      expect(vm.err.form.age.fn).toBe(true)
      expect(vm.err.form.age.$valid).toBe(true)
      done()
    }, 100)
  })
})

describe('error-object-at-default', () => {
  const rules = [
    {
      model: 'form.age',
      isRequired: true,
      regex: /^\d+$/
    }
  ]

  const vm = new Vue({
    data(){
      return {
        form: {
          age: ''
        }
      }
    },
    created(){
      this.$validate(rules)
    }
  })

  test('age', done => {
    vm.form.age = '200'
    setTimeout(() => {
      expect(vm.$validator.form.age.isRequired).toBe(true)
      expect(vm.$validator.form.age.regex).toBe(true)
      expect(vm.$validator.form.age.length).toBe(true)
      expect(vm.$validator.form.age.min).toBe(true)
      expect(vm.$validator.form.age.max).toBe(true)
      expect(vm.$validator.form.age.fn).toBe(true)
      expect(vm.$validator.form.age.$valid).toBe(true)
      done()
    }, 100)
  })
})

describe('error-object-in-fail-object', () => {
  const rules = [
    {
      model: 'form.age',
      isRequired: true,
      regex: /^\d+$/
    }
  ]

  const vm = new Vue({
    data(){
      return {
        form: {
          age: ''
        }
      }
    },
    created(){
      this.$validate(rules, this.asdf)
    }
  })

  test('object', done => {
    vm.form.age = '200'
    setTimeout(() => {
      expect(vm.$validator.form.age.isRequired).toBe(true)
      done()
    }, 100)
  })
})

describe('error-object-in-unexist-string', () => {
  const rules = [
    {
      model: 'form.age',
      isRequired: true,
      regex: /^\d+$/
    }
  ]

  const vm = new Vue({
    data(){
      return {
        form: {
          age: ''
        }
      }
    },
    created(){
      this.$validate(rules, 'asdf')
    }
  })

  test('string', done => {
    vm.form.age = '200'
    setTimeout(() => {
      expect(vm.asdf.form.age.isRequired).toBe(true)
      done()
    }, 100)
  })
})