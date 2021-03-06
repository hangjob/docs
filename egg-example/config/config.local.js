const path = require('path');

// appInfo ,查看官网 https://eggjs.org/zh-cn/basics/config.html#%E9%85%8D%E7%BD%AE%E5%8A%A0%E8%BD%BD%E9%A1%BA%E5%BA%8F
module.exports = appInfo => {
    return {
        keys: '123456789',
        level: 'DEBUG',
        logger: {
            dir: path.join(appInfo.baseDir, 'logs'), // baseDir:应用代码的目录
        },
        middleware: ['gzip','responseTime'],
        responseTime:{
            data: '给中间件传递的参数！'
        },
        // 配置 gzip 中间件的配置
        gzip: {
            threshold: 1024, // 小于 1k 的响应体不压缩
        },
        valparams: {
            locale: 'zh-cn',
            widelyUndefined: true, // 开启后，会把空字符串，NaN,null 这些转成 undefined，将这些异常的数据进行了统一，方便后续处理
            throwError: false // 表示是否开启参数验证
        },
        validate: {
            convert: true, // 对参数可以使用convertType规则进行类型转换
            validateRoot: false, // 限制被验证值必须是一个对象
        },
        mysql: {
            // 单数据库信息配置
            client: {
                // host
                host: '127.0.0.1',
                // 端口号
                port: '3306',
                // 用户名
                user: 'root2', // root2 itnavs
                // 密码
                password: '123456',
                // 数据库名
                database: 'egg',
            },
            // 是否加载到 app 上，默认开启
            app: true,
            // 是否加载到 agent 上，默认关闭
            agent: false,
        },
        mode: 'file', // 上传/接受文件,
        view:{
            defaultViewEngine: 'nunjucks',
            mapping: {
                '.html': 'nunjucks' //左边写成.html后缀，会自动渲染.html文件
            },
            cache:false
        },
        sequelize :{
            dialect: 'mysql',
            host: '127.0.0.1',
            port: 3306,
            username: 'root2', // 数据库用户名
            password: '123456', // 数据库密码
            database: 'egg',
            define: { // model的全局配置
                timestamps: true, // 添加create,update,delete时间戳
                paranoid: false, // 添加软删除
                freezeTableName: true, // 防止修改表名为复数
                underscored: false // 防止驼峰式字段被默认转为下划线
            },
            timezone: '+8:00', // 由于orm用的UTC时间，这里必须加上东八区，否则取出来的时间相差8小时
        }
    };
};