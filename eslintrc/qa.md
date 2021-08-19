>问题： No configuration provided for D:\xxxxxx\xxxxx.less

解决：缺少关依赖

安装：stylelint、stylint-config-standard和stylelint-order

stylelint是运行工具，stylelint-config-standard是stylelint的推荐配置，stylelint-order是CSS属性排序插件

[参考-https://segmentfault.com/a/1190000023049289](https://segmentfault.com/a/1190000023049289)

[https://www.cnblogs.com/xiaohuochai/p/9078154.html](https://www.cnblogs.com/xiaohuochai/p/9078154.html)


>问题：代码看着没有改动，但是git检测到有改动，eslint检测不通过？

可能问题是，vscode安装了Vetur插件，

打开【首选项】设置 ，需要把Vetur>Format>Options:Use Size 前面的 √ 去掉
