### axios封装

### 使用方式

```js
import {post} from 'request'

post('/findAll', {data: '1'}, {notify: true, baseURL: '/apixxxxx', withCredentials: true});
get('/findAll', {data: '1'}, {notify: true});
post('/findAll');
get('/findAll');
```

#### notify

默认值false,打开的话，默认读取后端返回的`message`信息作为提示语

#### withCredentials

在同域的情况下，我们发送请求会默认携带当前域下的 cookie，但是在跨域的情况下，默认是不会携带请求域下的 cookie 的，比如 http://domain-a.com
站点发送一个 http://api.domain-b.com/get 的请求，默认是不会携带 api.domain-b.com 域下的 cookie，如果我们想携带（很多情况下是需要的），只需要设置请求的 xhr 对象的
withCredentials 为 true 即可

### xsrf

axios 设置xsrf也很简单

```js
const instance = axios.create({
    xsrfCookieName: 'XSRF-TOKEN-D',
    xsrfHeaderName: 'X-XSRF-TOKEN-D'
})
```

```js
app.use(express.static(__dirname, {
    setHeaders(res) {
        res.cookie('XSRF-TOKEN-D', '1234abc')
    }
}))
```

在访问页面的时候，服务端通过 set-cookie 往客户端种了 key 为 XSRF-TOKEN，值为 1234abc 的 cookie，作为 xsrf 的 token 值。

然后我们在前端发送请求的时候，就能从 cookie 中读出 key 为 XSRF-TOKEN 的值，然后把它添加到 key 为 X-XSRF-TOKEN 的请求 headers 中。

### 自定义合法状态码

```js
axios.get('/more/304').then(res => {
    console.log(res)
}).catch((e: AxiosError) => {
    console.log(e.message)
})

axios.get('/more/304', {
    validateStatus(status) {
        return status >= 200 && status < 400
    }
}).then(res => {
    console.log(res)
}).catch((e: AxiosError) => {
    console.log(e.message)
})
```

```js
router.get('/more/304', function (req, res) {
    res.status(304)
    res.end()
})
```

接口返回 304 状态码，对于默认的请求我们会输出一条错误信息。第二个请求中我们配置了自定义合法状态码规则，区间在 200 和 400 之间，这样就不会报错，而是可以正常输出响应对象。

> axios-config合并策略，传入的config优先级最高，会覆盖实列化默认的config

```ts
import axios from 'axios'
import store from "@/packages/store";
import {httpNetwork} from "@/packages/config";
import {message as messageModel} from 'ant-design-vue';


const CancelToken = axios.CancelToken
const source = CancelToken.source()

const http = axios.create({
    baseURL: '/api',
    timeout: httpNetwork.requestTimeout,
    withCredentials: true,
    headers: {
        'content-type': httpNetwork.contentType
    },
    cancelToken: source.token
})


http.interceptors.request.use((config: any) => {
    const token = store.state.user.token
    const {url} = config;
    if (url) {
        if (httpNetwork.token.some((item) => url.includes(item))) {
            config.headers['authorization'] = token;
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error)
})

http.interceptors.response.use((res: any) => {
    const {config} = res;
    const {code, data, message} = res.data;
    if (httpNetwork.successCode.indexOf(code) !== -1) {
        if (config.notify) {
            messageModel.success(message, httpNetwork.messageDuration)
        }
        return data;
    } else {
        return Promise.reject(res.data);
    }
}, async (error) => {
    if (error.response) {
        const {status, config} = error.response;
        console.log(status, config.url)
    }
    return Promise.reject(error.message);
})

// 包装url
const rewriteUrl = (url: string) => {
    return url
}


const post = (url: string, params?: any, config?: object) => {
    return http.post(rewriteUrl(url), params, config)
}

const get = (url: string, params?: any, config?: object) => {
    return http.get(rewriteUrl(url), {params: params, ...config})
}


const all = (request: Array<any>) => {
    return axios.all(request)
}


export default http;
export {
    post,
    get,
    all,
    axios
}
```