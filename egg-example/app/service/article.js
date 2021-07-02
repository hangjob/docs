const Service = require('egg').Service;

class ArticleService extends Service {
    constructor(ctx) {
        super(ctx);
    }

    async find(id) {
        const detail = await this.ctx.app.mysql.query('select * from article where id = ?', id);
        return detail;
    }
}

module.exports = ArticleService;