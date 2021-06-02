### 定义路由

阔以这样定义路由

```js
// `app/router.js`
module.exports = app => {
    const {router, controller} = app;
    router.get('/', controller.home.index);
    router.get('/user/:id', controller.home.user);
    router.get('/user/:id/:name', controller.home.userInfo);
    router.get('/create', controller.home.create);
};
```

官方列子

```javascript
// app/router.js
module.exports = app => {
    const {router, controller} = app;
    router.get('/home', controller.home);
    router.get('/user/:id', controller.user.page);
    router.post('/admin', isAdmin, controller.admin);
    router.post('/user', isLoginUser, hasAdminPermission, controller.user.create);
    router.post('/api/v1/comments', controller.v1.comments.create); // app/controller/v1/comments.js
};
```

### 接受参数

> 浏览器输入：http://127.0.0.1:7001/user/1?id=abc

```javascript
async
user()
{
    const {ctx} = this;
    ctx.body = `接受参数params ${ctx.params.id}，接受参数query ${ctx.query.id}`;
}
```

> 输出结果：接受参数params 1，接受参数query abc

### 正则路由

```javascript
// app/router.js
module.exports = app => {
    app.router.get(/^\/package\/([\w-.]+\/[\w-.]+)$/, controller.home.package);
};
```

> 要求匹配，以package开头，然后/(字母或者数字)，然后/(字母或者数字),组成的一路由

```javascript
async
package()
{
    const {ctx} = this;
    ctx.body = `package:${ctx.params[0]}`;
}
```

> 浏览器输入：http://127.0.0.1:7001/package/1/22 <br/>
> 输出：package:1/22

> 浏览器输入：http://127.0.0.1:7001/package/qq/22 <br/>
> 输出：package:qq/22

### 表单校验

启用插件

````javascript
// config/plugin.js
exports.valparams = {
    enable: true,
    package: 'egg-valparams'
};
````

配置插件

```javascript
// config.[local].js
module.exports = appInfo => {
    return {
        valparams: {
            locale: 'zh-cn',
            widelyUndefined:true, // 开启后，会把空字符串，NaN,null 这些转成 undefined，将这些异常的数据进行了统一，方便后续处理
            throwError: true  // 表示是否开启参数验证
        },
    };
};
```

### 使用验证规则

```javascript
async
create()
{
    const {ctx, service} = this;
    const createRule = {
        title: {type: 'string', required: true, desc: '标题不能为空，长度大于5小于10', range: {min: 5, max: 10,}},
        content: {type: 'string', required: false},
    };
    // 校验参数
    ctx.validate(createRule);
    console.log(ctx.paramErrors)

}
```

> 输出

```javascript
    [{
    key: 'title',
    desc: '标题不能为空，长度大于5小于10',
    type: 'string',
    value: undefined,
    err: ['标题不能为空，长度大于5小于10不能为空']
}]
```

> ctx.paramErrors 如果全部校验通过返回的是 undefined

在这里，我们就会有个疑问 ctx.validate 是怎么实现的？ 这里为什么在只传递了验证规则？只能验证 body 的参数吗？ 对于 query 和 params 能不能进行校验？下面我们就通过分析，来解决上面的疑问

由于 Egg 是在 Koa 的基础上实现的， 所以 Egg 的 ctx 对象继承 koa 的 ctx ， 每当我们发现挂载到 ctx 的对象不是原生的时候，这时候就应该想到 Egg 的插件特性，在config/plugin.js
中启动的插件会自动挂载到 ctx 或者 app 对象上的

所以接下来，我们去 egg-validate 是怎么实现的

首先来看 README 文件，发现 是使用 parameter 库来定义验证规则，执行验证的。 这个库还定义了一些基础的数据类型方便在定义规则的时候使用。

因为 egg-validate 是插件 所有首先我们可以先看 app 目录下的文件，发现就只有一个 扩展 ctx 对象的文件 context.js 文件，代码如下：

#### 自定义验证请求
```javascript
async
create()
{
    const {ctx, service} = this;
    const createRule = {
        title: {type: 'string', required: true, desc: '标题不能为空，长度大于5小于10', range: {min: 5, max: 10,}},
        content: {type: 'string', required: false},
    };
    // 校验参数
    ctx.validate(createRule,ctx.body); // 追加一个参数
    console.log(ctx.paramErrors)

}
```

```javascript
module.exports = {
    validate(rules, data) {
        // 默认是请求体body的数据
        data = data || this.request.body;
        const errors = this.app.validator.validate(rules, data);
        if (errors) {
            this.throw(422, 'Validation Failed', {
                code: 'invalid_param',
                errors,
            });
        }
    },
};
```

### 路由分组

```javascript
// app/router.js
module.exports = app => {
    require('./router/news')(app);
    require('./router/admin')(app);
};

// app/router/news.js
module.exports = app => {
    app.router.get('/news/list', app.controller.news.list);
    app.router.get('/news/detail', app.controller.news.detail);
};

// app/router/admin.js
module.exports = app => {
    app.router.get('/admin/user', app.controller.admin.user);
    app.router.get('/admin/log', app.controller.admin.log);
};
```