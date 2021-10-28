### vue3获取dom元素的两种方法

```html

<template>
    <div ref="root">This is a root element</div>
</template>

<script>
    import {ref, onMounted, getCurrentInstance} from 'vue';
    
    export default {
        setup() {
            const {proxy} = getCurrentInstance();
            const root = ref(null);
            
            onMounted(() => {
                // DOM元素将在初始渲染后分配给ref
                //第一种
                console.log(root.value); // <div>这是根元素</div>
                //第二种
                console.log(proxy.root); // <div>这是根元素</div>
            });
            
            return {
                root,
            };
        },
    };
</script>
```