module.exports = options => {
    return async function responseTime(ctx, next) {
        console.log('中间件执行',options)
        await next()
    };
};
