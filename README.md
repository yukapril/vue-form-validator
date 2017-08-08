# Vue Form Validator

## 用法

1. 引入插件：

```
Vue.use(Validator);
```

2. 组件内例子：

```vue
<template>
    <div>
        <input type="text" v-model="name">
      	<span v-if="error.name" style="color: #c00">
			<span v-if="!error.name.isRequired">please input</span>
        </span>
    </div>
</template>

<script>
    export default {
        name: 'FormValidator',
        data () {
            return {
                name: 'Jason',
                error: {}
            };
        },
        mounted(){
            this.$validate(this.error, [
                {
                    model: 'name',
                    isRequired: true,
                    regex: /^[A-Za-z]+$/,
                    max: 10,
                    min: 3
                }
            ]);
        }
    }
</script>
```

## 用法

#### 初始化

 `this.$validate(Rules,[errorObject])` 

* `errorObject` 支持 `string` 或 `VueOberverObject`，如果为空，则在当前实例上创建 `$validator` 对象

  例如：

```js
this.$validate(Rules, this.error)
// 或者
this.$validate(Rules, 'error')

// 如果不提供 errorObject，则为
this.$validate(Rules)
// 获取验证结果，调用 this.$validator
```

> **说明**
>
> 1. 使用指定错误对象的方式
>
> - 如果传入对象 `Object` 不存在，则默认使用 `$validator` 作为错误对象
> - 如果传入字符串 `String` ，且此字符串对应对象不存在，则默认创建以字符串命名的对象
> - 其他情况，默认使用 `$validator` 作为错误对象
>
> 2. 在页面使用错误对象时，需要判断错误对象是否存在。

* Rules



```javascript
[
	{
		model: 'form2.user',         // 绑定到那个模型
        isRequired: true,            // 是否为必须选项
        regex: /^[A-Za-z]+$/,        // 正则验证
        fn: val => val !== 'admin',  // 自定义验证
        length: 5,                   // 长度验证，如果length有明确值，则不会验证max/min
        max: 6,                      // 最大长度验证
        min: 2                       // 最小长度验证
	},
...       
]
```

需要说明的是，如果 `isRequired` 为 `false`，那么只有当前输入框有值，才会触发其他验证。

#### 错误对象

在组件中绑定的 `errorObject` （或者默认的 `$validator`），后续可以通过此对象进行观察变动。比如例中，绑定在 `this.error` 中，则

```javascript
console.log(this.error)
//-------------------
{
	name: { // 观察者命名，下文中可配置
      	isRequired: true,  // 必输入验证结果
        length: true,	   // 长度验证结果
   	 	max: true,		  // 最大长度验证结果
    	min: true,		  // 最小长度验证结果
    	regex: true, 	  // 正则验证结果
    	fn: true,		 // 手动验证结果
    	valid: true 	 // 当前控件验证结果
	},
  	...
    $valid: true 		// 所有控件验证结果
}
```



## 例子

参考项目代码。

