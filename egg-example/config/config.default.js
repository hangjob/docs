exports.keys = 'my-cookie-secret-key';
exports.logger = {
    level: 'DEBUG',
};
exports.view = {
    mapping: {
        '.js': 'assets',
    }
};
exports.middleware = ['responseTime']
exports.responseTime = {
    data: '给中间件传递的参数！'
}