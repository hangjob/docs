const Service = require('egg').Service;

// https://juejin.cn/post/6844903896201052168
class UserService extends Service {
    constructor(ctx) {
        super(ctx);
    }

    async find(uid) {
        const detail = await this.ctx.service.article.find(1); // 调用其他serves
        console.log(detail);
        const user = await this.ctx.app.mysql.query('select * from user where uid = ?', uid);
        console.log(user);
        return user;
    }
}

module.exports = UserService;