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

```html

<div id="bouncyCircle"></div>
<div class="point"></div>
<script src="https://cdn.jsdelivr.net/npm/@mojs/core"></script>
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
```

### 工具

如果需要播放工具控制

```html

<div id="bouncyCircle"></div>
<div class="point"></div>
<script src="https://cdn.jsdelivr.net/npm/@mojs/core"></script>
<script src="https://cdn.jsdelivr.net/npm/@mojs/player"></script>
<script>
    const bouncyCircle = new mojs.Shape({
        parent: '#bouncyCircle',
        shape: 'circle',
        fill: {
            '#F64040': '#FC46AD'
        },
        radius: {
            20: 80
        },
        duration: 2000,
        isYoyo: true,
        isShowStart: true,
        repeat: 1,
    });
    
    const mainTimeline = new mojs.Timeline({});
    mainTimeline.add(bouncyCircle)
    
    const mojsPlayer = new MojsPlayer({
        add: mainTimeline,
        isSaveState: true, // 确定重载页面时是否应保留状态
        isPlaying: false, // 播放状态
        progress: 0, // 一开始的位置
        isRepeat: false, // 确定完成后是否应该重复
        isBounds: false, // 确定它是否应该有边界
        leftBound: 0, // 离开的位置  [0...1]
        rightBound: 1, // 绑定的位置 [0...1]
        isSpeed: false, // 确定是否应该打开速度控制
        speed: 1, // 速度
        isHidden: false, // 是否被隐藏
        precision: 0.1, // 步骤大小的处理-例如，在页面重新加载-球员应该恢复时间轴进度-整个时间轴将增量更新与“精度”步长，直到进度将满足。
        name: 'mojs-player', // 播放器的名称——主要用于本地存储标识符，用于区分多个本地播放器
        onToggleHide(isHidden) { // 应该在用户点击隐藏按钮后调用(isHidden是一个布尔值，指示玩家的可见状态)
            if (isHidden) {
                // 隐藏的时候做什么
            } else {
                // 显示的时候做什么
            }
        }
    });
</script>
```