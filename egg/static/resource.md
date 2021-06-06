egg-view-assets 提供了通用的静态资源管理和本地开发方案，有如下功能：

- 一体化本地开发方案
- 生产环境静态资源映射
- 和模板引擎集成
- 在约定下可使用多种构建工具，如 webpack、roadhog、umi 等

### 安装插件
```shell
npm i egg-view-assets -S
npm i egg-view-nunjucks -S
```

### 配置插件
```js
// plugin.js
exports.nunjucks = {
    enable: true,
    package: 'egg-view-nunjucks',
};
```

启用插件
```js
// config.local.js
module.exports = appInfo => {
    return {
         view:{
                defaultViewEngine: 'nunjucks',
                mapping: {
                    '.html': 'nunjucks' //左边写成.html后缀，会自动渲染.html文件
                },
                cache:false
         }
    }
}
```
### 配置路由
```js
module.exports = app => {
    router.get('/view/index', controller.view.index); // 首页
    router.get('/detail/:id', controller.view.detail); //详情页
};
```
### 编写页面
在`app/view/index.html`
```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>首页</title>
</head>
<body>
    {{ title }}
</body>
</html>
```
在`app/view/detail.html`
```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>详情页面</title>
</head>
<body>
    {{ des }}
</body>
</html>
```
### 渲染页面
在controller层去渲染该页面
```js
class ViewController extends baseController {
    
    async index() {
        const {ctx} = this;
        await ctx.render('index', {
            title: '嗨，我是羊先生'
        });
    }
    
    async detail() {
        const {ctx} = this;
        let {id} = ctx.params;
        let des = `嗨，我是羊先生,${id}`;
        await ctx.render('detail', {
            des
        });
    }
}
```

>浏览器输入：http://127.0.0.1:7001/view/index

>浏览器输入：http://127.0.0.1:7001/view/detail/123