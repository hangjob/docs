### 如何构建一个Ui框架

我们大致按照Element UI的 源码 目录进行我们自己的UI库项目开发。 在根目录中创建一个packages目录用来存放我们要开发的UI组件； 在根目录创建一个test目录用于测试我们自己开发的UI组件。
由于我们更改了原项目的目录结构，使得系统本地运行以及打包找不到对应的目录，我们需要在项目的根目录中创建一个vue.config.js文件夹手动的去修改webpack配置，使得系统本地运行和打包正常。

```
|—— pm-ui
    |—— lib  // 打完包生成的目录
    |—— packages // 开发组件
    |—— test // 测试开发的组件
    |—— vue.config.js 
```

构建库的常见方法有两种：

> 一种是自己手动构建webpack库打包，设置output为 library；
> 另一种是基于vue-cli3输出库资源包。我们采用第二种vue脚手架的方式构建库

生成目录的命令

```json
{
  "scripts": "vue-cli-service build --target lib --dest lib packages/index.js"
}
```

* --name: 库名称。
* --target: 构建目标，默认为应用模式。这里修改为 lib 启用库模式。
* --dest: 输出目录，默认 dist。
* [entry]: 最后一个参数为入口文件，默认为 src/App.vue，可以是一个.js，也可以是.vue

[更多配置-官方文档](https://cli.vuejs.org/zh/guide/build-targets.html#%E5%BA%93)
