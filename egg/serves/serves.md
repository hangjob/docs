# 服务（Service）

简单来说，Service 就是在复杂业务场景下用于做业务逻辑封装的一个抽象层，提供这个抽象有以下几个好处：

保持 Controller 中的逻辑更加简洁。 保持业务逻辑的独立性，抽象出来的 Service 可以被多个 Controller 重复调用。 将逻辑和展现分离，更容易编写测试用例，测试用例的编写具体可以查看这里

### 属性
每一次用户请求，框架都会实例化对应的 Service 实例，由于它继承于 egg.Service，故拥有下列属性方便我们进行开发：

- this.ctx: 当前请求的上下文 Context 对象的实例，通过它我们可以拿到框架封装好的处理当前请求的各种便捷属性和方法。
- this.app: 当前应用 Application 对象的实例，通过它我们可以拿到框架提供的全局对象和方法。
- this.service：应用定义的 Service，通过它我们可以访问到其他业务层，等价于 this.ctx.service 。
- this.config：应用运行时的配置项。
- this.logger：logger 对象，上面有四个方法（debug，info，warn，error），分别代表打印四个不同级别的日志，使用方法和效果与 context logger 中介绍的一样，但是通过这个 logger 对象记录的日志，在日志前面会加上打印该日志的文件路径，以便快速定位日志打印位置。

### Service ctx 详解
为了可以获取用户请求的链路，我们在 Service 初始化中，注入了请求上下文, 用户在方法中可以直接通过 this.ctx 来获取上下文相关信息。关于上下文的具体详解可以参看 Context, 有了 ctx 我们可以拿到框架给我们封装的各种便捷属性和方法。比如我们可以用：

- this.ctx.curl 发起网络调用。
- this.ctx.service.otherService 调用其他 Service。
- this.ctx.db 发起数据库调用等， db 可能是其他插件提前挂载到 app 上的模块。

### 注意事项
Service 文件必须放在 app/service 目录，可以支持多级目录，访问的时候可以通过目录名级联访问。
``` shell
app/service/biz/user.js => ctx.service.biz.user
app/service/sync_user.js => ctx.service.syncUser
app/service/HackerNews.js => ctx.service.hackerNews
```
- 一个 Service 文件只能包含一个类， 这个类需要通过 module.exports 的方式返回。

- Service 需要通过 Class 的方式定义，父类必须是 egg.Service。

- Service 不是单例，是 请求级别 的对象，框架在每次请求中首次访问 ctx.service.xx 时延迟实例化，所以 Service 中可以通过 this.ctx 获取到当前请求的上下文。

### 定义 Service

```js
// app/service/user.js
const Service = require('egg').Service;

class UserService extends Service {
    async find(uid) {
        // 一条简单的查询-从user表中查询uid
        const user = await this.ctx.db.query('select * from user where uid = ?', uid);
        return user;
    }
}

module.exports = UserService;
```