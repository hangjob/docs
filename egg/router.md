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

### 正则路由

```javascript
// app/router.js
module.exports = app => {
    app.router.get(/^\/package\/([\w-.]+\/[\w-.]+)$/, controller.home.package);
};
```

> 要求匹配，以package开头，然后/(字母或者数字)，然后/(字母或者数字),组成的一路由

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