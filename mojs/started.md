### 安装方式

#### 命令行安装

```shell
npm 
npm i @mojs/core
或者
yarn
yarn add @mojs/core
```

使用它

```js
import mojs from '@mojs/core'
```

#### CDN安装
````html
<div id="bouncyCircle"></div>
<div class="point"></div>
````
````js
<script>
    const bouncyCircle = new mojs.Shape({
        parent: '#bouncyCircle',
        shape: 'circle',
        fill: {'#F64040': '#FC46AD'},
        radius: {20: 80},
        duration: 2000,
        isYoyo: true,
        isShowStart: true,
        easing: 'elastic.inout',
        repeat: 1,
    });
    
    bouncyCircle.play()
</script>
````

```
<script src="https://unpkg.com/markrun/dist/markrun.min.js"></script>
<script>
console.log(
    markrun('````js\nconsole.log(1)\n````')
)
</script>

```