# 官方文档
[Docsify中文文档](https://jingping-ye.github.io/docsify-docs-zh/#/%E5%BF%AB%E9%80%9F%E4%B8%8A%E6%89%8B/%E5%BC%80%E5%A7%8B)

我会持续用这个工具写技术文档

### 开始
首选全局安装docsify-cli
```js
npm i docsify-cli -g
```
### 初始化
初始化会自动生成./docs文件夹

```
docsify init ./docs

// 如果不想新建一个文件夹，可以直接进行初始化操作

docsify init
```
### 建立第一个文档
初始化之后目录结构如下

```
|—— docs
    |—— index.html 入口
    |—— README.md 主页
    |—— .nojekyll 防止Github忽视下划线开头文件
```
### 预览网站
执行以下命令，预览网站就在http://localhost:3000网址打开

```shell
cd docs
docsify serve
```
### 手动初始化
不使用npm的用户可以手动创建一个入口文件index.html

```html
<!-- index.html -->

<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/docsify/themes/vue.css" />
  </head>
  <body>
    <div id="app"></div>
    <script>
      window.$docsify = {
        //...
      };
    </script>
    <script src="//cdn.jsdelivr.net/npm/docsify/lib/docsify.min.js"></script>
  </body>
</html>
```
使用 python 的用户，可以在静态服务器上预览网站

```shell
cd docs && python -m SimpleHTTPServer 3000
```

更新时间：{docsify-updated}