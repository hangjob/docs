### 普通获取

```vue

<template>
	<div ref="divRef">ref demo</div>
</template>
<script>
import {ref, onMounted} from "vue";

export default {
	name: "Demo",
	setup() {
		const divRef = ref(); // 初始值需要赋值为空，或者null, 变量名一定要和模版中的ref一致

		onMounted(() => {
			console.log(divRef.value) // 此时在mounted周期中可以访问到ref
		})
		// 此处必须要返回与模版中同名的ref
		return {
			divRef
		}
	}
}
</script>
```

### 再h函数中获取

```vue

<script>
import {h, ref, onMounted} from "vue";

export default {
	name: "Demo",
	setup() {
		const divRef = ref(); // 初始值需要赋值为空，或者null

		onMounted(() => {
			console.log(divRef.value) // 此时在mounted周期中可以访问到ref
		})

		return () => h('div', {
			/*
            此处ref的值是divRef变量，不可写成 “divRef” 字符串
            否则访问不到。（在vue2.0中，此处的值是字符串）
            */
			ref: divRef,
		}, "ref demo")
	}
}
</script>
```