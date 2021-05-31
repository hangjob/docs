
const  {baseController}  = require('./baseController.js');

class HomeController extends baseController {

    async index() {
        await this.app.mysql.insert('egg_member', { name: '测试1' }) // 添加数据
        this.ctx.body = 'Hello world'
    }

    async user(){
        const { ctx } = this;
        ctx.body = `hello ${ctx.params.id}`;
    }

    async userInfo(){
        const { ctx } = this;
        ctx.body = `hello ${ctx.params.id},${ctx.params.name}`;
    }

    async create(){
        const { ctx, service } = this;
        const createRule = {
            title: { type: 'string' },
            content: { type: 'string' },
        };
        // 校验参数
        ctx.validate(createRule);
        // 组装参数
        const author = ctx.session.userId;
        const req = Object.assign(ctx.request.body, { author });
        // // 调用 Service 进行业务处理
        // const res = await service.post.create(req);
        // // 设置响应内容和响应状态码
        ctx.body = JSON.stringify(req);
        ctx.status = 201;
    }

}

module.exports = HomeController;