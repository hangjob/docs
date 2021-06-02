module.exports = app => {
    const { router, controller } = app;
    router.get('/', controller.home.index);
    router.get('/user/:id', controller.home.user);
    router.get('/user/:id/:name', controller.home.userInfo);
    router.get('/create', controller.home.create);
    router.get(/^\/package\/([\w-.]+\/[\w-.]+)$/, controller.home.package);
};