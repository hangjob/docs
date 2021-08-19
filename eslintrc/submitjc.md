## Git提交代码检测

### 下载依赖

``` bash
npm install --save-dev lint-staged husky
```

### package.json配置

```bash
"scripts": {
  "precommit": "lint-staged" // precommit钩子执行lint-staged
},
"lint-staged": {
  "src/**/*.{js,json,css,vue}": [
   "eslint --fix",
   "git add"
  ]
},
```
