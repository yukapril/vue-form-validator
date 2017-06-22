const Validator = {};

const allCheck = (observerObj) => {
    let flag = true;
    for (let item in observerObj) {
        if (item.indexOf('$') != 0 && !observerObj[item].valid) {
            flag = false;
        }
    }
    observerObj.$valid = flag;
};

const check = (observerObj, options, val) => {
    let model = options.model;
    val = val !== undefined ? val : options.value;

    observerObj[model] = observerObj[model] || {};

    let flag = true;

    observerObj[model].isRequired = !!val;
    if (!val) flag = false;

    let regex = options.regex.test(val);
    observerObj[model].regex = regex;
    if (!regex) flag = false;

    if (typeof options.fn === 'function') {
        let fn = !!options.fn(val);
        observerObj[model].fn = fn;
        if (!fn) flag = false;
    }
    if (options.length) {
        let length = val.length === options.length;
        observerObj[model].length = length;
        if (!length) flag = false;
    } else {
        let min = val.length >= options.min;
        observerObj[model].min = min;
        if (!min) flag = false;

        let max = val.length <= options.max;
        observerObj[model].max = max;
        if (!max) flag = false;
    }

    observerObj[model].valid = flag;
    allCheck(observerObj);
};

Validator.install = function (Vue) {
    Vue.prototype.$validator = function (observerObj, options) {
        for (let key in options) {
            let keyOptions = options[key];
            let model = keyOptions.model;

            check(observerObj, keyOptions);

            this.$watch(model, (newVal, oldVal) => {
                check(observerObj, keyOptions, newVal);
            });
        }
    }
};
export default Validator;