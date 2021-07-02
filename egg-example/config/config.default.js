exports.keys = 'my-cookie-secret-key';
exports.logger = {
    level: 'DEBUG',
};
exports.view = {
    mapping: {
        '.js': 'assets',
    }
};
exports.static = {
    maxAge:0
};
exports.serverTimeout = 0
exports.middleware = ['gzip']
