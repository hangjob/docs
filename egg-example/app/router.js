module.exports = app => {
    const { router, controller, middleware } = app;
    const responseTime = middleware.responseTime({ headerKey: 'X-Time' }, app);
    router.get('/', controller.home.index);
    router.get('/user/:id', controller.home.user);
    router.get('/info/:id', controller.home.info);
    router.get('/user/:id/:name', controller.home.userInfo);
    router.get('/create', controller.home.create);
    router.get('/customValidate', controller.home.customValidate);
    router.get('/view/index', responseTime, controller.view.index);
    router.get('/view/temp', controller.view.temp);
    router.all('/view/upload', controller.view.upload);
    router.get('/view/detail/:id', controller.view.detail);
    router.get(/^\/package\/([\w-.]+\/[\w-.]+)$/, controller.home.package);
};