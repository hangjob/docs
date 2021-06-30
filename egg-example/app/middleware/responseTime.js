module.exports = options => {
    return async function responseTime(ctx, next) {
        console.log('中间件执行',options)
        const startTime = Date.now();
        await next()
        console.log('请求耗时',Date.now() - startTime);
    };
};
