const {baseController} = require('./baseController.js');
const fs = require('mz/fs');
const path = require('path');

//故名思意 异步二进制 写入流
const awaitWriteStream = require('await-stream-ready').write;
//管道读入一个虫洞。
const sendToWormhole = require('stream-wormhole');
const dayjs = require('dayjs');

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
        const { ctx } = this;
        ctx.status = 200;
        const stream = await this.ctx.getFileStream();
        // 基础的目录
        const uplaodBasePath = 'app/public/uploads';
        // 生成文件名
        const filename = `${Date.now()}${Number.parseInt(
            Math.random() * 1000,
        )}${path.extname(stream.filename).toLocaleLowerCase()}`;
        // 生成文件夹
        const dirname = dayjs(Date.now()).format('YYYY/MM/DD')
        return 111;
        function mkdirsSync(dirname) {
            if (fs.existsSync(dirname)) {
                return true;
            } else {
                if (mkdirsSync(path.dirname(dirname))) {
                    fs.mkdirSync(dirname);
                    return true;
                }
            }
        }
        mkdirsSync(path.join(uplaodBasePath, dirname));
        // 生成写入路径
        const target = path.join(uplaodBasePath, dirname, filename);
        // 写入流
        const writeStream = fs.createWriteStream(target);
        try {
            //异步把文件流 写入
            await awaitWriteStream(stream.pipe(writeStream));
        } catch (err) {
            console.log('错误')
            //如果出现错误，关闭管道
            await sendToWormhole(stream);
            this.error();
        }
        ctx.body = {
            result: 1,
            type:2
        }

    }
}

module.exports = ViewController;