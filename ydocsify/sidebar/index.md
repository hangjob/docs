# 通过配置文件定义导航栏
首先需要在index.html文件中的window.$docsify添加loadNavbar: true,选项：
```html
<script>
    window.$docsify = {
    loadNavbar: true
}
</script>
<script src="//unpkg.com/docsify"></script>
```
接着在项目根目录创建_navbar.md文件，内容格式如下：
```markdown
* [home1](home1)
* [home2](home2)
* [bar](bar/)
* [bar/a](bar/a)
```
#### 注意
1. 如果使用配置文件来设置导航栏，那么在index.html中定义的导航栏只有在定制的首页才会生效，其他页面会被覆盖。
2. 如果只在根目录有一个_navbar.md文件，那么所有页面都将使用这个一个配置，也就是所有页面的导航栏都一样。
3. 如果一个子目录中有_navbar.md文件，那么这个子目录下的所有页面将使用这个文件的导航栏。
4. _navbar.md的加载逻辑是从每层目录下获取文件，如果当前目录不存在该文件则回退到上一级目录。例如当前路径为/zh-cn/more-pages则从/zh-cn/_navbar.md获取文件，如果不存在则从/_navbar.md获取。