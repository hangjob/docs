### 目录结构
照这样部署没问题
```
|—— docs(根目录)
    |-- REAMD.md
    |-- 自定义.md
    |-- 一级目录
        |-- 菜单一.md
        |-- 菜单二.md
    |-- 一级目录
        |-- 菜单一.md
        |-- 菜单二.md
```

### 错误目录
```
|—— docs(根目录)
    |-- REAMD.md
    |-- 自定义.md
    |-- 一级目录
        |-- 二级目录
            |-- 菜单一.md
            |-- 菜单二.md
        |-- 二级目录
            |-- 菜单一.md
            |-- 菜单二.md
            |-- 菜单三.md
        |-- 二级目录
            |-- 菜单一.md
            |-- 菜单二.md
    |-- 一级目录
        |-- 菜单一.md
        |-- 菜单二.md
```

当这样访问二级目录是会出现缺少`_sidebar.md`文件，但不影响使用，就是控制台出现404无效路劲的报错信息

解决报错就是二级目录，也去创建`_sidebar.md`文件