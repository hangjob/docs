const path = require('path');

// appInfo ,查看官网 https://eggjs.org/zh-cn/basics/config.html#%E9%85%8D%E7%BD%AE%E5%8A%A0%E8%BD%BD%E9%A1%BA%E5%BA%8F
module.exports = appInfo => {
    return {
        keys: '123456789',
        level: 'DEBUG',
        logger: {
            dir: path.join(appInfo.baseDir, 'logs'), // baseDir:应用代码的目录
        },
        middleware: ['gzip'],
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
                user: 'itnavs',
                // 密码
                password: '123456',
                // 数据库名
                database: 'egg',
            },
            // 是否加载到 app 上，默认开启
            app: true,
            // 是否加载到 agent 上，默认关闭
            agent: false,
        }
    };
};