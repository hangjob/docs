exports.keys = 'my-cookie-secret-key';
exports.logger = {
    level: 'DEBUG',
};
exports.view = {
    mapping: {
        '.js': 'assets',
    },
};
exports.middleware = ['gzip']
