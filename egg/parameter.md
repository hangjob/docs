### 获取url上的参数

> 浏览器输入：http://127.0.0.1:7001/user/1?id=abc

```javascript
async
user()
{
    const {ctx} = this;
    ctx.body = `接受参数params ${ctx.params.id}，接受参数query ${ctx.query.id}`;
}
```

> 输出结果：params = 1，接受参数query = abc

### 正则路由参数

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

### 特殊参数 queries

有时候我们的系统会设计成让用户传递相同的 key，例如 GET /posts?category=egg&id=1&id=2&id=3。针对此类情况，框架提供了 ctx.queries 对象，这个对象也解析了 Query
String，但是它不会丢弃任何一个重复的数据，而是将他们都放到一个数组中：

```js
// GET /posts?category=egg&id=1&id=2&id=3
class PostController extends Controller {
    async listPosts() {
        console.log(this.ctx.queries);
        // {
        //   category: [ 'egg' ],
        //   id: [ '1', '2', '3' ],
        // }
    }
}
```
ctx.queries 上所有的 key 如果有值，也一定会是数组类型。