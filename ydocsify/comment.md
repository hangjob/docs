### 添加评论

```html
<script src="//cdn.jsdelivr.net/npm/docsify/lib/plugins/gitalk.min.js"></script>
<script src="//cdn.jsdelivr.net/npm/gitalk/dist/gitalk.min.js"></script>

<script>
    // 评论插件
    const gitalk = new Gitalk({
        clientID: 'xxxxxx', // 申请下来的ID
        clientSecret: 'xxxxxx',  // 申请下来的密码
        repo: 'docs', // 仓库名字
        owner: 'hangjob', // 你的Github名字
        admin: ['hangjob'], // 你的Github名字和其他管理员的名字
        // facebook-like distraction free mode
        distractionFreeMode: true
    })
</script>
```

### 首页报错
打开首页控制台可能会报错
```js
Cannot read property 'hasChildNodes' of null
```

#### 分析报错
点开报错信息
```js
$docsify.plugins = [].concat(function(i) {
    var e = Docsify.dom;
    i.mounted(function(i) {
        var n = e.create("div");
        n.id = "gitalk-container";
        var t = e.getNode("#main");
        n.style = "width: " + t.clientWidth + "px; margin: 0 auto 20px;",
        e.appendTo(e.find(".content"), n)
    }),
    i.doneEach(function(i) 
        for (var n = document.getElementById("gitalk-container"); n.hasChildNodes(); )
            n.removeChild(n.firstChild);
        gitalk.render("gitalk-container")
    })
}, $docsify.plugins);
```

没有找到 元素 gitalk-container，导致报错


