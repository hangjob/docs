加载可能会出现缓慢

[官方文档](http://mockjs.com/examples.html)

### 列子

```ts
// @ts-ignore
import Mock from "mockjs";
import {resData} from './baseCommon'

Mock.mock("/api/yxs/userinfo", 'post', (options: any) => {
    const data = Mock.mock({
        id: "@id", // 随机id
        token: "@id",
        username: '@name', // 随机名称
        createTime: "@datetime(yy-MM-dd HH:mm:ss)", // 随机时间
        text: "@cparagraph(5)", // 随机文本5个字
        roles: ['zbdl', 'jgr'],
        "contentType|0-3": 0, // 随机数字0-3
        "serviceUnreadCount|0-10": 0, // 随机数字0-10
        headimgurl() { // 随机图片 尺寸 颜色 格式
            return Mock.Random.image(
                "40x40",
                Mock.Random.color(),
                "#FFF",
                "png",
            );
        }
    })
    const result: resData = {
        code: 1,
        message: '请求成功',
        data,
    }
    return result;
})


// 模拟数据延迟
Mock.setup({
    timeout: "500-800"
});

```

resData：定义数据类型格式