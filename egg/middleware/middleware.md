### 写法
在`app/middleware/responseTime.js`目录下创建中间件
```js
module.exports = options => {
    return async function responseTime(ctx, next) {
        console.log('中间件执行',options) // 接受参数
        const startTime = Date.now();
        await next()
        console.log('请求耗时',Date.now() - startTime);
    };
};
```

### 调用
#### 1.在路由中调用中间件
```js
module.exports = app => {
    const { router, controller,middleware } = app;
    const responseTime = middleware.responseTime({ headerKey: 'X-Time' }, app); // 传递参数
    router.get('/view/index',responseTime, controller.view.index);
};
```
> 返回结果：中间件执行 { headerKey: 'X-Time' } 请求耗时 13


#### 2.在配置中调用中间件
在`config/config.[xxxx].js`，该配置全局生效
```js
module.exports = appInfo => {
    return {
        middleware: ['responseTime'], // 中间名称-对应在app/middleware/responseTime.js文件名称
        responseTime:{
            data: '给中间件传递的参数！' // 参数
        },
    };
};
```
>返回结果：中间件执行 { data: '给中间件传递的参数！' }  请求耗时 8

### 通用配置
无论是应用层加载的中间件还是框架自带中间件，都支持几个通用的配置项：

- enable：控制中间件是否开启。
- match：设置只有符合某些规则的请求才会经过这个中间件。
- ignore：设置符合某些规则的请求不经过这个中间件。

#### enable
如果我们的应用并不需要默认的 bodyParser 中间件来进行请求体的解析，此时我们可以通过配置 enable 为 false 来关闭它
```js
module.exports = {
  bodyParser: {
    enable: false,
  },
};
```
#### match 和 ignore
match 和 ignore 支持的参数都一样，只是作用完全相反，match 和 ignore 不允许同时配置。

如果我们想让 gzip 只针对 /static 前缀开头的 url 请求开启，我们可以配置 match 选项
```js
module.exports = {
  gzip: {
    match: '/static',
  },
};
```
match 和 ignore 支持多种类型的配置方式

1. 字符串：当参数为字符串类型时，配置的是一个 url 的路径前缀，所有以配置的字符串作为前缀的 url 都会匹配上。 当然，你也可以直接使用字符串数组。
2. 正则：当参数为正则时，直接匹配满足正则验证的 url 的路径。
3. 函数：当参数为一个函数时，会将请求上下文传递给这个函数，最终取函数返回的结果（true/false）来判断是否匹配。
```js
module.exports = {
  gzip: {
    match(ctx) {
      // 只有 ios 设备才开启
      const reg = /iphone|ipad|ipod/i;
      return reg.test(ctx.get('user-agent'));
    },
  },
};
```