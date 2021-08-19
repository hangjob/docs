### 常见API

#### globals

当访问当前源文件内未定义的变量时，no-undef 规则将发出警告。若是你想在一个源文件里使用全局变量，推荐你在 ESLint 中定义这些全局变量，这样 ESLint 就不会发出警告了。你可使用注释或在配置文件中定义全局变量

要在配置文件中配置全局变量，请将 globals 配置属性设置为一个对象，该对象包含以你但愿使用的每一个全局变量。对于每一个全局变量键，将对应的值设置为 "writable" 以容许重写变量，或 "readonly" 不容许重写变量。例如：

例子：假设咱们在某一个js文件中没有定义名为serverData的变量，而是看成全局变量使用，这时eslint检查将会报no-undef，表示没有这个全局变量

```js
// src/index.js
serverData = {
    shoppingCart: []
}
```

> 结果报错：error 'serverData' is not defined no-undef

###### 解决

在globals中配置该全局变量

```json
"globals": {
"serverData": true,
"Atomics": "readonly",
"SharedArrayBuffer": "readonly"
},
```

在index.js文件中配置全局变量

```js
/* global serverData:true */
serverData = {
    shoppingCart: []
}
```

## 常见写法

[【规则文档】](https://stylelint.io/user-guide/rules/list/declaration-empty-line-before/)

```js
model.exports = {
    'declaration-empty-line-before':
        [
            'always', {
            'ignore': [
                'after-comment',
                'after-declaration',
                'first-nested',
                'inside-single-line-block'],
        }]
}
```