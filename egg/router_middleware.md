### 支持对特定路由挂载中间件
```js
router.verb('/some-path', middleware1, ..., middlewareN, controller.action);
```

### 示例1

```js
// app/router.js
module.exports = app => {
    const { router, controller,middleware } = app;
    const responseTime = middleware.responseTime({ headerKey: 'X-Time' }, app);
    router.get('/view/index',responseTime, controller.view.index);
};
```

```js
//app/middleware/responseTime.js
module.exports = options => {
    return async function responseTime(ctx, next) {
        console.log('中间件执行',options)
        await next()
    };
};
```

```js
// app/router.js
module.exports = app => {
  const { router, controller, middleware } = app;

  // 初始化
  const responseTime = middleware.responseTime({ headerKey: 'X-Time' }, app);

  // 仅挂载到指定的路由上
  router.get('/test', responseTime, controller.test);
};
```


### 示例2
定义中间件
```js
// app/middleware/gzip.js
const isJSON = require('koa-is-json');
const zlib = require('zlib');

module.exports = options => {
  return async function gzip(ctx, next) {
    await next();

    // 后续中间件执行完成后将响应体转换成 gzip
    let body = ctx.body;
    if (!body) return;

    // 支持 options.threshold
    if (options.threshold && ctx.length < options.threshold) return;

    if (isJSON(body)) body = JSON.stringify(body);

    // 设置 gzip body，修正响应头
    const stream = zlib.createGzip();
    stream.end(body);
    ctx.body = stream;
    ctx.set('Content-Encoding', 'gzip');
  };
};
```
中间件编写完成后，我们还需要手动挂载，支持以下方式：
```js
module.exports = {
  // 配置需要的中间件，数组顺序即为中间件的加载顺序
  middleware: [ 'gzip' ],

  // 配置 gzip 中间件的配置
  gzip: {
    threshold: 1024, // 小于 1k 的响应体不压缩
  },
};
```
只会请求这个路由才会触发这个中间件
```js
module.exports = app => {
  const gzip = app.middleware.gzip({ threshold: 1024 });
  app.router.get('/needgzip', gzip, app.controller.handler);
};
```