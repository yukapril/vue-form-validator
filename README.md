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
                    value: this.name,
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

在组件状态 `created` 下（组件还没有 `mounted`），可以监听首次差值，并验证。

如果不需要首次验证，可以放在 `mounted` 下。

`this.$validator(ObserverObject,Rules)`

需要在组件中绑定一个 `ObserverObject`，后续进行观察变动。比如例中，绑定在 `this.error` 中。

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
    	value: this.name,		// 加载组件后即验证，必须传入当前值（加载后数据不验证，可不传）
    	isRequired: true, 		// 必须输入
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



