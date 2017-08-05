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
        created(){
            this.$validator(this.error, {
                name: {
                    model: 'name',
                    isRequired: true,
                    regex: /^[A-Za-z]+$/,
                    max: 10,
                    min: 3
                }
            });
        }
    }
</script>
```

## 说明

因为需要修改组件 `data` ，所以要在状态 `created` 下，否则页面内调用补充方法 `<span v-if="!error.name.isRequired">please input</span>` 会报错。

如果不需要页面内监听方法，则可以放置在 `mounted` 下。



`this.$validator(errorObject,Rules)`

需要在组件中绑定一个 `errorObject`，后续通过此对象进行观察变动。比如例中，绑定在 `this.error` 中。

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

规则Rules:

```javascript
{
    name: { // 观察者命名，结果会放在此名对象上
    	model: 'name',			// 绑定控件model
    	isRequired: true, 		// 是否为必须选项
    	regex: /^[A-Za-z]+$/,	// 正则验证
      	fn:(val)=>{			    // 自定义验证，传入当前值，需要返回true/false
          return val!=='abc'
        },
    	length:8, 			   // length存在，则不会验证 max/min
      	max: 10,			   // 输入长度最大值
    	min: 3				  // 输入长度最小值
  	}
}
```

## 例子

参考项目代码。



