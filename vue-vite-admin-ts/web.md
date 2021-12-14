
> 此目录文件是可以更改的,其实也是演示目录

```ts
import {Component, createApp} from 'vue'
import App from './App.vue'
import install, {$pluginType} from '@/packages/install' // 引入依赖包
import {apiAppRouter} from '@/packages/service/app'
import store from '@/example/store/index';

const app = createApp(App)
apiAppRouter().then((res: any) => {

    const locas: Record<string, Component> = import.meta.globEager("/src/example/views/**/*.vue")
    const $plugin: $pluginType = {
        router: {views: [...res], external: locas},
        store: {
            module: store
        }
    }
    app.use(install, $options).mount('#app')
})
```

如果你没有接口，也没有自定义菜单，只是想使用，那么只需要，即可包含默认配置的功能

```ts
import {createApp} from 'vue'
import App from './App.vue'
import install from '@/packages/install' // 引入依赖包
const app = createApp(App)
app.use(install).mount('#app')
```

### 说明

#### apiAppRouter

apiAppRouter是通过接口获取用户菜单，然后传递给依赖包，然后合并，当然用户传递的菜单，往往会是自己写的页面组件

所以就有了这句话

```ts
const locas: Record<string, Component> = import.meta.globEager("/src/example/views/**/*.vue")
```

#### install

install暴露用户导入依即可，接受两个参数

##### app

app 为用户创建的vue，初始化

```ts
const app = createApp(App)
```

##### $plugin

可以看到目前只扩展了`router`,`store`类型

```ts
/**
 * router: {views:[菜单],external:[菜单路由]}
 *
 * store:{module:{store对象},namespace:’命名空间，默认web‘}
 */
interface $pluginType {
    router?: {
        views: Array<any>, // 菜单
        external?: any, // 外接路由文件所在路径
    },
    store?: {
        module: object,
        namespace?: string
    }
}
```