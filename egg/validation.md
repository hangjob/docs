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
            widelyUndefined: true, // 开启后，会把空字符串，NaN,null 这些转成 undefined，将这些异常的数据进行了统一，方便后续处理
            throwError: true  // 表示是否开启参数验证
        },
    };
};
```

### 使用验证规则

```javascript
const {baseController} = require('./baseController.js');

class HomeController extends baseController {
    async create() {
        const {ctx, service} = this;
        const createRule = {
            title: {type: 'string', required: true, desc: '标题不能为空，长度大于5小于10', range: {min: 5, max: 10,}},
            content: {type: 'string', required: false},
        };
        // 校验参数
        ctx.validate(createRule);
        console.log(ctx.paramErrors)

    }
}

module.exports = HomeController;
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

#### 更改验证参数

```javascript
const {baseController} = require('./baseController.js');

class HomeController extends baseController {
    async create() {
        const {ctx, service} = this;
        const createRule = {
            title: {type: 'string', required: true, desc: '标题不能为空，长度大于5小于10', range: {min: 5, max: 10,}},
            content: {type: 'string', required: false},
        };
        // 校验参数
        ctx.validate(createRule, ctx.body); // 追加一个参数
        console.log(ctx.paramErrors)

    }
}

module.exports = HomeController;
```

> 当参数不在body上时，需要更改验证参数<br/>
> validate(验证规则，验证参数)

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

### 自定义添加验证规则

#### 安装`egg-validate`插件

```shell
npm i egg-validate -S
```

#### 启用插件

在plugin.js

```js
exports.validate = {
    enable: true,
    package: 'egg-validate',
};
```

在`config.[local].js`添加插件配置

```js
module.exports = {
    validate: {
        convert: true, // 对参数可以使用convertType规则进行类型转换
        validateRoot: false, // 限制被验证值必须是一个对象
    },
}
```

#### 启动时载入规则

我们一次性添加自定义的规则，并不是每次用的时候需要在添加，这样话只需要引用一遍即可

##### app.js

在根目录新建app.js，改文件只会在第一次启动的才会调用，<br/>
如果你写过小程序，小程序也有app.js只会在第一次进入的才会调用 当然二者不能混为一谈，一个服务端一个是客户端，只是说明了框架的设计都有这样的一个机制

```js
const path = require('path');
module.exports = app => {
    // 导入验证规则
    const directory = path.join(app.config.baseDir, 'app/validate');
    app.loader.loadToApp(directory, 'validate');
};
```

新建`app\validate\user.js`文件

```js
module.exports = app => {
    const {validate} = app;
    // 校验用户名是否正确
    validate.addRule('userName', (rule, value) => {
        console.log('校验用户名', rule, value);
        if (/^\d+$/.test(value)) {
            return '用户名应该是字符串';
        } else if (value.length < 6 || value.length > 20) {
            return ('用户名的长度应该在6-20之间');
        }
    });
};
```

#### 使用

在控制器层使用

```js
class HomeController extends baseController {
    async customValidate() {
        const {ctx} = this;
        try {
            ctx.validate({name: 'userName'}, ctx.query);
        } catch (error) {
            ctx.body = error;
            return;
        }
        ctx.body = `验证通过:${ctx.query.name}`;
    }
}
```

> 输入：http://127.0.0.1:7001/customValidate?name=测试 <br/>
> 返回结果：{"message":"Validation Failed","code":"invalid_param","errors":[{"message":"用户名的长度应该在6-20之间","code":"invalid","field":"name"}]}

> 输入：http://127.0.0.1:7001/customValidate?name=测试测试测试测试试试 <br/>
> 返回结果：验证通过

以上[参考](https://www.shuzhiduo.com/A/WpdKQM4NJV/)

