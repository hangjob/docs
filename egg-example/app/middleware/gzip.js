// app/middleware/gzip.js
const isJSON = require('koa-is-json');
const zlib = require('zlib');

module.exports = options => {
    return async function gzip(ctx, next) {
        await next();
        ctx.body = ctx.body+  '在controller层后面执行'
    };
};
