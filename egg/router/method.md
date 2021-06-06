即为上面的 verb，代表用户触发动作，支持 GET、POST 等所有 HTTP 方法。

- **router.head** - 对应 HTTP HEAD 方法。
- **router.get** - 对应 HTTP GET 方法。
- **router.put** - 对应 HTTP PUT 方法。
- **router.post** - 对应 HTTP POST 方法。
- **router.patch** - 对应 HTTP PATCH 方法。
- **router.delete** - 对应 HTTP DELETE 方法。
- **router.del** - 由于 delete 是保留字，故一般会用 router.del 别名。
- **router.options** - 对应 HTTP OPTIONS 方法。

除此之外，还提供了：

- **router.redirect** - 可以对 URL 进行重定向处理，比如把用户访问的根目录路由到某个主页。
- **router.all** - 对所有的 HTTP 方法都挂载。