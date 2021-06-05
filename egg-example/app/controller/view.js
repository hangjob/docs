const {baseController} = require('./baseController.js');

class ViewController extends baseController {
    async index() {
        const {ctx} = this;
        await ctx.render('index', {
            title: 'sada'
        });
    }
}

module.exports = ViewController;