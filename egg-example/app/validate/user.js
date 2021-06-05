module.exports = app => {
    const {validate} = app;
    // 校验用户名是否正确
    // https://www.shuzhiduo.com/A/WpdKQM4NJV/
    validate.addRule('userName', (rule, value) => {
        console.log('校验用户名', rule, value);
        if (/^\d+$/.test(value)) {
            return '用户名应该是字符串';
        } else if (value.length < 6 || value.length > 20) {
            return ('用户名的长度应该在6-20之间');
        }
    });
};