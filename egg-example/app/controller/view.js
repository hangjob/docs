const {baseController} = require('./baseController.js');
const fs = require('mz/fs');
const path = require('path');

class ViewController extends baseController {

    async index() {
        const {ctx} = this;
        await ctx.render('index', {
            title: '嗨，我是羊先生'
        });
    }

    async detail() {
        const {ctx} = this;
        let {id} = ctx.params;
        let des = `嗨，我是羊先生,${id}`;
        await ctx.render('detail', {
            des
        });
    }

    async upload() {
        const {ctx} = this;
        const file = ctx.request.file;
        console.log(file)
        ctx.body = '111'
    }
}

module.exports = ViewController;