> 在控制`Controller`层

```js
'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {

    async addMenu() {
        const {ctx} = this;
        const result = await ctx.model.Menu.create({name: 'dad'})
        console.log(result)
    }

    async deleteMenu() {
        const {ctx} = this;
        const result = await ctx.model.Menu.destroy({
            where: {
                id: 1
            }
        })
    }

    async findOne() {
        const {ctx} = this;
        const result = await ctx.model.Menu.findOne({
            where: {
                id: 2
            }
        })
        ctx.body = result;
        console.log(result)
    }

    async findAll() {
        const {ctx} = this;
        const result = await ctx.model.Menu.findAll()
        console.log(result)
    }
}

module.exports = HomeController;

```

> model层

```js
module.exports = app => {
    const {STRING, INTEGER} = app.Sequelize;
    const Menu = app.model.define('menu', {
        id: {
            type: INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: STRING,
            allowNull: false //不允许为null
        },
        icon: {
            type: STRING,
        },
        shows: {
            type: INTEGER,
        },
        router: {
            type: STRING,
        },
        viewPath: {
            type: STRING,
        },
        order: {
            type: INTEGER
        },
        pid: {
            type: INTEGER
        },
        type: {
            type: INTEGER
        },
        filePath: {
            type: STRING
        },
        iframePath: {
            type: STRING
        },
        keepAlive: {
            type: INTEGER
        },
        tabHidden: {
            type: INTEGER
        },
        tabFix: {
            type: INTEGER
        },
    }, {
        createdAt: 'createTime', // 指定名字
        updatedAt: 'updateTime',
        tableName: 'yxs_menu' // 定义实际表名
    })
    return Menu;
}
```

> 添加路由

```js
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const {router, controller} = app;
    router.get('/findAll', controller.home.findAll);
    router.get('/addMenu', controller.home.addMenu);
    router.get('/deleteMenu', controller.home.deleteMenu);
    router.get('/findOne', controller.home.findOne);
};

```