### 框架内置Multipart
请求 body 除了可以带参数之外，还可以发送文件，一般来说，浏览器上都是通过 Multipart/form-data 格式发送文件的，框架通过内置 Multipart 插件来支持获取用户上传的文件，我们为你提供了两种方式：

### 编写html
```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<form>
    <input type="file" id="avatar" name="avatar">
    <button type="button">保存</button>
</form>
<script src="https://cdn.jsdelivr.net/npm/jquery@3.2.1/dist/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/jquery-form@4.3.0/dist/jquery.form.min.js"></script>
<script>
    function getCookie(name){
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }
    $('button').click(function(){
        var files = $('#avatar').prop('files');
        var data = new FormData();
        data.append('avatar', files[0]);
        console.log(data)
        $.ajax({
            url: '/view/upload',
            type: 'POST',
            headers:{
                'x-csrf-token': getCookie("csrfToken"), // 前后端不分离的情况加每次打开客户端，egg会直接在客户端的 Cookie 中写入密钥 ，密钥的 Key 就是 'scrfToken' 这个字段，所以直接获取就好了
            },
            data: {a:1},
            cache: false,
            processData: false,
            contentType: false,
            error:function (err) {
                console.log(err)
            }
        });
    });
</script>
</body>
</html>
```