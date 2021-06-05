const {baseController} = require('./baseController.js');

class HomeController extends baseController {

    async index() {
        await this.app.mysql.insert('egg_member', {name: '测试1'}) // 添加数据
        this.ctx.body = 'Hello world'
    }

    async user() {
        const {ctx} = this;
        ctx.body = `接受参数params ${ctx.params.id}，接受参数query ${ctx.query.id}`;
    }

    async userInfo() {
        const {ctx} = this;
        ctx.body = `hello ${ctx.params.id},${ctx.params.name}`;
    }

    async package() {
        const {ctx} = this;
        ctx.body = `package:${ctx.params[0]}`;
    }

    async customValidate() {
        const {ctx} = this;
        console.log(ctx.query)
        try {
            ctx.validate({name: 'userName'}, ctx.query);
        } catch (error) {
            ctx.body = error;
            return;
        }
        ctx.body = `验证通过:${ctx.query.name}`;
    }

    async create() {
        const {ctx, service} = this;
        const createRule = {
            title: {type: 'string', required: true, desc: '标题不能为空，长度大于5小于10', range: {min: 5, max: 10,}},
            content: {type: 'string', required: false},
        };
        // 校验参数
        ctx.validate(createRule);
        console.log(ctx.paramErrors)

        // 组装参数
        const author = ctx.session.userId;
        const req = Object.assign(ctx.request.body, {author});
        console.log(req)
        // // 调用 Service 进行业务处理
        // const res = await service.post.create(req);
        // // 设置响应内容和响应状态码
        ctx.body = JSON.stringify(req);
        ctx.status = 200;
    }

}

module.exports = HomeController;