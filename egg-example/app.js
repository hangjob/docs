const path = require('path');
module.exports = app => {
    // 导入验证规则
    const directory = path.join(app.config.baseDir, 'app/validate');
    app.loader.loadToApp(directory, 'validate');
};